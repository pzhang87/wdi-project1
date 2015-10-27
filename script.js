var deck1, deck2, p1Card, p2Card;
var inPlay = [];
turns = 0;
var isRunning = false;

suits = ["C", "D", "H", "S"];
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
  deck1 = mainDeck.splice(0, 25);
  deck2 = mainDeck;
}

function startGame(){
  createDeck();
  shuffle(mainDeck);
  dealDecks();
  $("#battle").on("click", playTurn)
  isRunning = "true"
}

function playTurn(){
  advanceDeck(1);
  testArray = [];
  for (var i = 0; i < inPlay.length; i++) {
    testArray.push(inPlay[i].val);
    }
  console.log("In Play: " + testArray);
  updateDisplay();
  resolveBattle(p1Card, p2Card);
}

function updateDisplay(){
  $(".P1Text").html(p1Card.val + p1Card.suit);
  $(".P2Text").html(p2Card.val + p2Card.suit);
  $(".P1Deck").html("Cards Remaining: " + (deck1.length).toString());
  $(".P2Deck").html("Cards Remaining: " + (deck2.length).toString());
}

function advanceDeck(adv){
  for (var i = 0; i < adv; i++){
    p1Card = deck1.shift();
    p2Card = deck2.shift();
    inPlay.push(p1Card, p2Card);
    console.log(inPlay);
  }
}

function resolveBattle(p1Card, p2Card){
  if (p1Card.val > p2Card.val) {
    deck1 = deck1.concat(inPlay);
  }
  else if (p2Card.val > p1Card.val) {
    deck2 = deck2.concat(inPlay);
  }
  else {
    resolveWar();
  }
  inPlay = [];
}

function resolveWar(){
  alert("war declared")
  advanceDeck(3);
  resolveBattle(p1Card, p2Card);
  updateDisplay();

}

startGame();
