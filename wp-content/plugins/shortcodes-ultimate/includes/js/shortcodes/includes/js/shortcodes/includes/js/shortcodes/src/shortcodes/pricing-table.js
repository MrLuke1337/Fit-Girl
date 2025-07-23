/* global jQuery */

export default function SUPricingTableShortcode() {
  /*! <fs_premium_only> */
  jQuery(function ($) {
    $(".sue-pricing-table").each(function () {
      var $options = $(this).find(".sue-plan-options");
      var maxHeight = 0;
      $options.each(function () {
        var optionsHeight = $(this).outerHeight();
        if (optionsHeight > maxHeight) maxHeight = optionsHeight;
      });
      $options.css("min-height", maxHeight + "px");
    });
  });
  /*! </fs_premium_only> */
}
