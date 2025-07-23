/* global jQuery */

import * as SUCookies from "./../cookies/cookies";

export default function SUSplashScreenShortcode() {
  /*! <fs_premium_only> */
  jQuery(function ($) {
    $(".sue-splash").each(function () {
      var $splash = $(this);
      var data = $splash.data();
      var $screen = $splash.children(".sue-splash-screen");
      // Check for cookie
      if (data.once === "yes" && SUCookies.readCookie(data.cookie) !== null)
        return false;
      // Create cookie for next time
      if (data.once === "yes") SUCookies.createCookie(data.cookie, true, 1000);
      else SUCookies.eraseCookie(data.cookie);
      // Remove empty P's
      $screen.find("p:empty").remove();
      // Open popup with delay
      window.setTimeout(function () {
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
                  else if (data.onclick === "close") {
                    $.magnificPopup.close();
                  }
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
      }, parseInt(data.delay) * 1000 + 10);
    });
  });
  /*! </fs_premium_only> */
}
