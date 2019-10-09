// REGLAS DEL JUEGO
// http://www.casino.es/blackjack/como-jugar-blackjack/

//Los comentarios para hacer el seguimiento de los procesos están diseñados principalmente para usar la consola de Chrome

// Crupier y jugador
// Se reparten 2 cartas para el jugador y una para el crupier, si no llega a 21 le preguntas al jugador si quiere seguir o se planta. Y tu como crupier hacer los mismo.
/*
- generar cartas (2 - 9 - J Q K A) / barajar
- Barajar
- Repartir cartas
- comprobar Puntuación
A = 1/11 (Si estoy por menos de 10 vale 11 y si estas por más de 10 entonces vale 1)
*/

// Generar baraja
// ['1C', '5P', '7T' .....]

/**
 * ################################
 * ################################
 *      NUEVO COMIENZO HACIENDO CLASES
 * ################################
 * ################################
 * 
 */

const RANKS = ['A','2','3','4','5','6','7','8','9','10','J','Q','K']
const STICKS = ['♥','♠','♦','♣']

class Card {
    constructor(r = '', s = '') {
      this.rank = r,
      this.stick = s
    }
}

class Deck {
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
        let card = new Card(RANKS[j], STICKS[i]);
        deck.push({
          card,
          'value': this.setValue(card)
        });
      }
    }  
    return deck;
  }

}


let deck = new Deck(),
    gameDeck = deck.generateDeck()

console.log(gameDeck)


