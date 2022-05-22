import { Controller } from "stimulus";
export default class extends Controller {
  static values = { refreshInterval: Number };
  startRefreshing() {
    setInterval;

    function updateTimer() {
      endTime = Date.parse("5 22, 2022 23:50:00");
      now = new Date();
      countDown = endTime - now;

      days = Math.floor(countDown / (1000 * 60 * 60 * 24));
      hours = Math.floor(countDown / (1000 * 60 * 60));
      mins = Math.floor(countDown / (1000 * 60));
      secs = Math.floor(countDown / 1000);

      d = days;
      h = hours - days * 24;
      m = mins - hours * 60;
      s = secs - mins * 60;

      document.getElementById("timer").innerHTML =
        "<div>" +
        d +
        "<span>天</span></div>" +
        "<div>" +
        h +
        "<span>小時</span></div>" +
        "<div>" +
        m +
        "<span>分鐘</span></div>" +
        "<div>" +
        s +
        "<span>秒</span></div>";
    }
    setInterval("updateTimer()", 1000);
  }
}
