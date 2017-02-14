var myBtn = document.getElementById('myButton');
var clearBtn = document.getElementById('clearAll');
var shape = document.querySelector('.shape-container');
var shapeTextDiv = document.querySelector('.shapeText');
var textBox = document.querySelector('#txtJob');
var randomMove = document.querySelector('#randomMove');

function updateText() {
    shapeTextDiv.innerHTML = this.value
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

function toggleShape() {
    if (isElementHidden(shape)) {
        // added random border-radius and color
        let innerShape = document.querySelector('.shape');
        let shape = document.querySelector('.shape-container');
        innerShape.style.borderColor = getRandomColor();
        let randomRadius = Math.random() * 50;
        innerShape.style.borderRadius = randomRadius + '%';
        // shape.position = 'absolute';
        let w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        let h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        console.log(Math.floor(h * Math.random()) + ' px');

        let posX = Math.floor(w * Math.random());
        let posY = Math.floor(h * Math.random());
        let boxWidth = 0.20 * w; // as it is set to 20vw in css
        console.log(boxWidth);
        if (posX >= w - boxWidth) posX -= boxWidth;
        if (posY >= h - boxWidth) posY -= boxWidth;

        shape.style.position = 'absolute';
        shape.style.top = posY + 'px';
        shape.style.left = posX + 'px';
        shape.style.display = 'block';
        // console.log(getRandomColor());

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
    shape.style.display = 'none';
    textBox.value = '';
}



function alertUser() {
    let innerShape = document.querySelector('.shape');
    let innerText = document.querySelector('.shapeText');
    let rbgColor = window.getComputedStyle(innerShape).borderColor;
    let alertMessage = 'Color: ' + rbgColor + '\n' + 'Text: ' + innerText.innerHTML;
    window.alert(alertMessage);
}

function startRandomMove() {
    // random movement every 10 milliseconds
    setInterval(toggleShape, 10);
}

myBtn.addEventListener('click', toggleShape);
randomMove.addEventListener('click', startRandomMove);
clearBtn.addEventListener('click', clearAll);
textBox.addEventListener('change', updateText);
textBox.addEventListener('keyup', updateText);
shape.addEventListener('click', alertUser);
