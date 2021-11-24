import { Pegs } from 'pegs';
import { Peg } from 'peg';
import { SecretCode } from 'secretCode';
import { Colors } from 'colors';
export class Row{

    _index;
    get index() {
        return this._index;
    }
    set index(value) {
        this._index = value;
    }

    _colors;
    get colors() {
        return this._colors;
    }
    set colors(value) {
        this._colors = value;
    }

    _pegs;
    get pegs() {
        return this._pegs;
    }
    set pegs(value) {
        this._pegs = value;
    }

    _tmpSecretCode;
    get tmpSecretCode() {
        return this._tmpSecretCode;
    }
    set tmpSecretCode(value) {
        this._tmpSecretCode = value;
    }

    constructor(index, colors, pegs, secretCode){
        this.index = index;
        this.colors = colors;
        this.pegs = pegs;
        this.tmpSecretCode = secretCode;
    }

    setPegs() {
        for (let i = 0; i < 4; i++) {
          tmpSecretCode[i] = secretCode[i];
          tmpColors[i] = colors[i];
        }
        let fullMatch = 0;
        let partialMatch = 0;
        for (let i = 0; i < 4; i++) {
          if (tmpColors[i] === tmpSecretCode[i]) {
            tmpColors[i] = 6;
            tmpSecretCode[i] = 6;
            fullMatch++;
          }
        }
        for (let i = 0; i < 4; i++) {
          if (tmpColors[i] !== 6) {
            for (let j = 0; j < 4; j++) {
              if (tmpColors[i] === tmpSecretCode[j]) {
                partialMatch++;
                tmpSecretCode[j] = 6;
                break;
              }
            }
          }
        }
        for (let i = 0; i < fullMatch; i++) {
          tmpElement = document.createElement('div');
          tmpElement.className = 'peg';
          tmpElement.style.backgroundColor = 'white';
          element.appendChild(tmpElement);
        }
        for (let i = 0; i < partialMatch; i++) {
          tmpElement = document.createElement('div');
          tmpElement.className = 'peg';
          tmpElement.style.backgroundColor = 'black';
          element.appendChild(tmpElement);
        }
    }
}