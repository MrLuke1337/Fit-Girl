/* global jQuery */

export default function SUPanelsShortcodes() {
  /*! <fs_premium_only> */
  jQuery(function ($) {
    $("body:not(.su-panels-shortcodes-loaded)").on(
      "click",
      ".sue-panel-clickable",
      function (e) {
        if ($(this).data("target") === "self") {
          document.location.href = $(this).data("url");
        } else {
          window.open($(this).data("url"));
        }
      }
    );

    jQuery("body").addClass("su-panels-shortcodes-loaded");
  });
  /*! </fs_premium_only> */
}
