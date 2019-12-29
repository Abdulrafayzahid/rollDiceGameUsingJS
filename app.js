/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScores, activeplayer, gamePlay;

const resetScore = () => {
  document.querySelector("#score-0").textContent = 0;
  document.querySelector("#current-0").textContent = 0;

  document.querySelector("#current-1").textContent = 0;
  document.querySelector("#score-1").textContent = 0;

  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");

  scores = [0, 0];
  roundScores = 0;
  activeplayer = 0;
  gamePlay = true;
};

const removeDiceImg = () => {
  document.querySelector(".dice").style.display = "none";
  document.querySelector(".dice-2").style.display = "none";
};

const setPlayerToDefault = () => {
  document.querySelector("#name-0").textContent = "PLAYER 1";
  document.querySelector("#name-1").textContent = "PLAYER 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
};

resetScore();
removeDiceImg();
setPlayerToDefault();

document.querySelector(".btn-roll").addEventListener("click", rollBack);

function rollBack() {
  if (gamePlay) {
    var dice = Math.floor(Math.random() * 6 + 1);
    var dice_2 = Math.floor(Math.random() * 6 + 1);
    var display = document.querySelector(".dice");
    var display_2 = document.querySelector(".dice-2");

    document.querySelector('.ifDiceRol1').style.display = 'none';
    display.style.display = "block";
    display_2.style.display = "block";
    display.src = "dice-" + dice + ".jpg";
    display_2.src = "dice-" + dice_2 + ".jpg";
    setPlayerToDefault();

    if (dice != 1 && dice_2 != 1) {
      roundScores = roundScores + dice + dice_2;

      document.querySelector(
        "#current-" + activeplayer
      ).textContent = roundScores;
      // console.log(scores[activeplayer]);
    } else {
        document.querySelector('.ifDiceRol1').style.display = 'block';
      // check if active player win
        checkWinner();
    }
  }
}

document.querySelector(".btn-hold").addEventListener("click", function() {
  if (gamePlay) {
    // add Round Score to player dom
    scores[activeplayer] += roundScores;
    document.querySelector("#score-" + activeplayer).textContent =
      scores[activeplayer];

    // check if active player win
    checkWinner();
  }
});

const nextPlayer = () => {
  document
    .querySelector(".player-" + activeplayer + "-panel")
    .classList.toggle("active");
  document.querySelector("#current-" + activeplayer).textContent = 0;

  roundScores = 0;
  activeplayer === 0 ? (activeplayer = 1) : (activeplayer = 0);

  // add class for active player
  document
    .querySelector(".player-" + activeplayer + "-panel")
    .classList.add("active");
  // remove dice images from the display
  removeDiceImg();
};

const checkWinner = () => {
    // check active player score is less greather than 100
  if (scores[activeplayer] >= 100) {
    document.querySelector("#name-" + activeplayer).textContent = "Winner!!!";
    document
      .querySelector(".player-" + activeplayer + "-panel")
      .classList.add("winner");
    document
      .querySelector(".player-" + activeplayer + "-panel")
      .classList.remove("active");
    document.querySelector(".newGame").style.display = 'block'
      removeDiceImg();
    gamePlay = false;
  }
  //next player
  else nextPlayer();
};

document.querySelector(".btn-new").addEventListener("click", function() {
  resetScore();
  removeDiceImg();
  setPlayerToDefault();
  gamePlay = true;
});
