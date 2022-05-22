import { Controller } from "stimulus";
export default class extends Controller {
  static targets = ["record", "price"];
  show() {
    if (this.recordTarget.style.display === "block") {
      this.recordTarget.style.display = "none";
      this.priceTarget.style.display = "block";
    } else {
      this.recordTarget.style.display = "block";
      this.priceTarget.style.display = "none";
    }
  }
}
