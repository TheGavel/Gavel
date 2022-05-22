import { Controller } from "stimulus";
import Rails from "@rails/ujs";

export default class extends Controller {
  static targets = [
    "price",
    "output",
    "roomid",
    "productid",
    "userid",
    "message",
  ];

  plus(e) {
    e.preventDefault();
    let output = Number(this.outputTarget.innerHTML);
    let price = Number(this.priceTarget.value);
    let bid = output + price;
    this.outputTarget.innerHTML = bid;
    let roomid = this.roomidTarget.dataset.roomid;
    let productid = this.productidTarget.dataset.productid;
    let userid = this.useridTarget.dataset.userid;

    const data = new FormData();
    data.append("bid", bid);
    data.append("productid", productid);
    data.append("userid", userid);
    data.append("roomid", roomid);

    Rails.ajax({
      type: "post",
      url: `/api/v1/room/${roomid}/auction`,
      data,
      success: (resp) => {
        console.log(resp);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
