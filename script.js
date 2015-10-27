var deck1, deck2, p1Card, p2Card;
var inPlay = [];
turns = 0;
var isRunning = false;

suits = ["E", "A", "W", "F"];
ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
val = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]

function Card(rank, suit, val) {
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

//copypasta shuffle code - Fischer-Yates

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

  // test decks
  // deck1 = [new Card("2", "A", "2"), new Card("3", "A", "3")]
  // deck2 = [new Card("2", "A", "2")]
}

function initGame(){
  deck1, deck2, p1Card, p2Card;
  inPlay = [];
  turns = 0;
  isRunning = false;

  createDeck();
  shuffle(mainDeck);
  dealDecks();
  $("#battle").on("click", playTurn)
  isRunning = true;

  $(".P1Text").html("Player 1");
  $(".P2Text").html("Player 2");
  $(".P1Deck").html("Cards Remaining: " + (deck1.length).toString());
  $(".P2Deck").html("Cards Remaining: " + (deck2.length).toString());
}

$("#newgame").on("click", initGame)
$("#p1shuffle").on("click", function(){
  shuffle(deck1);
});
$("#p2shuffle").on("click", function(){
  shuffle(deck2);
});

function playTurn(){
  if (isRunning) {
    advanceDeck(1);
    updateDisplay();

    //debug code
    testArray = [];
    for (var i = 0; i < inPlay.length; i++) {
      testArray.push(inPlay[i].val);
      }
    console.log("In Play: " + testArray);

    resolveBattle(p1Card, p2Card);
    checkWinner();
    updateDisplay();
    }
  }

function updateDisplay(){
  if ((p1Card && p2Card)) {
    $(".P1Text").html(p1Card.rank + p1Card.suit);
    $(".P2Text").html(p2Card.rank + p2Card.suit);
  }
  else {
    $(".P1Text").html("GAME OVER");
    $(".P2Text").html("GAME OVER");
  }
  $(".P1Deck").html("Cards Remaining: " + (deck1.length).toString());
  $(".P2Deck").html("Cards Remaining: " + (deck2.length).toString());
  //$("#contested_cards").html("Contested Cards: " + inPlay.length);
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
      alert(((deck1.length < deck2.length) ? "Player 1" : "Player 2") + " ran out of cards!")
      break;
    }
  }
}

function resolveBattle(p1Card, p2Card){
  if ((p1Card && p2Card)) {
    if (p1Card.val > p2Card.val) {
      deck1 = deck1.concat(inPlay);
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
  alert("war declared");
  advanceDeck(cardVal);
  $("#contested_cards").html("Contested Cards: " + inPlay.length);
  alert("resolve war");
  resolveBattle(p1Card, p2Card);

}

function checkWinner(){
  if (!(deck1.length && deck2.length)) {
    var winner = (deck1.length > deck2.length) ? ("Player 1") : ("Player 2")
    alert(winner + " won!");
    isRunning = false;
  }
}

//debug function

function deckStatus(deck){
  var checkedDeck = [];
  for (var i = 0; i < deck.length; i++) {
    checkedDeck.push(deck[i].val);
  }
  console.log(checkedDeck);
}

initGame();
