//timer code
//when i click the start quiz time start 50 seconds--
//display at the class timer time:
//when ist zero show timeis up
//show high score
//show start again


//score code
//when its correct +2
//when its wrong -1



//questions here
//and choices with answers




//quiz code
// Quiz questions and answers

var questions = [
  {
    question: "Question 1",
    choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
    correctAnswer: 2
  },
  {
    question: "Question 2",
    choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
    correctAnswer: 1
  },
  // Add more questions here
];

// Global variables
var startButton = document.getElementById("start");
var quizContainer = document.getElementById("quiz");
var questionElement = document.getElementById("question");
var choicesElement = document.getElementById("choices");
var gameOverElement = document.getElementById("game-over");
var scoreElement = document.getElementById("final-score");
var initialsInput = document.getElementById("initials");
var saveScoreButton = document.getElementById("save-score");
var playAgainButton = document.getElementById("play-again-button");
var timeLeftElement = document.getElementById("time-left");

var currentQuestionIndex = 0;
var timeLeft = 60;
var timerInterval;
var score = 0;

// Event listener for start button
startButton.addEventListener("click", startQuiz);

// Event listener for choice buttons
choicesElement.addEventListener("click", selectAnswer);

// Event listener for save score button
saveScoreButton.addEventListener("click", saveScore);

// Event listener for play again button
playAgainButton.addEventListener("click", resetQuiz);

// Starts the quiz
function startQuiz() {
  startButton.style.display = "none";
  quizContainer.style.display = "block";
  timerInterval = setInterval(updateTime, 1000);
  updateTime();
  showQuestion();
}

// Displays a question and its choices
function showQuestion() {
  var question = questions[currentQuestionIndex];
  questionElement.textContent = question.question;

  choicesElement.innerHTML = "";
  question.choices.forEach(function (choice, index) {
    var choiceButton = document.createElement("button");
    choiceButton.setAttribute("class", "choice");
    choiceButton.textContent = choice;
    choicesElement.appendChild(document.createElement("li").appendChild(choiceButton));
  });
}

// Handles the selection of an answer
function selectAnswer(event) {
  var selectedButton = event.target;
  if (!selectedButton.classList.contains("choice")) {
    return;
  }

  var question = questions[currentQuestionIndex];
  var selectedAnswer = Array.from(choicesElement.children).indexOf(selectedButton);

  if (selectedAnswer === question.correctAnswer) {
    score++;
  } else {
    timeLeft -= 10;
    if (timeLeft < 0) {
      timeLeft = 0;
    }
    timeLeftElement.textContent = timeLeft;
  }

  currentQuestionIndex++;
  if (currentQuestionIndex === questions.length) {
    endQuiz();
  } else {
    showQuestion();
  }
}

// Ends the quiz
function endQuiz() {
  clearInterval(timerInterval);
  quizContainer.style.display = "none";
  gameOverElement.style.display = "block";
  scoreElement.textContent = score;
  playAgainButton.style.display = "block";
}

// Resets the quiz
function resetQuiz() {
  gameOverElement.style.display = "none";
  playAgainButton.style.display = "none";
  startButton.style.display = "block";
  currentQuestionIndex = 0;
  timeLeft = 60;
  score = 0;
}

// Saves the score
function saveScore() {
  var initials = initialsInput.value.trim();
  if (initials !== "") {
    // Handle saving the initials and score, e.g., send them to a server or save in local storage
    alert("Score saved!");
  }
}

// Updates the timer
function updateTime() {
  timeLeftElement.textContent = timeLeft;
  if (timeLeft === 0) {
    endQuiz();
  } else {
    timeLeft--;
  }
}