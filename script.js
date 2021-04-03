'use strict';
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0 = document.getElementById('score--0');
const score1 = document.getElementById('score--1');
const dicee = document.querySelector('.dice');
const rollin = document.querySelector('.btn--roll');
const currentScore0 = document.getElementById('current--0');
const currentScore1 = document.getElementById('current--1');
const holdin = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');

let score, currentScore, playing, activePlayer;

function init() {
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0.textContent = 0;
  score1.textContent = 0;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;

  dicee.classList.add('hidden');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
}

init();

function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  // Change the background!
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
}

rollin.addEventListener('click', function () {
  if (playing) {
    const randomeDiceRoll = Math.trunc(Math.random() * 6 + 1);

    dicee.classList.remove('hidden');

    dicee.src = `dice-${randomeDiceRoll}.png`;

    if (randomeDiceRoll !== 1) {
      //   Add the number to the current score!
      currentScore += randomeDiceRoll;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      //Switch to next player'

      switchPlayer();
    }
  }
});

// Hoding button  event handling

holdin.addEventListener('click', function () {
  if (playing) {
    score[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];

    //   check wether  player or not!

    if (score[activePlayer] >= 10) {
      playing = false;
      dicee.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

// Restart new game

btnNew.addEventListener('click', function () {
  if (!playing) {
    init();
  }
});
