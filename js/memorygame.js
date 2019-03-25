const main = document.getElementById("memgame");
const numCon = main.getElementsByClassName("numCon");
const item = main.getElementsByTagName("span");
const findCount = main.getElementsByClassName("count");
let choice = [];
let pick = [];
let counter = 1;
let correct = [];
const numbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6];

class memoryGames {
  constructor() {
    choice = [];
    pick = [];
    // counter = 1;
    correct = [];
    
     // Shuffles numbers array
    shuffle(numbers);
  
    // console.log(choice.length);
    // console.log(item);
    // console.log(pick.length);
    // console.log(correct.length);
    console.log("Game is on");
  
    // Adds numbers, removes styles and adds eventlisteners
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
} // End of memoryGame class

function rules() {
  choice.push(this.textContent);
  pick.push(this);
  // console.log(choice);
  // console.log(choice.length);
  // console.log(pick);
  console.log("Counter " + counter);

  this.childNodes[1].style = "opacity: 1";
  this.style = "pointer-events: none";

  // 2 choices and matching numbers and not the same pick twice (CORRECT CHOICE)
  if (choice.length == 2 && choice[0] == choice[1] && pick[0] != pick[1]) {
    console.log("Correct");
    counter++;
    correct++;
    for (i = 0; i < pick.length; i++) {
      pick[i].removeEventListener("click", rules);
      pick[i].childNodes[1].removeAttribute("style");
      pick[i].style = "pointer-events: none; animation: rotate 1s; -webkit-animation: rotate 1s ; -webkit-animation: rotate 1s;";
    }
    // console.log([i]);
    // console.log([pick]);
    choice = [];
    pick = [];
  }
  
  // 2 choices and not matching numbers (WRONG CHOICE)
  if (choice.length == 2 && choice[0] != choice[1]) {
    console.log("Wrong");
    counter++;
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

  //6 matching numbers picked
  if (correct == 6) {
    counter++;
    console.log("Game is over!");
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

  let j = 0;
  function myLoop () {
    setTimeout(function () {
      numCon[j].style = "transition: 2s ease; background-color: red; animation: rotate 1s";
      j++;
      if (j < 12) {
        myLoop();
      }
    }, 50)
  }
} //End of rules()

function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
}