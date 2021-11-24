import { Colors } from 'colors';
import { Color } from 'color';
export class secretCode{

    _code;
    get code() {
        return this._code;
    }
    set code(value) {
        this._code = value;
    }

    constructor(){
        this.code = new Colors();
    }

    /**
    * Előállítja a titkos kódot amit ki kell majd találni
    */
    generateSecret() {
        for (let i = 0; i < 4; i++) {
          color = new Color(this.getRandom(0, 5));
          code.add(color);
        }        
        document.getElementById('secret').appendChild(code.getElement());
    }

    /**
    * Random szám generátor
    * @param {int} min alsó határ
    * @param {int} max felső határ
    * @returns Véletlenszerű érték a két határ között
    */
    getRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}