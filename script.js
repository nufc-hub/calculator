const display = document.querySelector('.display');

const numberButtons = document.querySelectorAll('.number-btn');

const operatorButtons = document.querySelectorAll('.operator');

const operateButton = document.querySelector('.operate');

let firstNum = 0;
let secondNum = 0;
let operator = "";

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

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

numberButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        display.textContent += button.textContent;
        if (operator === '') {
            firstNum = Number(firstNum += button.textContent);
        } else {
            secondNum = Number(secondNum += button.textContent);
        }
        console.log(firstNum);
        console.log(secondNum);
    });
});

operatorButtons.forEach(function(button) {
    button.addEventListener('click', function() {

        if (firstNum !== 0 && operator !== '' && secondNum !== 0) {
            const result = operate();
            firstNum = result;
            display.textContent = firstNum;
            secondNum = 0;
            operator = button.textContent;
        } else {
            display.textContent += button.textContent;
            operator = button.textContent;
        }

        console.log(operator);
    });
});

operateButton.addEventListener('click', function() {
    const result = operate();
    firstNum = result;
    display.textContent = result;
    secondNum = 0;
    operator = '';
    console.log(result)
});