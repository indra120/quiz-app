const quizData = [
  {
    question: "What is the capital of Thailand?",
    options: ["Bangkok", "Bangdik", "Bangpusi", "Bangtits"],
    correct: 0,
  },
  {
    question: "Who was in Paris?",
    options: ["Brothas", "Partnas", "Fellas", "Jay-Z & Kanye West"],
    correct: 3,
  },
];

const $ = (selector, type) => document[`querySelector${type === "multiple" ? "All" : ""}`](selector);
const createEl = (tagName) => document.createElement(tagName);

let inputEls = [], currentQuiz = 0, score = 0;

function loadQuiz() {
  inputEls.forEach((el) => {
    el.checked = false;
  });

  const currentQuizData = quizData[currentQuiz];

  if (currentQuiz < quizData.length) {
    $(".question").innerText = currentQuizData.question;

    currentQuizData.options.forEach((option, i) => {
      if (currentQuiz === 0) {
        const [optionEl, inputEl, optionText] = [createEl("li"), createEl("input"), createEl("label"),];

        optionEl.className = "option";
        inputEl.type = "radio";
        inputEl.name = "selectedOption";
        optionText.innerHTML = option;

        optionEl.appendChild(inputEl);
        optionEl.appendChild(optionText);
        $(".option-container").appendChild(optionEl);

        inputEls = [...inputEls, inputEl];
      } else {
        $("li > label", "multiple")[i].innerHTML = option;
      }
    });
  } else {
    $(".quiz").innerHTML = `
      <h2 class="question">You answered correctly at ${score}/${quizData.length} questions.</h2>
      <button onclick="location.reload()">Reload</button>
    `;
  }
}

const getSelected = () => {
  let selected;

  inputEls.forEach((el, i) => {
    if (el.checked) selected = i;
  });

  return selected;
};

loadQuiz();

$("#submit").onclick = () => {
  const answer = getSelected();

  if (answer !== undefined) {
    if (answer == quizData[currentQuiz].correct) score++;

    currentQuiz++;
    loadQuiz();
  }
};
