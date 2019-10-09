import { Card } from './Card'

export class Deck {

    RANKS;
    STICKS;
    
    constructor(Ranks, Sticks){
        this.RANKS = Ranks
        this.STICKS = Sticks
    }

    getValue(card){
        let rank = card.getRank();
        let value = 0;
    
        if (rank === 'A'){
            value = 11;
        }else if (rank === 'J'){
            value = 10;
        }else if (rank === 'Q'){
            value = 10;
        }else if (rank === 'K'){
            value = 10;
        }else{
            value = parseInt(rank);
        }
    
    return value;
    }

    createDeck(){
        let deck = [];

        for (let i = 0; i < this.RANKS.length; i++) {
            for (let j = 0; j < this.STICKS.length; j++){
                let card = new Card(this.RANKS[i],this.STICKS[j]);
                deck.push({
                    card,
                    'value': this.getValue(card)
                });
            }
        }
        return deck;
    };
};