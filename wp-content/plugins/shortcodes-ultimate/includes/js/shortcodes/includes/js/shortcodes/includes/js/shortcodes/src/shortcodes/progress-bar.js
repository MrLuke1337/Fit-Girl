/* global jQuery */

export default function SUProgressBarShortcode() {
  /*! <fs_premium_only> */
  jQuery(function ($) {
    $(".sue-progress-bar.sue-progress-bar-animation").one(
      "inview",
      function () {
        var $this = $(this);
        var $span = $this.children("span");
        var percent = $this.data("percent");
        $span.css("width", percent + "%");
      }
    );
  });
  /*! </fs_premium_only> */
}
