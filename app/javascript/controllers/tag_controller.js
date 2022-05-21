import { Controller } from "stimulus";
import Rails from "@rails/ujs"

export default class extends Controller {
  connect() {
    Rails.ajax({
      type: "get",
      url: '/api/v1/products/categories/architecture',
      success: (category) => {
        let index = 1;
        let maxInput = 0;
        let newoption = (value, text, node) => {
          var option = document.createElement("option");
          option.value = value;
          option.innerHTML = text;
          node.appendChild(option);
        };
        let newselect = (index, child) => {
          var select = document.createElement("select");
          select.selected = "";
          select.setAttribute("id", "selectChildren" + index.toString());
          select.setAttribute("name", "selectChildren[]");

          newoption("val1", "Choose option", select);
          if (child === undefined) return;
          Object.keys(child).forEach((key) => {
            if (Number(key) == key) key = child[key];
            newoption(key, key, select);
          });

          select.addEventListener("change", (e) => {
            if (index > maxInput) maxInput = index;
            maxInput++;
            for (let i = index + 1; i < maxInput + 1; i++) {
              let target = document.querySelector("#selectChildren" + i.toString());
              if (target) target.remove();
            }
            newselect(index + 1, child[e.target.value]);
          });
          this.element.appendChild(select);
        };
        newselect(index, category);

        //讓賣家編輯時 類別可以自動還原自己所選之類別
        let classification = JSON.parse(this.element.dataset.tags)
        let selectChange = (tag,i) => {
          Array.from(document.querySelector("#selectChildren"+i.toString()).children).forEach((child)=>{
            if(child.value == tag) child.selected = true
            let changeEvent = new Event('change');
            document.querySelector("#selectChildren"+i.toString()).dispatchEvent(changeEvent);
          })
        }
        classification.forEach((item,i) => {
          console.log(item,i);
          selectChange(item,i+1)
        })
      }
    })


  }
}
