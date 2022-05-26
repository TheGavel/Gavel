import { Controller } from "stimulus";
import { createConsumer } from "@rails/actioncable";
import Rails from "@rails/ujs";
import axios from "axios"
export default class extends Controller {

  static targets = [ "currentprice","yourprice","finalprice","biduser" ]
  userArray = []
  userhash = {}
  initialize() {
    let thisController = this;
    this.channel = createConsumer().subscriptions.create( "RoomChannel", {
      connected() {
        thisController.listen()
      },
      received({ bid , message , user }) {
        if(bid != undefined){
          console.log(bid, user );
          thisController.currentpriceTargets.map( (currentprice) => {
            currentprice.textContent = bid
          })

          thisController.userArray.unshift({id: user,
                                            bid: bid})
          thisController.yourpriceTarget.value = thisController.yourpriceTarget.min
          thisController.biduserTarget.innerHTML = '';


          thisController.userArray.slice(0, 6).forEach( async(user) => {
            const user_id = user.id,
                  user_bid = user.bid,
                  img = document.createElement("img");
            if ( !Object.keys(thisController.userhash).includes(user_id) ){
              thisController.userhash[user_id] = await thisController.getavatar(user_id);
            }
            img.src = thisController.userhash[user_id]
            thisController.biduserTarget.appendChild(img)
          })

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
    this.yourpriceTarget.addEventListener('input', () => { this.updatePrice()});
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


  async getavatar(user_id) {
    try {
      const csrfToken = document.querySelector("meta[name=csrf-token]").content
      axios.defaults.headers.common['X-CSRF-Token'] = csrfToken
      const response = await axios.get(`/api/v1/rooms/getavatar/${user_id}`);
      console.log(response);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

}
