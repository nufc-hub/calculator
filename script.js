const displayMinor = document.querySelector('.display-minor');

const displayMain = document.querySelector('.display-main');

const numberButtons = document.querySelectorAll('.number-btn');

const operatorButtons = document.querySelectorAll('.operator');

const operateButton = document.querySelector('.operate');

const clearBtn = document.querySelector('.clear');

let firstNum = 0;
let secondNum = 0;
let operator = '';

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

function handleNumberButtonClick(button) {
    displayMain.textContent += button.textContent;
        if (operator === '') {
            firstNum = Number(firstNum += button.textContent);
        } else {
            secondNum = Number(secondNum += button.textContent);
            displayMain.textContent = secondNum;// this replaces the result in the main display with the next digit(s) to be calculated
        }
        console.log(firstNum);
        console.log(secondNum);
}

function handleOperatorButtonClick(button) {
    if (operator !== '') {
        const result = operate();
        const roundedResult = result.toFixed(5); //rounds result to within 5 decimal places
        const resultToNumber = Number(roundedResult);// changes roundedResult from string to number
        firstNum = resultToNumber;
        displayMain.textContent = firstNum; //this adds the result of the most recent calculation to the main display
        displayMinor.textContent += secondNum; //this adds the secondNum variable to the minor display
        secondNum = 0; //this then sets the secondNum variable back to 0 to clear it for the next calculation
        operator = button.textContent;
        displayMinor.textContent += operator; //this adds the clicked operator value to the minor display
    } else {
        operator = button.textContent;
        displayMinor.textContent += firstNum; //this and...
        displayMinor.textContent += operator; //this moves the first number and first operator in the calculation to the minor display as well ass all following numbers and operators, when true
    }            
    console.log(operator);
}

function handleOperateButtonClick() {
    const result = operate();
    const roundedResult = result.toFixed(5); // rounds result to within 5 decimal places
    const resultToNumber = Number(roundedResult); // changes roundedResult from string to number
    firstNum = resultToNumber;
    displayMain.textContent = firstNum;
    secondNum = 0;
    operator = '';
    console.log(firstNum);
}

function handleClearButtonClick() {
    firstNum = 0;
    secondNum = 0;
    operator = '';
    displayMain.textContent = '';
    displayMinor.textContent = ''
}

numberButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        handleNumberButtonClick(button);
    });
});

operatorButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        handleOperatorButtonClick(button);
    });
});

operateButton.addEventListener('click', function() { // this gives functionality to the '=' button
    handleOperateButtonClick();
});

clearBtn.addEventListener('click', function () {
    handleClearButtonClick();
});

