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

const sticks = ["C", "P", "R", "T"];

const generateRange = () => {
  let range = ['A', 'J', 'Q', 'K'];

  for (var i = 2; i <= 10; i++) {
    range.push(i);
  }

  return range;
}

// console.log (generateRange()); <---------------------------------------  UNCOMMENT

const generateDeck = (sticks) => {
  let deck = [];
  let range = generateRange();

  for (var i = 0; i < sticks.length; i++) {
    for (var j = 0; j < range.length; j++) {
      let card = range[j] + sticks[i];
      deck.push(card);
    }
  }  

  return deck;
}


const generateRandomDeck = (deck) => {
    let randomPosition, saveElementInActualPosition, positionActual;
    for (positionActual = deck.length - 1; positionActual > 0; positionActual--) {

        randomPosition = Math.floor(Math.random() * (positionActual + 1));
        saveElementInActualPosition = deck[positionActual];
        deck[positionActual] = deck[randomPosition];
        deck[randomPosition] = saveElementInActualPosition;

    }
    return deck;
}

let deckForPlay = generateRandomDeck(generateDeck(sticks));


// console.log(deckForPlay);   <---------------------------------------  UNCOMMENT


// Repartimos cartas
// - Son 2 cartas al jugador y 1 al crupier al inicar una partida.
let cardsPlayer = []
let cardsCrupier = [];

const getCardOfDeck = (deck) => {
   return deck.pop();
}

const firstRound = (jugador, crupier) => {
    jugador.push(getCardOfDeck(deckForPlay));
    jugador.push(getCardOfDeck(deckForPlay));

    crupier.push(getCardOfDeck(deckForPlay));
    return;
}

firstRound(cardsPlayer, cardsCrupier); // Repardo 2 cartas al jugador y 1 al crupier

let colorPlayer = '#ffac33';
let colorCrupier = '#d1ff33';
console.log(`%cCartas del jugador: ${cardsPlayer}`,'background:' + colorPlayer);
console.log(`%cCartas del crupier: ${cardsCrupier}`, 'background:' + colorCrupier);
console.log(`Tamaño de la baraja actual: ${deckForPlay.length}`);

// #############################################  CALCULO DE PUNTUACIÓN
/**
 * 
 * Aquí me funciona ahora mismo el que me sume el contenido del Array si tiene números, pero ahora tengo que hacer que cuando lea 'J', 'Q', 'K' los tome como 10 de valor.
 * 
 */

let pointsPlayer = 0;

let separar = (array) =>{
  //recorrer el array o que nos de el elemento index primero del string
  let conjunto = [];

  for (i = 0; i < cardsPlayer.length ; i++) {

    let numb = parseInt(cardsPlayer[i].substr(0, 1));
      conjunto.push(numb);
  }
  return conjunto
}

let sumarArray = (arrayASumar) => {
  let add = 0;

  for (i = 0 ; i < arrayASumar.length; i++) {
    add = add + arrayASumar[i];
  }
  return add;
}

pointsPlayer = sumarArray(separar(cardsPlayer));

console.log(pointsPlayer);

// #################################################   

