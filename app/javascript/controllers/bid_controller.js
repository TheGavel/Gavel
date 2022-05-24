import { Controller } from "stimulus";
export default class extends Controller {
  static targets = ["record", "bid", "input", "priceNow", "yourPrice"];
  show() {
    this.inputTarget.value = "";
    this.yourPriceTarget.textContent = this.priceNowTarget.textContent;
    if (this.bidTarget.style.display === "block") {
      this.bidTarget.style.display = "none";
    } else {
      this.bidTarget.style.display = "block";
    }
  }
  addPrice() {
    this.yourPriceTarget.textContent =
      Number(this.priceNowTarget.textContent) + Number(this.inputTarget.value);
  }
  plus100() {
    this.inputTarget.value = Number(this.inputTarget.value) + 100;
    this.addPrice();
  }
  plus500() {
    this.inputTarget.value = Number(this.inputTarget.value) + 500;
    this.addPrice();
  }
  plus1000() {
    this.inputTarget.value = Number(this.inputTarget.value) + 1000;
    this.addPrice();
  }
}
