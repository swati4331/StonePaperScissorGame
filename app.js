let userScore = 0;
let compScore = 0;
let userHistory = [];

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");
const compChoicePara = document.querySelector("#comp-choice");
const resetBtn = document.querySelector("#reset-btn");

const winSound = document.getElementById("win-sound");
const loseSound = document.getElementById("lose-sound");
const clickSound = document.getElementById("click-sound");

const options = ["rock", "paper", "scissors"];

// Smart AI
const genCompChoice = () => {
  if (userHistory.length < 3) {
    return options[Math.floor(Math.random() * 3)];
  }

  let freq = { rock: 0, paper: 0, scissors: 0 };
  userHistory.forEach(move => freq[move]++);

  let maxMove = Object.keys(freq).reduce((a, b) =>
    freq[a] > freq[b] ? a : b
  );

  if (maxMove === "rock") return "paper";
  if (maxMove === "paper") return "scissors";
  return "rock";
};

// Draw
const drawGame = () => {
  msg.innerText = "Game Draw!";
};

// Show Winner
const showWinner = (userWin) => {
  if (userWin) {
    userScore++;
    userScorePara.innerText = userScore;
    msg.innerText = "You Win!";
    winSound.play();
  } else {
    compScore++;
    compScorePara.innerText = compScore;
    msg.innerText = "Computer Wins!";
    loseSound.play();
  }
};

// Main Game
const playGame = (userChoice) => {
  clickSound.play();

  choices.forEach(c => c.classList.remove("win", "lose", "draw"));

  userHistory.push(userChoice);

  const compChoice = genCompChoice();
  compChoicePara.innerText = "Computer Choice: " + compChoice;

  const userDiv = document.getElementById(userChoice);
  const compDiv = document.getElementById(compChoice);

  if (userChoice === compChoice) {
    drawGame();
    userDiv.classList.add("draw");
  } else {
    let userWin = true;

    if (
      (userChoice === "rock" && compChoice === "paper") ||
      (userChoice === "paper" && compChoice === "scissors") ||
      (userChoice === "scissors" && compChoice === "rock")
    ) {
      userWin = false;
    }

    if (userWin) {
      userDiv.classList.add("win");
      compDiv.classList.add("lose");
    } else {
      userDiv.classList.add("lose");
      compDiv.classList.add("win");
    }

    showWinner(userWin);
  }
};

// Click events
choices.forEach(choice => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");
    playGame(userChoice);
  });
});

// Reset
resetBtn.addEventListener("click", () => {
  userScore = 0;
  compScore = 0;
  userHistory = [];

  userScorePara.innerText = 0;
  compScorePara.innerText = 0;
  msg.innerText = "Play your move";
  compChoicePara.innerText = "Computer Choice: -";

  choices.forEach(c => c.classList.remove("win", "lose", "draw"));
});