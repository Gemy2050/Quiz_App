let x = [
  {
    title: "Why We Use <br> Element",
    answer_1: "To Make Text Bold",
    answer_2: "To Make Text Italic",
    answer_3: "To Make Breakline",
    answer_4: "To Make Horizontal Line",
    right_answer: "To Make Breakline",
  },
  {
    title: "Is <img> Element Has Attribute href",
    answer_1: "Yes",
    answer_2: "No, Its For Anchor Tag <a>",
    answer_3: "All Elements Has This Attribute",
    answer_4: "Answer 1 and 3",
    right_answer: "No, Its For Anchor Tag <a>",
  },
  {
    title: "How We Make Element Text Bold",
    answer_1: "Putting It Inside <b> Tag",
    answer_2: "Putting It Inside <strong> Tag",
    answer_3: "Customizing It With Font-Weigth Property in CSS",
    answer_4: "All Answers is Right",
    right_answer: "All Answers is Right",
  },
  {
    title: "What Is The Right Hierarchy For Creating Part Of Page",
    answer_1: "<h2> Then <p> Then <h1> Then <p> Then <h3> Then <p> Then <img>",
    answer_2: "<h1> Then <p> Then <h3> Then <p> Then <h2> Then <p> Then <img>",
    answer_3: "<h2> Then <p> Then <h3> Then <p> Then <h1> Then <p> Then <img>",
    answer_4: "All Solutions Is Wrong",
    right_answer: "All Solutions Is Wrong",
  },
  {
    title: "How Can We Include External Page Inside Our HTML Page",
    answer_1: "By Using Include in HTML",
    answer_2: "By Using Load In HTML",
    answer_3: "By Using iFrame Tag",
    answer_4: "All Solutions Is Wrong",
    right_answer: "By Using iFrame Tag",
  },
  {
    title: "What Is The Tag That Not Exists in HTML",
    answer_1: "<object>",
    answer_2: "<basefont>",
    answer_3: "<abbr>",
    answer_4: "All Tags Is Exists in HTML",
    right_answer: "All Tags Is Exists in HTML",
  },
  {
    title: "How We Specify Document Type Of HTML5 Page",
    answer_1: "<DOCTYPE html>",
    answer_2: "<DOCTYPE html5>",
    answer_3: "<!DOCTYPE html5>",
    answer_4: "<!DOCTYPE html>",
    right_answer: "<!DOCTYPE html>",
  },
  {
    title: "What Is The Element Thats Not Exists in HTML5 Semantics",
    answer_1: "<article>",
    answer_2: "<section>",
    answer_3: "<blockquote>",
    answer_4: "<aside>",
    right_answer: "<blockquote>",
  },
  {
    title: "In HTML Can We Use This Way To Add Attributes",
    answer_1: "<div class='class-name'>",
    answer_2: "<div class=class-name>",
    answer_3: '<div class="class-name">',
    answer_4: "All Is Right",
    right_answer: "All Is Right",
  },
  {
    title: "What is The Block Elements in HTMl",
    answer_1: "<p> and <div>",
    answer_2: "<a> and <img>",
    answer_3: "<div> and <span>",
    answer_4: "All Is Right",
    right_answer: "<p> and <div>",
  },
];
// Select Elements
let countSpan = document.querySelector(".quiz-info .count span");
let bulletsSpanContainer = document.querySelector(".bullets .spans");
let quizArea = document.querySelector(".quiz-area");
let answersArea = document.querySelector(".answer-area");
let submitButton = document.querySelector(".quiz-app .submit");
let bullets = document.querySelector(".bullets");
let resultsContainer = document.querySelector(".results");
let countdownElement = document.querySelector(".countdown");

// Set Options
let currentIndex = 0;
let rightAnswers = 0;
let countdownInterval;

function getQuestions() {
  let questionsObject = x;
  let qCount = questionsObject.length;

  // Create Bullets + Questions Count
  createBullets(qCount);
  addQuestionData(questionsObject[currentIndex], qCount);

  // Start Countdown
  countdown(15, qCount);

  submitButton.onclick = function () {
    // Get The Right Answer
    let theRightAnswer = questionsObject[currentIndex].right_answer;
    // Increase Index
    currentIndex++;

    // Check The Answer
    checkAnswer(theRightAnswer, qCount);

    // Remove Previous Question
    quizArea.innerHTML = "";
    answersArea.innerHTML = "";

    addQuestionData(questionsObject[currentIndex], qCount);

    // Handle Bullets Class
    handleBullets();

    // Start Countdown
    clearInterval(countdownInterval);
    countdown(15, qCount);

    // Show Results
    showResults(qCount);
  };
}
getQuestions();

function createBullets(num) {
  countSpan.innerHTML = num;

  // create spans
  for (let i = 0; i < num; i++) {
    // create Bullets
    let theBullet = document.createElement("span");

    // append bullets to main bullets container
    bulletsSpanContainer.appendChild(theBullet);

    if (i == 0) {
      theBullet.className = "on";
    }
  }
}

function addQuestionData(obj, count) {
  if (currentIndex < count) {
    // Create Question Title and Text
    let questionTitle = document.createElement("h2");
    let questionText = document.createTextNode(obj.title);
    questionTitle.appendChild(questionText);
    quizArea.appendChild(questionTitle);

    // Create The Answers
    for (let i = 1; i <= 4; i++) {
      // Create Main Answer Div
      let mainDiv = document.createElement("div");
      mainDiv.className = "answer";

      // Create Radio Input
      let radioInput = document.createElement("input");

      // Add Type + ID + Data Attribute
      radioInput.name = "question";
      radioInput.type = "radio";
      radioInput.id = `answer_${i}`;
      radioInput.dataset.answer = obj[`answer_${i}`];

      if (i == 1) {
        radioInput.checked = true;
      }

      // Create Label
      let theLabel = document.createElement("label");
      theLabel.htmlFor = `answer_${i}`;

      // Create Label Text
      let theLabelText = document.createTextNode(obj[`answer_${i}`]);

      // Add The Text To Label
      theLabel.appendChild(theLabelText);

      // Add Input + Label To Main Div
      mainDiv.appendChild(radioInput);
      mainDiv.appendChild(theLabel);

      // Append All Divs To Answers Area
      answersArea.appendChild(mainDiv);
    }
  }
}

function checkAnswer(rAnswer, qCount) {
  let answers = document.getElementsByName("question");
  let theChoosenAnswer;

  for (let i = 0; i < answers.length; i++) {
    if (answers[i].checked) {
      theChoosenAnswer = answers[i].dataset.answer;
    }
  }

  if (rAnswer == theChoosenAnswer) {
    rightAnswers++;
  }
}

function handleBullets() {
  let bulletsSpan = document.querySelectorAll(".bullets .spans span");
  let arrayOfSpans = Array.from(bulletsSpan);
  arrayOfSpans.forEach((span, index) => {
    if (currentIndex == index) {
      span.className = "on";
    }
  });
}

function showResults(count) {
  let theResults;
  if (currentIndex == count) {
    quizArea.remove();
    answersArea.remove();
    submitButton.remove();
    bullets.remove();

    if (rightAnswers > count / 2 && rightAnswers < count) {
      theResults = `<span class='good'>Good</span>, ${rightAnswers} From${count}`;
    } else if (rightAnswers == count) {
      theResults = `<span class='perfect'>Perfect</span>, All Answers is Correct`;
    } else {
      theResults = `<span class='bad'>Bad</span>, ${rightAnswers} From${count}`;
    }
    resultsContainer.innerHTML = theResults;
    resultsContainer.style.padding = "10px";
    resultsContainer.style.backgroundColor = "white";
    resultsContainer.style.marginTop = "10px";
    resultsContainer.style.textAlign = "center";
  }
}

function countdown(duration, count) {
  if (currentIndex < count) {
    let minutes, seconds;
    countdownInterval = setInterval(() => {
      minutes = parseInt(duration / 60);
      seconds = parseInt(duration % 60);

      minutes < 10 ? (minutes = `0${minutes}`) : minutes;
      seconds < 10 ? (seconds = `0${seconds}`) : seconds;

      countdownElement.innerHTML = `${minutes} : ${seconds}`;

      if (--duration < 0) {
        // clearInterval(countdownInterval);
        submitButton.click();
      }
      if (seconds <= 5) {
        countdownElement.style.color = "red";
      } else {
        countdownElement.style.color = "black";
      }
    }, 1000);
  }
}
