import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static values = {
    end: String,
    start: String,
    now: String,
    refreshInterval: { type: Number, default: 1000 },
    expiredMessage: { type: String, default: "此拍賣已結束" },
    message: {
      type: String,
      default: "Deal ends in ${days}d ${hours}h ${minutes}m ${seconds}s",
    },
  };

  connect() {
    this.endTime = new Date(this.endValue).getTime();
    this.startTime = new Date(this.startValue).getTime();

    this.update();
    this.timer = setInterval(() => {
      this.update();
    }, this.refreshIntervalValue);
  }

  disconnect() {
    this.stopTimer();
  }

  stopTimer() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  update() {
    let mode;

    if (this.startTime - new Date().getTime() > 0) mode = "before";

    if (
      this.endTime - new Date().getTime() > 0 &&
      this.startTime - new Date().getTime() < 0
    )
      mode = "mid";

    if (
      this.endTime - new Date().getTime() < 0 &&
      this.startTime - new Date().getTime() < 0
    )
      mode = "end";

    let difference;
    let span;

    if (mode == "before") {
      difference = this.timeDifference(this.startTime, new Date().getTime());
      span = "開賣倒數時間：";
    }
    if (mode == "mid") {
      difference = this.timeDifference(this.endTime, new Date().getTime());
      span = "拍賣剩餘時間：";
    }
    if (mode == "end") {
      this.element.textContent = this.expiredMessageValue;
      this.stopTimer();
      return;
    }

    let days = Math.floor(difference / (1000 * 60 * 60 * 24));
    let hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);

    this.element.textContent = this.messageValue
      .replace("${span}", span)
      .replace("${days}", days)
      .replace("${hours}", hours)
      .replace("${minutes}", minutes)
      .replace("${seconds}", seconds);
  }

  timeDifference(timing, starttime) {
    return timing - starttime;
  }
}
