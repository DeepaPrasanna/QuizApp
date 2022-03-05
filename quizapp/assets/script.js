const questions = [
  {
    questionText: "Commonly used data types DO NOT include:",
    options: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
    answer: "3. alerts",
  },
  {
    questionText: "Arrays in JavaScript can be used to store ______.",
    options: [
      "1. numbers and strings",
      "2. other arrays",
      "3. booleans",
      "4. all of the above",
    ],
    answer: "4. all of the above",
  },
  {
    questionText:
      "String values must be enclosed within _____ when being assigned to variables.",
    options: ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"],
    answer: "3. quotes",
  },
  {
    questionText:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    options: [
      "1. JavaScript",
      "2. terminal/bash",
      "3. for loops",
      "4. console.log",
    ],
    answer: "4. console.log",
  },
  {
    questionText:
      "Which of the following is a statement that can be used to terminate a loop, switch or label statement?",
    options: ["1. break", "2. stop", "3. halt", "4. exit"],
    answer: "1. break",
  },
];

// get all the required elements
const timer = document.getElementsByClassName("timer");
const highScores = document.getElementsByClassName("high-scores");
const questionsAnswers = document.getElementsByClassName("questions");
const allDone = document.getElementsByClassName("all-done");
const startCard = document.getElementsByClassName("start-card");
const startQuiz = document.getElementsByClassName("start-quiz");
const question = document.getElementsByClassName("question");
const option1 = document.getElementById("option1");
const option2 = document.getElementById("option2");
const option3 = document.getElementById("option3");
const option4 = document.getElementById("option4");
const correct = document.getElementsByClassName("correct");
const incorrect = document.getElementsByClassName("incorrect");
const score = document.getElementById("score");
const submitInitial = document.getElementById("submit-initial");
const initial = document.getElementById("initial");
const addHighscores = document.getElementById("add-highscores");
const goBack = document.getElementById("go-back");
const clearHighscores = document.getElementById("clear-highscores");
const leaderboard = document.getElementById("leaderboard");

const MAX_TIME_ALLOTED_TO_SOLVE = 50;

let count = ""; /* timer count */
let storedScore = "";

// hide the timer on load screen for first time
timer[0].style.visibility = "hidden";

const setStartQuiz = () => {
  // hide all the cards except the start quiz card for the first time
  highScores[0].style.display = "none";
  questionsAnswers[0].style.display = "none";
  allDone[0].style.display = "none";
  startCard[0].style.display = "block";
};

const showCorrectOption = () => {
  correct[0].innerHTML = "Correct";
  incorrect[0].innerHTML = "";
};

const showIncorrectOption = () => {
  count = count - 10;
  incorrect[0].innerHTML = "Incorrect";
  correct[0].innerHTML = "";
};

const showNextQuestion = (questionNo) => {
  if (questionNo < questions.length - 1) {
    question[0].innerHTML = questions[questionNo].questionText;
    option1.innerHTML = questions[questionNo].options[0];
    option2.innerHTML = questions[questionNo].options[1];
    option3.innerHTML = questions[questionNo].options[2];
    option4.innerHTML = questions[questionNo].options[3];

    const onClickOptionHandler = (element, questionNo) => {
      if (element.innerHTML === questions[questionNo].answer) {
        showCorrectOption();
      } else {
        showIncorrectOption();
      }
      questionNo++;
      showNextQuestion(questionNo);
    };

    option1.addEventListener("click", () =>
      onClickOptionHandler(option1, questionNo)
    );
    option2.addEventListener("click", () =>
      onClickOptionHandler(option2, questionNo)
    );
    option3.addEventListener("click", () =>
      onClickOptionHandler(option3, questionNo)
    );
    option4.addEventListener("click", () =>
      onClickOptionHandler(option4, questionNo)
    );
  } else {
    showAllDone(count);
  }
};

const showAllDone = (scoreAchieved) => {
  highScores[0].style.display = "none";
  questionsAnswers[0].style.display = "none";
  startCard[0].style.display = "none";
  allDone[0].style.display = "block";
  score.innerHTML = scoreAchieved;
  storedScore = scoreAchieved;
};
const startQuizHandler = () => {
  count = MAX_TIME_ALLOTED_TO_SOLVE;

  // make the timer visible and start the count interval
  timer[0].style.visibility = "visible";
  const timerId = setInterval(() => {
    timer[0].innerHTML = --count;
    if (count === 0 || count < 0) {
      clearInterval(timerId);
      count = 0;
      timer[0].innerHTML = count;
      showAllDone(count);
    }
  }, 1000);

  //   display the questions card and hide other sections
  questionsAnswers[0].style.display = "block";
  startCard[0].style.display = "none";

  // display the questions in the questions card
  let questionNo = 0;
  showNextQuestion(questionNo);
};
const removeAllChildNodes = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};
const retrieveHighscores = () => {
  removeAllChildNodes(addHighscores);
  for (const [key, value] of Object.entries({ ...localStorage })) {
    const node = document.createElement("li");
    const textNode = document.createTextNode(`${key} - ${value}`);
    node.appendChild(textNode);
    addHighscores.appendChild(node);
  }
};

const showHighscores = () => {
  highScores[0].style.display = "block";
  questionsAnswers[0].style.display = "none";
  startCard[0].style.display = "none";
  allDone[0].style.display = "none";
  retrieveHighscores();
};
const onSubmitInitialHandler = () => {
  window.localStorage.setItem(initial.value, storedScore);
  showHighscores();
  retrieveHighscores();
};
const clearHighscoresHandler = () => {
  localStorage.clear();
  retrieveHighscores();
};

setStartQuiz();
startQuiz[0].addEventListener("click", () => startQuizHandler());
submitInitial.addEventListener("click", () => onSubmitInitialHandler());
goBack.addEventListener("click", () => setStartQuiz());
clearHighscores.addEventListener("click", () => clearHighscoresHandler());
leaderboard.addEventListener("click", () => showHighscores());
