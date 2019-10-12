import { Deck } from './deck.js';

export class Player {
    constructor(h = []){
    this.hand  = h
    }

    pickCard () {
    let card = [],
        someCard = gameDeck.pop()
    
    this.hand.push(someCard)
    }
}

let deck = new Deck(),
    gameDeck = deck.shuffle()