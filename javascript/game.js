import { Board } from 'board';
/* eslint-disable no-unused-vars */
export class Game {
  constructor() {
   this.board = new Board();
  }

  start() {
    this.board.init();
  }

  static getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  setColor(color) {
    if (this.currentGuessPosition < 4 && this.lose === false) {
      const element = document.createElement('div');
      element.className = 'cell';
      this.colors[this.currentGuessPosition] = color;
      this.currentGuessPosition++;
      element.style.backgroundColor = this.colorNames[color];
      document.getElementById('guess').appendChild(element);
    }
  }

  setCode(color) {
    const element = document.createElement('div');
    for (let i = 0; i < 4; i++) {
      const tmpElement = document.createElement('div');
      tmpElement.className = 'cell';
      tmpElement.style.backgroundColor = this.colorNames[color[i]];
      element.appendChild(tmpElement);
    }
  }

  generateSecret() {
    for (let i = 0; i < 4; i++) {
      this.secretCode[i] = this.getRandom(0, 5);
    }
    this.setCode(this.secretCode);
    /* console.log(secretCode); */
    document.getElementById('secret').appendChild(this.element);
  }

  winCheck() {
    for (let i = 0; i < 4; i++) {
      if (this.colors[i] !== this.secretCode[i]) {
        return;
      }
    }
    this.win = true;
  }

  setPegs() {
    for (let i = 0; i < 4; i++) {
      this.tmpSecretCode[i] = this.secretCode[i];
      this.tmpColors[i] = this.colors[i];
    }
    let fullMatch = 0;
    let partialMatch = 0;
    for (let i = 0; i < 4; i++) {
      if (this.tmpColors[i] === this.tmpSecretCode[i]) {
        this.tmpColors[i] = 6;
        this.tmpSecretCode[i] = 6;
        fullMatch++;
      }
    }
    for (let i = 0; i < 4; i++) {
      if (this.tmpColors[i] !== 6) {
        for (let j = 0; j < 4; j++) {
          if (this.tmpColors[i] === this.tmpSecretCode[j]) {
            partialMatch++;
            this.tmpSecretCode[j] = 6;
            break;
          }
        }
      }
    }
    for (let i = 0; i < fullMatch; i++) {
      this.tmpElement = document.createElement('div');
      this.tmpElement.className = 'peg';
      this.tmpElement.style.backgroundColor = 'white';
      this.element.appendChild(this.tmpElement);
    }
    for (let i = 0; i < partialMatch; i++) {
      this.tmpElement = document.createElement('div');
      this.tmpElement.className = 'peg';
      this.tmpElement.style.backgroundColor = 'black';
      this.element.appendChild(this.tmpElement);
    }
  }

  submit() {
    if (this.win === true) {
      return;
    }
    this.winCheck();
    if (this.colors.length < 4) {
      this.modalBg.classList.add('modal-active');
      this.modalErr.classList.add('modal-active');
      return;
    }
    this.setCode(this.colors);
    this.setPegs();
    document.getElementById(this.currentMainPosition).appendChild(this.element);
    document.getElementById('guess').innerHTML = '';
    this.colors.length = 0;
    this.currentGuessPosition = 0;
    this.currentMainPosition += 1;
    if (this.currentMainPosition > this.numberOfGuesses - 1 && this.win === false) {
      this.modalBg.classList.add('modal-active');
      this.modalLose.classList.add('modal-active');
      document.getElementById('secret').style.display = 'block';
      this.lose = true;
      return;
    }
    if (this.win === true) {
      document.getElementById('secret').style.display = 'block';
      this.modalBg.classList.add('modal-active');
      this.modalWin.classList.add('modal-active');
    }
  }
}
