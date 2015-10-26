var deck1 = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
var deck2 = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
var inPlay = [];
turns = 0;

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

function startGame(){
  shuffle(deck1);
  shuffle(deck2);
}

function playCard(){
  var p1Card = deck1.shift();
  var p2Card = deck2.shift();
  inPlay.push(p1Card);
  inPlay.push(p2Card);
  $(".P1Text").html(p1Card);
  $(".P2Text").html(p2Card);
  console.log("In Play: " + inPlay);
  $(".P1Deck").html("Cards Remaining: " + (deck1.length).toString());
  $(".P2Deck").html("Cards Remaining: " + (deck2.length).toString());
  checkBattle(p1Card, p2Card);
  console.log("Deck 1: " + deck1);
  console.log("Deck 2: " + deck2);

}

function checkBattle(p1Card, p2Card){
  if (p1Card > p2Card) {
    deck1 = deck1.concat(inPlay);
  }
  else if (p2Card > p1Card) {
    deck2 = deck2.concat(inPlay);
  }
  else {
    console.log("war occurs");
  }
  inPlay = [];
}

// function declareWar(){
//
// }

$("#battle").on("click", playCard)
startGame();
