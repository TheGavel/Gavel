import consumer from "./consumer";

consumer.subscriptions.create("RoomChannel", {
  connected() {},

  disconnected() {},

  received(data) {
    document.querySelector("#output").innerHTML = data["bid"];
  },
});
