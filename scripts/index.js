var myBtn = document.getElementById('myButton');

var shape = document.querySelector('.shape');
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

myBtn.addEventListener('click', toggleShape);

textBox.addEventListener('change', updateText);
textBox.addEventListener('keyup', updateText);
