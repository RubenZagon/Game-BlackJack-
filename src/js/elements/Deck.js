class Deck {

    RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    STICKS = ["C", "P", "R", "T"]; 

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

    getDeck(){
        let deck = [];

        for (let i = 0; i < this.RANKS.length; i++) {
            for (let j = 0; j < this.STICKS.length; j++){
                let card = new Card(this.RANKS[i],this.STICKS[j]);
                deck.push({
                    'card': card,
                    'value': this.getValue(card)
                });
            }
        }
        return deck;
    };
};