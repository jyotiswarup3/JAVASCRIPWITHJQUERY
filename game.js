var buttonColours=[
    "red", "blue", "green", "yellow"]
var gamePattern=[];
var userClickedPattern = [];
var level=0;
var started = false;

$(document).keypress(function() {
    if (!started) {
    $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });

function nextSequence(){       
var randomno=Math.floor(Math.random()*4);
var randomChosenColour=buttonColours[randomno];
gamePattern.push(randomChosenColour);
$("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
playSound(randomChosenColour);
$("#level-title").text("Level "+level);
level++;
}

$(".btn").on( "click", function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    console.log(userClickedPattern);    

  } );

  function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
      }, 100);
  }


  function playSound(name) {

    //3. Take the code we used to play sound in the nextSequence() function and add it to playSound().
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }


