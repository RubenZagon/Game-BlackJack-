import { Deck } from './Elements/deck.js';
import { Player } from './Elements/players.js';
import { Render } from './Elements/render.js'


let deck = new Deck(),
gameDeck = deck.shuffle()

let player = new Player(),
    crupier = new Player()

let pointsPlayer, pointsCrupier


//##### Pruebas renderizado de carta
//['♥','♠','♦','♣']
let containerCardsPlayer = document.querySelector('.cardsPlayer')
let render = new Render('2','♦',containerCardsPlayer)
console.log (render)

render.renderCard()

//##### FIN Pruebas renderizado de carta


const buttons = {
  pedir: document.querySelector('.pedir'),
  plantarse: document.querySelector('.plantarse')
}

const renderCardsInHTML = (player, divContainer) => {
  let rank = player.rank,
      stick = player.stick,
      div = divContainer
  
  for (let i = 0; i < player.length; i++){
    let cardRenderized = new Render (rank, stick, div)
    
    cardRenderized.renderCard()
  }
}


//Comienzo del juego

const firstRound = () => {

  player.pickCard(gameDeck)
  player.pickCard(gameDeck)
  console.log(player)
  renderCardsInHTML(player, containerCardsPlayer)

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

const playerPickCard = () => {
  player.pickCard(gameDeck)
  askPlayer()
}

//Preguntar al jugador si continuar o no
const askPlayer = (yesOrNot) => {
  let answer = yesOrNot
  
  console.log(`Respuesta del jugador: %c ${answer}`, 'color:orange')

  pointsPlayer = watchPunctuation(player)
  roundGame()


  if (pointsPlayer == 21) {
    console.log(`%c JUGADOR se planta por tener 21 `, 'background:black; color:white')
    disabledBtn()
  } if (answer == false ) {
    console.log(`%c JUGADOR se planta con ${pointsPlayer} `, 'background:violet; color:teal')
    disabledBtn()
  } 
  //if (answer == true && pointsPlayer < 21){
  //  player.pickCard(gameDeck)
  //}
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

const getCard = () => playerPickCard()
const passTurn = () => askPlayer(false)

buttons.pedir.addEventListener('click',getCard)
buttons.plantarse.addEventListener('click', passTurn)



