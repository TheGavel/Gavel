import { Controller } from "stimulus";
import Rails from "@rails/ujs";
import { ajaxTransport } from "jquery";

export default class extends Controller {
  connect() {
    console.log(123);
  }
}
