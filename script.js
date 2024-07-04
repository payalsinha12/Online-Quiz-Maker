let questions = [];

function addQuestion() {
    const questionInput = document.getElementById('question');
    const answerInputs = document.getElementsByName('answer');
    const correctAnswerInput = document.querySelector('input[name="correct-answer"]:checked');

    if (questionInput.value === '' || correctAnswerInput === null) {
        alert('Please fill out the question and select the correct answer.');
        return;
    }

    const answers = Array.from(answerInputs).map(input => input.value);
    const correctAnswerIndex = correctAnswerInput.value;

    questions.push({
        question: questionInput.value,
        answers: answers,
        correctAnswer: correctAnswerIndex
    });

    questionInput.value = '';
    answerInputs.forEach(input => input.value = '');
    correctAnswerInput.checked = false;

    alert('Question added!');
}

function createQuiz() {
    if (questions.length === 0) {
        alert('Please add at least one question to create the quiz.');
        return;
    }

    document.getElementById('quiz-creation').style.display = 'none';
    document.getElementById('quiz-taking').style.display = 'block';

    const quizQuestionsDiv = document.getElementById('quiz-questions');
    quizQuestionsDiv.innerHTML = '';

    questions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('quiz-question');

        const questionText = document.createElement('p');
        questionText.textContent = `${index + 1}. ${q.question}`;
        questionDiv.appendChild(questionText);

        q.answers.forEach((answer, i) => {
            const answerLabel = document.createElement('label');
            answerLabel.textContent = answer;
            const answerInput = document.createElement('input');
            answerInput.type = 'radio';
            answerInput.name = `question-${index}`;
            answerInput.value = i;
            questionDiv.appendChild(answerInput);
            questionDiv.appendChild(answerLabel);
            questionDiv.appendChild(document.createElement('br'));
        });

        quizQuestionsDiv.appendChild(questionDiv);
    });
}

function submitQuiz() {
    let score = 0;

    questions.forEach((q, index) => {
        const selectedAnswer = document.querySelector(`input[name="question-${index}"]:checked`);
        if (selectedAnswer && selectedAnswer.value == q.correctAnswer) {
            score++;
        }
    });

    document.getElementById('quiz-taking').style.display = 'none';
    document.getElementById('quiz-results').style.display = 'block';

    const resultText = `You scored ${score} out of ${questions.length}`;
    document.getElementById('result').textContent = resultText;
}

function resetQuiz() {
    questions = [];
    document.getElementById('quiz-creation').style.display = 'block';
    document.getElementById('quiz-taking').style.display = 'none';
    document.getElementById('quiz-results').style.display = 'none';
    document.getElementById('quiz-form').reset();
}
