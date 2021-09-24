let lose = false;
let win = false;
let code = "";
let currentGuessPosition = 0;
let currentMainPosition = 0;
let colors = [];
let tmpColors = [];
let secretCode = [];
let tmpSecretCode = [];
let pegs = [];

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateSecret() {
    for (let i = 0; i < 4; i++) {
        secretCode[i] = getRandom(0, 5);
    }
    setCode(secretCode);
    console.log(secretCode);
    document.getElementById("secret").innerHTML = code;
    code = "";    
}

function setColor(color) {
    if (currentGuessPosition < 4 && lose === false) {
        let guess = "";
        colors[currentGuessPosition] = color;
        currentGuessPosition++;
        switch (color) {
            case 0:
                guess += "<div class=\"cell\" style=\"background-color: red;\"></div>";
                break;
            case 1:
                guess += "<div class=\"cell\" style=\"background-color: blue;\"></div>";
                break;
            case 2:
                guess += "<div class=\"cell\" style=\"background-color: yellow;\"></div>";
                break;
            case 3:
                guess += "<div class=\"cell\" style=\"background-color: green;\"></div>";
                break;
            case 4:
                guess += "<div class=\"cell\" style=\"background-color: orange;\"></div>";
                break;
            case 5:
                guess += "<div class=\"cell\" style=\"background-color: pink;\"></div>";
        }
        document.getElementById("guess").innerHTML += guess;
    }
}

function winCheck() {
    for (let i = 0; i < 4; i++) {
        if (colors[i] !== secretCode[i]) {
            return;
        }
    }
    win = true;
}

function setPegs() {
    for (let i = 0; i < 4; i++) {
        tmpSecretCode[i] = secretCode[i];
        tmpColors[i] = colors[i];
    }
    let white = 0;
    let black = 0;
    for (let i = 0; i < 4; i++) {
        if (tmpColors[i] === tmpSecretCode[i]) {
            tmpColors[i] = 6;
            tmpSecretCode[i] = 6;
            white++;
        }
    }
    for (let i = 0; i < 4; i++) {
        if (tmpColors[i] == 6) continue;
        for (var j = 0; j < 4; j++) {
            if (tmpColors[i] === tmpSecretCode[j]) {
                black++;
                tmpSecretCode[j] = 6;
                break;
            }
        }
    }
    for (let i = 0; i < white; i++) {
        code += "<div class=\"peg\" style=\"background-color: white;\"></div>";
    }
    for (let i = 0; i < black; i++) {
        code += "<div class=\"peg\" style=\"background-color: black;\"></div>";
    }
}

function Submit(colors) {
    if (win === true) {
        return;
    }
    winCheck();
    if (colors.length < 4) {
        window.alert("Töltsd ki a színeket előbb");
        return;
    }
    setCode(colors);
    setPegs();
    document.getElementById(currentMainPosition).innerHTML = code;
    document.getElementById("guess").innerHTML = "";
    colors.length = 0;
    currentGuessPosition = 0;
    currentMainPosition++;
    if (currentMainPosition > 9 && win === false) {
        window.alert("Vesztettél!");
        document.getElementById("secret").style.display = "block";
        lose = true;
        return;
    }
    if (win === true) {
        document.getElementById("secret").style.display = "block";
        window.alert("Nyertél!");
    }
}

function setCode(colors) {
    code = "";
    for (let i = 0; i < 4; i++) {
        switch (colors[i]) {
            case 0:
                code += "<div class=\"cell\" style=\"background-color: red;\"></div>";
                break;
            case 1:
                code += "<div class=\"cell\" style=\"background-color: blue;\"></div>";
                break;
            case 2:
                code += "<div class=\"cell\" style=\"background-color: yellow;\"></div>";
                break;
            case 3:
                code += "<div class=\"cell\" style=\"background-color: green;\"></div>";
                break;
            case 4:
                code += "<div class=\"cell\" style=\"background-color: orange;\"></div>";
                break;
            case 5:
                code += "<div class=\"cell\" style=\"background-color: pink;\"></div>";
        }
    }
}

generateSecret();
