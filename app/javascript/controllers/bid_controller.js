import { Controller } from "stimulus";
export default class extends Controller {
  static targets = ["record", "bid", "input", "priceNow", "yourPrice"];
  show() {
    if (this.recordTarget.style.display === "flex") {
      this.recordTarget.style.display = "none";
      this.bidTarget.style.display = "block";
    } else {
      this.recordTarget.style.display = "flex";
      this.bidTarget.style.display = "none";
    }
  }
  addPrice() {
    console.log(this.yourPriceTarget.textContent);
    console.log();
    this.yourPriceTarget.textContent =
      Number(this.priceNowTarget.textContent) + Number(this.inputTarget.value);
  }
}
