import { Controller } from "stimulus";
import { createConsumer } from "@rails/actioncable";

export default class extends Controller {

  static targets = [ "currentprice","yourprice","finalprice" ]

  initialize() {
    let thisController = this;
    this.channel = createConsumer().subscriptions.create( "RoomChannel", {
      connected() {
        thisController.listen()
      },
      received({ bid , message , user }) {
        console.log(bid);
        if(bid != undefined){
          thisController.currentpriceTargets.map( (currentprice)=>{ currentprice.textContent = bid } )
          thisController.yourpriceTarget.value = thisController.yourpriceTarget.min
          thisController.updatePrice()
        }

        if(message != undefined){
        }

      },

    });
  }

  updatePrice(){
    this.finalpriceTarget.textContent = Number(this.currentpriceTarget.textContent)
    + Number(this.yourpriceTarget.value)
  }

  connect() {
    this.updatePrice()
    this.yourpriceTarget.addEventListener('input', ()=>{ this.updatePrice()});
  }

  disconnect() {
    if (this.channel) {
      this.channel.perform('unfollow')
    }
  }

  bid() {
    if (this.channel) {
      this.channel.perform("bid", {room: this.element.dataset.room,
                                   user: this.element.dataset.user,
                                   price: this.finalpriceTarget.textContent })
    }
  }

  chat() {
    if (this.channel) {
      this.channel.perform("chat", {room: this.element.dataset.room,
                                   user: this.element.dataset.user,
                                   message: 100 })
    }
  }

  listen() {
    if (this.channel) {
      this.channel.perform('follow', { room: this.element.dataset.room } )
    }
  }

}
