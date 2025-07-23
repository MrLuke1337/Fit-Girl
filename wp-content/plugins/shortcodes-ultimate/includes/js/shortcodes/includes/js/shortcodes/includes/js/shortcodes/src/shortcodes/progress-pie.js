/* global jQuery */

export default function SUProgressPieShortcode() {
  /*! <fs_premium_only> */
  jQuery(function ($) {
    $(".sue-progress-pie").one("inview", function () {
      // Prepare data
      var $pie = $(this);
      var $data = $pie.data();

      // Chart context
      var chartContext = $pie.children("canvas").get(0).getContext("2d");

      // Chart data
      var chartData = [
        {
          value: $data.percent,
          color: $data.fill_color,
        },
        {
          value: 100 - $data.percent,
          color: $data.pie_color,
        },
      ];

      // Chart options
      var chartOptions = {
        segmentShowStroke: false,
        animationEasing: "easeOutQuart",
        percentageInnerCutout: 100 - $data.pie_width,
      };

      // Create chart
      var chart = new Chart(chartContext).Doughnut(chartData, chartOptions);
    });
  });
  /*! </fs_premium_only> */
}
