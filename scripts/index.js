var myBtn = document.getElementById('myButton');
var clearBtn = document.getElementById('clearAll');
var shape = document.querySelector('.shape-container');
var shapeTextDiv = document.querySelector('.shapeText');
var textBox = document.querySelector('#txtJob');
var randomMove = document.querySelector('#randomMove');

var bodyObj = document.querySelector('body');


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
    // newBox.style.display = 'block';
    bodyObj.appendChild(newBox);
    newBox.appendChild(textContainer);
    textContainer.innerHTML = textBox.value;
    newBox.addEventListener('click', alertUser);
}

function updateText() {
    // shapeTextDiv.innerHTML = this.value
    let boxes = document.querySelectorAll('.boxy-text');
    boxes.forEach(b => b.innerHTML = this.value);
}

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
console.log(shapeColor);

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
    console.log("before: ", w, h, posX, posY, pixelWidth);
    if (posX + pixelWidth >= w) posX -= pixelWidth - (w - posX);
    if (posY + pixelWidth >= h) posY -= pixelWidth - (h - posY);
    console.log("after: ", w, h, posX, posY, pixelWidth);

    let letters = '0123456789ABCDEF';
    let color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return [posX, posY, color, pixelWidth];
}

function toggleShape() {
    if (isElementHidden(shape)) {
        let innerShape = document.querySelector('.shape');
        let shape = document.querySelector('.shape-container');
        innerShape.style.borderColor = getRandomColor();
        let randomRadius = Math.random() * 50;
        innerShape.style.borderRadius = randomRadius + '%';
        // let boxCoords = genRandomCoords();
        console.log(boxCoords);
        shape.style.position = 'absolute';
        shape.style.left = boxCoords.shift() + 'px';
        shape.style.top = boxCoords.shift() + 'px';
        shape.style.display = 'block';

        if (shapeColor !== 'none') {
            innerShape.style.backgroundColor = shapeColor;
            innerShape.style.opacity = "0.4";
        }
    } else {
        shape.style.display = 'none';
    };

    function isElementHidden(element) {
        return window.getComputedStyle(element, null).getPropertyValue('display') === 'none';
    }
}

function clearAll() {
    let boxes = document.querySelectorAll('.boxy-thing');
    boxes.forEach(b => b.style.display = 'none');
    // shape.style.display = 'none';
    // textBox.value = '';
}



function alertUser(e) {
    console.log(e);
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
    // console.log(b);
    var top = parseInt(e.style.top);
    var left = parseInt(e.style.left);
    var width = parseInt(e.style.width);

    let w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    let h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

    // check boundary

    if (top <= 0) tc = 1;
    if (left <= 0) lc = 1;

    if (left + width >= w) lc = -1;
    if (top + width >= h) tc = -1;
    console.log(tc, lc, top + tc + 'px');
    e.style.top = top + tc + 'px';
    e.style.left = left + lc + 'px';

    return;
}

myBtn.addEventListener('click', createBox);
randomMove.addEventListener('click', startRandomMove);
clearBtn.addEventListener('click', clearAll);
textBox.addEventListener('change', updateText);
textBox.addEventListener('keyup', updateText);
// shape.addEventListener('click', alertUser);
