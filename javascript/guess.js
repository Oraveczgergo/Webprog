import { Color } from 'color';

export class Guess{
    constructor(){
        this.index = 0;
        this.currentGuess = [];
    }
    setColor(color){
        this.currentGuess[this.index] = new Color(color);
        this.index++;
        document.getElementById('guess').appendChild(Color.getElement());
    }
    getElement() {
        element = document.createElement('div');
        currentGuess.forEach(color => {
            element.appendChild(color.getElement())
        });
        return element;
    }
}