import { Deck } from './Elements/deck.js';
import { Player } from './Elements/players.js';



let deck = new Deck(),
gameDeck = deck.shuffle()

let player = new Player(),
    crupier = new Player()

//Comienzo del juego

const firstRound = () => {

  player.pickCard(gameDeck)
  player.pickCard(gameDeck)

  crupier.pickCard(gameDeck)
}


//Valorar puntuación
const watchPunctuation = (playerObj) => {
  let points = 0

  for (let i = 0; i < playerObj.hand.length; i++){
    points += playerObj.hand[i].value
  }
  return points
}

//Preguntar al jugador si continuar o no
const askPlayer = () => {
  let answer = 'y' //prompt('¿Pedir carta?: [y/n]', 'y')
  console.log(`Respuesta del jugador: ${answer}`)
  if (answer === 'y'){player.pickCard(gameDeck)}
}

// ######   FUNCION DE SEGUIMIENTO    ########
const mostrarPuntuaciones = () => {

  console.log('Player')
  console.table(player.hand)
  console.log('Crupier')
  console.table(crupier.hand)
  
  console.log(`Tamaño de la baraja: ${gameDeck.length}`)
  
  // Mostrar puntuación de las cartas
  console.log (`Puntuacion del jugador: ${pointsPlayer}`)
  console.log (`Puntuacion del crupier: ${pointsCrupier}`)

}

const whoIsTheWinner = () => {
  
}


firstRound()

//test
mostrarPuntuaciones()

let pointsPlayer = watchPunctuation(player),
    pointsCrupier = watchPunctuation(crupier)

askPlayer()

//test despues de preguntar
mostrarPuntuaciones()





  //Si jugador continua, dar otra carta y valorar puntuación







/*       TESTING PARA VER LA MANO DE LOS JUGADORES

console.log(player.hand[0].rank)
console.log(player.hand[0].stick)
console.log(player.hand[0].value)


*/

