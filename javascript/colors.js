import { Color } from './color.js';
import { Config } from './config.js';

export class Colors{
    colors;
    index = 0;
    maxCount = 4;

    constructor(){
        
    }

    add(color){
        if(this.colors.Count() < this.maxCount){
            this.colors[this.index] = color;
            this.maxCount++;
        }
    }

    getElement() {
        element = document.createElement('div');
        colors.forEach(color => {
            element.appendChild(color.getElement())
        });
        return element;
    }
}