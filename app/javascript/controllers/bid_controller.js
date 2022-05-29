import { Controller } from "stimulus";
export default class extends Controller {
  static targets = ["input","finalprice","currentprice"];
  plus100() {
    this.inputTarget.value = Number(this.inputTarget.value) + 100;
    this.updatePrice();
  }
  plus500() {
    this.inputTarget.value = Number(this.inputTarget.value) + 500;
    this.updatePrice();
  }
  plus1000() {
    this.inputTarget.value = Number(this.inputTarget.value) + 1000;
    this.updatePrice();
  }
  updatePrice(){
    this.finalpriceTarget.textContent = Number(this.currentpriceTarget.textContent)
    + Number(this.inputTarget.value)
  }
}
