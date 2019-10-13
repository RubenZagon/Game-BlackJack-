import { Deck } from './Elements/deck.js';
import { Player } from './Elements/players.js';



let deck = new Deck(),
gameDeck = deck.shuffle()

let player = new Player(),
    crupier = new Player()

let pointsPlayer, pointsCrupier


const containerCardsPlayer = document.querySelector('.cardsPlayer')

const buttons = {
  pedir: document.querySelector('.pedir'),
  plantarse: document.querySelector('.plantarse')
}



//Comienzo del juego
const firstRound = () => {

  player.pickCard(gameDeck)
  player.pickCard(gameDeck)

  player.renderCard(containerCardsPlayer)

  crupier.pickCard(gameDeck)

  pointsPlayer = watchPunctuation(player)
  if (pointsPlayer == 21){
    askPlayer()
  }
}

const refreshScore = (player, crupier) => {
  pointsPlayer = watchPunctuation(player)
  pointsCrupier = watchPunctuation(crupier)
}

//Valorar puntuación
const watchPunctuation = (playerObj) => {
  let points = 0

  for (let i = 0; i < playerObj.hand.length; i++){
    points = points + playerObj.hand[i].value
  }
  return points
}

const playerPickCard = () => {
  player.pickCard(gameDeck)
  player.renderCard(containerCardsPlayer)
  askPlayer()
}

//Preguntar al jugador si continuar o no
const askPlayer = (yesOrNot) => {
  let answer = yesOrNot
  
  pointsPlayer = watchPunctuation(player)
  whoIsTheWinner(pointsPlayer, pointsCrupier)

  if (pointsPlayer == 21) {
    console.log(`%c JUGADOR se planta por tener 21 `, 'background:black; color:white')
    disabledBtn()
  } if (answer == false ) {
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

const winPlayer = (pointsPlayer, pointsCrupier) => {
  if (pointsPlayer > pointsCrupier && notExceed21(pointsPlayer)){
    console.log('%c  Gana JUGADOR con: '+ pointsPlayer, 'background:white; color: green; font-size: 12px')
  } else {
    console.log ('paaaaasaaaando del jugador')
  }
}

const equalScore = (pointsPlayer, pointsCrupier) => {
  if (pointsPlayer === pointsCrupier && notExceed21(pointsPlayer)){
    console.log('%c  EMPATE con: '+ pointsPlayer, 'background:white; color: orange; font-size: 14px')
  } else {
    console.log ('paaaaasaaaando del igualdades')
  }
}

const whoIsTheWinner = (pointsPlayer, pointsCrupier) => {
  notExceed21(pointsPlayer)
  if (pointsPlayer === pointsCrupier){
    console.log('%c  EMPATE con: '+ pointsPlayer, 'background:white; color: orange; font-size: 14px')
    disabledBtn()
  } else {
    if (pointsPlayer > pointsCrupier){
      console.log('%c  Gana JUGADOR con: '+ pointsPlayer, 'background:white; color: green; font-size: 12px')
    } else {
      console.log('%c  Gana CRUPIER con: '+ pointsPlayer, 'background:white; color: red; font-size: 12px')
    }
  }
}

// IA del crupier
// - Despues de que el jugador se plane comienza su turno
// - Si tienes menos de 16 sigue pidiendo, y con 17 se planta

const crupierRound = () => {
  while (pointsCrupier <= 17){
    refreshScore(player, crupier)
    crupier.pickCard(gameDeck)
    roundGame()
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
  console.log (`Puntuacion del jugador: ${pointsPlayer}`)
  console.log (`Puntuacion del crupier: ${pointsCrupier}`)

}// ######  -FIN- FUNCION DE SEGUIMIENTO    ########


const roundGame = () => {
  
  let colorGuion = 'color: orange; font-size: 14px'

  console.log(`%c---------   SIGUIENTE RONDA   ---------`, colorGuion)
  
  console.log(`%c PLAYER `, 'color: red; font-size: 10px')
  console.table(player.hand)
  console.log(`%c CRUPIER `, 'color: violet; font-size: 10px')
  console.table(crupier.hand)
  
  whoIsTheWinner(pointsPlayer, pointsCrupier)
  
}


firstRound()

refreshScore(player, crupier)


//test despues de preguntar

//mostrarPuntuaciones()

const getCard = () => playerPickCard()
const passTurn = () => askPlayer(false)

buttons.pedir.addEventListener('click',getCard)
buttons.plantarse.addEventListener('click', passTurn)
buttons.plantarse.addEventListener('click', crupierRound)

//crupierRound()



