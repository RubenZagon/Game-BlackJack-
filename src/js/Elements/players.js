import { Deck } from './deck.js';
import { Render } from './render.js'

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