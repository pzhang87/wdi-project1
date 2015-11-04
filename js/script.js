// NHO: Would be good idea, and best practice to wrap our code in a document.ready function:
$(document).ready(function(){

// NHO: In general, would caution against setting defaults in the global scope.
// How could we store these values under a different name space?
var deck1, deck2, p1Card, p2Card;
var inPlay = [];
turns = 0;
var isRunning = false;
var animations = true;
var turnWinner;

suits = [Earth = {
    name: "Earth",
    abrv: "E",
    color: "#224422",
    img: "images/earth.jpg"
  },
  Air = {
    name: "Air",
    abrv: "A",
    color: "#CCCCDD",
    img: "images/air.jpg"
  },
  Water = {
    name: "Water",
    abrv: "W",
    color: "#0000CC",
    img: "images/water.jpg"
  },
  Fire = {
    name: "Fire",
    abrv: "F",
    color: "#990000",
    img: "images/fire.jpg"
  }];
ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
val = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]

function Card(rank, suit, val) { // NHO: Love this constructor function, nice!
  this.rank = rank;
  this.suit = suit;
  this.val = val;
}

function createDeck(){
  mainDeck = [];
  for (var i = 0; i < suits.length; i++) {
    for (var j = 0; j < ranks.length; j++) {
      newCard = new Card(ranks[j], suits[i], val[j])
      mainDeck.push(newCard);
    }
  }
}

//copypasta shuffle code - Fischer-Yates // NHO: as long as you feel comfortable explaining it


function shuffle(array) {
    var counter = array.length, temp, index;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

function dealDecks(){
  deck1 = mainDeck.splice(0, 26);
  deck2 = mainDeck;

//  NHO: remember to remove unused code
  // test decks
  // deck1 = [new Card("2", "A", "2"), new Card("3", "A", "3")]
  // deck2 = [new Card("2", "A", "2")]
}

function initGame(){ // NHO: really liked how you organized your code in this function!
  deck1, deck2, p1Card, p2Card;
  inPlay = [];
  turns = 0;
  isRunning = false;

  createDeck();
  shuffle(mainDeck);
  dealDecks();
  isRunning = true;

  $(".P1Text").removeClass("hide");
  $(".P2Text").removeClass("hide");


  $("#p1shuffle").on("click", function(){
    shuffle(deck1);
  });
  $("#p2shuffle").on("click", function(){
    shuffle(deck2);
  });
  playTurn();
}

function playTurn(){ // NHO: Very clear procedural code, nice job breaking these steps into seperate functions!
  if (isRunning) {
    clearAnimations();
    advanceDeck(1);
    updateDisplay();

    resolveBattle(p1Card, p2Card);
    updateAnimations();
    checkWinner();
    updateDisplay();
    }
  else {
      initGame();
    }
  }

function updateDisplay(){ // NHO: I find myself thinking this would be increadibly useful as a method on an object!
  if ((p1Card && p2Card)) {
    $(".P1Text").html(p1Card.rank + p1Card.suit.abrv); // NHO: really liked how you mapped a card's relevant values to an object
    $(".P2Text").html(p2Card.rank + p2Card.suit.abrv);
    $(".P1Image").css("background-color", p1Card.suit.color);
    $(".P2Image").css("background-color", p2Card.suit.color);
    $("#P1cardface").attr("src", p1Card.suit.img)
    $("#P2cardface").attr("src", p2Card.suit.img)
  }
  else {
    $(".P1Text").html("GAME OVER");
    $(".P2Text").html("GAME OVER");
  }
  $(".P1Deck").html("Cards Remaining: " + (deck1.length).toString());
  $(".P2Deck").html("Cards Remaining: " + (deck2.length).toString());
}

function advanceDeck(adv){
  for (var i = 0; i < adv; i++){
    p1Card = deck1.shift();
    p2Card = deck2.shift();
    if (p1Card && p2Card){
      inPlay.push(p1Card, p2Card);
      testArray = [];
      for (var j = 0; j < inPlay.length; j++) {
        testArray.push(inPlay[j].val);
      }
      console.log(testArray);
    }
    else {
      alert(((deck1.length < deck2.length) ? "Player 1" : "Player 2") + " ran out of cards!") // NHO: nice ternary!
      break;
    }
  }
}

function resolveBattle(p1Card, p2Card){
  updateDisplay();
  if ((p1Card && p2Card)) {
    if (p1Card.val > p2Card.val) {
      deck1 = deck1.concat(inPlay); // NHO: first well utilized use-case for concat I've seen!
    }
    else if (p2Card.val > p1Card.val) {
      deck2 = deck2.concat(inPlay);
    }
    else {
      resolveWar(p1Card.val);
    }

    inPlay = [];
  }
}

function resolveWar(cardVal){
  updateDisplay();
  alert("War!")
  advanceDeck(cardVal); // NHO: interesting spin on the game of war, I like it!
  alert(cardVal + " cards set!");
  resolveBattle(p1Card, p2Card);

}

function checkWinner(){
  if (!(deck1.length && deck2.length)) {
    var gameWinner = (deck1.length > deck2.length) ? ("Player 1") : ("Player 2")
    alert(gameWinner + " won!");
    isRunning = false;
  }
}

function clearAnimations(){
  $(".P1Image").removeClass("turnWinner turnLoser")
  $(".P2Image").removeClass("turnWinner turnLoser")
}
  // NHO: Really like this feature to enhance the user experience!
function updateAnimations(){
  if (p1Card.val < p2Card.val) {
    $(".P1Image").addClass("turnLoser");
    $(".P2Image").addClass("turnWinner");
  }
  else {
    $(".P1Image").addClass("turnWinner");
    $(".P2Image").addClass("turnLoser");
  }
}

//debug function
// NHO: I noticed some of the `cards` are unevenely removed from the `deck`.
// i.e. The final display after a game consistently showed less than 52 cards in total?
function deckStatus(deck){
  var checkedDeck = [];
  for (var i = 0; i < deck.length; i++) {
    checkedDeck.push(deck[i].val);
  }
  console.log(checkedDeck);
}

$("#newgame").on("click", initGame)
$("#battle").on("click", playTurn)
$("#secret").on("click", function(){
  alert("You've activated my trap card!")
  document.location="https://www.youtube.com/watch?v=3Wyn1nH8XZ4" // NHO: Classic!
});

}); // close document.ready

// NHO: Overall, great job! Something to think about moving forward:
// How could you refactor this to take an OOJS approach?
