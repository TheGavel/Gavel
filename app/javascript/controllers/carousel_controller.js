import { Controller } from "stimulus";
export default class extends Controller {
  connect() {
    const nextEl = document.getElementById("next");
    const previousEl = document.getElementById("previous");
    const sliderEl = document.getElementById("slider");
    const dots = document.getElementById("dots");
    const imgCounts = sliderEl.children.length;
    nextEl.addEventListener("click", () => (slideProxy.index += 1));
    previousEl.addEventListener("click", () => (slideProxy.index -= 1));
    setClickEventToDots();
    window.onresize = debounce(calculateWidth);
    const slideProps = { index: 0 };
    const slideHandler = {
      set(obj, prop, value) {
        if (prop === "index") {
          if (value < 0 || value >= imgCounts) return;
          setDotToInactive();
          obj[prop] = value;
          calculateWidth();
          setActiveDot();
        }
      },
    };
    const slideProxy = new Proxy(slideProps, slideHandler);
    setActiveDot();
    function calculateWidth() {
      const imgWidth = sliderEl.offsetWidth;
      const recomputedWidth = slideProps.index * imgWidth;
      sliderEl.scrollLeft = recomputedWidth;
    }
    function setDotToInactive() {
      const { index } = slideProps;
      dots.children[index].classList.remove("dot--active");
    }
    function setActiveDot() {
      const { index } = slideProps;
      dots.children[index].classList.add("dot--active");
    }
    function setClickEventToDots() {
      for (let i = 0; i < dots.children.length; i++) {
        const li = dots.children[i];
        li.addEventListener("click", () => {
          slideProxy.index = i;
        });
      }
    }
    function debounce(func, timeout = 100) {
      let timer;
      return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          func.apply(this, args);
        }, timeout);
      };
    }
  }
}
