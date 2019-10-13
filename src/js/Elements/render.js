// Clase con la que se generarán las cartas en el HTML

export class Render {

    constructor(rank = '',stick = '',containerCard){
        this.rank = rank,
        this.stick = stick,
        this.container = containerCard
    }

    renderCard(){
        let rank = this.rank,
            stick = this.stick,
            element = this.container

        //Aqui empezar a poner los comandos para construir la carta
        let div = document.createElement('div')
        cardIsRed(stick, div)
        div.textContent = `${rank}${stick}`
        element.appendChild(div)
    }
}

const cardIsRed = (stick, div) => {
    if (stick == '♥' || stick == '♦'){
        div.className = `card cardRed`
    } else {
        div.className = `card`
    }
}
