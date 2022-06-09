import { faL } from "@fortawesome/free-solid-svg-icons";
import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static values = {
    end: String,
    start: String,
    refreshInterval: { type: Number, default: 1000 },
    expiredMessage: { type: String, default: "此拍賣已結束" },
    message: {
      type: String,
      default: "${span} ${days} 天 ${hours} 小時 ${minutes} 分鐘 ${seconds} 秒",
    },
  };
  static targets = ["bid", "span"];

  connect() {
    this.endTime = new Date(this.endValue.replace(/-/g, "/")).getTime();
    this.startTime = new Date(this.startValue.replace(/-/g, "/")).getTime();

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
    let nowTime = new Date().getTime();

    if (this.startTime - nowTime > 0) {
      mode = "before";
    }

    if (this.endTime - nowTime > 0 && this.startTime - nowTime < 0) {
      mode = "mid";
    }

    if (this.endTime - nowTime < 0 && this.startTime - nowTime < 0) {
      mode = "end";
    }

    let difference;
    let span;

    if (mode == "before") {
      difference = this.timeDifference(this.startTime, new Date().getTime());
      span = "開賣倒數時間：";
      this.bidTarget.disabled = true;
      this.bidTarget.style.backgroundColor = "#bfbfbf";
      this.bidTarget.children[1].innerHTML = "尚未開賣";
      this.spanTarget.closest("div").style.backgroundColor = "#bfbfbf";
    }
    if (mode == "mid") {
      difference = this.timeDifference(this.endTime, new Date().getTime());
      span = "拍賣剩餘時間：";
      this.bidTarget.disabled = false;
      this.bidTarget.style.backgroundColor = "#0066CC";
      this.bidTarget.children[1].innerHTML = "馬上出價";
      this.spanTarget.closest("div").style.backgroundColor = "#0066CC";
    }
    if (mode == "end") {
      this.bidTarget.disabled = true;
      this.bidTarget.style.backgroundColor = "#bfbfbf";
      this.bidTarget.children[1].innerHTML = "拍賣結束";
      this.spanTarget.closest("div").style.backgroundColor = "#bfbfbf";
    }

    let days = Math.floor(difference / (1000 * 60 * 60 * 24));
    let hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);

    if (mode == "before" || mode == "mid") {
      this.spanTargets.forEach((element) => {
        element.textContent = this.messageValue
          .replace("${span}", span)
          .replace("${days}", days)
          .replace("${hours}", hours)
          .replace("${minutes}", minutes)
          .replace("${seconds}", seconds);
      });
    } else {
      this.spanTargets.forEach((element) => {
        element.textContent = this.expiredMessageValue;
        this.stopTimer();
        return;
      });
    }
  }

  timeDifference(timing, starttime) {
    return timing - starttime;
  }
}
