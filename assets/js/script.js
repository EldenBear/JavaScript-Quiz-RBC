var timeRemaining = 0;
var isQuizDone = false;
// var array that houses all questions and answers
var questions = [
    {
    question: "Inside which HTML element do we put the JavaScript?",    
    answer1: "A. <javascript>",
    answer2: "B. <js>",
    answer3: "C. <scripting>",
    answer4: "D. <script>",
    correct: "answer4"
},
{
    question: "How do you write 'Hello World' in an alert box?",    
    answer1: "A. msg('Hello World')",
    answer2: "B. alert('Hello World')",
    answer3: "C. msgBox('Hello World')",
    answer4: "D. alertBox('Hello World')",
    correct: "answer2"
},
{
    question: "Which event occurs when the user clicks on a HTML element?",    
    answer1: "A. onchange",
    answer2: "B. onclick",
    answer3: "C. onmouseclick",
    answer4: "D. onmouseover",
    correct: "answer2"
},
{
    question: "What is the correct way to write a JavaScript array?",    
    answer1: "A. var colors = 1 = ('red'), 2 = ('green'), 3 = ('blue')",
    answer2: "B. var colors = (1:red, 2:blue, 3:yellow)",
    answer3: "C. var colors = ['red', 'blue', 'yellow']",
    answer4: "D. var colors = 'red', 'green', 'blue'",
    correct: "answer3"
},
{
    question: "How can you add a comment in JavaScript?",    
    answer1: "A. //This is a comment",
    answer2: "B. 'This is a comment'",
    answer3: "C. /'This is a comment",
    answer4: "D. <!--This is a comment-->",
    correct: "answer1"
},
{
    question: "How can you write an IF statement in JavaScript?",    
    answer1: "A. if i = 5 then",
    answer2: "B. if(i == 5)",
    answer3: "C. if i = 5",
    answer4: "D. if i == 5",
    correct: "answer2"
},
{
    question: "How do you call a function named 'myFunction'?",    
    answer1: "A. call function myFunction()",
    answer2: "B. fun myFunction()",
    answer3: "C. call myFunction()",
    answer4: "D. myFunction()",
    correct: "answer4"
},
{
    question: "How do you round a number to the nearest integer?",    
    answer1: "A. Math.rnd()",
    answer2: "B. rnd()",
    answer3: "C. round()",
    answer4: "D. Math.round()",
    correct: "answer4"
},
{
    question: "How does a WHILE loop start?",    
    answer1: "A. while (i <= 10)",
    answer2: "B. while i = 1:10",
    answer3: "C. while (i <= 10; i++)",
    answer4: "D. while i && 10",
    correct: "answer1"
},
{
    question: "How do you find the number with the highest value of x and y?",    
    answer1: "A. ceil(x,y)",
    answer2: "B. Math.max(x,y)",
    answer3: "C. top(x,y)",
    answer4: "D. Math.ceil(x,y)",
    correct: "answer2"
},
];

var currentQuestion = 0;

function onClickStart() {
    const startButton = document.getElementById("start-button");
    startButton.style.display = "none";
    const explination = document.getElementById("explination");
    explination.style.display = "none";
    const answerButtons = document.getElementsByClassName("button-style");
    for (let index = 0; index < answerButtons.length; index++) {
        const element = answerButtons[index];
        element.style.display = "grid";
    }
    const questionButton = document.getElementById("begin-quiz");
    questionButton.style.display = "none";
    const quizAppear = document.getElementById("quiz-questions");
    quizAppear.style.display = "grid";
    setUpQuestions();
    setUpTimer();
}

// function that sets up correct or incorrect inputs and decrements timer by 10 seconds if wrong
function answerButtons(answerChoice) {
    var rWchoice = questions[currentQuestion];

    currentQuestion = currentQuestion + 1;
    const rightWrong = document.getElementById("rOw");
    rightWrong.style.display = "block";
    if (answerChoice === rWchoice.correct) {
        rightWrong.innerHTML = "Correct!";
    } else{
        rightWrong.innerHTML = "Incorrect!";
        timeRemaining = timeRemaining - 10;
    }
    setUpQuestions();
}

function setUpQuestions() {
    if (currentQuestion === 10) {
        finishQuiz();
    } else {
        var current =  questions[currentQuestion];
        var askQuestion = document.getElementById("quiz-questions");
        askQuestion.innerHTML = current.question;
        var buttonOne = document.getElementById("first-button");
        buttonOne.setAttribute("value", current.answer1);
        var buttonTwo = document.getElementById("second-button");
        buttonTwo.setAttribute("value", current.answer2);
        var buttonThree = document.getElementById("third-button");
        buttonThree.setAttribute("value", current.answer3);
        var buttonFour = document.getElementById("fourth-button");
        buttonFour.setAttribute("value", current.answer4);
    }
}

// function for timer
function setUpTimer() {
  timeRemaining = 75;
  var timer = document.getElementById("timer");
  var timeInterval = setInterval(function () {
    if (isQuizDone) {
        clearInterval(timeInterval);
        return;
    }

    if (timeRemaining > 1) {
        timer.innerHTML = "Time: " + timeRemaining;
        timeRemaining--;
    } else {
        clearInterval(timeInterval);
        finishQuiz();
    }
  }, 1000);
}
// function for page after quiz where you submit initials and get taken to high score page
function onClickSubmitButton() {
    const donePage = document.getElementById("done-page");
    donePage.style.display = "none";
    const highScorePage = document.getElementById("high-score-page");
    highScorePage.style.display = "block";
    const initialInput = document.getElementById("input-box");
    var highScore = {
        initials: initialInput.value,
        score: timeRemaining,
    };
    var highScores = [highScore];
    const previousHighScores = JSON.parse(localStorage.getItem("highScores"));
    var combinedHighScores = [];
    if (previousHighScores !==null) {
        combinedHighScores = previousHighScores.concat(highScores);
    }else{
        combinedHighScores = highScores;
    }
    
    localStorage.setItem("highScores", JSON.stringify(combinedHighScores));

    var scores = document.getElementById("score-display");
    scores.innerHTML = "";

    for (let index = 0; index < combinedHighScores.length; index++) {
        const element = combinedHighScores[index];
        var newScoreDiv = document.createElement("div");
        newScoreDiv.textContent = element.initials + ": " + element.score;
        scores.appendChild(newScoreDiv);
    }
}

function onClickBackButton() {
    const highScorePage = document.getElementById("high-score-page");
    highScorePage.style.display = "none";
    const startButton = document.getElementById("start-button");
    startButton.style.display = "block";
    const questionButton = document.getElementById("begin-quiz");
    questionButton.style.display = "grid";
    const explination = document.getElementById("explination");
    explination.style.display = "block";
    currentQuestion = 0;
    isQuizDone = false;
    const highScoreButton = document.getElementById("high-score-button");
    highScoreButton.style.display = "block";
}

function onClickHighScoreButton() {
    const startButton = document.getElementById("start-button");
    startButton.style.display = "none";
    const answerButtons = document.getElementsByClassName("button-style");
    for (let index = 0; index < answerButtons.length; index++) {
        const element = answerButtons[index];
        element.style.display = "none";
    }
    const questionButton = document.getElementById("begin-quiz");
    questionButton.style.display = "none";
    const quizAppear = document.getElementById("quiz-questions");
    quizAppear.style.display = "none";
    const donePage = document.getElementById("done-page");
    donePage.style.display = "none";
    const highScorePage = document.getElementById("high-score-page");
    highScorePage.style.display = "block";

    const highScores = JSON.parse(localStorage.getItem("highScores"));
    if (highScores !== null) {
        var scores = document.getElementById("score-display");
        scores.innerHTML = "";
        for (let index = 0; index < highScores.length; index++) {
            const element = highScores[index];
            var newScoreDiv = document.createElement("div");
            newScoreDiv.textContent = element.initials + " " + element.score;
            scores.appendChild(newScoreDiv);
        }
    }
}

function onClickClearButton() {
    localStorage.setItem("highScores", null);
    var scores = document.getElementById("score-display");
    scores.innerHTML = "";
}

function finishQuiz(){
    timer.innerHTML = "Time: 0";
    const answerButtons = document.getElementsByClassName("button-style");
    for (let index = 0; index < answerButtons.length; index++) {
        const element = answerButtons[index];
        element.style.display = "none";
    }
    const quizAppear = document.getElementById("quiz-questions");
    quizAppear.style.display = "none";
    const rightWrong = document.getElementById("rOw");
    rightWrong.style.display = "none";
    const donePage = document.getElementById("done-page");
    donePage.style.display = "block";
    const scoreText = document.getElementById("show-final-score");
    scoreText.innerHTML = "Your final score is: " + timeRemaining;
    const highScoreButton = document.getElementById("high-score-button");
    highScoreButton.style.display = "none";
    isQuizDone = true;
    }