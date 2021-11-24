import { Game } from './game.js';
import { Config } from './config.js';
import { Guess } from './guess.js';

export class Board {
  constructor() {
    
  }

  static createContainer() {
    const container = document.createElement('div');
    const game = document.getElementById('game');

    container.setAttribute('id', 'container');
    container.classList.add('container');
    game.appendChild(container);
  }

  static createDisplay() {
    const display = document.createElement('div');
    const container = document.getElementById('container');

    display.classList.add('display');
    container.appendChild(display);
  }

  createRows() {
    const rows = document.createElement('div');
    const display = document.getElementById('display');

    rows.setAttribute('id', 'rows');
    rows.classList.add('rows');
    for (let i = 0; Config.MAX_GUESSES < i; i++) {
      const row = document.createElement('div');
      row.setAttribute('id', `row-id-${i}`);
      row.classList.add('row');
      rows.appendChild(row);
    }
    display.appendChild(rows);
  }

  createSelectableColors() {
    const colorContainer = document.createElement('div');
    const display = document.getElementById('display');

    colorContainer.setAttribute('id', 'color-container');
    colorContainer.classList.add('color-container');
    Object.keys(Config.COLORS).forEach((key) => {
      const color = document.createElement('div');
      color.setAttribute('id', key);
      color.classList.add('color');
      //color.style.backgroundColor = this.colors[key];

      colorContainer.appendChild(color);
    });
    display.appendChild(colorContainer);
  }

  createButtons() {
    const colorContainer = document.getElementById('color-container');
    const colors = colorContainer.querySelectorAll('div.color');
    colors.forEach((color) => {
      const button = document.createElement('button');
      button.onclick = function () {
        Guess.setColor(color.id);
      };
      color.appendChild(button);
    });
  }

  createGuessArea() {
    const guessArea = document.createElement('div');
    const guessContainer = document.createElement('div');
    const display = document.getElementById('display');

    guessArea.classList.add('guess');
    guessContainer.classList.add('guessContainer');
    guessContainer.setAttribute('id', 'guess');

    guessArea.appendChild(guessContainer);
    display.appendChild(guessArea);
  }

  createSubmitArea() {
    const submitArea = document.createElement('div');
    const submitButton = document.createElement('button');
    const display = document.getElementById('display');

    submitArea.classList.add('submitArea');
    submitButton.classList.add('bSubmit');
    submitButton.onclick = function() {
      Game.submit(Guess.currentGuess);
      Guess = new Guess();
    }

    submitArea.appendChild(submitButton);
    display.appendChild(submitArea);
  }

  //todo: szétszedni
  createModalDialogs() {
    const modalBackground = document.createElement('div');
    const game = document.getElementById('game');
    const modalLose = document.createElement('div');
    const modalWin = document.createElement('div');
    const modalErr = document.createElement('div');
    const loseText = document.createElement('h2');
    const winText = document.createElement('h2');
    const errText = document.createElement('h1');
    const errCloseButton = document.createElement('button');

    modalBackground.classList.add('modal-bg');
    modalLose.classList.add('modal-lose');
    modalWin.classList.add('modal-win');
    modalErr.classList.add('modal-err');
    loseText.innerText = 'Vesztettél!';
    winText.innerText = 'Nyertél!';
    errText.innerText = 'Töltsd ki a színeket előbb!';
    errCloseButton.classList.add('bClose');
    errCloseButton.onclick = this.closeModal();
    errCloseButton.innerText = 'Bezár';

    modalLose.appendChild(loseText);
    modalWin.appendChild(winText);
    modalErr.appendChild(errText);
    modalErr.appendChild(errCloseButton);
    modalBackground.appendChild(modalLose);
    modalBackground.appendChild(modalWin);
    modalBackground.appendChild(modalErr);
    game.appendChild(modalBackground);
  }

  init() {
    this.createContainter();
    this.createRows();
    this.createSelectableColors();
    this.createButtons();
    this.createModalDialogs();
  }
}
