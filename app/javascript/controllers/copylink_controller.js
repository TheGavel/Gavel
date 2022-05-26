import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  copy(e) {
    e.preventDefault();
    const copyText = `${e.target.dataset.url}`;
    navigator.clipboard
      .writeText(copyText)
      .then((data) => {
        console.log(data);
        alert("已複製房間連結");
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
