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

// #############################################  PRUEBAS

// probar a quitar el palo mediante un RegExp
const encontrarNumeros = (array) => {
    let regext = RegExp('\d','g');

    let encontrado = regext.exec(array)
    console.log(`entontré esto: ${encontrado}`);
return
}
let text = 'ora que tal 2113';
encontrarNumeros(text); // Sin buenos resultados

// Probar a sumar solo los números del array
const reducer = (accumulator, currentValue) => {
    parseInt(accumulator) + parseInt(currentValue);
}
    console.log(cardsPlayer.reduce(reducer));  //No coge bien los números porque estan acompañados de los palos

// Probar usar función .find para encontrar solo los números y separarlos del Array
var found = cardsPlayer.find(function(element) {
    return element > 'JC';
});

console.log(found); // Te devuelve el elemento completo,sin separar

// #################################################   
 
const addOfCards = (cards) => {
    let add = 0;
    for (i = 0; i < cards.length; i ++){

    }
}

