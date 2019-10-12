import { Deck } from './Elements/deck.js';
import { Player } from './Elements/players.js';


let deck = new Deck(),
gameDeck = deck.shuffle()

let player = new Player(),
    crupier = new Player()

let pointsPlayer, pointsCrupier

const buttons = {
  pedir: document.querySelector('.pedir'),
  plantarse: document.querySelector('.plantarse')
}


//Comienzo del juego

const firstRound = () => {

  player.pickCard(gameDeck)
  player.pickCard(gameDeck)

  crupier.pickCard(gameDeck)

  pointsPlayer = watchPunctuation(player)
  if (pointsPlayer == 21){
    askPlayer()
  }
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
const askPlayer = (yesOrNot = 'no') => {
  let answer = yesOrNot
  
  console.log(`Respuesta del jugador: %c ${answer}`, 'color:orange')

  pointsPlayer = watchPunctuation(player)
  roundGame()

  if (answer === 'yes' && pointsPlayer < 21){
    player.pickCard(gameDeck)
    
  } if (pointsPlayer == 21) {
    console.log(`%c JUGADOR se planta por tener 21 `, 'background:black; color:white')
    disabledBtn()
  } else {
    console.log(`%c JUGADOR se planta con ${pointsPlayer} `, 'background:violet; color:teal')
    disabledBtn()
  } 
}

const disabledBtn = () => {
  buttons.pedir.disabled = true;
  buttons.plantarse.disabled = true;
}

const notExceed21 = (playerValue) => {
  if (playerValue <= 21){
    return true
  } else {
    console.log('%c  Pierde JUGADOR por tener:  ' + pointsPlayer, 'background:white; color: red; font-size: 12px')
    disabledBtn()
  }
}

const whoIsTheWinner = (pointsPlayer, pointsCrupier) => {
  if (pointsPlayer > pointsCrupier && notExceed21(pointsPlayer)){
    console.log('%c  Gana JUGADOR con: '+ pointsPlayer, 'background:white; color: green; font-size: 12px')
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

}// ######   FUNCION DE SEGUIMIENTO    ########


const roundGame = () => {
  
  let colorGuion = 'color: orange; font-size: 14px'

  console.log(`%c---------   SIGUIENTE RONDA   ---------`, colorGuion)
  
  //console.log('Player')
  console.table(player.hand)
  
  whoIsTheWinner(pointsPlayer, pointsCrupier)
  
}


firstRound()

//test despues de preguntar
mostrarPuntuaciones()

const getCard = () => askPlayer('yes')
const passTurn = () => askPlayer('no')

buttons.pedir.addEventListener('click',getCard)
buttons.plantarse.addEventListener('click', passTurn)






/*       TESTING PARA VER LA MANO DE LOS JUGADORES

console.log(player.hand[0].rank)
console.log(player.hand[0].stick)
console.log(player.hand[0].value)

*/

