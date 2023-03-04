// Questions List
const questions = [
	{
		q: "You're really busy at work and a colleague is telling you their life story and personal woes. You:",
		choices: [
			{ option: "Don't dare to interrupt them", value: 1 },
			{ option: "Think it's more important to give them some of your time; work can wait", value: 2 },
			{ option: "Listen, but with only with half an ear", value: 3 },
			{ option: "Interrupt and explain that you are really busy at the moment", value: 4 }
		]
	},
	{
		q: "You've been sitting in the doctor's waiting room for more than 25 minutes. You:",
		choices: [
			{ option: "Look at your watch every two minutes", value: 1 },
			{ option: "Bubble with inner anger, but keep quiet", value: 2 },
			{ option: "Explain to other equally impatient people in the room that the doctor is always running late", value: 3 },
			{ option: "Complain in a loud voice, while tapping your foot impatiently", value: 4 }
		]
	},
	{
		q: "You're having an animated discussion with a colleague regarding a project that you're in charge of. You:",
		choices: [
			{ option: "Don't dare contradict them", value: 1 },
			{ option: "Think that they are obviously right", value: 2 },
			{ option: "Defend your own point of view, tooth and nail", value: 3 },
			{ option: "Continuously interrupt your colleague", value: 4 }
		]
	},
	{
		q: "You are taking part in a guided tour of a museum. You:",
		choices: [
			{ option: "Are a bit too far towards the back so don't really hear what the guide is saying", value: 1 },
			{ option: "Follow the group without question", value: 2 },
			{ option: "Make sure that everyone is able to hear properly", value: 3 },
			{ option: "Are right up the front, adding your own comments in a loud voice", value: 4 }
		]
	},
	{
		q: "During dinner parties at your home, you have a hard time with people who:",
		choices: [
			{ option: "Ask you to tell a story in front of everyone else", value: 1 },
			{ option: "Talk privately between themselves", value: 2 },
			{ option: "Hang around you all evening", value: 3 },
			{ option: "Always drag the conversation back to themselves", value: 4 }
		]
	}
];

// Define the variables
let currentQuestion = 0;
let score = [];

// Settings up variables
const welcomePage = document.getElementById("welcome-page");
const startButton = document.getElementById("start-btn");
const quizPage = document.getElementById("quiz-page");
const question = document.getElementById("question");
const choices = document.getElementById("choices");
const nextButton = document.getElementById("next-btn");
const prevButton = document.getElementById("prev-btn");
const resultPage = document.getElementById("result-page");
const scoreText = document.getElementById("score");
const restartButton = document.getElementById("restart-btn");

// Hide the quiz and result pages
quizPage.style.display = "none";
resultPage.style.display = "none";

// Add event listeners to the buttons
startButton.addEventListener("click", startQuiz);
choices.addEventListener("click", disableNav);
nextButton.addEventListener("click", nextQuestion);
prevButton.addEventListener("click", prevQuestion);
restartButton.addEventListener("click", restartQuiz);

// Function to start the quiz
function startQuiz() {
	welcomePage.style.display = "none";
	quizPage.style.display = "block";
	showQuestion();
}

// Function to show the current question
function showQuestion() {
	question.textContent = questions[currentQuestion].q;
	choices.innerHTML = "";
	for (let i = 0; i < questions[currentQuestion].choices.length; i++) {
		const choice = document.createElement("input");
		const choiceText = document.createElement("label");

		choice.setAttribute("value", questions[currentQuestion].choices[i].value );
		choice.setAttribute("type", "radio" );
		choice.setAttribute("id", `question${currentQuestion}-${i}` );
		choice.setAttribute("name", `question${currentQuestion}` );

		choiceText.htmlFor = `question${currentQuestion}-${i}`;
		choiceText.textContent = questions[currentQuestion].choices[i].option;

		choices.append(choice, choiceText);
	}
}

//Function to check if it should disable Next button
function disableNav(){
	let allOptions = choices.querySelectorAll("input");
	for( i = 0; i < allOptions.length; i++ ) {
		if( allOptions[i].checked ){
			nextButton.removeAttribute("disabled");
			return;
		}
	}

	nextButton.setAttribute("disabled", true);
}

// Function to show the result
function showResult() {
	quizPage.style.display = "none";
	resultPage.style.display = "block";

	let totalScore = 0;
	for( i = 0; i < score.length; i++ ){
		totalScore = totalScore + score[i];
	}

	if( totalScore > 15 ) {
		scoreText.textContent = "You're probably an Extrovert!";
	} else if( totalScore <= 15 && totalScore > 10 ){
		scoreText.textContent = "You're something in between an Extrovert and Introvert!";
	} else {
		scoreText.textContent = "You're probably an Introvert!";
	}
}

// Function to restart the quiz
function restartQuiz() {
	currentQuestion = 0;
	score = [];
	quizPage.style.display = "block";
	resultPage.style.display = "none";
	prevButton.setAttribute("disabled", true);
	nextButton.setAttribute("disabled", true);
	showQuestion();
}

// Function to go to the next question
function nextQuestion(){
	//Update the score
	let selected = document.querySelector("input:checked").value;
	selected = parseInt( selected );
	score.splice( currentQuestion, 1, selected );

	//Show next question
	currentQuestion++;
	if (currentQuestion < questions.length) {
		showQuestion();
	} else {
		showResult();
	}
	prevButton.removeAttribute("disabled");

	//Check if already checked
	let allOptions = choices.querySelectorAll("input");
	if( score[currentQuestion] !== undefined ) {
		allOptions[currentQuestion].setAttribute("checked", "checked");
	}

	//Check if Next button should be disabled
	disableNav();
}

//Function to go to the previous question
function prevQuestion(){
	currentQuestion--;
	showQuestion();
	nextButton.removeAttribute("disabled");

	let allOptions = choices.querySelectorAll("input");
	if( currentQuestion === 0 ){
		prevButton.setAttribute("disabled", true);
	}

	let prevQuestionScore = score[currentQuestion] - 1;
	allOptions[prevQuestionScore].setAttribute("checked", "checked");
}