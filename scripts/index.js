var myBtn = document.getElementById('myButton');
var clearBtn = document.getElementById('clearAll');
var shape = document.querySelector('.shape-container');
var shapeTextDiv = document.querySelector('.shapeText');
var textBox = document.querySelector('#txtJob');

function updateText() {
    shapeTextDiv.innerHTML = this.value
}

function toggleShape() {
    if (isElementHidden(shape)) {
        shape.style.display = 'block';
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

myBtn.addEventListener('click', toggleShape);
clearBtn.addEventListener('click', clearAll);
textBox.addEventListener('change', updateText);
textBox.addEventListener('keyup', updateText);
shape.addEventListener('click', alertUser);
