let lose = false;
let win = false;
/** Html kódot tárol. */
let code = '';
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

/**
 * Random szám generátor
 * @param {int} min alsó határ
 * @param {int} max felső határ
 * @returns Véletlenszerű érték a két határ között
 */
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * A megadott számokat tartalmazó tömb alapján előállítja és kiírja a megfelelő színeket
 * reprezentáló html kódot a code nevű változóba.
 * A sorok illetve a megoldás megjelenítésére használt.
 * @param {int[]} color -tömb ami a színeket reprezentáló számokat tartalmazza
 */
function setCode(color) {
  code = '';
  for (let i = 0; i < 4; i += 1) {
    switch (color[i]) {
      case 0:
        code += '<div class="cell" style="background-color: red;"></div>';
        break;
      case 1:
        code += '<div class="cell" style="background-color: blue;"></div>';
        break;
      case 2:
        code += '<div class="cell" style="background-color: yellow;"></div>';
        break;
      case 3:
        code += '<div class="cell" style="background-color: green;"></div>';
        break;
      case 4:
        code += '<div class="cell" style="background-color: orange;"></div>';
        break;
      case 5:
        code += '<div class="cell" style="background-color: pink;"></div>';
        break;
      default:
        break;
    }
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
  document.getElementById('secret').innerHTML = code;
  code = '';
}

/**
 * A html kódot állítja elő ami a gombok lenyomására azonnal megjeleníti a megfelelő színt,
 * valamint beállítja a colors tömb értkékeit is, a lenyomott gomb alapján.
 * @param {int} color -A szám amit a gombok adnak át lenyomáskor, egy színt reprezentál
 */
// eslint-disable-next-line no-unused-vars
function setColor(color) {
  if (currentGuessPosition < 4 && lose === false) {
    let guess = '';
    colors[currentGuessPosition] = color;
    currentGuessPosition += 1;
    switch (color) {
      case 0:
        guess += '<div class="cell" style="background-color: red;"></div>';
        break;
      case 1:
        guess += '<div class="cell" style="background-color: blue;"></div>';
        break;
      case 2:
        guess += '<div class="cell" style="background-color: yellow;"></div>';
        break;
      case 3:
        guess += '<div class="cell" style="background-color: green;"></div>';
        break;
      case 4:
        guess += '<div class="cell" style="background-color: orange;"></div>';
        break;
      case 5:
        guess += '<div class="cell" style="background-color: pink;"></div>';
        break;
      default:
        break;
    }
    document.getElementById('guess').innerHTML += guess;
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
 * A code változóhoz hozzáadja a megfelelő peg-eket megjelenítő html kódot.
 *  Külön tmp változókat használ, mert módosítja őket ellenőrzés közben.
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
    code += '<div class="peg" style="background-color: white;"></div>';
  }
  for (let i = 0; i < black; i += 1) {
    code += '<div class="peg" style="background-color: black;"></div>';
  }
}

/**
 * A submit gomb lenyomásakor fut le.
 * Megjeleníti a code változóban található html kódot a megfelelő sorban.
 * Ha nem megfelelő a colors tömb mérete, vagy már nyert a játékos,
 * nem tesz semmit, és visszatér.
 * Leellenőrzi, hogy nyert, vagy vesztett a játékos.
 */
// eslint-disable-next-line no-unused-vars
function Submit() {
  if (win === true) {
    return;
  }
  winCheck();
  if (colors.length < 4) {
    window.alert('Töltsd ki a színeket előbb');
    return;
  }
  setCode(colors);
  setPegs();
  document.getElementById(currentMainPosition).innerHTML = code;
  document.getElementById('guess').innerHTML = '';
  colors.length = 0;
  currentGuessPosition = 0;
  currentMainPosition += 1;
  if (currentMainPosition > 9 && win === false) {
    window.alert('Vesztettél!');
    document.getElementById('secret').style.display = 'block';
    lose = true;
    return;
  }
  if (win === true) {
    document.getElementById('secret').style.display = 'block';
    window.alert('Nyertél!');
  }
}

generateSecret();
