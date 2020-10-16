// variables to keep track of quiz state
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

// variables to reference DOM elements
var questionsBank = document.getElementById("questions");
var timer = document.getElementById("time");
var selections = document.getElementById("selections");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsBank = document.getElementById("initials");
var feedback = document.getElementById("feedback");

// sound effects
var sfxCorrect = new Audio("assets/sfx/correct.wav");
var sfxIncorrect = new Audio("assets/sfx/incorrect.wav");

function quizStart(){
  var startScreen = document.getElementById("start-screen");
  startScreen.setAttribute("class", "hide");

  questionsBank.removeAttribute("class");
  timerId = setInterval(clockTick, 1000);
  timer.textContent = time;
  pullQuestion()
}
function pullQuestion(){
// get current question object from array
var currentQuestions = questions[currentQuestionIndex];
var questionTitle = document.getElementById("question-title");
questionTitle.textContent = currentQuestions.questionTitle;
selections.innerHTML= "";
// loop over choices
currentQuestions.choices.forEach(function(choice, i) {
  // create new button for each choice
  var selectionMade = document.createElement("button");
  selectionMade.setAttribute("class", "choice");
  selectionMade.setAttribute("value", choice);

  selectionMade.textContent = i + 1 + ". " + choice;

  // attach click event listener to each choice
  selectionMade.onclick = questionClick;

  // display on the page
  selections.appendChild(selectionMade);

});
}
function questionClick() {
  // check if user guessed wrong
  if (this.value !== questions[currentQuestionIndex].answer) {
    // penalize time
    time -= 15;

    if (time < 0) {
      time = 0;
    }

    // display new time on page
    timer.textContent = time;

    // play "wrong" sound effect
    sfxIncorrect.play();

    feedback.textContent = "Wrong!";
  } else {
    // play "right" sound effect
    sfxCorrect.play();

    feedback.textContent = "Correct!";
  }

  // flash right/wrong feedback on page for half a second
  feedback.setAttribute("class", "feedback");
  setTimeout(function() {
    feedback.setAttribute("class", "feedback hide");
  }, 1000);

  // move to next question
  currentQuestionIndex++;

  // check if we've run out of questions
  if (currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    pullQuestion();
  }
}

function quizEnd() {
  // stop timer
  clearInterval(timerId);

  // show end screen
  var endScreen = document.getElementById("end-screen");
  endScreen.removeAttribute("class");

  // show final score
  var finalScore = document.getElementById("final-score");
  finalScore.textContent = time;

  // hide questions section
  questionsBank.setAttribute("class", "hide");
}

function clockTick() {
  // update time
  time--;
  timer.textContent = time;

  // check if user ran out of time
  if (time <= 0) {
    quizEnd();
  }
}

function saveHighscore() {
  // get value of input box
  var initials = initialsBank.value.trim();

  // make sure value wasn't empty
  if (initials !== "") {
    // get saved scores from localstorage, or if not any, set to empty array
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];

    // format new score object for current user
    var newScore = {
      score: time,
      initials: initials
    };

    // save to localstorage
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    // redirect to next page
    window.location.href = "highscores.html";
  }
}

function checkForEnter(event) {
  // "13" represents the enter key
  if (event.key === "Enter") {
    saveHighscore();
  }
}

// user clicks button to submit initials
submitBtn.onclick = saveHighscore;

// user clicks button to start quiz
startBtn.onclick = quizStart;

initialsBank.onkeyup = checkForEnter;