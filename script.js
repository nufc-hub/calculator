const subDisplay = document.querySelector('.sub-display');

const displayMain = document.querySelector('.display-main');

const numberButtons = document.querySelectorAll('.number-btn');

const decimalButton = document.querySelector('.point');

const plusMinusButton = document.querySelector('.plus-minus')

const operatorButtons = document.querySelectorAll('.operator');

const operateButton = document.querySelector('.operate');

const clearBtn = document.querySelector('.clear');

const backspaceBtn = document.querySelector('.backspace')

window.onkeydown = function(e) {
    let key = e.key;
    let choice;
    switch (key) {
        case '0':
            choice = document.querySelector('#zero');
            choice.click();
            break;
        case '1':
            choice = document.querySelector('#one');
            choice.click();
            break;
        case '2':
            choice = document.querySelector('#two');
            choice.click();
            break;
        case '3':
            choice = document.querySelector('#three');
            choice.click();
            break;
        case '4':
            choice = document.querySelector('#four');
            choice.click();
            break;
        case '5':
            choice = document.querySelector('#five');
            choice.click();
            break;
        case '6':
            choice = document.querySelector('#six');
            choice.click();
            break;
        case '7':
            choice = document.querySelector('#seven');
            choice.click();
            break;
        case '8':
            choice = document.querySelector('#eight');
            choice.click();
            break;
        case '9':
            choice = document.querySelector('#nine');
            choice.click();
            break;
        case '.':
            choice = document.querySelector('.point');
            choice.click();
            break;
        case '+':
            choice = document.querySelector('#add');
            choice.click();
            break;
        case '-':
            choice = document.querySelector('#subtract')
            choice.click();
            break;
        case '*':
            choice = document.querySelector('#multiply');
            choice.click();
            break;
        case '/':
            choice = document.querySelector('#divide');
            choice.click();
            break;
        case 'Enter':
        case '=':
            choice = document.querySelector('#equals')
            choice.click()
            break;
        case 'Backspace':
            choice = document.querySelector('#backspace');
            choice.click();
            break;
        case 'Escape':
            choice = document.querySelector('#clear');
            choice.click();
            break;
    }
};


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
    const displayMainLength = 15
    const maxDecimalLength = 10

    if (displayMain.textContent.length === 15){
        return;
    }
    
    if (displayMain.textContent.includes('.')) {
        const decimalPosition = displayMain.textContent.indexOf('.');
        const maxLength = displayMainLength - decimalPosition + maxDecimalLength;
            if (displayMain.textContent.length === maxLength) {
                return;
            }
    } 
    
    displayMain.textContent += button.textContent;
    
    if (operator === '') {
        firstNum = firstNum += button.textContent;
        displayMain.textContent = firstNum;/* Replaces the 0 in the main display with the next clicked number, 
                                            if 0 is clicked as the very first number at the start of a calculation 
                                            or if 0 is clicked straight after clicking clear. */
    } else {
        secondNum = secondNum += button.textContent;
        displayMain.textContent = secondNum;/* Replaces the result in the main display with the next digit(s) 
                                            to be calculated. */
    }
    console.log(firstNum);
    console.log(secondNum);
}

function handleDecimalButtonClick() {
    if (firstNum !== '' && operator !== '' && secondNum === '') {
        displayMain.textContent = '0.'
        secondNum = '0.'
    } else if (firstNum === '' && operator === '' && secondNum === '' ) {
        displayMain.textContent = '0.'
        firstNum = '0.'
    } else if (firstNum.includes('.') && secondNum === '') {
        return;
    } else if (firstNum !== '' && secondNum.includes('.')) {
        return;
    } else if (firstNum !== '' && operator !== '' && secondNum === '') {
        displayMain.textContent = '.'
    } else if (secondNum === '') {
        firstNum += decimalButton.textContent;
        displayMain.textContent += decimalButton.textContent;
    } else {
        secondNum += decimalButton.textContent;
        displayMain.textContent += decimalButton.textContent;
    }
}

function handlePlusMinusButtonClick() {
    if (firstNum.includes('-')) {
        firstNum = firstNum.slice(1);
        displayMain.textContent = firstNum;
    } else {
        const minus = '-';
        firstNum = minus + firstNum;
        displayMain.textContent = firstNum
    }
}

function handleOperatorButtonClick(button) {
    if (operator === '/' && secondNum === '0') {
        displayMain.textContent = 'LOL'
        operator = button.textContent;
    } else if (firstNum === '' && operator === '' && secondNum === '') {
        displayMain.textContent = '';
    } else if (firstNum !== '' && operator !== '' && secondNum === '') {
        operator = button.textContent;
        modifySubDisplay = subDisplay.textContent.slice(0, -1);
        subDisplay.textContent = modifySubDisplay += operator;
    } else if (operator !== '') {
        firstNum = parseFloat(firstNum);
        secondNum = parseFloat(secondNum);
        const result = operate();
        const roundedResult = result.toFixed(10); // Rounds result to within 5 decimal places.
        const resultToNumber = parseFloat(roundedResult);// Changes roundedResult from string to number.
        firstNum = String(resultToNumber);
        displayMain.textContent = firstNum; // Adds the result of the most recent calculation to the main display.
        subDisplay.textContent += secondNum; // Adds the secondNum variable to the sub-display.
        secondNum = ''; // This then sets the secondNum variable back to 0 to clear it for the next calculation.
        operator = button.textContent;
        subDisplay.textContent += operator; // Adds the clicked operator value to the sub-display.
    } else {
        operator = button.textContent;
        subDisplay.textContent += firstNum; // This and...
        subDisplay.textContent += operator; /* this moves the first number and first operator in the calculation
                                            to the sub-display as well ass all following numbers and operators, when true. */
    }
    console.log(operator);
}

function handleOperateButtonClick() {
    if (operator === '/' && secondNum === '0') {
        displayMain.textContent = 'LOL'
    } else if (secondNum === '') {
        return; // When '=' button is pressed but secondNum is empty, nothing happens.
    } else {
        firstNum = parseFloat(firstNum);
        secondNum = parseFloat(secondNum);
        const result = operate();
        const roundedResult = result.toFixed(10); // Rounds result to within 5 decimal places.
        const resultToNumber = parseFloat(roundedResult); // Changes roundedResult from string to number.
        firstNum = String(resultToNumber);
        displayMain.textContent = firstNum;
        subDisplay.textContent = subDisplay.textContent + secondNum + '='; /* this adds the secondNum variable that has just been operated on to the subDisplay
                                                                                along with an '=' sign. This is so the user can continue to see the history of their
                                                                                calculation. */ 
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
    subDisplay.textContent = '';
}

function handleBackspaceButtonClick() {

    if (firstNum !== '' && operator !== '' && secondNum === '') {
        displayMain.textContent = '';
    } else if (firstNum !== '' && operator === '' && secondNum === '' ) {
        displayMain.textContent = displayMain.textContent.slice(0, -1);
        firstNum = firstNum.toString().slice(0, -1);
    } else if (operator === '' && secondNum === '') {
        displayMain.textContent = displayMain.textContent.slice(0, -1);
        firstNum = firstNum.toString().slice(0, -1);
        displayMain.textContent = firstNum;
    } else {
        displayMain.textContent = displayMain.textContent.slice(0, -1);
        secondNum = secondNum.toString().slice(0, -1);
        displayMain.textContent = secondNum;
    }
}

numberButtons.forEach(function(button) { // Gives functionality to the 'number' buttons.
    button.addEventListener('click', () => handleNumberButtonClick(button));
});

decimalButton.addEventListener('click', () => handleDecimalButtonClick());

plusMinusButton.addEventListener('click', () => handlePlusMinusButtonClick() )

operatorButtons.forEach(function(button) { // Gives functionality to the 'operator' buttons.
    button.addEventListener('click', () => handleOperatorButtonClick(button));
});

operateButton.addEventListener('click', () => handleOperateButtonClick()); // Gives functionality to the '=' button.

clearBtn.addEventListener('click', () => handleClearButtonClick()); // Gives functionality to the 'clear' button.

backspaceBtn.addEventListener('click', () => handleBackspaceButtonClick()); // Gives functionality to the 'backspace' button.