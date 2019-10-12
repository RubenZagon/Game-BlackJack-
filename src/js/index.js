import { Deck } from './Elements/deck.js';
import { Player } from './Elements/players.js';



let deck = new Deck(),
gameDeck = deck.shuffle()

let player = new Player(),
    crupier = new Player()

let pointsPlayer, pointsCrupier

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
    points = points + playerObj.hand[i].value
  }
  return points
}


//Preguntar al jugador si continuar o no
const askPlayer = () => {
  let answer = 'y' //prompt('¿Pedir carta?: [y/n]', 'y')
  console.log(`Respuesta del jugador: ${answer}`)

  pointsPlayer = watchPunctuation(player)


  if (answer === 'y' && pointsPlayer != 21){
    player.pickCard(gameDeck)
  } else {
    console.log('%cJUGADOR se planta', 'background:green')
  }
}

// ######   FUNCION DE SEGUIMIENTO    ########
const mostrarPuntuaciones = () => {

  console.log('Player')
  console.table(player.hand)
  console.log('Crupier')
  console.table(crupier.hand)
  
  console.log(`Tamaño de la baraja: ${gameDeck.length}`)
  
  // Mostrar puntuación de las cartas
  pointsPlayer = watchPunctuation(player)
  pointsCrupier = watchPunctuation(crupier)
  console.log (`Puntuacion del jugador: ${pointsPlayer}`)
  console.log (`Puntuacion del crupier: ${pointsCrupier}`)

}

const notExceed21 = (playerValue) => {
  if (playerValue <= 21){
    return true
  } else {
    console.log('%cPierde JUGADOR por tener:' + pointsPlayer, 'background:red')
  }
}

const whoIsTheWinner = (pointsPlayer, pointsCrupier) => {
  if (pointsPlayer > pointsCrupier && notExceed21(pointsPlayer)){
    console.log('%cGana JUGADOR', 'background:green')
  }
}


firstRound()

//test despues de preguntar
mostrarPuntuaciones()

console.log('---------   2º RONDA   ---------')
askPlayer()

console.log('Player')
console.table(player.hand)
console.log(`poinsPlayer despues de ask: ${pointsPlayer = watchPunctuation(player)}`)

whoIsTheWinner(pointsPlayer, pointsCrupier)

console.log('---------   3º RONDA   ---------')
askPlayer()

console.log('Player')
console.table(player.hand)
console.log(`poinsPlayer despues de ask: ${pointsPlayer = watchPunctuation(player)}`)

whoIsTheWinner(pointsPlayer, pointsCrupier)







/*       TESTING PARA VER LA MANO DE LOS JUGADORES

console.log(player.hand[0].rank)
console.log(player.hand[0].stick)
console.log(player.hand[0].value)


*/

