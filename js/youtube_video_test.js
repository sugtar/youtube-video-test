// Global
var timer = null;
var isYoutubeAPIReady = false;

// YouTube initialization
function onYouTubeIframeAPIReady() {
  isYoutubeAPIReady = true;
}

// jQuery initialization≤
$(function(){
  // Button Click Events
  var setPlayButton = function(player) {
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
  };

  var setPauseButton = function(player) {
    $("#pause_button").click(function() {
      var playerStatus = player.getPlayerState();
      if (playerStatus == 0 || playerStatus == 3) { // 0: playing, 3: buffering
        player.pauseVideo();
        cleanInterval(timer);
        timer = null;
      }
      player.pauseVideo();
    });
  };

  $("#set_video_id").click(function(){
    var videoId = $("#video_id").val();
    console.log("VIDEO ID: " + videoId);
    another_player = createPlayer(videoId);
  });

  var createPlayerWrapper = function(videoId) {
    return function() {
      createPlayer(videoId);
    };
  };

  var createPlayer = function(videoId) {
    if (!isYoutubeAPIReady) {
      console.log("createPlayer");
      setTimeout(createPlayerWrapper(videoId), 1000);
      return;
    }
    var player = new YT.Player('ytplayer', {
      "height": "240",
      "width": "320",
      "videoId": videoId,
      "playerVars": {"fs": 0},
    });
    setPlayButton(player);
    setPauseButton(player);
    return player;
  };
});
