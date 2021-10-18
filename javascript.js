let lose = false;
let win = false;
/** Html elemet tárol */
let element = document.createElement('div');
/** Ideiglenes HTML elem tároló, ebben rakom össze a div-eket amik az element-be kerülnek */
let tmpElement = document.createElement('div');
/** A betippelt kódsorozat jelenlegi értékének indexét tárolja. */
let currentGuessPosition = 0;
/** A tippeket tartalmazó sor indexét tárolja ahova következőnek kerülni fognak a színek */
let currentMainPosition = 0;
/** Tömb ami egy színeketet reprezentáló szám sorozatot tárol */
const colors = [];
/** Tömb ami egy színeketet reprezentáló szám sorozatot tárol */
const tmpColors = [];
/** Tömb ami egy színeketet reprezentáló szám sorozatot tárol */
const secretCode = [];
/** Tömb ami egy színeketet reprezentáló szám sorozatot tárol */
const tmpSecretCode = [];
// const pegs = [];
const colorNames = ['red', 'blue', 'yellow', 'green', 'orange', 'pink'];
const modalBg = document.querySelector('.modal-bg');
const modalLose = document.querySelector('.modal-lose');
const modalWin = document.querySelector('.modal-win');
const modalErr = document.querySelector('.modal-err');

/**
 * Random szám generátor
 * @param {int} min alsó határ
 * @param {int} max felső határ
 * @returns Véletlenszerű érték a két határ között
 */
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// eslint-disable-next-line no-unused-vars
function closeModal() {
  /* modalBg.removeEventListener('click'); */
  modalBg.classList.remove('modal-active');
  modalErr.classList.remove('modal-active');
}

/**
 * A megadott számokat tartalmazó tömb alapján előállítja és kiírja a megfelelő
 * HTML element-et az element változóba.
 * A sorok illetve a megoldás megjelenítésére használt.
 * @param {int[]} color -tömb ami a színeket reprezentáló számokat tartalmazza
 */
function setCode(color) {
  element = document.createElement('div');
  for (let i = 0; i < 4; i += 1) {
    tmpElement = document.createElement('div');
    tmpElement.className = 'cell';
    tmpElement.style.backgroundColor = colorNames[color[i]];
    element.appendChild(tmpElement);
  }
}

/**
 * Előállítja a titkos kódot amit ki kell majd találni
 */
function generateSecret() {
  for (let i = 0; i < 4; i += 1) {
    secretCode[i] = getRandom(0, 5);
  }
  setCode(secretCode);
  console.log(secretCode);
  document.getElementById('secret').appendChild(element);
}

/**
 * A html element-et állítja elő ami a gombok lenyomására azonnal megjeleníti a megfelelő színt,
 * valamint beállítja a colors tömb értkékeit is, a lenyomott gomb alapján.
 * @param {int} color -A szám amit a gombok adnak át lenyomáskor, egy színt reprezentál
 */
// eslint-disable-next-line no-unused-vars
function setColor(color) {
  if (currentGuessPosition < 4 && lose === false) {
    element = document.createElement('div');
    element.className = 'cell';
    colors[currentGuessPosition] = color;
    currentGuessPosition += 1;
    element.style.backgroundColor = colorNames[color];
    document.getElementById('guess').appendChild(element);
  }
}

/**
 * A győzelem feltételét ellenőrzi. Ha a betippelt színek kódja
 * megegyezik a titkos kóddal, igazra állítja a win változót,
 * egyébként nem tesz semmit és visszatér.
 */
function winCheck() {
  for (let i = 0; i < 4; i += 1) {
    if (colors[i] !== secretCode[i]) {
      return;
    }
  }
  win = true;
}

/**
 * Az element változóhoz hozzáadja a peg-eket ábrázoló div-eket.
 * Külön tmp változókat használ, mert módosítja őket ellenőrzés közben.
 */
function setPegs() {
  for (let i = 0; i < 4; i += 1) {
    tmpSecretCode[i] = secretCode[i];
    tmpColors[i] = colors[i];
  }
  let white = 0;
  let black = 0;
  for (let i = 0; i < 4; i += 1) {
    if (tmpColors[i] === tmpSecretCode[i]) {
      tmpColors[i] = 6;
      tmpSecretCode[i] = 6;
      white += 1;
    }
  }
  for (let i = 0; i < 4; i += 1) {
    if (tmpColors[i] !== 6) {
      for (let j = 0; j < 4; j += 1) {
        if (tmpColors[i] === tmpSecretCode[j]) {
          black += 1;
          tmpSecretCode[j] = 6;
          break;
        }
      }
    }
  }
  for (let i = 0; i < white; i += 1) {
    tmpElement = document.createElement('div');
    tmpElement.className = 'peg';
    tmpElement.style.backgroundColor = 'white';
    element.appendChild(tmpElement);
  }
  for (let i = 0; i < black; i += 1) {
    tmpElement = document.createElement('div');
    tmpElement.className = 'peg';
    tmpElement.style.backgroundColor = 'black';
    element.appendChild(tmpElement);
  }
}

/**
 * A submit gomb lenyomásakor fut le.
 * Megjeleníti az element változó tartalmát a megfelelő sorban.
 * Ha nem megfelelő a colors tömb mérete, vagy már nyert a játékos,
 * nem tesz semmit, és visszatér.
 * Leellenőrzi, hogy nyert, vagy vesztett a játékos.
 */
// eslint-disable-next-line no-unused-vars
function submit() {
  if (win === true) {
    return;
  }
  winCheck();
  if (colors.length < 4) {
    modalBg.classList.add('modal-active');
    modalErr.classList.add('modal-active');
    /* modalErr.addEventListener('click', closeModal()); */
    return;
  }
  setCode(colors);
  setPegs();
  document.getElementById(currentMainPosition).appendChild(element);
  document.getElementById('guess').innerHTML = '';
  colors.length = 0;
  currentGuessPosition = 0;
  currentMainPosition += 1;
  if (currentMainPosition > 9 && win === false) {
    modalBg.classList.add('modal-active');
    modalLose.classList.add('modal-active');
    document.getElementById('secret').style.display = 'block';
    lose = true;
    return;
  }
  if (win === true) {
    document.getElementById('secret').style.display = 'block';
    modalBg.classList.add('modal-active');
    modalWin.classList.add('modal-active');
  }
}

generateSecret();
