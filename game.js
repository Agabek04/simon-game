var buttonColors = ["red", "green", "blue", "yellow"];
var randomColors;
var gameOver = true;
var isGameAvtive = false;
var level = 0;
var userClickedPattern = [];
var gamePattern = [];

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("h1").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    randomColors = buttonColors[randomNumber];
    gamePattern.push(randomColors);
    pressedClass("#" + randomColors);
    var audio = new Audio("sounds/" + randomColors + ".mp3");
    audio.play();
}

$(document).keypress(function (event) {
    if (gameOver) {
        nextSequence();
        var color = "#" + randomColors;
        pressedClass(color);
        gameOver = false;
        isGameAvtive = true;
    }
});


$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    var audio = new Audio("sounds/" + userChosenColour + ".mp3");
    audio.play();
    pressedClass("#" + userChosenColour);
    checkAnswer(userClickedPattern.length - 1);

});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        var audioGameOver = new Audio("sounds/wrong.mp3");
        audioGameOver.play();
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

      gameOver=true;
      level=0;
      gamePattern=[];
    }
}


function pressedClass(color) {
    $(color).addClass("pressed");
    setTimeout(function () {
        $(color).removeClass("pressed");
    }, 100);
}

