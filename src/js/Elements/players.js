import { Deck } from './deck.js';

export class Player {
    constructor(h = []){
    this.hand  = h
    }

    pickCard (gameDeck) {
    let someCard = gameDeck.pop()

    this.hand.push(someCard)
    }

    renderCard(divContainer){
        divContainer.innerHTML = '' //Borra contenido
        
        for (let pos = 0; pos < this.hand.length; pos++){
            let rank = this.hand[pos].rank,
                stick = this.hand[pos].stick,
                element = divContainer

            //Construir carta en HTML
            let div = document.createElement('div')
            cardIsRed(stick, div)
            div.textContent = `${rank}${stick}`
            element.appendChild(div)
        } 
    }
}

const cardIsRed = (stick, div) => {
    if (stick == '♥' || stick == '♦'){
        div.className = `card cardRed`
    } else {
        div.className = `card`
    }
}