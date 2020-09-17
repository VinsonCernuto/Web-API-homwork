// Hook elements from the page (i.e var exampleEl = document.querySelctor(".elementClass"))
// - hook question container element
var displayQuestionEL = document.querySelector(".display-question");
// - hook timer element 
var timerEl = document.querySelector(".timer");
var resultsEl = document.querySelector(".results");

// Create dynamic elements (i.e exampleDynamicEl = documents.createElement("button"))
// - create h3 to show instrustions text and questions
var mainDisplay = document.createElement("h3");
// - Create button to start quiz
var startBtn = document.createElement("button")

// Declare global variables
// - varible to store timer number
var timer = 75; 
// - variable to store current index
var index = 0; 

//****FUNCTIONS****/

// function that loads content when the page first loads
// function that show the question and starts the timer 
// function that handles the timer 
// function that handles and display the next question
//funstion to check the answer and display to following question

// function that loads content when the page first loads 
function openingPage() {
    // add text to h3 element
    mainDisplay.textContent = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!"
    // add text to button
    startBtn.textContent = "Start"
    // Apend text and button to question container
    displayQuestionEL.append(mainDisplay, startBtn)
}


// function that shows the question and starts the timer
function startQuiz() {
    // show timer function
    showTimer()
    // call next timer question function
    nextQuestion()
}

// function that handles the timer
function showTimer(){
    // display timer to screen
    timerEl.textContent = timer;
    // create setInterval and store it to a variable
    var questionTimer= setInterval(function () {
        // decrease timer by 1
        timer--
        // display timer to screen 
        timerEl.textContent = timer;
        // if timer goes down to 0, clear interval
        if (timer <= 0) {
            clearInterval(questionTimer);   
        }
    }, 1 * 1000)  
}

// function that handles and display the next question
function nextQuestion() {
    // declare a variable to store current question. Assign the current question.
    var currentQuestion = questions[index];
    // console.log current question
    console.log(currentQuestion);
    // empty question container element; 
    displayQuestionEL.textContent = "";
    // add current question title to the text display variable
    mainDisplay.textContent = currentQuestion.title;
    // append the main txt display variable to the question container element
    displayQuestionEL.append(mainDisplay);
    // create a div element to wrap the "chioces"
    var chiocesContainer = document.createElement("button");
    // use a loop to :
    for (let i = 0; i < currentQuestion.choices.length; i++) {
    
        // - create button elements for each choice
        var choiceBtn = document.createElement("button"); 
        // - add text to each button from the question choices
        choiceBtn.textContent = currentQuestion.choices[i];
        // - add a click event listener to button to check answers 
        choiceBtn.addEventListener("click", checkAnswer);
        // - append buttons to div elements to the question container element
        chiocesContainer.append(choiceBtn)

    }

    // - append buttons to div elements to the question container element
    displayQuestionEL.append(chiocesContainer)
}

// function to check the answer and display to following question
function checkAnswer(event) {
    
    //******LOGIC TO CHECK FOR RIGHT ANSWER */
    var responseText = event.target.textContent;
    console.log(responseText);

    if (responseText === questions[index].answer) {
        alert("correct");
        console.log("correct");
    } else {
        alert("incorrect");
        setTimeout(() => {
            timer -= 10;
            if (timer <= 0) {
                timer = 0
            }
            endGame()
        })
        console.log("incorrect");
    }

    // increase index by 1
    index++;
    // show next question
    nextQuestion();
}

//end game
const endGame = () => {
    displayScorecard();
    $("#nameSubmit").on("click", handleImputSubmit);
}

//show player score
const displayScorecard = () => {
    $(".quiz").hide();
    $(".scores").hide();
    $(".time").hide();

    $(".score_card").html(
        `<div class="card score">
        <h1 class="title text-white text-center pt-5 pb-3 pl-4 pr-4">Quiz Scorecard</h1>
        <div class="card-header">
          <p class="result py-4">Score: ${gameTime}</p>
        </div>
        <ul class="list-group list-group-horizontal">
          <li class="list-group-item">${wrong}</li>
          <li class="list-group-item">${correct}</li>
          <li class="list-group-item">${(correct / total * 100).toFixed(0)}%</li>
        </ul>
      </div>
      <div class="input-group mt-5">
        <input type="text" class="form-control player" placeholder="Initials" aria-label="Username" aria-describedby="basic-addon1">
        <div class="input-group-append">
          <button class="btn btn-outline-success" type="button" id="nameSubmit">Submit</button>
        </div>
      </div>`); 
            
            
}

// Save players score to LocalStorage
const saveToLocalStorage = (player) => {
    if (localStorage.getItem('players') === null) {
        const players = [];
        players.push(player);
        localStorage.setItem('players', JSON.stringify(players));
    } else{
        const players = JSON.parse(localStorage.getItem('players'));
        players.push(player);
        localStorage.setItem('players', JSON.stringify(players));
    } 
 }
// Add event listener to start quiz
startBtn.addEventListener("click", startQuiz)
// Call function to show opening page 
openingPage();
