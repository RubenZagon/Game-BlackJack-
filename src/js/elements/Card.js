class Card{

    rank;
    stick;

    constructor(Rank,Stick){
        this.rank = Rank;
        this.stick = Stick;
    }

    getRank = () => {
        return this.rank;
    }
    
    getStick = () => {
        return this.stick;
    }
    

}