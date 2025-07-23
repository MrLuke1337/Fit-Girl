/* global jQuery, Flickity, SUShortcodesL10n */

export default function SUImageCarouselShortcode() {
  window.SUImageCarousel = (function () {
    var self = {
      MFPItems: {},
      MFPL10n: SUShortcodesL10n.magnificPopup,
    };

    self.initGalleries = function () {
      var galleries = document.querySelectorAll(".su-image-carousel");

      Array.prototype.forEach.call(galleries, self.initGallery);
    };

    self.initGallery = function (gallery) {
      if (gallery.classList.contains("su-image-carousel-ready")) {
        return;
      }

      var flickityOptions = JSON.parse(
        gallery.getAttribute("data-flickity-options")
      );

      var flckty = new Flickity(gallery, flickityOptions);

      gallery.removeAttribute("tabindex");

      flckty.on("settle", self.onGallerySettle);

      if (gallery.classList.contains("su-image-carousel-has-lightbox")) {
        flckty.on("staticClick", self.onFlickityStaticClick);
        gallery.addEventListener("click", self.preventGalleryLinkClick);
        gallery.addEventListener("keyup", self.onGalleryKeyUp);

        var galleryID = gallery.getAttribute("id");
        var items = gallery.querySelectorAll(
          ".su-image-carousel-item-content > a"
        );

        self.MFPItems[galleryID] = [];

        Array.prototype.forEach.call(items, function (item, itemIndex) {
          item.setAttribute("data-gallery", galleryID);
          item.setAttribute("data-index", itemIndex);

          self.MFPItems[galleryID].push({
            src: item.getAttribute("href"),
            title: item.getAttribute("data-caption"),
          });
        });
      }

      gallery.classList.add("su-image-carousel-ready");
    };

    self.onFlickityStaticClick = function (
      event,
      pointer,
      cellElement,
      cellIndex
    ) {
      if (!cellElement) {
        return;
      }

      var clickedLink = cellElement.querySelector("a");

      if (!clickedLink) {
        return;
      }

      self.openMagnificPopupFromLink(clickedLink);
    };

    self.onGallerySettle = function (index) {
      var items = this.element.querySelectorAll(".su-image-carousel-item");

      Array.prototype.forEach.call(items, function (item, itemIndex) {
        var link = item.querySelectorAll("a")[0];

        if (!link) {
          return;
        }

        link.setAttribute("tabindex", -1);

        if (item.classList.contains("is-selected")) {
          link.setAttribute("tabindex", 0);
        }
      });
    };

    self.preventGalleryLinkClick = function (e) {
      var clickedLink = self.closest(e.target, function (el) {
        return el.tagName && el.tagName.toUpperCase() === "A";
      });

      if (!clickedLink) {
        return;
      }

      e.preventDefault();
    };

    self.onGalleryKeyUp = function (e) {
      if (!e.keyCode || e.keyCode !== 13) {
        return;
      }

      var clickedLink = self.closest(e.target, function (el) {
        return el.tagName && el.tagName.toUpperCase() === "A";
      });

      if (!clickedLink) {
        return;
      }

      self.openMagnificPopupFromLink(clickedLink);
    };

    self.openMagnificPopup = function (galleryID, itemIndex) {
      jQuery.magnificPopup.open(
        {
          items: self.MFPItems[galleryID],
          type: "image",
          mainClass: "mfp-img-mobile su-image-carousel-mfp",
          gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [1, 1],
            tPrev: self.MFPL10n.prev,
            tNext: self.MFPL10n.next,
            tCounter: self.MFPL10n.counter,
          },
          tClose: self.MFPL10n.close,
          tLoading: self.MFPL10n.loading,
        },
        itemIndex
      );
    };

    self.openMagnificPopupFromLink = function (linkEl) {
      var galleryID = linkEl.getAttribute("data-gallery");
      var itemIndex = parseInt(linkEl.getAttribute("data-index"), 10);

      self.openMagnificPopup(galleryID, itemIndex);
    };

    self.closest = function closest(el, fn) {
      return el && (fn(el) ? el : self.closest(el.parentNode, fn));
    };

    self.ready = function (fn) {
      if (document.readyState !== "loading") {
        fn();
      } else {
        document.addEventListener("DOMContentLoaded", fn);
      }
    };

    return {
      ready: self.ready,
      initGalleries: self.initGalleries,
      initGallery: self.initGallery,
    };
  })();

  jQuery(document).ready(function () {
    window.SUImageCarousel.initGalleries();
  });
}
