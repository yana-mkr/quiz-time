var startButton = document.querySelector("#start-button");
var initialScreen = document.querySelector("#initial-screen");
var questionBox = document.querySelector("#question-box");
var answerBox = document.querySelector("#answer-box");
var feedbackBox = document.querySelector("#feedback-box");
var endScreen = document.querySelector("#end-screen");
var scoreVariable = 0;
var time = 75;
var timeBox = document.querySelector("#timer");
var scoreBox = document.querySelector("#score-box");
var initialsField = document.querySelector("#initials-field");
var submitButton = document.querySelector("#initials");
var finalScreen = document.querySelector("#final-screen");
var highScore = document.querySelector("#initials-field");
var againButton = document.querySelector("#again");
var scoreInitials = document.querySelector("#score-initials");
var list = document.querySelector("#list");

var results = [];

var questions = [
{   q: "_____ JavaScript is also called client-side JavaScript",
        c: ["Microsoft",
            "Navigator",
            "LiveWire",
            "Native"],
    a: "Navigator"
},
{   q: "Which of the following are capabilities of functions in JavaScript?",
        c: ["Return a value",
            "Accept parameters and Return a value",
            "Accept parameters",
            "None of the above"],
    a: "Accept parameters"
},
{   q: "Which of the following is not a valid JavaScript variable name?",
        c: ["2names",
            "_first_and_last_names",
            "FirstAndLast",
            "None of the above"],
    a: "2names"
},
{   q: "Inside which HTML element do we put the JavaScript?",
        c: ["<js>",
            "<scripting>",
            "<script>",
            "<javascript>"],
    a: "<script>"
},
{   q: "JavaScript entities start with _____ and end with _____",
        c: ["Semicolon, colon",
            "Semicolon, Ampersand",
            "Ampersand, colon",
            "Ampersand, semicolon"],
    a: "Ampersand, semicolon"
}
]
//making timerId a global var
var timerId;

function startTimer () {
    timerId = setInterval(timer, 1000)
    timeBox.textContent = "Time Left: " + time
}

function startQuiz() {
    questionBox.innerHTML = "";
    answerBox.innerHTML = "";
    var currentQuestion = questions[scoreVariable];
    var h2 = document.createElement("h2");
    h2.textContent = currentQuestion.q;
    questionBox.append(h2);

    for (var i = 0; i < questions[scoreVariable].c.length; i++) {
        var cButtonEl = document.createElement("button");
        cButtonEl.textContent = questions[scoreVariable].c[i];
        cButtonEl.setAttribute ("value", questions[scoreVariable].c[i])
        cButtonEl.setAttribute ("class", "btn")
        cButtonEl.onclick = checkAnswer;
        answerBox.append(cButtonEl);
    }    
}

function endQuiz() {
    clearInterval(timerId);
    document.querySelector("#initials-field").value
    scoreBox.textContent = ("Your final score is" + " " + time);
    endScreen.setAttribute("class", "show")
    questionBox.setAttribute("class", "hide");
    answerBox.setAttribute("class", "hide");
    feedbackBox.setAttribute("class", "hide");
    timeBox.setAttribute("class", "hide");
    }

function checkAnswer () {
    if (this.value === questions[scoreVariable].a)
    { 
        feedbackBox.textContent = "Correct!"
        //set time out to get it to disappear (optional)
    } else {
        feedbackBox.textContent = "Incorrect..."
        time = time - 10;
    }
    scoreVariable++; 
    //startQuiz ();
    if (scoreVariable === questions.length) {
        //call end endQuiz function ()
        endQuiz();
    } else {
        startQuiz ();
    }
}

function timer () {
    time--;
    timeBox.textContent = "Time Left: " + time
    if ( time <= 0) {
        //call end quiz function
        endQuiz();
    }
}

startButton.addEventListener("click", function() {
    startButton.setAttribute("class", "hide");
    initialScreen.setAttribute("class", "hide");
    questionBox.setAttribute("class", "show");
    answerBox.setAttribute("class", "show");
    startTimer();
})

submitButton.addEventListener("click", function() {
    var initials = highScore.value;
    var score = {initials: initials, time: time}
    results = JSON.parse(localStorage.getItem("results")) || [];
    results.push(score);
    localStorage.setItem("results", JSON.stringify(results));
console.log(results)
    for (var i = 0; i < results.length; i++) {
        var item = document.createElement("li");
        item.textContent = results[i].initials + " " + results[i].time;
        list.appendChild(item)
        list.setAttribute("class", "list")
        //list.textContent = initials + " " + time;
    }


    endScreen.setAttribute("class", "hide")
    finalScreen.setAttribute("class", "show")
} )

startButton.onclick = startQuiz();
