import { Config } from './config.js';

export class Color{       
   /*  _state;
    get state() {
        return this._state;
    }
    set state(value) {
        this._state = value;
    }
    
    _modifiable;
    get modifiable() {
        return this._modifiable;
    }
    set modifiable(value) {
        this._modifiable = value;
    } */

    _color;
    get color() {
        return this._color;
    }
    set color(value) {
        this._color = value;
    }

    /**
     * 
     * @param {1 = red, 2 = blue, 3 = yellow, 4 = green, 5 = orange, 6 = pink} colorId 
     */    
    /* constructor(colorId){
        this.color = Config.COLORS[colorId];
    } */
    constructor(parameters){
        if(!parameters){
            return;
        }

        this.color = parameters.color;
        //this.state = parameters.state;
        //this.modifiable = parameters.modifiable;
    }

    getElement() {
        element = document.createElement('div');
        element.classList.add('cell');
        element.style.backgroundColor = this.color;
        return element;
    }
}