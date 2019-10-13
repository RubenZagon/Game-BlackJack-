import { Deck } from './deck.js';
import { Render } from './render.js'

export class Player {
    constructor(h = []){
    this.hand  = h
    }

    pickCard (gameDeck) {
    let someCard = gameDeck.pop()

    this.hand.push(someCard)
    
    }
}