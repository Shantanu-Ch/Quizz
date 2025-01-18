const questions = [
    {
      question: "1. What does CPU stand for?",
      options: [
        "Central Processing Unit",
        "Central Programming Unit",
        "Central Performance Unit",
        "Computer Processing Unit",
      ],
      correctAnswer: 0,
    },
    {
      question: "2. What is the main function of RAM in a computer?",
      options: [
        "Store data permanently",
        "Store data temporarily for fast access",
        "Control peripheral devices",
        "Perform mathematical operations",
      ],
      correctAnswer: 1,
    },
    {
      question: "3. App development language is ?",
      options: ["Swift", "Kotlin", "Python", "Java"],
      correctAnswer: 1,
    },
    {
      question: "4. What does GPU stand for?",
      options: [
        "Graphics Processing Unit",
        "Global Processing Unit",
        "General Processing Unit",
        "Gaming Processing Unit",
      ],
      correctAnswer: 0,
    },
    {
      question: "5. What is the time complexity of binary search?",
      options: ["O(n)", "O(log n)", "O(n^2)", "O(1)"],
      correctAnswer: 1,
    },
    {
      question: "6. For secure communication which protocol is used?",
      options: ["HTTP", "FTP", "HTTPS", "SMTP"],
      correctAnswer: 2,
    },
    {
      question: "7. Who is known as the father of the World Wide Web?",
      options: [
        "Tim Berners-Lee",
        "Bill Gates",
        "Mark Zuckerberg",
        "Elon Musk",
      ],
      correctAnswer: 0,
    },
    {
      question: "8. Which keyword is used to define a variable in JS?",
      options: ["var", "let", "const", "All of the above"],
      correctAnswer: 3,
    },
    {
      question: "9. Which database is known for using NoSQL?",
      options: ["MySQL", "PostgreSQL", "MongoDB", "Oracle"],
      correctAnswer: 2,
    },
    {
      question:
      "10. In HTML, which tag is used to create a hyperlink?",
      options: ["h", "link", "a", "href"],
      correctAnswer: 2,
    },
  ];
  let currentQuestion = 0;
  let userAnswers = new Array(questions.length).fill(null);

  // Load the current question
  function loadQuestion(index) {
    const quizContent = document.getElementById("quiz-content");
    quizContent.innerHTML = `
        <div class="question">${questions[index].question}</div>
        <ul class="options">
            ${questions[index].options
              .map(
                (option, i) => `
                <li>
                    <label>
                        <input type="radio" name="q${index + 1}" value="${i}" ${
                  userAnswers[index] === i ? "checked" : ""
                }>
                        ${option}
                    </label>
                </li>
            `
              )
              .join("")}
        </ul>
    `;
    updateButtonState();
  }

  // Next Question
  function nextQuestion() {
    saveAnswer();
    if (currentQuestion < questions.length - 1) {
      currentQuestion++;
      loadQuestion(currentQuestion);
    }
  }

  // Previous Question
  function prevQuestion() {
    saveAnswer();
    if (currentQuestion > 0) {
      currentQuestion--;
      loadQuestion(currentQuestion);
    }
  }

  // Save the user's selected answer
  function saveAnswer() {
    const selectedOption = document.querySelector(
      `input[name="q${currentQuestion + 1}"]:checked`
    );
    if (selectedOption) {
      userAnswers[currentQuestion] = parseInt(selectedOption.value);
    }
  }

  // Update button state
  function updateButtonState() {
    document.getElementById("prevBtn").disabled = currentQuestion === 0;
    document.getElementById("nextBtn").style.display =
      currentQuestion === questions.length - 1 ? "none" : "inline-block";
    document.getElementById("submitBtn").style.display =
      currentQuestion === questions.length - 1 ? "inline-block" : "none";
  }

  // Submit quiz and calculate score
  function submitQuiz() {
    saveAnswer();
    let score = 0;
    for (let i = 0; i < questions.length; i++) {
      if (userAnswers[i] === questions[i].correctAnswer) {
        score++;
      }
    }
    document.getElementById(
      "result"
    ).textContent = `Thank you! You scored ${score} out of ${questions.length}`;
  }

  // Load the first question on page load
  window.onload = function () {
    loadQuestion(currentQuestion);
  };