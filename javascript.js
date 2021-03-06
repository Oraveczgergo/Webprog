let lose = false;
let win = false;
/** Html elemet tárol */
let element = document.createElement('div');
/** Ideiglenes HTML elem tároló, ebben rakom össze a div-eket amik az element-be kerülnek */
let tmpElement = document.createElement('div');
/** A betippelt kódsorozat jelenlegi értékének indexét tárolja. */
let GuessIndex = 0;
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
/** A színek neveit tartalmazó tömb */
const colorNames = ['red', 'blue', 'yellow', 'green', 'orange', 'pink'];
/** A modal dialog sötítített háttere */
const modalBg = document.querySelector('.modal-bg');
/** A játék elvesztésekor megjelenő modal dialog */
const modalLose = document.querySelector('.modal-lose');
/** A játék megnyerésekor megjelenő modal dialog */
const modalWin = document.querySelector('.modal-win');
/** Szín kitöltés hiba esetén megjelenő modal dialog */
const modalErr = document.querySelector('.modal-err');
const numberOfGuesses = 10;
/**
 * Random szám generátor
 * @param {int} min alsó határ
 * @param {int} max felső határ
 * @returns Véletlenszerű érték a két határ között
 */
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** A kitöltési hiba modal dialog-ot zárja be. Az ott megnyomott gomb hívja meg. */
// eslint-disable-next-line no-unused-vars
function closeModal() {
  modalBg.classList.remove('modal-active');
  modalErr.classList.remove('modal-active');
}

/** A tippeket tartalmazó sorokat generálja le az element változó használatával */
function generateGuessRows() {
  for (let i = numberOfGuesses - 1; i >= 0; i--) {
    element = document.createElement('div');
    element.className = 'row';
    element.id = i;
    document.getElementById('main').appendChild(element);
  }
}

/**
 * A megadott számokat tartalmazó tömb alapján előállítja és kiírja a megfelelő
 * HTML element-et az element változóba.
 * A sorok illetve a megoldás megjelenítésére használt.
 * @param {int[]} color -tömb ami a színeket reprezentáló számokat tartalmazza
 */
function setCode(color) {
  element = document.createElement('div');
  for (let i = 0; i < 4; i++) {
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
  for (let i = 0; i < 4; i++) {
    secretCode[i] = getRandom(0, 5);
  }
  setCode(secretCode);
  /* console.log(secretCode); */
  document.getElementById('secret').appendChild(element);
}

/**
 * A html element-et állítja elő ami a gombok lenyomására azonnal megjeleníti a megfelelő színt,
 * valamint beállítja a colors tömb értkékeit is, a lenyomott gomb alapján.
 * @param {int} color -A szám amit a gombok adnak át lenyomáskor, egy színt reprezentál
 */
// eslint-disable-next-line no-unused-vars
function setColor(color) {
  if (GuessIndex < 4 && lose === false) {
    element = document.createElement('div');
    element.className = 'cell';
    colors[GuessIndex] = color;
    GuessIndex += 1;
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
  for (let i = 0; i < 4; i++) {
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
    return;
  }
  setCode(colors);
  setPegs();
  document.getElementById(currentMainPosition).appendChild(element);
  document.getElementById('guess').innerHTML = '';
  colors.length = 0;
  GuessIndex = 0;
  currentMainPosition += 1;
  if (currentMainPosition > numberOfGuesses - 1 && win === false) {
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
generateGuessRows();
generateSecret();
