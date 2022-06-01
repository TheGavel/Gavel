import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["link"];
  copy(e) {
    e.preventDefault();
    const copyText = `${e.target.dataset.url}`;
    navigator.clipboard
      .writeText(copyText)
      .then((data) => {})
      .catch((err) => {
        console.log(err);
      });

    this.element.textContent = "已複製連結！";
  }
}
