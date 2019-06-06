//Variables

const STARTING_TIME = 30;
var gaemOver = false;
var remainingTime = 0;
var delayHandle = null;
var timerHandle = null;

var wiresToCut = [];

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
    });

    resetButton.addEventListener('click', function(e){
        console.log('clicked reset');
    });

    wireBox.addEventListener('click', function(e){
        console.log(e.target.id);
    });
});