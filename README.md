# wdi-project1

Readme file for WDI Project 1.

I chose to program War, using HTML, CSS and JS.

## Comments

The key feature I spent most of the time on this project on how the game should
resolve ties. In the beginning, I used pre-filled dummy decks, constructing a
function that would grab the first element of each (simulating the flip), store it
into an array (putting the cards into play), comparing the values of the active
cards (resolving the trick) and then adding the array back into the winner's deck
(awarding the trick). The main motivation for this was to be able to resolve a
tie situation (War), wagering any number of cards, in an efficient way.

Later on, I moved on to using an object constructor to create arrays of card objects,
in anticipation of potential features that could be implemented with suits, card
values, etc.

#### war -- user stories

As a user, I want to be able to create a deck of cards that will allow me to play the game.

As a user, I want to be able to shuffle this deck of cards to ensure neither player starts out with an unfair advantage.

As a user, I want to be able to flip the top card of my deck and compare it against my opponent so I can play the game.

As a user, I want to be able to see the remaining number of cards in my deck so I can keep track of the game state.

As a user, I want to be informed when a ‘war’ is declared so that I can pay closer attention to an important game interaction.

As a user, I want to be informed when the game has ended so that I can choose to play again.

As a user, I want to see an overall game scoreboard so I can keep track of my W/L history in a single session.

As a user, I want to be able to change the themes of my cards so that I can individualize my experience.
