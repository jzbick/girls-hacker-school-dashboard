const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('reset');
const timerXDisplay = document.getElementById('timer-x-count');
const timerODisplay = document.getElementById('timer-o-count');
let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];
let timer;
let xTimeLeft = 20;
let oTimeLeft = 20;

// Gewinnkombinationen
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', handleResetGame);

startTimer();

function handleCellClick(event) {
  const clickedCell = event.target;
  const clickedIndex = clickedCell.getAttribute('data-index');

  if (gameState[clickedIndex] !== '' || !gameActive) {
    return;
  }

  updateCell(clickedCell, clickedIndex);
  checkResult();
}

function updateCell(cell, index) {
  gameState[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.style.color = currentPlayer === 'X' ? 'var(--player-x-color)' : 'var(--player-o-color)';
  resetTimer();
}

function checkResult() {
  let roundWon = false;

  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `Spieler ${currentPlayer} gewinnt! 🎉`;
    gameActive = false;
    clearInterval(timer);
    return;
  }

  if (!gameState.includes('')) {
    statusText.textContent = 'Unentschieden!';
    gameActive = false;
    clearInterval(timer);
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusText.textContent = `Spieler ${currentPlayer} ist am Zug`;
  resetTimer();
}

function handleResetGame() {
  gameActive = true;
  currentPlayer = 'X';
  gameState = ['', '', '', '', '', '', '', '', ''];
  xTimeLeft = 20;
  oTimeLeft = 20;
  timerXDisplay.textContent = xTimeLeft;
  timerODisplay.textContent = oTimeLeft;
  statusText.textContent = `Spieler ${currentPlayer} beginnt`;
  cells.forEach(cell => {
    cell.textContent = '';
    cell.style.color = 'var(--text-color)';
  });
  resetTimer();
}

function startTimer() {
  timer = setInterval(() => {
    if (currentPlayer === 'X') {
      xTimeLeft--;
      timerXDisplay.textContent = xTimeLeft;
      if (xTimeLeft <= 0) {
        clearInterval(timer);
        statusText.textContent = 'Spieler O gewinnt! Zeit von Spieler X abgelaufen!';
        gameActive = false;
      }
    } else {
      oTimeLeft--;
      timerODisplay.textContent = oTimeLeft;
      if (oTimeLeft <= 0) {
        clearInterval(timer);
        statusText.textContent = 'Spieler X gewinnt! Zeit von Spieler O abgelaufen!';
        gameActive = false;
      }
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
  startTimer();
}
