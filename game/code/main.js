let score = JSON.parse(localStorage.getItem("score"));
if (score === null) {
  score = {
    wins: 0,
    losses: 0,
    ties: 0,
  };
}

updateScoreElement();

function pickComputerMove() {
  let computerMove = "";
  const randomNumber = Math.random();
  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "paper";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = "scissors";
  }
  return computerMove;
}

function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = "";
  if (playerMove === "scissors") {
    if (computerMove === "scissors") {
      result = "Tie";
    } else if (computerMove === "paper") {
      result = "You win!";
    } else if (computerMove === "rock") {
      result = "You lose";
    }
  } else if (playerMove === "paper") {
    if (computerMove === "paper") {
      result = "Tie";
    } else if (computerMove === "rock") {
      result = "You win!";
    } else if (computerMove === "scissors") {
      result = "You lose";
    }
  } else if (playerMove === "rock") {
    if (computerMove === "rock") {
      result = "Tie";
    } else if (computerMove === "scissors") {
      result = "You win!";
    } else if (computerMove === "paper") {
      result = "You lose";
    }
  }
  if (result === "You win!") {
    score.wins = score.wins += 1;
  } else if (result === "You lose") {
    score.losses = score.losses += 1;
  } else if (result === "Tie") {
    score.ties = score.ties += 1;
  }
  localStorage.setItem("score", JSON.stringify(score));

  updateScoreElement();

  document.querySelector(".js-result").innerHTML = result;
  document.querySelector(
    ".js-computer-move"
  ).innerHTML = `You picked: <img src="./emojis/${playerMove}-emoji.png" class="move-icon"> 
                        computer picked: <img src="./emojis/${computerMove}-emoji.png" class="move-icon">`;
}

function updateScoreElement() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

let intervalId;
let isAutoPlaying = false;

function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(function () {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 2000);
    isAutoPlaying = true;
  }
  else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }

}