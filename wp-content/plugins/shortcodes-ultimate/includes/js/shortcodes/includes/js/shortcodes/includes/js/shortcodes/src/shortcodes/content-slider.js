/* global jQuery */

export default function SUContentSliderShortcode() {
  /*! <fs_premium_only> */
  jQuery(function ($) {
    $(".sue-content-slider").each(function () {
      var $slider = $(this);
      var data = $slider.data();
      var enableAutoPlay = Number.isInteger(data.autoplay) && data.autoplay > 0;

      $slider.children(":not(.sue-content-slide)").remove();

      $slider.owlCarousel({
        items: 1,
        responsive: {},
        loop: true,
        margin: 10,
        autoHeight: data.autoheight === "yes",
        autoplay: enableAutoPlay,
        autoplayTimeout: enableAutoPlay ? data.autoplay : 0,
        autoplayHoverPause: enableAutoPlay,
        nav: data.arrows,
        navText: ["", ""],
        dots: data.pages,
        animateIn: data.animatein,
        animateOut: data.animateout,
      });

      /**
       * Quick fix for OwlCarousel
       *
       * @see  https://github.com/OwlCarousel2/OwlCarousel2/issues/556
       */
      jQuery(window).on("load", function () {
        $slider.trigger("refresh.owl.carousel");
      });
    });

    $(".sue-content-slider").on("click", ".sue-content-slide", function (e) {
      var slider = $(this).parents(".sue-content-slider");
      window.setTimeout(function () {
        slider.trigger("refresh.owl.carousel");
      }, 300);
    });
    $(".sue-content-slider").on("click", function (e) {
      $(this).trigger("stop.owl.autoplay");
    });
  });
  /*! </fs_premium_only> */
}
