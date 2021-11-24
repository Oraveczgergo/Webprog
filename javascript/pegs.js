import { Peg } from 'peg';
export class Pegs{
    pegs;
    index = 0;
    maxCount = 4;

    constructor(){
        
    }
    /* setPegs() {
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
    } */
}