const startBtn = document.getElementById("start-btn");
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextBtn = document.getElementById("next-btn");
const scoreText = document.getElementById("score");
const finalMessage = document.getElementById("final-message");
const feedback = document.getElementById("feedback");
const progressBar = document.getElementById("progress-bar");

let currentIndex = 0;
let score = 0;

const questions = [
    {
        question: "What is my favorite color?",
        answers: [
            { text: "Yellow", correct: false },
            { text: "Lavender", correct: true },
            { text: "Pink", correct: false }
        ]
    },
    {
        question: "My favorite flower is?",
        answers: [
            { text: "Jasmine", correct: true },
            { text: "Rose", correct: false }
        ]
    },
    {
        question: "Which drink does Irza like the most?",
        answers: [
            { text: "Coffee", correct: false },
            { text: "Cold Drinks", correct: true },
            { text: "Lemonade", correct: false }
        ]
    },
    {
        question: "What hobby does Irza enjoy the most?",
        answers: [
            { text: "Hiking", correct: true },
            { text: "Reading", correct: false },
            { text: "PHONE", correct: false }
        ]
    },
    {
        question: "I prefer cats over dogs.",
        answers: [
            { text: "True", correct: false },
            { text: "False", correct: true }
        ]
    }
];

startBtn.addEventListener("click", startQuiz);

nextBtn.addEventListener("click", () => {
    currentIndex++;
    showQuestion();
});

function startQuiz() {
    startScreen.classList.add("hide");
    quizScreen.classList.remove("hide");
    currentIndex = 0;
    score = 0;
    showQuestion();
}

function showQuestion() {
    resetState();

    let q = questions[currentIndex];
    questionElement.innerText = q.question;

    // Progress bar update
    let progress = ((currentIndex + 1) / questions.length) * 100;
    progressBar.style.width = progress + "%";

    q.answers.forEach(ans => {
        const btn = document.createElement("button");
        btn.innerText = ans.text;
        btn.classList.add("btn");
        btn.dataset.correct = ans.correct;
        btn.addEventListener("click", selectAnswer);
        answerButtons.appendChild(btn);
    });
}

function resetState() {
    nextBtn.classList.add("hide");
    feedback.innerText = "";
    answerButtons.innerHTML = "";
    document.body.classList.remove("correct-bg", "wrong-bg");
}

function selectAnswer(e) {
    const selected = e.target;
    const correct = selected.dataset.correct === "true";

    // Disable all answer buttons
    Array.from(answerButtons.children).forEach(b => b.disabled = true);

    // Highlight correct answer
    Array.from(answerButtons.children).forEach(b => {
        if (b.dataset.correct === "true") {
            b.classList.add("correct");
        }
    });

    // Add background + feedback
    if (correct) {
        selected.classList.add("correct");
        feedback.innerText = "Correct!";
        score++;
        document.body.classList.add("correct-bg"); // stays until NEXT
    } else {
        selected.classList.add("wrong");
        feedback.innerText = "Wrong!";
        document.body.classList.add("wrong-bg"); // stays until NEXT
    }

    // Show NEXT button after 1.5 sec delay
    setTimeout(() => {
        if (currentIndex < questions.length - 1) {
            nextBtn.classList.remove("hide");
        } else {
            showResult();
        }
    }, 1500);
}

function showResult() {
    quizScreen.classList.add("hide");
    resultScreen.classList.remove("hide");

    scoreText.innerText = `${score} / ${questions.length}`;

    if (score === questions.length) {
        finalMessage.innerText = "🌟 Perfect! You know yourself very well!";
    } else if (score >= 3) {
        finalMessage.innerText = "✨ Great Job!";
    } else {
        finalMessage.innerText = "🙂 Try Again!";
    }
}

document.getElementById("restart-btn").addEventListener("click", () => {
    resultScreen.classList.add("hide");
    startScreen.classList.remove("hide");
    document.body.classList.remove("correct-bg", "wrong-bg");
});
