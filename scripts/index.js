var myBtn = document.getElementById('myButton');
var clearBtn = document.getElementById('clearAll');
var shape = document.querySelector('.shape-container');
var shapeTextDiv = document.querySelector('.shapeText');
var textBox = document.querySelector('#txtJob');
var randomMove = document.querySelector('#randomMove');

var bodyObj = document.querySelector('body');

var idArr = [];
var idMap = {};

function getParameterByName(name, url) {
    if (!url) {
        url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}



var shapeColor = getParameterByName('color');
if (shapeColor == null) {
    shapeColor = localStorage.getItem('color');
} else {
    localStorage.setItem('color', shapeColor);
}
var boxes = getParameterByName('boxes');
if (boxes == null) {
    boxes = localStorage.getItem('boxes');
} else {
    localStorage.setItem('boxes', boxes);
}

function getRGBAColor(colorStr) {
    if (colorStr === 'none') return 'transparent';
    var a = document.createElement('div');
    a.style.color = colorStr;
    var colors = window.getComputedStyle(document.body.appendChild(a)).color;
    document.body.removeChild(a);
    return colors.replace(/\)/, ', 0.1)').replace('rgb', 'rgba');
}

function createBox() {
    let newBox = document.createElement('div');
    let textContainer = document.createElement('div');
    textContainer.className = 'boxy-text';
    let boxAttr = genRandomAttr();
    newBox.className = 'boxy-thing';
    newBox.style.borderColor = getRandomColor();
    newBox.style.position = 'absolute';
    newBox.style.left = boxAttr.shift() + 'px';
    newBox.style.top = boxAttr.shift() + 'px';
    newBox.style.borderColor = boxAttr.shift();
    newBox.style.width = boxAttr.shift() + 'px';
    newBox.style.height = newBox.style.width;
    newBox.style.borderRadius = Math.floor(Math.random() * 40) + '%';
    let newID = idArr.length;
    idArr.push(newID + 1);
    idMap["box-" + (newID + 1)] = [1, 1];
    // console.log(idMap);
    newBox.id = "box-" + (newID + 1);
    // newBox.style.display = 'block';
    bodyObj.appendChild(newBox);
    newBox.appendChild(textContainer);
    textContainer.innerHTML = textBox.value;
    if (shapeColor !== null) {
        newBox.style.backgroundColor = getRGBAColor(shapeColor);
    }
    newBox.addEventListener('click', alertUser);
}

console.log(boxes);
if (boxes !== null) {
    for (i = 0; i < boxes; i++) {
        createBox();
    }
}

function updateText() {
    // shapeTextDiv.innerHTML = this.value
    let boxes = document.querySelectorAll('.boxy-text');
    boxes.forEach(b => b.innerHTML = this.value);
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function genRandomAttr() {
    let w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    let h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    let pixelWidth;
    w > h ? pixelWidth = Math.floor(Math.random() * h) : pixelWidth = Math.floor(Math.random() * w);
    let posX = Math.floor(w * Math.random());
    let posY = Math.floor(h * Math.random());
    // console.log("before: ", w, h, posX, posY, pixelWidth);
    if (posX + pixelWidth >= w) posX -= pixelWidth - (w - posX);
    if (posY + pixelWidth >= h) posY -= pixelWidth - (h - posY);
    // console.log("after: ", w, h, posX, posY, pixelWidth);

    let letters = '0123456789ABCDEF';
    let color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return [posX, posY, color, pixelWidth];
}

function clearAll() {
    let boxes = document.querySelectorAll('.boxy-thing');
    boxes.forEach(b => b.style.display = 'none');
    // shape.style.display = 'none';
    // textBox.value = '';
}

function alertUser(e) {
    // console.log(e);
    let color = e.target.style["border-top-color"];
    let text = e.target.firstChild.innerHTML;
    let alertMessage = 'Color: ' + color + '\n' + 'Text: ' + text;
    // console.log(alertMessage);
    window.alert(alertMessage);
}

var randomStarted = null;

function startRandomMove() {
    // random movement every 10 milliseconds
    console.log(randomStarted);
    if (randomStarted === null) {
        randomStarted = setInterval(startMoving, 10);
    } else {
        window.clearInterval(randomStarted);
        randomStarted = null;
    }
}

function startMoving() {
    let boxes = document.querySelectorAll('.boxy-thing');
    if (boxes === null) {
        window.clearInterval(randomStarted);
        randomStarted = null;
    }
    boxes.forEach(b => moveBox(b));
}

var tc = 1;
var lc = 1;

function moveBox(e) {

    var top = parseInt(e.style.top);
    var left = parseInt(e.style.left);
    var width = parseInt(e.style.width);
    let w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    let h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

    // check boundary
    let speedFactor = 10;
    if (top <= 0) {
        // tc = 1;
        idMap[e.id][1] = Math.floor(Math.random() * speedFactor);
    }
    if (left <= 0) {
        // lc = 1;
        idMap[e.id][0] = Math.floor(Math.random() * speedFactor);
    }

    if (left + width >= w) {
        // lc = -1;
        idMap[e.id][0] = -1 * Math.floor(Math.random() * speedFactor); //Y
    }
    if (top + width >= h) {
        // tc = -1;
        idMap[e.id][1] = -1 * Math.floor(Math.random() * speedFactor); //Y
    }

    e.style.top = top + idMap[e.id][1] + 'px';
    e.style.left = left + idMap[e.id][0] + 'px';
}

function toggleP(e) {
    if (document.activeElement.id !== 'txtJob' && e.keyCode == 80) startRandomMove();
}

myBtn.addEventListener('click', createBox);
randomMove.addEventListener('click', startRandomMove);
clearBtn.addEventListener('click', clearAll);
textBox.addEventListener('change', updateText);
textBox.addEventListener('keyup', updateText);
window.addEventListener('keydown', toggleP);
