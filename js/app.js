document.addEventListener('DOMContentLoaded', function() {
  
});
/*
 * Create a list that holds all of your cards
 */
const diamond = document.getElementsByClassName('fa fa-diamond');
const plane = document.getElementsByClassName('fa fa-paper-plane-0');
const anchor = document.getElementsByClassName('fa fa-anchor');
const bolt = document.getElementsByClassName('fa fa-bolt');
const cube = document.getElementsByClassName('fa fa-cube');
const leaf = document.getElementsByClassName('fa fa-leaf');
const bicycle = document.getElementsByClassName('fa fa-bicycle');
const bomb = document.getElementsByClassName('fa fa-bomb');
const star = document.getElementsByClassName('fa fa-star');
const restart = document.getElementsByClassName('fa fa-repeat');
const cards = document.getElementsByClassName('card');
const cardsArray = Array.from(cards);

// Timer variables
const timer = document.getElementById('timer');
let second = 0;
let minute = 0;
timer.textContent = `${minute} minute 0${second} second`;







  

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */



// Function to start timer
function startTimer() {
  setInterval(function() {
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
};






// Shuffle function from http://stackoverflow.com/a/2450976
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
