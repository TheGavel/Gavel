import { Controller } from "stimulus";
import { createConsumer } from "@rails/actioncable";

export default class extends Controller {
  initialize() {
    let thisController = this;
    this.channel = createConsumer().subscriptions.create( "ChatRoomSidebarChannel", {
      connected() {
        thisController.listen()
      },
      received({ chat_room_details, chat_room_id }) {
        let existingItem = document.querySelector(`[data-chat-room-id='${ chat_room_id }']`)
        if (existingItem) {
          let html = new DOMParser().parseFromString( chat_room_details , 'text/html');
          const itemHTML = html.body.firstChild;
          existingItem.parentNode.replaceChild(itemHTML, existingItem);
        }
      }
    });
  }

  connect() {
    console.log("aaa");
    this.listen()
  }

  disconnect() {
    if (this.channel) {
      this.channel.perform('unfollow')
    }
  }

  listen() {
    if (this.channel) {
      let chatRooms = []
      for (const value of document.querySelectorAll(`[data-chat-room-id]`)) {
        chatRooms.push( value.getAttribute('data-chat-room-id') )
      }
      this.channel.perform('follow', { chatRooms: chatRooms } )
    }
  }
}
