import { Controller } from "stimulus";

export default class extends Controller {
  static targets = ["price", "output"];
  plus(e) {
    e.preventDefault();
    let output = Number(this.outputTarget.innerHTML);
    let price = Number(this.priceTarget.value);
    let result = output + price;
    this.outputTarget.innerHTML = result;
  }
}
