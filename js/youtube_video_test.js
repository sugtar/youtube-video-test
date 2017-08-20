// Global
var timer = null;

// YouTube initialization
function onYouTubeIframeAPIReady() {
  player = new YT.Player('ytplayer', {
    height: "240",
    width: "320",
    videoId: "jpLgD_DHEy0",
    playerVars: {"fs": 0},
  });
}

// jQuery initialization≤
$(function(){
  // Button Click Events
  $("#play_button").click(function(e) {
    var playerStatus = player.getPlayerState();
    if (playerStatus == 0 || playerStatus == 3) { // 0: playing, 3: buffering
      return;
    }
    player.playVideo();
    timer = setInterval(function(){
      var currentTime = player.getCurrentTime();
      $("#current_time").text("" + currentTime + " sec");
    }, 500);
  });

  $("#pause_button").click(function() {
    var playerStatus = player.getPlayerState();
    if (playerStatus == 0 || playerStatus == 3) { // 0: playing, 3: buffering
      player.pauseVideo();
      cleanInterval(timer);
      timer = null;
    }
    player.pauseVideo();
  });
});
