/* global jQuery, SUShortcodesL10n, Event */

export default function SUOtherShortcodes() {
  jQuery(document).ready(function ($) {
    function scrollIn($el) {
      if (
        $(window).scrollTop() + $("body").offset().top > $el.offset().top ||
        $(window).scrollTop() + $(window).height() < $el.offset().top
      ) {
        $(window).scrollTop(
          $el.offset().top - $("body").offset().top - $el.data("scroll-offset")
        );
      }
    }
    function addAnchor(anchor = "") {
      if (typeof anchor !== "string") {
        return;
      }
      anchor = anchor.replace(/[^a-z0-9_-]/gim, "").trim();
      if (anchor === "") {
        return;
      }
      window.location.hash = "#" + anchor;
    }
    // Spoiler
    $("body:not(.su-other-shortcodes-loaded)").on(
      "click keypress",
      ".su-spoiler-title",
      function (e) {
        var $spoiler = $(this).parent();
        // Open/close spoiler
        $spoiler.toggleClass("su-spoiler-closed");
        // Add anchor to URL
        if (
          !$spoiler.hasClass("su-spoiler-closed") &&
          $spoiler.data("anchor-in-url") === "yes"
        ) {
          addAnchor($spoiler.data("anchor"));
        }
        // Close other spoilers in accordion
        $spoiler
          .parent(".su-accordion")
          .children(".su-spoiler")
          .not($spoiler)
          .addClass("su-spoiler-closed");
        // Scroll in spoiler in accordion
        scrollIn($spoiler);
        e.preventDefault();
      }
    );

    function revealTab($tab) {
      var index = $tab.index();
      var isDisabled = $tab.hasClass("su-tabs-disabled");
      var $container = $tab.parents(".su-tabs");
      var $tabs = $container.find(".su-tabs-nav span");
      var $panes = $container.find(".su-tabs-pane");
      // Check tab is not disabled
      if (isDisabled) return false;
      // Hide all panes, show selected pane
      $panes
        .removeClass("su-tabs-pane-open")
        .eq(index)
        .addClass("su-tabs-pane-open");
      // Disable all tabs, enable selected tab
      $tabs
        .removeClass("su-tabs-current")
        .eq(index)
        .addClass("su-tabs-current");
      // Emit resize event
      window.setTimeout(function () {
        window.dispatchEvent(new Event("resize"));
      }, 100);
    }

    // Tabs
    $("body:not(.su-other-shortcodes-loaded)").on(
      "click keypress",
      ".su-tabs-nav span",
      function (e) {
        var $tab = $(this);
        var $container = $tab.parents(".su-tabs");
        var data = $tab.data();
        revealTab($tab);
        // Add anchor to URL
        if ($container.data("anchor-in-url") === "yes") {
          addAnchor($tab.data("anchor"));
        }
        // Open specified url
        if (data.url !== "") {
          if (data.target === "self") window.location = data.url;
          else if (data.target === "blank") window.open(data.url);
        }
        e.preventDefault();
      }
    );

    // Activate tabs
    $(".su-tabs").each(function () {
      var active = parseInt($(this).data("active")) - 1;

      var $tab = $(this).children(".su-tabs-nav").children("span").eq(active);

      revealTab($tab);
    });

    // Activate anchor nav for tabs and spoilers
    anchorNav();

    // Lightbox
    $(document).on("click", ".su-lightbox", function (e) {
      e.preventDefault();
      e.stopPropagation();

      if ($(this).parent().attr("id") === "su-generator-preview") {
        $(this).html(SUShortcodesL10n.noPreview);

        return;
      }

      var type = $(this).data("mfp-type");
      var mobile = $(this).data("mobile");
      var windowWidth = $(window).width();

      $(this)
        .magnificPopup({
          disableOn: function () {
            if (mobile === "no" && windowWidth < 768) {
              return false;
            }
            if (typeof mobile === "number" && windowWidth < mobile) {
              return false;
            }
            return true;
          },
          type: type,
          tClose: SUShortcodesL10n.magnificPopup.close,
          tLoading: SUShortcodesL10n.magnificPopup.loading,
          gallery: {
            tPrev: SUShortcodesL10n.magnificPopup.prev,
            tNext: SUShortcodesL10n.magnificPopup.next,
            tCounter: SUShortcodesL10n.magnificPopup.counter,
          },
          image: {
            tError: SUShortcodesL10n.magnificPopup.error,
          },
          ajax: {
            tError: SUShortcodesL10n.magnificPopup.error,
          },
          iframe: {
            markup:
              '<div class="mfp-iframe-scaler">' +
              '<div class="mfp-close"></div>' +
              '<iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen allow="autoplay; fullscreen"></iframe>' +
              "</div>",
          },
        })
        .magnificPopup("open");
    });
    // Frame
    $(".su-frame-align-center, .su-frame-align-none").each(function () {
      var frameWidth = $(this).find("img").width();
      $(this).css("width", frameWidth + 12);
    });

    // Expand
    $("body:not(.su-other-shortcodes-loaded)").on(
      "click",
      ".su-expand-link",
      function () {
        var $this = $(this);
        var $container = $this.parents(".su-expand");
        var $content = $container.children(".su-expand-content");

        if ($container.hasClass("su-expand-collapsed")) {
          $content.css("max-height", "none");
        } else {
          $content.css("max-height", $container.data("height") + "px");
        }

        $container.toggleClass("su-expand-collapsed");
      }
    );

    function isTransitionSupported() {
      var thisBody = document.body || document.documentElement;
      var thisStyle = thisBody.style;
      var support =
        thisStyle.transition !== undefined ||
        thisStyle.WebkitTransition !== undefined ||
        thisStyle.MozTransition !== undefined ||
        thisStyle.MsTransition !== undefined ||
        thisStyle.OTransition !== undefined;

      return support;
    }

    // Animate
    $(".su-animate").each(function () {
      var $this = $(this);
      var data = $this.data();
      var delay = isTransitionSupported() ? data.delay * 1000 : 0;
      $this.one("inview", function (e) {
        window.setTimeout(function () {
          $this.addClass(data.animation);
          $this.addClass("animated");
          $this.get(0).style.removeProperty("opacity");
        }, delay);
      });
    });

    function anchorNav() {
      // Check hash
      if (document.location.hash === "") return;
      // Go through tabs
      $(".su-tabs-nav span[data-anchor]").each(function () {
        if ("#" + $(this).data("anchor") === document.location.hash) {
          var $tabs = $(this).parents(".su-tabs");
          // Activate tab
          $(this).trigger("click");
          // Scroll-in tabs container
          window.setTimeout(function () {
            scrollIn($tabs);
          }, 100);
        }
      });
      // Go through spoilers
      $(".su-spoiler[data-anchor]").each(function () {
        if ("#" + $(this).data("anchor") === document.location.hash) {
          var $spoiler = $(this);
          // Activate tab
          if ($spoiler.hasClass("su-spoiler-closed")) {
            $spoiler.find(".su-spoiler-title:first").trigger("click");
          }
          // Scroll-in tabs container
          window.setTimeout(function () {
            scrollIn($spoiler);
          }, 100);
        }
      });
    }

    if ("onhashchange" in window) $(window).on("hashchange", anchorNav);

    $("body").addClass("su-other-shortcodes-loaded");
  });
}
