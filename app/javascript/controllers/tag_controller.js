import { Controller } from "stimulus";
import Rails from "@rails/ujs";
import { ajaxTransport } from "jquery";

export default class extends Controller {
  connect() {
    console.log(123);
    const json = {
      //從後端傳來的結構表
      "3c": {
        iphone: ["iphone11"],
        android: ["oppo", "samsung"],
      },
      運動: { 跑步機: ["喬山", "123"] },
    };

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
        console.log("index", index, maxInput);
        maxInput++;
        for (let i = index + 1; i < maxInput + 1; i++) {
          let target = document.querySelector("#selectChildren" + i.toString());
          if (target) target.remove();
        }
        newselect(index + 1, child[e.target.value]);
      });
      this.element.appendChild(select);
    };
    newselect(index, json);
  }
}
