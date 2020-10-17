var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

var questionsBank = document.getElementById("questions");
var timer = document.getElementById("time");
var selections = document.getElementById("selections");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsBank = document.getElementById("initials");
var feedback = document.getElementById("feedback");

var sfxCorrect = new Audio("assets/sfx/correct.wav");
var sfxIncorrect = new Audio("assets/sfx/incorrect.wav");

function quizStart(){
  var startScreen = document.getElementById("start-screen");
  startScreen.setAttribute("class", "hide");
  questionsBank.removeAttribute("class");
  timerId = setInterval(clock, 1000);
  timer.textContent = time;

  pullQuestion()
};
function pullQuestion(){
  var currentQuestions = questions[currentQuestionIndex];
  var questionTitle = document.getElementById("question-title");
  questionTitle.textContent = currentQuestions.questionTitle;
  selections.innerHTML= "";
  currentQuestions.choices.forEach(function(choice, i) {
  
  var selectionMade = document.createElement("button");
  selectionMade.setAttribute("class", "choice");
  selectionMade.setAttribute("value", choice);
  selectionMade.textContent = i + 1 + ". " + choice;
  selectionMade.onclick = questionClick;
  selections.appendChild(selectionMade);
});
function questionClick() {
  if (this.value !== questions[currentQuestionIndex].answer) {
    time -= 15;

  if (time < 0) {
      time = 0;
    }
    timer.textContent = time;

    sfxIncorrect.play();

    feedback.textContent = "Wrong!";
  } else {
    sfxCorrect.play();
    feedback.textContent = "Correct!";
  }
  feedback.setAttribute("class", "feedback");
  setTimeout(function() {
    feedback.setAttribute("class", "feedback hide");
  }, 1000);
  
  currentQuestionIndex++;

  if (currentQuestionIndex === questions.length) {
    endQuiz();
  } else {
    pullQuestion();
  }
}
}
function endQuiz() {
  clearInterval(timerId);
  var endScreen = document.getElementById("end-screen");
  endScreen.removeAttribute("class");
  var finalScore = document.getElementById("final-score");
  finalScore.textContent = time;
  questionsBank.setAttribute("class", "hide");
}

function clock() {
  time--;
  timer.textContent = time;
  if (time <= 0) {
    endQuiz();
  }
}

function saveHighscore() {
  var initials = initialsBank.value.trim();

  if (initials !== "") {
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];
    var newScore = {
      score: time,
      initials: initials
    };
    
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));
    window.location.href = "/assets/highscores.html";
  }
}

function checkForEnter(event) {
  if (event.key === "Enter") {
    saveHighscore();
  }
}
submitBtn.onclick = saveHighscore;

startBtn.onclick = quizStart;

initialsBank.onkeyup = checkForEnter;
