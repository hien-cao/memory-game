/*
 * Create a list that holds all of your cards
 */
const restart = document.getElementsByClassName('fa fa-repeat');

// Cards varaibles
const deck = document.querySelector('.deck');
let card = document.getElementsByClassName("card");
let cards = [...card];
console.log(cards);
let openedCards = [];
// Matched pair of card count
let pairCount = 0;
// Star variables
const star = document.querySelectorAll('.stars li');
const stars = [...star]
let countStar = 0;
console.log(stars);
// Move variables
const moves = document.querySelector('#moves');
let count = 0;
let countMove = 0;
// Timer variables
const timer = document.querySelector('#timer');
let second = 0;
let minute = 0;
let interval;
// timer.textContent = `${minute} minute 0${second} second`;
// moves.textContent = `${count} moves`;

//Define close icon for modal
const close = document.getElementsByClassName('close');
//Define playAgain
const playAgain = document.getElementById('play-again');
//Define modal
const modal = document.querySelector('.popup');
//Define winner message
const winMessage = document.querySelector('.winner-message');



function startGame(){
  // shuffle deck
  cards = shuffle(cards);
  // assign card to the deck and remove all exisiting classes from each card
  for (let i = 0; i < cards.length; i++){
      deck.innerHTML = '';
      cards.forEach(function(card) {
          deck.appendChild(card);
      });
      cards[i].classList.remove('show', 'open', 'match', 'disabled');
  };
  resetGame();
};

// @description: function to reset game
function resetGame() {
  // reset pairCount
  pairCount = 0;
  // reset moves
  count = 0;
  countMove = 0;
  moves.textContent = `${count} moves`;
  // reset timer
  second = 0;
  minute = 0;
  timer.textContent = `${minute} minute 0${second} second`;
  clearInterval(interval);
  // reset star rating
  stars.forEach(function(star) {
    star.style.visibility = 'visible';
  });
}


// @description: function to check whether the cards match or not
function checkCard(item) {
  item.classList.add('show','open');
  openedCards.push(item);
  moveCounter();
  let length = openedCards.length;
  if(length === 2) {
    if(openedCards[0].type === openedCards[1].type) {
      matched();
      pairCount ++;
    } else {
      unmatched();
    }
  }
}

// @description: function to add class to matched cards
function matched() {
  openedCards.forEach(function(card) {
    card.classList.add('disabled', 'match');
  });
  openedCards.forEach(function(card) {
    card.classList.remove('open', 'show');
  });
  openedCards = [];
}

// @description: function to add class to unmatched cards
function unmatched() {
  openedCards.forEach(function(card) {
    card.classList.add('unmatch');
  });
  disabled();
  setTimeout(function() {
    openedCards.forEach(function(card) {
      card.classList.remove('show', 'open', 'unmatch');
    });
    enable();
    openedCards = [];
  }, 1000);
};

// @description: function to disable cards
function disabled() {
  deck.getElementsByClassName('match').forEach(function(card) {
    card.classList.add('disabled');
  });
  deck.getElementsByClassName('unmatch').forEach(function(card) {
    card.classList.add('disabled');
  });
}

// @description: function to enable cards and disable matched cards
function enable() {
  deck.getElementsByClassName('disabled').forEach(function(card) {
    card.classList.remove('disabled');
  });
  openedCards.forEach(function(card) {
    card.classList.add('disabled');
  });
}

// @description: function to count move and star rating
function moveCounter() {
  count ++;
  if(count % 2 != 0) {
    countMove = Math.floor(count / 2);
  } else {
    countMove = count / 2;
  }
  moves.textContent = `${countMove} moves`;
  // Start timer on first moves
  if(count == 1) {
    startTimer();
  }
  // Star rating
  if(countMove < 15) {
    countStar = 3;
  } else if(countMove > 16 && countMove < 21) {
    countStar = 2;
    stars[countStar].style.visibility = 'hidden';
  } else if(countMove > 22) {
    countstar = 1;
    stars[countStar].style.visibility = 'hidden';
  }
}

// @description: function to start timer
function startTimer() {
	const interval = setInterval(function() {
	  second ++;
	  if(second == 60){
	    minute ++;
	    second = 0;
	  }
	  if(second < 10) {
	    second = `0${second}`;
	  }
	  timer.textContent = `${minute} minute ${second} second`;
	}, 1000);
}


// @description: function to shuffle cards from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
  }

  return array;
}


// @description: function to call winner modal
function winner() {
	if(pairCount === 8){
		clearInterval(interval);
  	modal.classList.add('show');
	  const timerResult = timer.innerHTML;
	  const ratingResult = document.querySelector('.stars').textContent;
	  const moveResult = countMove;
	  winMessage.innerHTML = `<p class="text-center">Total of time: ${timerResult}</p><p class="text-center">Number of moves: ${moveResult}</p><p class="text-center">Rating: ${ratingResult}</p>`;
	  closeModal();
	  playAgains();
  }
}

// @description: function to close icon on modal

function closeModal() {
	close[0].addEventListener('click', function() {
		modal.classList.remove('show');
		startGame();
	});
}

// @description: function to playAgain button on modal
function	playAgains() {
	playAgain.addEventListener('click', function() {
		modal.classList.remove('show');
		startGame();
	});
}

cards.forEach(function(card) {
	card.addEventListener('click', checkCard());
	card.addEventListener('click', winner());
})






































