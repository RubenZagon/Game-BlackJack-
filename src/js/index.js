import { Deck } from './Elements/deck.js';
import { Player } from './Elements/players.js';



let deck = new Deck(),
gameDeck = deck.shuffle()

let player = new Player(),
    crupier = new Player()

let pointsPlayer, pointsCrupier


const CONTAINER = {
  CardsPlayer: document.querySelector('.cardsPlayer'),
  CardsCrupier: document.querySelector('.cardsCrupier')
}

const buttons = {
  pedir: document.querySelector('.pedir'),
  plantarse: document.querySelector('.plantarse')
}

const SCORE = {
  player: document.querySelector('.pointsPlayer'),
  crupier: document.querySelector('.pointsCrupier')
}

//Comienzo del juego
const firstRound = () => {

  player.pickCard(gameDeck)
  player.pickCard(gameDeck)
  player.renderCard(CONTAINER.CardsPlayer)

  crupier.pickCard(gameDeck)
  crupier.renderCard(CONTAINER.CardsCrupier)

  refreshScore(player, crupier)
  printScore()
  if (pointsPlayer == 21){
    askPlayer()
  }
}

const printScore = () => {
  SCORE.crupier.textContent = pointsCrupier
  SCORE.player.textContent = pointsPlayer
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
  player.renderCard(CONTAINER.CardsPlayer)
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

const whoIsTheWinner = (pointsPlayer, pointsCrupier) => {
  printScore()
  notExceed21(pointsPlayer)
  if (pointsPlayer === pointsCrupier){
    console.log('%c  EMPATE con: '+ pointsPlayer, 'background:white; color: orange; font-size: 14px')
    disabledBtn()
  } else {
    if (pointsPlayer > pointsCrupier){
      console.log('%c  Gana JUGADOR con: '+ pointsPlayer, 'background:white; color: green; font-size: 12px')
    } else {
      console.log('%c  Gana CRUPIER con: '+ pointsCrupier, 'background:white; color: red; font-size: 12px')
    }
  }
}

// IA del crupier
// - Despues de que el jugador se plane comienza su turno
// - Si tienes menos de 16 sigue pidiendo, y con 17 se planta

const crupierRound = () => {

    for (let i = 0; pointsCrupier < 15; i++){
      refreshScore(player, crupier)
      if (pointsCrupier < 16 ){
      crupier.pickCard(gameDeck)
      crupier.renderCard(CONTAINER.CardsCrupier)
      printScore()
      }
      whoIsTheWinner(pointsPlayer, pointsCrupier)
      roundGame() // <- borrable
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

  console.log(`%c   SIGUIENTE RONDA   `, colorGuion)
  
  console.log(`%c PLAYER `, 'color: red; font-size: 10px')
  console.table(player.hand)
  console.log(`%c CRUPIER `, 'color: violet; font-size: 10px')
  console.table(crupier.hand)
  
  whoIsTheWinner(pointsPlayer, pointsCrupier)
  
}


firstRound()




//test despues de preguntar

//mostrarPuntuaciones()

const getCard = () => playerPickCard()
const passTurn = () => askPlayer(false)

buttons.pedir.addEventListener('click',getCard)
buttons.plantarse.addEventListener('click', passTurn)
buttons.plantarse.addEventListener('click', crupierRound)

//crupierRound()



