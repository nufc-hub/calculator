const displayMinor = document.querySelector('.display-minor');

const displayMain = document.querySelector('.display-main');

const numberButtons = document.querySelectorAll('.number-btn');

const operatorButtons = document.querySelectorAll('.operator');

const operateButton = document.querySelector('.operate');

const clearBtn = document.querySelector('.clear');

const backspaceBtn = document.querySelector('.backspace')

let firstNum = '';
let secondNum = '';
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
        case '+':
            return add(firstNum, secondNum);
        case '-':
            return subtract(firstNum, secondNum);
        case '*':
            return multiply(firstNum, secondNum);
        case '/':
            return divide(firstNum, secondNum);
        default:
            return 'E';

    }
}

function handleNumberButtonClick(button) {
    displayMain.textContent += button.textContent;
        if (operator === '') {
            firstNum = Number(firstNum += button.textContent);
            displayMain.textContent = firstNum;/* Replaces the 0 in the main display with the next clicked number, 
                                                if 0 is clicked as the very first number at the start of a calculation 
                                                or if 0 is clicked straight after clicking clear. */
        } else {
            secondNum = Number(secondNum += button.textContent);
            displayMain.textContent = secondNum;/* Replaces the result in the main display with the next digit(s) 
                                                to be calculated. */
        }
        console.log(firstNum);
        console.log(secondNum);
}

function handleOperatorButtonClick(button) {
    if (operator === '/' && secondNum === 0) {
        displayMain.textContent = 'LOL'
        operator = button.textContent;
    } else if (firstNum === '' && operator === '' && secondNum === '') {
        displayMain.textContent = '';
    } else if (firstNum !== '' && operator !== '' && secondNum === '') {
        operator = button.textContent;
        modifyDisplayMinor = displayMinor.textContent.slice(0, -1);
        displayMinor.textContent = modifyDisplayMinor += operator;
    } else if (operator !== '') {
        const result = operate();
        const roundedResult = result.toFixed(5); // Rounds result to within 5 decimal places.
        const resultToNumber = Number(roundedResult);// Changes roundedResult from string to number.
        firstNum = resultToNumber;
        displayMain.textContent = firstNum; // Adds the result of the most recent calculation to the main display.
        displayMinor.textContent += secondNum; // Adds the secondNum variable to the minor display.
        secondNum = ''; // This then sets the secondNum variable back to 0 to clear it for the next calculation.
        operator = button.textContent;
        displayMinor.textContent += operator; // Adds the clicked operator value to the minor display.
    } else {
        operator = button.textContent;
        displayMinor.textContent += firstNum; // This and...
        displayMinor.textContent += operator; /* this moves the first number and first operator in the calculation
                                            to the minor display as well ass all following numbers and operators, when true. */
    }
    console.log(operator);
}

function handleOperateButtonClick() {
    if (operator === '/' && secondNum === 0) {
        displayMain.textContent = 'LOL'
    } else if (secondNum === '') {
        return; // When '=' button is pressed but secondNum is empty, nothing happens.
    } else {
        const result = operate();
        const roundedResult = result.toFixed(5); // Rounds result to within 5 decimal places.
        const resultToNumber = Number(roundedResult); // Changes roundedResult from string to number.
        firstNum = resultToNumber;
        displayMain.textContent = firstNum;
        displayMinor.textContent = '';
        secondNum = '';
        operator = '';
        console.log(firstNum);
    }
}

function handleClearButtonClick() {
    firstNum = '';
    secondNum = '';
    operator = '';
    displayMain.textContent = '';
    displayMinor.textContent = '';
}

function handleBackspaceButtonClick() {

    if (firstNum !== '' && operator !== '' && secondNum === '') {
        displayMain.textContent = '';
    } else if (firstNum !== '' && operator === '' && secondNum === '' ) {
        displayMain.textContent = displayMain.textContent.slice(0, -1);
        firstNum = parseInt(firstNum.toString().slice(0, -1), 10);
    } else if (operator === '' && secondNum === '') {
        displayMain.textContent = displayMain.textContent.slice(0, -1);
        firstNum = parseInt(firstNum.toString().slice(0, -1), 10);
        displayMain.textContent = firstNum;
    } else {
        displayMain.textContent = displayMain.textContent.slice(0, -1);
        secondNum = parseInt(secondNum.toString().slice(0, -1), 10);
        displayMain.textContent = secondNum;
    }
}

numberButtons.forEach(function(button) { // Gives functionality to the 'number' buttons.
    button.addEventListener('click', function() {
        handleNumberButtonClick(button);
    });
});

operatorButtons.forEach(function(button) { // Gives functionality to the 'operator' buttons.
    button.addEventListener('click', function() {
        handleOperatorButtonClick(button);
    });
});

operateButton.addEventListener('click', function() { // Gives functionality to the '=' button.
    handleOperateButtonClick();
});

clearBtn.addEventListener('click', function() { // Gives functionality to the 'clear' button.
    handleClearButtonClick();
});

backspaceBtn.addEventListener('click', function() { // Gives functionality to the 'backspace' button.
    handleBackspaceButtonClick()
});