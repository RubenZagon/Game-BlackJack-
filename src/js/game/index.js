import { Deck } from '../elements/Deck'

pokerRank = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
pokerSticks = ["C", "P", "R", "T"]; 

const PockerDeck = new Deck(pokerRank,pokerSticks)

const gameDeck = PockerDeck.createDeck()

console.log("DECK\n")
console.log(gameDeck)
console.log("SOME CARD\n")
console.log(gameDeck[1].card)
console.log("\n")