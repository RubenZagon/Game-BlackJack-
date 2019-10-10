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

import {Deck} from './Elements/deck.js'

class Player {
  constructor(hand){
    hand  = hand
  }

  pickCard (deckShuffled){
  
  }
}


let deck = new Deck(),
    gameDeck = deck.shuffle()
    
/*       TESTING PARA VER EL DECK
console.log(gameDeck)

let someCard = gameDeck.pop()


console.log(`Some card: ${someCard.rank}`)
console.log(`Some card: ${someCard.stick}`)
console.log(`Some card: ${someCard.value}`)
console.log(someCard)
*/

