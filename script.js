const symbols = ['🍎','🍌','🍇','🍓','🍒','🥝','🍍','🍉'];
let cards = [];
let firstCard = null;
let secondCard = null;
let moves = 0;
let matchedPairs = 0;
let time = 0;
let timerInterval;

function startGame() {
  const gameGrid = document.getElementById('gameGrid');
  gameGrid.innerHTML = '';
  document.getElementById('message').textContent = '';
  
  cards = [...symbols, ...symbols].sort(() => 0.5 - Math.random());
  firstCard = secondCard = null;
  moves = 0;
  matchedPairs = 0;
  time = 0;
  document.getElementById('moves').textContent = moves;
  document.getElementById('time').textContent = time;

  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    time++;
    document.getElementById('time').textContent = time;
  }, 1000);

  cards.forEach(symbol => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.textContent = symbol;
    card.onclick = () => flipCard(card);
    gameGrid.appendChild(card);
  });
}

function flipCard(card) {
  if (card.classList.contains('open') || card.classList.contains('matched') || secondCard) return;

  card.classList.add('open');

  if (!firstCard) {
    firstCard = card;
  } else {
    secondCard = card;
    moves++;
    document.getElementById('moves').textContent = moves;
    checkMatch();
  }
}

function checkMatch() {
  if (firstCard.textContent === secondCard.textContent) {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    matchedPairs++;
    resetCards();

    if (matchedPairs === symbols.length) {
      clearInterval(timerInterval);
      document.getElementById('message').textContent = 
        `🎉 Congratulations! Completed in ${moves} moves and ${time} seconds.`;
    }
  } else {
    setTimeout(() => {
      firstCard.classList.remove('open');
      secondCard.classList.remove('open');
      resetCards();
    }, 800);
  }
}

function resetCards() {
  firstCard = null;
  secondCard = null;
}

startGame();
