// daftar pertanyaan
const questions = [
    {
        question: "Makhluk apa yang merupakan makhluk ganda menurut pendapat plato?",
        answers: [
            {text: "Tumbuhan", correct: false},
            {text: "Hewan", correct: false},
            {text: "Manusia", correct: true},
            {text: "Jamur", correct: false},
        ]
    },
    {
        question: "Angka berapakah aku jika, dikali 5 dikurangi 15 hasilku sama dengan 20 dikali 3",
        answers: [
            {text: "15", correct: true},
            {text: "5", correct: false},
            {text: "10", correct: false},
            {text: "2", correct: false},
        ]
    },
    {
        question: "Aku selalu datang tetapi tidak pernah tiba, apakah aku? ",
        answers: [
            {text: "2 tahun yang lalu", correct: false},
            {text: "Kemarin", correct: false},
            {text: "Masa lalu", correct: false},
            {text: "Hari esok", correct: true},
        ]
    },
    {
        question: "Berapa hasil dari 11 dihilangkan 1",
        answers: [
            {text: "10", correct: false},
            {text: "1", correct: true},
            {text: "0", correct: false},
            {text: "2", correct: false},
        ]
    }
]

const questionElement = document.getElementById("question");
const answerBtn = document.getElementById("answerBtn");
const nextBtn = document.getElementById("nextBtn");


let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();

// tampilkan pertanyaan
let currontQuestion = questions[currentQuestionIndex];
let questionNo = currentQuestionIndex + 1;
questionElement.innerHTML = questionNo + ". " + currontQuestion.question;

// bikin button untuk tiap jawaban 
currontQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("border", "rounded-md", "p-2", "text-start", "hover:bg-gray-800");
    answerBtn.appendChild(button);

    if(answer.correct){
        button.dataset.correct = answer.correct;
    }

    button.addEventListener("click", selectAnswer);
});
}

function resetState() {
    nextBtn.style.display = "none";
    while(answerBtn.firstChild){
        answerBtn.removeChild(answerBtn.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if(isCorrect){
        selectedBtn.classList.add("bg-green-600");
        score++
    } else {
        selectedBtn.classList.add("bg-red-600")
    }

    // bikin semua tombol disable setelah dipilih
    Array.from(answerBtn.children).forEach(button => {
        if (button.dataset.correct === "true"){
            button.classList.add("bg-green-600");
        }
        button.disabled = true;
    });

    nextBtn.style.display = "block"
}

function showScore(){
    resetState();
    questionElement.innerHTML = `Quiz selesai! 🎉<br>Skor kamu: ${score} dari ${questions.length}`;
    nextBtn.innerHTML = "Play Again";
    nextBtn.style.display = "block";
}

function handleNextBtn(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else {
        showScore();
    }
}

nextBtn.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextBtn();
    } else {
        startQuiz();
    }
});

startQuiz();

