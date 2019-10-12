import { Deck } from './deck.js';

export class Player {
    constructor(h = []){
    this.hand  = h
    }

    pickCard (gameDeck) {
    let card = [],
        someCard = gameDeck.pop()
    
    this.hand.push(someCard)
    }
}
