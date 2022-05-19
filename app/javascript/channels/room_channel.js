import consumer from "./consumer";

consumer.subscriptions.create("RoomChannel", {
  connected() {
    // Called when the subscription is ready for use on the server
    console.log("Welcome!");
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
    console.log("Bye!");
  },

  received(data) {
    // Called when there's incoming data on the websocket for this channel
    document.querySelector("#output").innerHTML = data["bid"];
  },
});
