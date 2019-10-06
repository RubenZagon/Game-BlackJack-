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



const deck = () => {
    const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const sticks = ["C", "P", "R", "T"]; 
    let deck = [];
  
    this.getDeck = () =>{
      return this.setDeck();
    } 
  
    this.setDeck = () => {
      for (i = 0; i < ranks.length; i++) {
        for (j = 0; j < sticks.length; j++){
          
          let card = new Card({ //Declaramos el objeto carta
            'rank': ranks[i]
          });
  
          deck.push({ // Le definimos a cada carta un rango, un palo y un valor númerico para luego procesorlo en la puntuación.
            'rank': ranks[i],
            'stick': sticks[j],
            'value': card.getValue()
  
          });
        }
  
       return deck;
      }
    };
  
  }
  
  console.log(deck());
  