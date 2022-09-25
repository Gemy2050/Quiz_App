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
  let myRequest = new XMLHttpRequest();
  myRequest.open("GET", "/html_querstion.json");
  myRequest.send();

  myRequest.onload = function () {
    if (this.readyState == 4 && this.status == 200) {
      let questionsObject = JSON.parse(this.responseText);
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
        countdownElement.style.color = 'black';
      }
    }, 1000);
  }
}
