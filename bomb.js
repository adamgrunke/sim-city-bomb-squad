//Variables

const STARTING_TIME = 30;
var gaemOver = false;
var remainingTime = 0;
var delayHandle = null;
var timerHandle = null;

var wiresToCut = [];
var wiresCut = {
    blue: false,
    green: false,
    red: false,
    white: false,
    yellow: false
}

//DOM References
var timerText;
var startButton;
var resetButton;
var blue;
var green;
var red;
var white;
var yellow;
var wireBox;

//Event Listeners
document.addEventListener("DOMContentLoaded", function(e){
    timerText = document.getElementById("timertext");
    startButton = document.getElementById("start");
    resetButton = document.getElementById("reset");
    blue = document.getElementById("blue");
    green = document.getElementById("green");
    red = document.getElementById("red");
    white = document.getElementById("white");
    yellow = document.getElementById("yellow");
    wireBox = document.getElementById("wirebox");

    startButton.addEventListener('click', function(e){
        console.log('clicked start');
        timerHandle = setInterval(updateClock, 1000);
    });

    resetButton.addEventListener('click', function(e){
        console.log('clicked reset');
        reset();
    });

    wireBox.addEventListener('click', function(e){
        if (!wiresCut[e.target.id] && !gameOver) {
            // change the image
            e.target.src = "img/cut-" + e.target.id + "-wire.png";
            // mark the wire as cut
            wiresCut[e.target.id] = true;
            // was it correct?
            var wireIndex = wiresToCut.indexOf(e.target.id) 
            if (wireIndex > -1) {
                // correct
                console.log(e.target.id + " was correct")
                wiresToCut.splice(wireIndex, 1);
                // Here we will check for win.
                if (checkForWin()) {
                    endGame(true);
                }
            } else {
                // incorrect
                console.log(e.target.id + " was incorrect")
                delayHandle = setTimeout(function(){
                    //end the game with a loss.
                    console.log("bang");
                    endGame(false);
                }, 750);
            }
        }
    });
});

// Functions

function checkForWin() {
    return wiresToCut.length ? false : true;
}

function endGame(win) {
    // clear timers
    clearTimeout(delayHandle);
    clearInterval(timerHandle);
    gameOver = true;
    resetButton.disabled = false;
    if(win){
        console.log("You saved the city!");
        timerText.classList.remove('red');
        timerText.classList.add('green');
        // trigger win sounds
    } else {
        console.log("boom");
        document.body.classList.remove('unexploded');
        document.body.classList.add('exploded');
    }
}

function updateClock(){
    remainingTime--;
    if (remainingTime <= 0) {
        endGame(false);
    }
    timerText.textContent = "0:00:" + remainingTime;
}

function initGame() {
    timerText.textContent = "0:00:" + remainingTime;
    wiresToCut.length = 0;
    remainingTime = STARTING_TIME;
    for (let wire in wiresCut) {
        console.log(wire);
        var rand = Math.random();
        if (rand > 0.5) {
            wiresToCut.push(wire);
        }
    }
    console.log(wiresToCut);
    resetButton.disabled = true;
    startButton.disabled = false;
}

function reset() {
    gameOver = false;
    var wireImages = wireBox.children;
    for (let i = 0; i < wireImages.length; i++){
        wireImages[i].src = "img/uncut-" + wireImages[i].id + "-wire.png";
    }
    document.body.classList.remove("exploded");
    document.body.classList.add("unexploded");
    timerText.classList.remove('green');
    timerText.classList.add('red');
    clearTimeout(delayHandle);
    clearInterval(timerHandle);
    for (let wire in wiresCut) {
        wiresCut[wire] = false;
    }
    initGame();
}