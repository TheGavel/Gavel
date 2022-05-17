import { Controller } from "stimulus";
import Rails from "@rails/ujs";

export default class extends Controller {
  static targets = ["price", "output", "roomid", "productid", "userid"];

  plus(e) {
    e.preventDefault();
    let output = Number(this.outputTarget.innerHTML);
    let price = Number(this.priceTarget.value);
    let result = output + price;
    this.outputTarget.innerHTML = result;
    const roomid = this.roomidTarget.dataset.roomid;
    const productid = this.productidTarget.dataset.productid;
    const userid = this.useridTarget.dataset.userid;
    console.log(roomid);
    console.log(productid);
    console.log(userid);

    // Rails.ajax({
    //   type: "post",
    //   url: `/api/v1/auction/${auctionID}/bid`,
    //   success: data,
    // });
    // this.element.submit();
  }
}
