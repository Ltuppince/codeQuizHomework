
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
// const highScore = document.getElementById("highScore")
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const status = document.getElementById("status");
const scoreDiv = document.getElementById("scoreContainer");
var name = document.getElementById("name");

let questions = [
    {
        question: "What is string interpolation?",
        choiceA:"A: Changing the value of a variable.",
        choiceB:"B: Using template literals to embed variables into strings.",
        choiceC:"C: Joining multiple strings together using operators like +",

        correct:"B"
    },
    {
        question:"What is the correct way to call a string’s built-in method?",
        choiceA:"A: 'Lorenzo'.toUpperCase();",
        choiceB:"B: toUpperCase('Lorenzo');",
        choiceC:"C: 'Lorenzo'.toUpperCase;",

        correct:"A"
    },
    {
        question:"Which of the following is an example of a single line comment?",
        choiceA:"A: console.log('Is this a comment?');",
        choiceB:"B: console.log()",
        choiceC:"C: // Is this a comment?",

        correct:"C"
    },
    {
        question:"What is the correct way to call the random method on the Math global object?",
        choiceA:"A: random.Math()",
        choiceB:"B: Math(random)",
        choiceC:"C: Math.random()",

        correct:"C"
    },
    {
        question:"What are variables used for in JavaScript?",
        choiceA:"A: For storing or holding data.",
        choiceB:"B: For changing language settings.",
        choiceC:"C: For changing a value’s data type.",

        correct:"A"
    },
    {
        question:"What is the correct way to declare a new variable that you can change?",
        choiceA:"A: myName = 'Sloan';",
        choiceB:"B: let myName = 'Sloan';",
        choiceC:"C: const myName = 'Sloan';",

        correct:"B"
    },
    {
        question:"What is string concatenation?",
        choiceA:"A: When you assign a string to a variable.",
        choiceB:"B: When you change a variable’s value.",
        choiceC:"C: When you join strings together.",

        correct:"C"
    },
    {
        question:"Which of these is returned by operator '&' ?",
        choiceA:"A: Character",
        choiceB:"B: Boolean",
        choiceC:"C: Integer",

        correct:"A"
    },
    {
        question:"Which symbol is used to contain the values of automatically initialized arrays?",
        choiceA:"A: Brackets",
        choiceB:"B: Braces",
        choiceC:"C: Parentheses",

        correct:"B"
    },
    {
        question:"In Java code, the line that begins with /* and ends with */ is known as?",
        choiceA:"A: Single line comment",
        choiceB:"B: Multiline comment",
        choiceC:"C: Both A & B",

        correct:"B"
    }
   
];




const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 15; 
const gaugeWidth = 150; 
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;
var highScore = localStorage.getItem("highScore")



function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click",startQuiz);


function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderStatus();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); 
}


function renderStatus(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        status.innerHTML += "<div class='stat' id="+ qIndex +"></div>";
    }
}



function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            
            clearInterval(TIMER);
            renderScore();
        }
    }
}



function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        
        score++;
        
        answerIsCorrect();
    }else{
        
        
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        
        clearInterval(TIMER);
        renderScore();
    }
}


function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "green";
}


function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "red";
}


function renderScore(){
    scoreDiv.style.display = "block";
    
    
    const scorePerCent = Math.round(100 * score/questions.length);
    
    
    
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";

    localStorage.setItem("highScore",score);
    
}

var highScore = JSON.parse(localStorage.getItem('highScore'));









