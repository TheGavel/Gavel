import { Controller } from "stimulus";
import { createConsumer } from "@rails/actioncable";
import axios from "axios";
import crown1 from "images/crown1.svg";
import crown2 from "images/crown2.svg";
import crown3 from "images/crown3.svg";

const crowns = [crown1, crown2, crown3];

export default class extends Controller {
  static targets = [
    "message",
    "messagescontainer",
    "currentprice",
    "yourprice",
    "finalprice",
    "biduser",
    "modal",
  ];
  static values = {
    end: String,
    start: String,
  };
  userArray = [];
  userhash = {};
  initialize() {
    let thisController = this;
    this.channel = createConsumer().subscriptions.create("RoomChannel", {
      connected() {
        thisController.listen();
      },
      received({ bid, message, user, endbid, bidder, username }) {
        if (bid != undefined) {
          if( bid == 0 ){
            if(user == thisController.element.dataset.user){
              confirm("價格請勿小於每標最低價");
            }
            return;
          }
          thisController.currentpriceTargets.map((currentprice, idx) => {
            currentprice.textContent = bid;
            if (idx == 0) {
              currentprice.textContent = `目前最高價：$${bid}`;
            }
          });

          let bidMessage = `<div style="text-align: center; color: #888888; font-size: 12px; margin-bottom: 5px;" >${username} 已出價 ${bid} 元</div>`;
          thisController.messagescontainerTarget.insertAdjacentHTML(
            "beforeend",
            bidMessage
          );

          thisController.userArray.unshift({ id: user, bid: bid });
          thisController.yourpriceTarget.value =
            thisController.yourpriceTarget.min;
          thisController.biduserTarget.innerHTML = "";

          thisController.asyncForEach(
            thisController.userArray.slice(0, 3),
            async (user, index) => {
              const user_id = user.id,
                user_bid = user.bid;
              if (!Object.keys(thisController.userhash).includes(user_id)) {
                thisController.userhash[user_id] =
                  await thisController.getavatar(user_id);
              }
              let imgHtml = `<div style='padding: 5px 20px 5px 20px; display: flex; flex-direction: column; align-items: center;'>
                          <img src="${crowns[index]}"/>
                          <img src="${thisController.userhash[user_id]}" class="rounded-full bg-white  items-center font-mono" style="height: 60px; width: 60px; margin-top: -15px; "/>
                          <div style="margin-top: 10px; text-align: center; font-size: 12px; border-radius: 9999px; border: solid; background-color: white; padding: 0 1.25rem;">$${user_bid}</div>
                          </div>`;
              thisController.biduserTarget.insertAdjacentHTML(
                "beforeend",
                imgHtml
              );
            }
          );

          thisController.updatePrice();
        }

        if (message != undefined) {
          (async () => {
            const user_id = user;
            if (!Object.keys(thisController.userhash).includes(user_id)) {
              thisController.userhash[user_id] = await thisController.getavatar(
                user_id
              );
            }

            let messageHtml =
              (thisController.element.dataset.user == user_id
                ? '<div class="m-2" style="display:flex; align-items: center; flex-direction: row-reverse;" >'
                : '<div class="m-2" style="display:flex; align-items: center;">') +
              `<img src="${thisController.userhash[user_id]}" class="w-12 h-12 inline-block rounded-full bg-gray-300"/>
              &nbsp&nbsp
              <span class="h-15 px-3 rounded-lg leading-10 text-white font-bold bg-blue-500 opacity-90 text-md"> ${message} </span>
              </div>`;
            if(user == thisController.element.dataset.user){
              thisController.messageTarget.value = "";
            }
            thisController.messagescontainerTarget.insertAdjacentHTML(
              "beforeend",
              messageHtml
            );
            thisController.messagescontainerTarget.scrollTop =
              thisController.messagescontainerTarget.scrollHeight;
          })();
        }

        if (endbid == "end") {
          if (thisController.element.dataset.user == bidder) {
            location.href = "/orders/buyer_order";
          } else {
            location.href = `/rooms/${thisController.element.dataset.room}`;
          }
        }
      },
    });
  }

  updatePrice() {
    this.finalpriceTarget.textContent =
      Number(this.currentpriceTargets[1].textContent) +
      Number(this.yourpriceTarget.value);
  }

  connect() {
    this.updatePrice();
    this.yourpriceTarget.addEventListener("input", () => {
      this.updatePrice();
    });
    this.messageTarget.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        this.chat();
      }
    });
  }

  disconnect() {
    if (this.channel) {
      this.channel.perform("unfollow");
    }
  }

  bid() {
    if (this.channel) {
      this.channel.perform("bid", {
        room: this.element.dataset.room,
        user: this.element.dataset.user,
        price: this.finalpriceTarget.textContent,
      });
    }
  }

  chat() {
    if (this.channel && this.messageTarget.value != "") {
      this.channel.perform("chat", {
        room: this.element.dataset.room,
        user: this.element.dataset.user,
        message: this.messageTarget.value.trim(),
      });
    }
  }

  listen() {
    if (this.channel) {
      this.channel.perform("follow", { room: this.element.dataset.room });
    }
  }

  async getavatar(user_id) {
    try {
      const csrfToken = document.querySelector("meta[name=csrf-token]").content;
      axios.defaults.headers.common["X-CSRF-Token"] = csrfToken;
      const response = await axios.get(`/api/v1/rooms/getavatar/${user_id}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }

  closeModal() {
    this.modalTarget.style.display = "none";
  }
  showModal() {
    this.modalTarget.style.display = "block";
  }
}
