import { Deck } from './Elements/deck.js';
import { Player } from './Elements/players.js';


// ########    VARIABLES GLOBALES   ##############
let deck = new Deck(),
gameDeck = deck.shuffle()

let player = new Player(),
    crupier = new Player()

let pointsPlayer, pointsCrupier


// ########    SELECTORES HTML   ##############
const CONTAINER = {
  CardsPlayer: document.querySelector('.cardsPlayer'),
  CardsCrupier: document.querySelector('.cardsCrupier')
}

const BUTTONS = {
  pedir: document.querySelector('.pedir'),
  plantarse: document.querySelector('.plantarse'),
  restart: document.querySelector('.restart'),
  divBotonera: document.querySelector('.botonera')
}

const SCORE = {
  player: document.querySelector('.pointsPlayer'),
  crupier: document.querySelector('.pointsCrupier')
}

const WINNER = document.querySelector('.winner')

// ########    FUNCIONES   ##############
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

/*
CREACION DE BOTONES POR JAVASCRIPT no funciona la parte de addEventListener

const createButon = (className, text, ubication) => {
  let button = document.createElement('button')
  button.className = className
  button.textContent = text
  ubication.appendChild(button)
}

const addButtonsForPlayer = () =>{
  buttons.divBotonera.innerHTML = ''
  createButon('pedir', 'Pedir',buttons.divBotonera)
  createButon('plantarse', 'Plantarse',buttons.divBotonera)
}

const appendReset = () => {
  buttons.divBotonera.innerHTML = ''
  createButon('restart', 'Volver a jugar',buttons.divBotonera)
}
*/

const reload = () => {
  window.location.reload(false)
}

const disabledBtn = () => {
  BUTTONS.pedir.disabled = true;
  BUTTONS.plantarse.disabled = true;
  BUTTONS.pedir.classList.add('hidden')
  BUTTONS.plantarse.classList.add('hidden')
  BUTTONS.restart.classList.remove('hidden')
  BUTTONS.restart.addEventListener('click',reload)
  printInHTMLTheWinner(pointsPlayer, pointsCrupier)
}

const notExceed21 = (playerValue) => {
  if (playerValue <= 21){
    return true
  } else {
    disabledBtn()
  }
}

const whoIsTheWinner = (pointsPlayer, pointsCrupier) => {
  printScore()
  notExceed21(pointsPlayer)
  if (pointsPlayer === pointsCrupier){
    console.log('%c  EMPATE con: '+ pointsPlayer, 'background:white; color: orange; font-size: 14px')
    disabledBtn()
  } else if ((pointsPlayer > pointsCrupier)) {
    console.log('%c  Gana JUGADOR con: '+ pointsPlayer, 'background:white; color: green; font-size: 12px')
  } else {
    console.log('%c  Gana CRUPIER con: '+ pointsCrupier, 'background:white; color: red; font-size: 12px')
    }
}

const printInHTMLTheWinner = (pointsPlayer, pointsCrupier) => {

  let pPlayer = pointsPlayer,
      pCrupier = pointsCrupier
//¿Quien es el ganador?
if (pPlayer == 21 ) {
  WINNER.textContent ='BLACKJACK'
} else if (pPlayer === pCrupier){
  WINNER.textContent ='EMPATE'
} else if (pPlayer < pCrupier || pPlayer > 21) {
  WINNER.textContent ='Gana CRUPIER'
} else {
  WINNER.textContent ='Gana JUGADOR'
  }

// Imprime jugador en pantalla
  WINNER.classList.remove('hidden')
}

const crupierRound = () => {

// IA del crupier
// - Despues de que el jugador se plane comienza su turno
// - Si tienes menos de 16 sigue pidiendo, y con 17 se planta

    for (let i = 0; pointsCrupier < 15; i++){
      refreshScore(player, crupier)
      if (pointsCrupier < 16 ){
      crupier.pickCard(gameDeck)
      crupier.renderCard(CONTAINER.CardsCrupier)
      printScore()
      }
      whoIsTheWinner(pointsPlayer, pointsCrupier)
    }
}

firstRound()

const getCard = () => playerPickCard()
const passTurn = () => askPlayer(false)

BUTTONS.pedir.addEventListener('click',getCard)
BUTTONS.plantarse.addEventListener('click', passTurn)
BUTTONS.plantarse.addEventListener('click', crupierRound)




