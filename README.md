# wdi-project1

Readme file for WDI Project 1.

## Introduction

A game of War, featuring the four elements instead of boring old suits, and a
slightly modified tie rule to make things more interesting. Done in HTML, CSS and
Javascript.

Card objects are constructed with (value, suit, rank), and pushed into an array
for each player deck.  The top card of each player's deck is put in-play, and then
compared against the opponent's to decide which player is awarded the trick. In
the case of a tie, each player puts in cards equal to the value of the tied card,
with the last card determining who wins the trick. (Repeat in case of further ties.)

## Comments:

Overall not a bad project in terms of figuring out the game logic, but in retrospect
the design could use some serious work. CSS is a pain - I think there might be some
unneeded clearfixes or styling attributes. Also, from a UX/design perspective it
seems like there's potentially too much going on visually, and not enough to show
clear winner/loser.

Potential directions for refactor:
* updateDisplay function to take an argument of "player" to update information
* create a Player object constructor that contains player info + deck constructor

Potential directions for new features:
* Use setTimeout to better simulate cards being 'played' on the field
* Add a button to speed up things affected by setTimeout implementation

## Known Issues:
* resolveWar function continues to run after a player has run out of cards


#### appendix -- user stories

As a user, I want to be able to create a deck of cards that will allow me to play the game.

As a user, I want to be able to shuffle this deck of cards to ensure neither player starts out with an unfair advantage.

As a user, I want to be able to flip the top card of my deck and compare it against my opponent so I can play the game.

As a user, I want to be able to see the remaining number of cards in my deck so I can keep track of the game state.

As a user, I want to be informed when a ‘war’ is declared so that I can pay closer attention to an important game interaction.

As a user, I want to be informed when the game has ended so that I can choose to play again.

As a user, I want to see an overall game scoreboard so I can keep track of my W/L history in a single session.

As a user, I want to be able to change the themes of my cards so that I can individualize my experience.
