import { Controller } from "stimulus";

export default class extends Controller {
  static targets = ["price", "output"];

  show() {
    let input = this.element.querySelector("#input").value;
    let output = this.element.querySelector("#output").textContent;
    let result = 0;
    if (input > output) {
      result = input;
    } else {
      result = output;
      alert("請輸入高於目前競價的金額");
    }
    this.outputTarget.textContent = result;

    // this.outputTarget.textContent = `目前價格${this.priceTarget.value}`;
  }

  plus() {
    let input = Number(this.element.querySelector("#input").value);
    let output = Number(this.element.querySelector("#output").textContent);
    let result = input + output;
    this.outputTarget.textContent = result;
  }
}
