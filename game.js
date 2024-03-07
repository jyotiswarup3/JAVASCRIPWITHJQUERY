var buttonColours = ['red', 'blue', 'green', 'yellow'];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
var high = false;
var highscore = 0;
var img=false;

$(document).click(function () {
  if (!started) {
    $('#level-title').text('Level ' + level);
    nextSequence();
    started = true;
  }
});

function nextSequence() {
  highScore();
  level++;
  var randomno = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomno];
  gamePattern.push(randomChosenColour);
  $('#' + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
  setTimeout(() => {
    $('#level-title').text('Level ' + level);
  }, 500);
}

function checkAnswer(currentLevel) {
  // console.log('user clicked: ' + userClickedPattern);
  // console.log('game pattern ' + gamePattern);
  var level = currentLevel - 1;
  console.log(userClickedPattern[level]);
  if (userClickedPattern[level] == gamePattern[level]) {
    if (userClickedPattern.length == gamePattern.length) {
      console.log('true');
      setTimeout(() => {
        nextSequence();
      }, 1000);
      userClickedPattern.length = 0;
    }
  } else {
    console.log('false');
    gameOver();
    setTimeout(() => {
      gameOver();
    }, 300);
  }
}

$('.btn').on('click', function () {
  var userChosenColour = $(this).attr('id');
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length);
});

function animatePress(currentColour) {
  $('#' + currentColour).addClass('pressed');
  setTimeout(function () {
    $('#' + currentColour).removeClass('pressed');
  }, 100);
}

function playSound(name) {
  //3. Take the code we used to play sound in the nextSequence() function and add it to playSound().
  var audio = new Audio('sounds/' + name + '.mp3');
  audio.play();
}

function gameOver() {
  $('body').addClass('game-over');
  setTimeout(() => {
    $('body').removeClass('game-over');
  }, 200);

  var audio = new Audio('./sounds/wrong.mp3');
  audio.play();

  $('h1').text('Game Over, Press Any Key to Restart');

  startOver();
}

function startOver() {
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  started = false;
}

function highScore() {
  if (level >= highscore) {
    highscore = level;
  }
  $('.high-score').css('display', 'inline');
  $('.high-score').text('High score ' + highscore);
}

$('.img').click(function () {
  hint();
});

function hint() {
  if(!img){
  $('video').removeClass('none');
  $('video').addClass('hint');
  img=true;
  videoPlay();
  }
  else{
  $('video').addClass('none');
  $('video').removeClass('hint');
  img=false;
  videoStop();
  }

}
function videoPlay() {
  let vid =document.querySelector("video");
  vid.play();
}

function videoStop(){
  let vid =document.querySelector("video");
  vid.pause();
  vid.currentTime=0;
}
