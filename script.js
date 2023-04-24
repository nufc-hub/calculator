function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(array) {
    return a / b;
}

let firstNum = 3;
let secondNum = 7;
let operator = "+";

function operate() {
    switch(operator) {
        case "+":
            return add(firstNum, secondNum);
            break;
        case "-":
            return subtract(firstNum, secondNum);
            break;
        case "*":
            return multiply(firstNum, secondNum);
            break;
        case "/":
            return divide(firstNum, secondNum);
            break;
        default:
            return "E";
            break;
    }
}

const display = document.querySelector('.display');

const numberButtons = document.querySelectorAll('.number-btn');

const numberBtn = document.getElementById('one');

numberButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        display.textContent += button.textContent;
    });
});
