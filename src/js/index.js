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

import { Deck } from './Elements/deck.js';
import { Player } from './Elements/players.js';




let player = new Player(),
    crupier = new Player()

  let deck = new Deck(),
    gameDeck = deck.shuffle()



//Comienzo del juego
player.pickCard(gameDeck)
player.pickCard(gameDeck)

crupier.pickCard(gameDeck)

console.log('Player')
console.table(player.hand)
console.log('Crupier')
console.table(crupier.hand)

console.log(`Tamaño de la baraja: ${gameDeck.length}`)







/*       TESTING PARA VER LA MANO DE LOS JUGADORES

console.log(player.hand[0].rank)
console.log(player.hand[0].stick)
console.log(player.hand[0].value)


*/

