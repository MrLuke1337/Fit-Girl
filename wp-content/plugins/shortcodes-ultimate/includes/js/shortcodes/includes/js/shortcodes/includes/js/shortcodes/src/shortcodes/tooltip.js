/* global Popper */

export default function SUTooltipShortcode() {
  var popperModifiers = [
    {
      name: "offset",
      options: {
        offset: [0, 8],
      },
    },
  ];

  function initTooltip(tooltip) {
    var id = tooltip.getAttribute("id");
    var button = document.getElementById(id + "_button");
    var settings = JSON.parse(button.getAttribute("data-settings"));

    document.body.appendChild(tooltip);

    var popperInstance = Popper.createPopper(button, tooltip, {
      placement: settings.position,
      modifiers: [...popperModifiers],
    });

    if (settings.behavior === "always") {
      window.setTimeout(() => {
        show(tooltip, popperInstance);
      }, 0);
    }

    if (settings.behavior === "click" || settings.behavior === "hover") {
      button.addEventListener("focus", () => show(tooltip, popperInstance));
      button.addEventListener("blur", () =>
        hide(tooltip, popperInstance, settings.hideDelay)
      );
    }

    if (settings.behavior === "hover") {
      button.addEventListener("mouseenter", () =>
        show(tooltip, popperInstance)
      );
      button.addEventListener("mouseleave", () =>
        hide(tooltip, popperInstance, settings.hideDelay)
      );
    }

    tooltip.style.removeProperty("display");
  }

  function show(tooltip, popperInstance) {
    tooltip.classList.add("su-tooltip-visible");

    popperInstance.setOptions({
      modifiers: [
        { name: "eventListeners", enabled: true },
        ...popperModifiers,
      ],
    });

    popperInstance.update();
  }

  function hide(tooltip, popperInstance, delay) {
    window.setTimeout(function () {
      tooltip.classList.remove("su-tooltip-visible");

      popperInstance.setOptions({
        modifiers: [
          { name: "eventListeners", enabled: false },
          ...popperModifiers,
        ],
      });
    }, delay);
  }

  function initAll() {
    Array.prototype.forEach.call(
      document.querySelectorAll(".su-tooltip"),
      initTooltip
    );
  }

  document.addEventListener("DOMContentLoaded", initAll);
}
