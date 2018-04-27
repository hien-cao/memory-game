document.addEventListener('DOMContentLoaded', function() {

  /*
   * Create a list that holds all of your cards
   */
  // Cards varaibles
  const deck = document.querySelector('.deck');
  let card = document.getElementsByClassName("card");
  let cards = [...card];
  let openedCards = [];
  // Matched pair of card count
  let pairCount = 0;
  // Star variables
  const star = document.querySelectorAll('.stars li');
  const stars = [...star];
  let countStar = 0;
  // Move variables
  const moves = document.querySelector('#moves');
  let count = 0;
  let countMove = 0;
  // Timer variables
  const timer = document.querySelector('#timer');
  let second = 0;
  let minute = 0;
  let interval;
  // Restart button variable
  const restartButton = document.querySelector('.restart');
  //Define close icon for modal
  const close = document.querySelector('.close');
  //Define playAgain
  const againButton = document.querySelector('#play-again');
  //Define modal
  const modal = document.querySelector('.popup');
  //Define winner message
  const winMessage = document.querySelector('.winner-message');

  /*
   * Display the cards on the page
   *   - shuffle the list of cards using the provided "shuffle" method below
   *   - loop through each card and create its HTML
   *   - add each card's HTML to the page
   */

   // @description: function to start the game
  function startGame(){
    // Reset game
    resetGame();
    // shuffle deck
    cards = shuffle(cards);
    // assign card to the deck and remove all exisiting classes from each card
    deck.innerHTML = '';
    for (let i = 0; i < cards.length; i++){
        // deck.innerHTML = '';
        // cards.forEach(function(card) {
        //     deck.appendChild(card);
        // });
        deck.appendChild(cards[i]);
        cards[i].classList.remove('show', 'open', 'match', 'disabled');
    }
  }

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
    // restart game
    restartGame();
  }

  // @description: function to check whether the cards match or not
  function checkCard(item) {
    item.classList.add('show','open');
    openedCards.push(item);
    moveCounter();
    let length = openedCards.length;
    if(length === 2) {
      if(openedCards[0].id === openedCards[1].id) {
        matched();
        pairCount ++;
      } else {
        unmatched();
      }
    }
  }

  // @description: function to add class to matched cards
  function matched() {
    Array.from(deck.querySelectorAll('.open')).forEach(function(card) {
      card.classList.add('disabled', 'match');
    });
    Array.from(deck.querySelectorAll('.match')).forEach(function(card) {
      card.classList.remove('open', 'show');
    });
    disabled();
    openedCards = [];
  }

  // @description: function to add class to unmatched cards
  function unmatched() {
    Array.from(deck.getElementsByClassName('open')).forEach(function(card) {
      card.classList.add('unmatch');
    });
    disabled();
    setTimeout(function() {
      Array.from(deck.getElementsByClassName('unmatch')).forEach(function(card) {
        card.classList.remove('show', 'open', 'unmatch');
      });
      enable();
      openedCards = [];
    }, 500);
  }

  // @description: function to disable cards
  function disabled() {
    Array.from(deck.getElementsByClassName('match')).forEach(function(card) {
      card.classList.add('disabled');
    });
    Array.from(deck.getElementsByClassName('unmatch')).forEach(function(card) {
      card.classList.add('disabled');
    });
  }

  // @description: function to enable cards and disable matched cards
  function enable() {
    Array.from(deck.getElementsByClassName('disabled')).forEach(function(card) {
      card.classList.remove('disabled');
    });
    Array.from(deck.getElementsByClassName('match')).forEach(function(card) {
      card.classList.add('disabled');
    });
  }

  // @description: function to count move and star rating
  function moveCounter() {
    count ++;
    if(count % 2 !== 0) {
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
    if(countMove < 12) {
      countStar = 3;
    } else if(countMove > 13 && countMove < 19) {
      countStar = 2;
      stars[countStar].style.visibility = 'hidden';
    } else if(countMove > 20) {
      countStar = 1;
      stars[countStar].style.visibility = 'hidden';
    }
  }

  // @description: function to start timer
  function startTimer() {
    interval = setInterval(function() {
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
    modal.classList.add('show');
    const timerResult = timer.innerHTML;
    const ratingResult = document.querySelector('.stars').innerHTML;
    const moveResult = countMove;
    winMessage.innerHTML = `<p>Total of time: ${timerResult}</p><p>Number of moves: ${moveResult} moves</p><ul class="stars">Rating: ${ratingResult} </ul>`;
    clearInterval(interval);
    closeModal();
    playAgain();
  }

  // @description: function to close icon on modal
  function closeModal() {
    close.addEventListener('click', function() {
      modal.classList.remove('show');
      startGame();
    });
  }

  // @description: function to playAgain button on modal
  function  playAgain() {
    againButton.addEventListener('click', function() {
      modal.classList.remove('show');
      startGame();
    });
  }

  // @description: function to activate restart button
  function restartGame() {
    restartButton.addEventListener('click', function() {
      startGame();
    });
  }

  // @description: add functions to card and run game
  cards.forEach(function(card) {
    card.addEventListener('click', function() {
      checkCard(card);
      if(pairCount === 8){
        winner();
      }
    });
  });

  // @description: start the game when the page is loaded
  startGame();

  /*
   * set up the event listener for a card. If a card is clicked:
   *  - display the card's symbol (put this functionality in another function that you call from this one)
   *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
   *  - if the list already has another card, check to see if the two cards match
   *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
   *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
   *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
   *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
   */

});
