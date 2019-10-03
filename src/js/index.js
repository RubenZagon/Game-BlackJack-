/**
 *
 *
 * Se va probando el código JavaScript en https://repl.it/repls/PhysicalForestgreenLeads
 *
 *
 */

// Generar baraja
// ['1C', '5P', '7T' .....]
const sticks = ["C", "P", "R", "T"];

function generateRange() {
    let range = ['A', 'J', 'Q', 'K'];

    for (var i = 2; i <= 9; i++) {
        range.push(i);
    }

    return range;
}

function generateDeck(sticks) {
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

/**
 * Al pasarle un array, en este caso el array de la baraja completa, te la desorneda y vuelve a entregar desordenada.
 * @param {array} deck Función que te desordena tu array(Baraja)
 * @returns {array} Te devuelve el array desordenado
 */
function generateRandomDeck(deck) {
    let randomPosition, saveElementInActualPosition, positionActual;
    for (positionActual = deck.length - 1; positionActual > 0; positionActual--) {


        randomPosition = Math.floor(Math.random() * (positionActual + 1));
        saveElementInActualPosition = deck[positionActual];
        deck[positionActual] = deck[randomPosition];
        deck[randomPosition] = saveElementInActualPosition;
    }
    return deck;
}


console.log(generateRandomDeck(generateDeck(sticks)));
console.log('---------------------------------' + generateRandomDeck(generateDeck(sticks)).lenght)
