(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var TOTAL_MS = 900;

  function typeInto(pre, text) {
    if (reduceMotion || !text) {
      pre.textContent = text || "";
      return;
    }

    pre.textContent = "";
    pre.classList.add("is-typing");

    var start = null;

    function step(timestamp) {
      if (start === null) start = timestamp;
      var elapsed = timestamp - start;
      var progress = Math.min(1, elapsed / TOTAL_MS);
      var chars = Math.floor(progress * text.length);
      pre.textContent = text.slice(0, chars);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        pre.textContent = text;
        pre.classList.remove("is-typing");
      }
    }

    requestAnimationFrame(step);
  }

  function findPairs() {
    var pairs = [];
    document.querySelectorAll("[data-source]").forEach(function (source) {
      var container = source.closest(".job") || source.parentElement;
      var pre = container ? container.querySelector("pre.output") : null;
      if (pre) pairs.push({ pre: pre, text: source.textContent });
    });
    return pairs;
  }

  var pairs = findPairs();

  if (!("IntersectionObserver" in window) || reduceMotion) {
    pairs.forEach(function (p) {
      typeInto(p.pre, p.text);
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var match = pairs.find(function (p) {
          return p.pre === entry.target;
        });
        if (match) {
          typeInto(match.pre, match.text);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
  );

  pairs.forEach(function (p) {
    observer.observe(p.pre);
  });
})();
