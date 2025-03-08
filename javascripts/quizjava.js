const questions = [
    {
        question: "What percentage of the Earth's water is fresh and accessible for humans?",
        options: ["2.5%", "10%", "25%", "50%"],
        answer: 0
    },
    {
        question: "Which of these diseases is commonly caused by unsafe water?",
        options: ["Malaria", "Cholera", "Tuberculosis", "Influenza"],
        answer: 1
    },
    {
        question: "How many people lack access to safely managed drinking water according to the UN in 2022?",
        options: ["2.2 billion", "1 billion", "500 million", "5 billion"],
        answer: 0
    },
    {
        question: "What is the main cause of water scarcity in urban areas?",
        options: ["Deforestation", "Industrial Waste", "Agricultural Runoff", "Climate Change"],
        answer: 3
    },
    {
        question: "Which of these actions can help conserve water?",
        options: ["Leaving taps open", "Planting trees", "Fixing leaks", "Using sprinklers daily"],
        answer: 2
    }
];

let currentQuestionIndex = 0;
let score = 0;
let selectedOption = null;
let selectedAnswers = [];  // Array to store selected answers

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextButton = document.getElementById("next");
const previousButton = document.getElementById("previous");
const submitButton = document.getElementById("submit");
const resultElement = document.getElementById("result");

// Display the question and options
function displayQuestion() {
    questionElement.textContent = questions[currentQuestionIndex].question;
    optionsElement.innerHTML = "";

    questions[currentQuestionIndex].options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.className = "option";
        button.addEventListener("click", () => selectOption(index, button));
        optionsElement.appendChild(button);
    });

    // Disable "Next" button initially
    nextButton.disabled = true;
}

// Handle option selection
function selectOption(index, button) {
    selectedOption = index;
    selectedAnswers[currentQuestionIndex] = index;  // Store the selected answer

    // Remove existing styles
    const optionButtons = document.querySelectorAll(".option");
    optionButtons.forEach(btn => btn.classList.remove("selected", "correct", "incorrect"));

    // Highlight selected option
    button.classList.add("selected");

    // Enable "Next" button
    nextButton.disabled = false;
}

// Move to the next question
nextButton.addEventListener("click", () => {
    if (selectedOption !== null) {
        checkAnswer();
        currentQuestionIndex++;
        selectedOption = null;
        if (currentQuestionIndex < questions.length) {
            displayQuestion();
        } else {
            showScore();
        }
    }
});

// Move to the previous question
previousButton.addEventListener("click", () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
    }
});

// Check the selected answer
function checkAnswer() {
    const optionButtons = document.querySelectorAll(".option");
    if (selectedOption === questions[currentQuestionIndex].answer) {
        optionButtons[selectedOption].classList.add("correct");
        score++;
    } else {
        optionButtons[selectedOption].classList.add("incorrect");
        optionButtons[questions[currentQuestionIndex].answer].classList.add("correct");
    }
}

// Show the final score
submitButton.addEventListener("click", () => {
    if (selectedOption !== null) {
        checkAnswer();
        showScore();
    }
});

function showScore() {
    questionElement.textContent = `You scored ${score} out of ${questions.length}!`;
    optionsElement.innerHTML = "";
    nextButton.style.display = "none";
    previousButton.style.display = "none";
    submitButton.style.display = "none";

    // Show a recap of questions and answers
    questions.forEach((q, i) => {
        const recap = document.createElement("div");
        recap.className = "recap";
        recap.innerHTML = `
            <h4>${q.question}</h4>
            <p>Your answer: ${selectedAnswers[i] !== undefined ? q.options[selectedAnswers[i]] : "No answer"}</p>
            <p>Correct answer: ${q.options[q.answer]}</p>
        `;
        optionsElement.appendChild(recap);
    });
}

displayQuestion();
