import { Controller } from "stimulus";
import flatpickr from "flatpickr";
export default class extends Controller {
  static targets = ["time"];
  connect() {
    flatpickr(this.element, {
      enableTime: true,
      minDate: "today",
      dateFormat: "Y-m-d H:i",
    });
  }
}
