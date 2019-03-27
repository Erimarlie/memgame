const main = document.getElementById("memgame");
const numCon = main.getElementsByClassName("numCon");
const item = main.getElementsByTagName("span");
const findCount = main.getElementsByClassName("count");
const right = document.getElementById("correctCount");
const wrong = document.getElementById("wrongCount");
const total = document.getElementById("total");

let branchtest;
let pick = [];
let choice = [];
let correct = [];
let counter = 1;
let wrongAnswer = 0;
let rightAnswer = 0;
const numbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6];

class memoryGames {
    // Constructs and initializes default state of game
    constructor() {
        // Shuffles numbers array
        shuffle(numbers);

        // Reset attempt counters
        wrong.textContent = 0;
        right.textContent = 0;
        total.textContent = 0;

        // console.log(choice.length);
        // console.log(item);
        // console.log(pick.length);
        // console.log(correct.length);

        console.log("Game is on");

        // Adds numbers and displays in boxes, resets all styles 
        // and adds eventlisteners to all boxes
        for (let i = 0; i < numbers.length; i++) {
            numCon[i].removeAttribute("style");
            item[i].removeAttribute("style");
            item[i].style = "opacity: 1";
            item[i].textContent = numbers[i];
            numCon[i].addEventListener("click", rules);
        }

        // Fades out numbers after 5ms
        setTimeout(function () {
            for (let i = 0; i < numbers.length; i++) {
                numCon[i].removeAttribute("style");
                item[i].style = "opacity: 0; transition: 2s ease";
            }
        }, 5);
    }
} // End of memoryGames class

function rules() { // Game rules

    // Pushes current picks through mouseclick eventlistener to a choice array and a pick array
    // Choice-array gets number-values, pick-array by some magic knows specifically which box is picked
    // Compare the pick-array values to make sure that you can't pick the same box twice to cheat the game

    choice.push(this.textContent);
    pick.push(this);

    // Sets style of clicked box to visible
    // and disables pointer-events so you cant click the same box twice
    this.childNodes[1].style = "opacity: 1";
    this.style = "pointer-events: none";

    // console.log(choice);
    // console.log(choice.length);
    // console.log(pick);
    // console.log("Counter " + counter);

    // 2 choices made, and matching numbers in choice-array
    // and not the same pick twice(CORRECT CHOICE)
    if (choice.length == 2 && choice[0] == choice[1] && pick[0] != pick[1]) {
        console.log("Correct");

        // Increment relevant counters
        counter++;
        rightAnswer++;
        correct++;

        // Update textContent to display counts of correct and total attempts
        right.textContent = correct;
        total.textContent = wrongAnswer + correct;

        // Roll rotate-animation on correct picks through picks-array
        for (i = 0; i < pick.length; i++) {
            pick[i].removeEventListener("click", rules);
            pick[i].childNodes[1].removeAttribute("style");
            pick[i].style = "pointer-events: none; animation: rotate 1s; -webkit-animation: rotate 1s ; -webkit-animation: rotate 1s;";
        }

        // console.log([i]);
        console.log([pick]);

        choice = [];
        pick = [];
    }

    // Check choice-array for 2 numbers, 
    // and they do not match(WRONG CHOICE)
    if (choice.length == 2 && choice[0] != choice[1]) {
        console.log("Wrong");
        counter++;
        wrongAnswer++;

        // Update textContent to display counts of wrong and total attempts
        wrong.textContent = wrongAnswer;
        total.textContent = wrongAnswer + correct;


        // Shake picks for being wrong choice and empty arrays
        setTimeout(function () {
            for (i = 0; i < pick.length; i++) {
                pick[i].removeAttribute("style");
                pick[i].style = "animation: shake 0.4s; -webkit-animation: shake 0.4s;";
                pick[i].childNodes[1].style = "opacity: 0; transition-delay: 0; transition: 1s ease;";
            }
            if (i == 2) {
                choice = [];
                pick = [];
            }
        }, 1);
    }

    // 6 matching numbers picked, end of game
    if (correct == 6) {
        // Reset variables
        counter = 1;
        wrongAnswer = 0;
        correct = 0;

        console.log("Game is over!");
        console.log("Correct attempts: " + correct)
        console.log("Wrong attempts: " + wrongAnswer);
        console.log("Total attempts:" + (wrongAnswer + rightAnswer));

        // Resets style of boxes
        for (i = 0; i < 12; i++) {
            // console.log("game over loop fired");
            numCon[i].removeAttribute("style");
        }
        correct = [];
        // console.log("correctArray is empty");
        if (i == 12) {
            myLoop();
        }
    }

    // Roll winner animation in sequence with a small delay
    let j = 0;
    function myLoop() {
        setTimeout(function () {
            numCon[j].style = "transition: 2s ease; background-color: red; animation: rotate 1s";
            j++;
            if (j < 12) {
                myLoop();
            }
        }, 50)
    }
} //End of rules()

// Shuffle function for shuffling numbers-array
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
}