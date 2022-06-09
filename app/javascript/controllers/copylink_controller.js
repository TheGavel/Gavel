import { Controller } from "@hotwired/stimulus";
export default class extends Controller {
  static targets = ["link"];
  copy(e) {
    e.preventDefault();
    const copyText = `${e.target.closest("a").dataset.url}`;
    navigator.clipboard.writeText(copyText).catch((err) => {
      console.log(err);
    });

    this.element.innerHTML = `<span class="px-6 py-2 rounded-full bg-gavel-blue hover:bg-blue-800 text-white text-md font-bold whitespace-nowrap" >已複製連結</span>`;
  }
}
