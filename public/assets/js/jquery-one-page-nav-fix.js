// Fix for jQuery One Page Nav plugin to handle missing elements gracefully
(function ($) {
  "use strict";

  // Override the scrollTo method to handle undefined elements
  if ($.fn.onePageNav) {
    // Store the original method
    var originalOnePageNav = $.fn.onePageNav;

    // Override with error handling
    $.fn.onePageNav = function (options) {
      return this.each(function () {
        var $this = $(this);

        // Check if navigation links exist and are hash-based
        var $navLinks = $this.find('a[href*="#"]');
        if ($navLinks.length === 0) {
          console.warn(
            "OnePageNav: No hash-based navigation links found, skipping initialization"
          );
          return;
        }

        // Check if target sections exist
        var validLinks = false;
        $navLinks.each(function () {
          var href = $(this).attr("href");
          if (href && href.indexOf("#") !== -1) {
            var hash = href.split("#")[1];
            if (hash && $("#" + hash).length > 0) {
              validLinks = true;
              return false; // break loop
            }
          }
        });

        if (!validLinks) {
          console.warn(
            "OnePageNav: No valid target sections found, skipping initialization"
          );
          return;
        }

        // If we have valid links and targets, proceed with original initialization
        return originalOnePageNav.call($this, options);
      });
    };
  }

  // Additional safety check for offset calculations
  var originalOffset = $.fn.offset;
  $.fn.offset = function () {
    if (this.length === 0) {
      console.warn("jQuery offset called on empty element set");
      return { top: 0, left: 0 };
    }
    return originalOffset.apply(this, arguments);
  };
})(jQuery);
