import consumer from "./consumer";

consumer.subscriptions.create("RoomChannel", {
  connected() {
    console.log("fff");
  },

  disconnected() {},

  received(data) {
    document.querySelector("#output").innerHTML = data["bid"];
  },
});
