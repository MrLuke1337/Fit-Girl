export default function SUPlayersShortcodes() {
  jQuery(document).ready(function ($) {
    // Audio player
    $(".su-audio").each(function () {
      // Prepare data
      var $this = $(this);
      var id = $this.data("id");
      var selector = "#" + id;
      var $player = $(selector);
      var audio = $this.data("audio");
      var swf = $this.data("swf");
      // Init jPlayer
      $player.jPlayer({
        ready: function (e) {
          // Set media
          $player.jPlayer("setMedia", {
            mp3: audio,
          });
          // Autoplay
          if ($this.data("autoplay") === "yes") $player.jPlayer("play");
          // Loop
          if ($this.data("loop") === "yes") {
            $player.bind($.jPlayer.event.ended + ".repeat", function () {
              $player.jPlayer("play");
            });
          }
        },
        cssSelectorAncestor: selector + "_container",
        volume: 1,
        keyEnabled: true,
        smoothPlayBar: true,
        swfPath: swf,
        supplied: "mp3",
      });
    });
    // Video player
    $(".su-video").each(function () {
      // Prepare data
      var $video = $(this);
      var id = $video.attr("id");
      var $player = $("#" + id + "_player");
      var file = $video.data("video");
      var swf = $video.data("swf");
      var poster = $video.data("poster");
      var size = {
        width: $player.width(),
        height: $player.height(),
      };
      // Init jPlayer
      $player.jPlayer({
        ready: function (e) {
          // Set media
          $player.jPlayer("setMedia", {
            mp4: file,
            flv: file,
            poster: poster,
          });
          // Autoplay
          if ($video.data("autoplay") === "yes") $player.jPlayer("play");
          // Loop
          if ($video.data("loop") === "yes") {
            $player.bind($.jPlayer.event.ended + ".repeat", function () {
              $player.jPlayer("play");
            });
          }
        },
        cssSelector: {
          gui: ".jp-gui, .jp-title",
        },
        size: size,
        cssSelectorAncestor: "#" + id,
        volume: 1,
        keyEnabled: true,
        smoothPlayBar: true,
        swfPath: swf,
        supplied: "mp4, flv",
      });
    });
  });
}
