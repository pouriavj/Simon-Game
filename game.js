var userClickedPattern = [];
var gamePattern = [];
var gameStart = 0 ;
var level = 0 ;
var buttonColours = ["red", "blue", "green", "yellow"];
var a = 0 ;




$(".btn").click(function(event){

  var userChosenColour = event.currentTarget.id ;
  userClickedPattern.push(userChosenColour);
  console.log (userClickedPattern);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern);

})
function playSound(name){
  var audio = new Audio ("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");
  setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}
$(document).keydown(function(){
   if (gameStart === 0) {
     nextSequence();
     gameStart++;
   }

})
function checkAnswer (currentLevel){
  for (var i = 0; i < userClickedPattern.length; i++) {


    if (userClickedPattern[i] !== gamePattern[i]){
      a++;
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
      $("h1").text("Game Over, Press Any Key to Restart");
      startOver();
      }

    }
    if (a === 0 && userClickedPattern.length === gamePattern.length) {

      setTimeout(function () {
        nextSequence();
      }, 1000);

    }

  }


function nextSequence(){
  var randomNumber = Math.floor(4 * Math.random());

  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $(".btn#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);


  level++;
  $("h1").text("Level " + level);
  userClickedPattern = [];


}

function startOver(){
  gamePattern = [];
  gameStart = 0 ;
  level = 0 ;
  a = 0 ;

}
