(function () {
  "use strict";

  var overlay = document.getElementById("modal-overlay");
  var modal = overlay.querySelector(".modal");
  var body = document.getElementById("modal-body");
  var closeBtn = overlay.querySelector(".modal-close");
  var lastFocused = null;

  function openModal(templateId) {
    var template = document.getElementById(templateId);
    if (!template) return;

    body.innerHTML = "";
    body.appendChild(template.content.cloneNode(true));

    lastFocused = document.activeElement;
    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  }

  function closeModal() {
    overlay.classList.remove("open");
    document.body.style.overflow = "";
    body.innerHTML = "";
    if (lastFocused && typeof lastFocused.focus === "function") {
      lastFocused.focus();
    }
  }

  document.querySelectorAll(".tile[data-modal]").forEach(function (tile) {
    tile.addEventListener("click", function () {
      openModal(tile.getAttribute("data-modal"));
    });
  });

  closeBtn.addEventListener("click", closeModal);

  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && overlay.classList.contains("open")) {
      closeModal();
    }
  });

  modal.addEventListener("keydown", function (e) {
    if (e.key !== "Tab") return;
    var focusable = modal.querySelectorAll(
      'a[href], button, [tabindex]:not([tabindex="-1"])'
    );
    if (!focusable.length) return;
    var first = focusable[0];
    var last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });
})();
