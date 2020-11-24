const questions = [
  {
    text: "Where would you like to live the most?",
    id: 1,
    options: [
      {
        text: "Somewhere nice and cool, maybe near the ocean",
        id: "1.1",
        weights: { addax: 2, panda: 3, baboon: 1, bear: 5, bat: 4 },
      },
      {
        text: "Somewhere tropical",
        id: "1.2",
        weights: { addax: 3, panda: 4, baboon: 1, bear: 0, bat: 5 },
      },
      {
        text: "In the desert (warm and dry)",
        id: "1.3",
        weights: { addax: 5, panda: 0, baboon: 4, bear: 0, bat: 1 },
      },
      {
        text: "In the temperate forest",
        id: "1.4",
        weights: { addax: 1, panda: 5, baboon: 2, bear: 2, bat: 0 },
      },
    ],
  },
  {
    text: "What would you prefer to eat the most of?",
    id: 2,
    options: [
      {
        text: "Plants",
        id: "2.1",
        weights: { addax: 5, panda: 5, baboon: 4, bear: 1, bat: 0 },
      },
      {
        text: "Meat or insects",
        id: "2.2",
        weights: { addax: 0, panda: 1, baboon: 2, bear: 5, bat: 0 },
      },
      {
        text: "Flowers, fruits, and/or nectar",
        id: "2.3",
        weights: { addax: 0, panda: 2, baboon: 3, bear: 1, bat: 5 },
      },
      {
        text: "Seeds",
        id: "2.4",
        weights: { addax: 0, panda: 0, baboon: 4, bear: 0, bat: 0 },
      },
    ],
  },
  {
    text: "What is your social life most like?",
    id: 3,
    options: [
      {
        text: "Surrounded by more than 20 people",
        id: "3.1",
        weights: { addax: 1, panda: 0, baboon: 4, bear: 0, bat: 5 },
      },
      {
        text: "Have between 10-20 close family members/friends",
        id: "3.2",
        weights: { addax: 5, panda: 0, baboon: 4, bear: 0, bat: 2 },
      },
      {
        text: "Mostly solitary, just you and maybe a significant other",
        id: "3.3",
        weights: { addax: 0, panda: 5, baboon: 0, bear: 1, bat: 0 },
      },
      {
        text:
          "Mostly solitary, enjoy having fun and being affectionate with close family and friends",
        id: "3.4",
        weights: { addax: 0, panda: 3, baboon: 1, bear: 4, bat: 0 },
      },
    ],
  },
  {
    text: " What best describes your ideal time of day to be active?",
    id: 4,
    options: [
      {
        text: "Mostly at night",
        id: "4.1",
        weights: { addax: 4, panda: 5, baboon: 0, bear: 0, bat: 3 },
      },
      {
        text: "Only during the day",
        id: "4.2",
        weights: { addax: 0, panda: 1, baboon: 5, bear: 5, bat: 2 },
      },
      {
        text: "Sometimes at night, sometimes during the day",
        id: "4.3",
        weights: { addax: 1, panda: 1, baboon: 0, bear: 0, bat: 4 },
      },
      {
        text: "Sleep all day, active only at night",
        id: "4.4",
        weights: { addax: 5, panda: 4, baboon: 0, bear: 0, bat: 3 },
      },
    ],
  },
];

const animalNameMap = {
  addax: "Addax",
  panda: "Red Panda",
  baboon: "Gelada Baboon",
  bear: "Polar Bear",
  bat: "Flying Fox Bat",
};

function generateQuizContent() {
  const quizContent = document.querySelector("#quiz-content");
  console.log("DOM fully loaded and parsed");
  for (const question of questions) {
    const questionContainer = document.createElement("div");
    questionContainer.classList.add("mb-4");
    questionContainer.id = `question-${question.id}`;

    const questionText = document.createElement("h3");
    questionText.innerHTML = question.text;
    questionText.classList.add("mt-3");
    questionContainer.appendChild(questionText);

    const optionsContainer = document.createElement("div");
    optionsContainer.classList.add("mt-2");

    // generate radio buttons
    for (const option of question.options) {
      const optionContainer = document.createElement("div");
      optionContainer.classList.add("form-check");
      const radioInput = document.createElement("input");
      radioInput.type = "radio";
      radioInput.name = question.id;
      radioInput.id = option.id;
      radioInput.value = option.id;
      radioInput.required = true;
      radioInput.classList.add("form-check-input");
      optionContainer.appendChild(radioInput);

      const radioLabel = document.createElement("label");
      radioLabel.setAttribute("for", option.id);
      radioLabel.classList.add("form-check-label");
      radioLabel.innerHTML = option.text;
      optionContainer.appendChild(radioLabel);

      optionsContainer.appendChild(optionContainer);
    }
    questionContainer.appendChild(optionsContainer);
    quizContent.appendChild(questionContainer);
  }
  // submit button
  const submitButtonContainer = document.createElement("div");
  submitButtonContainer.classList.add("d-flex", "justify-content-center");
  const submitButton = document.createElement("button");
  submitButton.classList.add("btn", "btn-primary", "mt-3");
  submitButton.classList.add("align-self-center");
  submitButton.innerHTML = "See your animal";
  submitButtonContainer.appendChild(submitButton);
  quizContent.appendChild(submitButtonContainer);
}

function submitQuiz(event) {
  // prevent page from refreshing
  event.preventDefault();

  // post the chosen weights for each question, e.g.
  /**
   {
     "responses": [
        { addax: 2, panda: 3, baboon: 1, bear: 5, bat: 4 },
        { addax: 5, panda: 5, baboon: 4, bear: 1, bat: 0 },
        { addax: 1, panda: 0, baboon: 4, bear: 0, bat: 5 }
        { addax: 4, panda: 5, baboon: 0, bear: 0, bat: 3 }
     ]
   }
   */
  const responses = questions.map((question) => {
    const questionOptionId = document.querySelector(
      `input[name="${question.id}"]:checked`
    ).value;
    return question.options.find((option) => option.id === questionOptionId)
      .weights;
  });

  // Show a loading spinner temporarily
  const quizContent = document.querySelector("#quiz-content");
  quizContent.innerHTML = null;
  const loadingSpinner = document.createElement("div");
  loadingSpinner.classList.add("spinner-border", "text-info");
  loadingSpinner.role = "status";
  const accessibilitySpan = document.createElement("span");
  accessibilitySpan.classList.add("sr-only");
  accessibilitySpan.innerHTML = "Loading...";
  loadingSpinner.appendChild(accessibilitySpan);
  quizContent.appendChild(loadingSpinner);

  // prepare and send POST request to server.js running on heroku server
  const reqBody = { responses };
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "https://pacific-falls-35444.herokuapp.com/quiz", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // reset quiz content
      quizContent.innerHTML = null;
      generateQuizContent();

      // show result animal in a bootstrap modal
      const parsedResponse = JSON.parse(xhr.response);
      const resultAnimal = parsedResponse.animal;
      const resultAnimalName = animalNameMap[resultAnimal];
      const resultBody = document.querySelector("#quiz-result-body");
      resultBody.innerHTML = `Wow, you scored a ${resultAnimalName}!`;
      $("#quiz-result-modal").modal();
    }
  };
  xhr.send(JSON.stringify(reqBody));
}

window.addEventListener("DOMContentLoaded", () => {
  document.querySelector("form").addEventListener("submit", submitQuiz);
  generateQuizContent();
});
