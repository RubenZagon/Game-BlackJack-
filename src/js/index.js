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
    disabledBtn()
  } if (answer == false ) {
    disabledBtn()
  } 
}

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
  if (pointsPlayer == 21 ) {
    disabledBtn()
  } else if (pointsPlayer === pointsCrupier){
    disabledBtn()
  } else if (pointsPlayer > 21){
    disabledBtn()
  } else if (pointsPlayer > pointsCrupier) {
    disabledBtn()
  } else {
    disabledBtn()
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
} else if (pPlayer > 21){
  WINNER.textContent ='Gana CRUPIER'
} else if (pPlayer > pCrupier) {
  WINNER.textContent ='Gana JUGADOR'
} else {
  WINNER.textContent ='Gana CRUPIER'
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