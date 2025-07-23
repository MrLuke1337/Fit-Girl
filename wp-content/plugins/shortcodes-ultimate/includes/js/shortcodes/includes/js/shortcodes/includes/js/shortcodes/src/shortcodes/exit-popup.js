/* global jQuery */

import * as SUCookies from "./../cookies/cookies";

export default function SUExitPopupShortcode() {
  /*! <fs_premium_only> */
  jQuery(function ($) {
    $(document).on("mouseleave.sue", function (e) {
      var $exit_popup = $(".sue-exit-popup:first");
      var data = $exit_popup.data();
      var $screen = $exit_popup.children(".sue-exit-popup-screen");
      // Check that popup is on the page
      if ($exit_popup.length === 0) return false;
      // Check pointer Y
      if (e.pageY > 50) return false;
      // Check for cookie
      if (data.once === "yes" && SUCookies.readCookie(data.cookie) !== null)
        return false;
      // Create cookie for next time
      if (data.once === "yes") SUCookies.createCookie(data.cookie, true, 1000);
      else SUCookies.eraseCookie(data.cookie);
      // Remove empty P's
      $screen.find("p:empty").remove();
      // Create popup
      $.magnificPopup.open(
        {
          closeOnBgClick: data.onclick === "close-bg",
          closeBtnInside: true,
          showCloseBtn: data.close === "yes",
          enableEscapeKey: data.esc === "yes",
          callbacks: {
            beforeOpen: function () {
              // Add style class
              $("body").addClass(data.style);
            },
            open: function () {
              // Unbind document's event
              $(document).off("mouseleave.sue");
              // Set window width
              $screen.css("max-width", data.width + "px");
              // Set bg opacity
              $(".mfp-bg").css("opacity", data.opacity);
              // Set action for click
              $("body").on("mousedown.sue", function (e) {
                // Go to url
                if (data.onclick === "url") {
                  var tag = e.target.nodeName.toLowerCase();
                  if (tag === "button" || tag === "a") return;
                  else window.location.href = data.url;
                }
                // Close screen
                else if (data.onclick === "close") $.magnificPopup.close();
              });
            },
            close: function () {
              // Remove all styles
              $(".mfp-bg").attr("style", "");
              // Remove style class
              $("body").removeClass(data.style);
              // Remove click action
              $("body").unbind("mousedown.sue");
            },
          },
          items: {
            src: $screen.remove(),
          },
          type: "inline",
        },
        0
      );
    });
  });
  /*! </fs_premium_only> */
}
