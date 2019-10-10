// Clase del objeto deck y cards

const RANKS = ['A','2','3','4','5','6','7','8','9','10','J','Q','K']
const STICKS = ['♥','♠','♦','♣']

export class Card {
    constructor(r = '', s = '') {
      this.rank = r,
      this.stick = s
    }

    getRank () {
      return this.rank
    }
}

export class Deck {
  constructor(b){
    this.deck = b
  }

  setValue (card) {
    let rank = card.rank
    let  value = 0
    
    switch (rank) {
      case 'A':
        value = 11
        break
      case 'J':
        value = 10
        break
      case 'Q':
        value = 10
        break
      case 'K':
        value = 10
        break
      default:
        value = parseInt(rank)
    }
    return value
  }

  generateDeck () {
    let deck = [];
  
    for (var i = 0; i < STICKS.length; i++) {
      for (var j = 0; j < RANKS.length; j++) {
        let card = new Card(RANKS[j]);
        deck.push({ //Tengo que hacerlo así para poder leer luego los valores de 'rank', 'stick', y 'value' sin que me salga undefined
          'rank': RANKS[j],
          'stick': STICKS[i],
          'value': this.setValue(card)
        });
      }
    }  
    return deck;
  }

  shuffle () {
    let deck = this.generateDeck()
    let shuffled = []
    

    while(deck.length > 0) {
      let randomPosition = Math.floor(Math.random() * deck.length)
      
      shuffled.unshift(deck[randomPosition])
      deck.splice(randomPosition, 1)
    }
    return shuffled
  }
}