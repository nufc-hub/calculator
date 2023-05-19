const subDisplay = document.querySelector('.sub-display-numbers');

subDisplay.classList.add('sub-display-numbers-style')

const mainDisplay = document.querySelector('.main-display');

mainDisplay.classList.add('main-display-style');

const numberButtons = document.querySelectorAll('.number-btn');

const decimalButton = document.querySelector('.point');

const plusMinusButton = document.querySelector('.plus-minus');

const operatorButtons = document.querySelectorAll('.operator');

const operateButton = document.querySelector('.operate');

const clearBtn = document.querySelector('.clear');

const backspaceBtn = document.querySelector('.backspace');

window.onkeydown = function(e) {
    let key = e.key;
    let choice;
    switch (key) {
        case 'n'://The letter n is used to denote 'negative'.
            choice = document.querySelector('.plus-minus');
            choice.click();
            break;
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
        case '^':
            choice = document.querySelector('#exponentiation');
            choice.click();
            break
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

function power(base, exponent) {
    return Math.pow(base, exponent);
}

function operate() {
    switch(operator) {
        case '+':
            return add(firstNum, secondNum);
        case '-':
            return subtract(firstNum, secondNum);
        case 'x':
            return multiply(firstNum, secondNum);
        case '÷':
            return divide(firstNum, secondNum);
        case '^':
            return power(firstNum, secondNum);
        default:
            return 'E';

    }
}

function handleNumberButtonClick(button) {
    const mainDisplayLength = 12
    const maxDecimalLength = 10

    if (mainDisplay.textContent.length >= 12 && operator !== ''  && secondNum === '') { /* When result of calculation >= 12 length, 
                                                                                            display is cleared and number click text content is added.*/
        mainDisplay.textContent = '';
        mainDisplay.textContent = mainDisplay.textContent += button.textContent;
    } else if (mainDisplay.textContent.length === 12) {
        return;
    }

    if ((mainDisplay.textContent === '0' || mainDisplay.textContent === '-0')  && button.textContent !== '0' && (firstNum === '0' || firstNum === '-0')) { /* This prevents 0 being clicked
                                                                                                                                                             more than once if mainDisplay value is 0 or -0 */
        firstNum = firstNum.slice(1);
        firstNum + button.textContent;
    } else if ((mainDisplay.textContent === '0' || mainDisplay.textContent === '-0') && button.textContent !== '0' && (secondNum === '0' || secondNum === '-0')) {
        secondNum = secondNum.slice(1);
        secondNum + button.textContent;
    } else if ((mainDisplay.textContent === '0' || mainDisplay.textContent === '-0') && button.textContent === '0' && (secondNum === '0' || secondNum === '-0')) {
        return;
    } else if ((mainDisplay.textContent === '0' || mainDisplay.textContent === '-0') && button.textContent === '0' && (firstNum === '0' || firstNum === '-0')) {
        return;
    }

    if (mainDisplay.textContent === ':D') {
        subDisplay.textContent += operator; /* Divide symbol is removed from sub display when divide by 0 is attempted.
                                            This replaces the operator in the sub display with the operator the most current
                                            calculation is being operated on. */
    }
    
    if (mainDisplay.textContent.includes('.')) {
        const decimalPosition = mainDisplay.textContent.indexOf('.');
        const maxLength = mainDisplayLength - decimalPosition + maxDecimalLength;
            if (mainDisplay.textContent.length === maxLength) {
                return;
            }
    } 
    
    mainDisplay.textContent += button.textContent;
    
    if (operator === '') {
        firstNum = firstNum += button.textContent;
        mainDisplay.textContent = firstNum;/* Replaces the 0 in the main display with the next clicked number, 
                                            if 0 is clicked as the very first number at the start of a calculation 
                                            or if 0 is clicked straight after clicking clear. */
    } else {
        secondNum = secondNum += button.textContent;
        mainDisplay.textContent = secondNum;/* Replaces the result in the main display with the next digit(s) 
                                            to be calculated. */
    }
    console.log(firstNum);
    console.log(secondNum);
}

function handleDecimalButtonClick() {
    if (mainDisplay.textContent.length === 12) {//Prevents a decimal being added when the main display = length 12//
        return;
    }

    if (firstNum !== '' && operator !== '' && secondNum === '') {
        mainDisplay.textContent = '0.'
        secondNum = '0.'
    } else if (firstNum === '' && operator === '' && secondNum === '' ) {
        mainDisplay.textContent = '0.'
        firstNum = '0.'
    } else if (firstNum.includes('.') && secondNum === '') {
        return;
    } else if (firstNum !== '' && secondNum.includes('.')) {
        return;
    } else if (firstNum !== '' && operator !== '' && secondNum === '') {
        mainDisplay.textContent = '.'
    } else if (secondNum === '') {
        firstNum += decimalButton.textContent;
        mainDisplay.textContent += decimalButton.textContent;
    } else {
        secondNum += decimalButton.textContent;
        mainDisplay.textContent += decimalButton.textContent;
    }
}

function handlePlusMinusButtonClick() {
    const minus = '-';

    if (firstNum.includes(minus) && operator === '') {         // Removes a minus symbol from the firstNum variable.
        firstNum = firstNum.slice(1);
        mainDisplay.textContent = firstNum;
    } else if (secondNum.includes(minus) && operator !== '') {// Removes a minus symbol from the secondNum variable.
        secondNum = secondNum.slice(1);
        mainDisplay.textContent = secondNum;
    } else if (operator !== '') {                             // Adds a minus symbol to secondNum variable.
        secondNum = minus + secondNum;
        mainDisplay.textContent = secondNum;
    } else {                                                   // Adds a minus symbol to firstNum variable.
        firstNum = minus + firstNum;
        mainDisplay.textContent = firstNum
    }
}

function handleOperatorButtonClick(button) {
    if(mainDisplay.textContent === '-') {  // Prevents operator operating on '-' string alone.
        return;
    }

    if (mainDisplay.textContent.length === 12) { 
        mainDisplay.textContent = '';
                                                    /* This clears the main display when an operator button is clicked,
                                                    if the display length is === to 12. This was added because 
                                                    if the display length === 12 and the main display is not cleared,
                                                    no more calculations can be done as the firstNum variable (which also
                                                    acts as the result), stays in the main display after pressing the operator
                                                    and therefore secondNum can't be entered. */
    }
    
    if (mainDisplay.textContent === ':D') { //Prevents bugs due to replacing sub display operator values when dividing by 0.
        mainDisplay.textContent = '';
        operator = button.textContent;
        subDisplay.textContent += operator;
        return;
    } else if (operator === '÷' && secondNum === '0') {
        mainDisplay.textContent = ':D'
        secondNum = ''; /* This is set to '' otherwise when typing a number after the :D message, 
                        a 0 will appear on the main display. This is because the 0 would still be left in the secondNum
                        variable from the divide by 0 operation. */
        modifySubDisplay = subDisplay.textContent.slice(0, -1);
        subDisplay.textContent = modifySubDisplay;  /* This will remove the /(divide) icon from the sub display.
                                                        This is necessary otherwise sub display will be left with
                                                        a redundant divide symbol. This is redundant because
                                                        the user's next operation may not be to divide. */

    } else if (firstNum === '' && operator === '' && secondNum === '') {
        mainDisplay.textContent = '';
    } else if (firstNum !== '' && operator !== '' && secondNum === '') {
        operator = button.textContent;
        modifySubDisplay = subDisplay.textContent.slice(0, -1);
        subDisplay.textContent = modifySubDisplay += operator;
    } else if (operator !== '') {
        firstNum = parseFloat(firstNum);
        secondNum = parseFloat(secondNum);
        const result = operate();
        const roundedResult = result.toFixed(10); // Rounds result to within 10 decimal places.
        const resultToNumber = parseFloat(roundedResult);// Changes roundedResult from string to number.
        firstNum = String(resultToNumber);
        mainDisplay.textContent = firstNum; // Adds the result of the most recent calculation to the main display.
        subDisplay.textContent += secondNum; // Adds the secondNum variable to the sub-display.
        secondNum = ''; // This then sets the secondNum variable back to 0 to clear it for the next calculation.
        operator = button.textContent;
        subDisplay.textContent += operator; // Adds the clicked operator value to the sub-display.
    } else {
        operator = button.textContent;
        subDisplay.textContent += firstNum; // This and :D
        subDisplay.textContent += operator; /* this moves the first number and first operator in the calculation
                                            to the sub-display as well ass all following numbers and operators, when true. */
    }
    console.log(operator);
}

function handleOperateButtonClick() {
    
    if(mainDisplay.textContent === '-') {  // Prevents operate operating on '-' string alone.
        return;
    }

    if (operator === '÷' && secondNum === '0') {
        mainDisplay.textContent = ':D';
        modifySubDisplay = subDisplay.textContent.slice(0, -1);
        subDisplay.textContent = modifySubDisplay;
        secondNum = '';
    } else if (secondNum === '') {
        return; // When '=' button is pressed but secondNum is empty, nothing happens.
    } else {
        firstNum = parseFloat(firstNum);
        secondNum = parseFloat(secondNum);
        const result = operate();
        const roundedResult = result.toFixed(10); // Rounds result to within 10 decimal places.
        const resultToNumber = parseFloat(roundedResult); // Changes roundedResult from string to number.
        firstNum = String(resultToNumber);
        mainDisplay.textContent = firstNum;
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
    mainDisplay.textContent = '';
    subDisplay.textContent = '';
}

function handleBackspaceButtonClick() {
    if (subDisplay.textContent.charAt(subDisplay.textContent.length - 1) === '=') { // Clears the subdisplay first if it contains an '='.
        subDisplay.textContent = '';
    } else if (firstNum !== '' && operator !== '' && secondNum === '') {
        mainDisplay.textContent = '';
    } else if (firstNum !== '' && operator === '' && secondNum === '' ) {
        mainDisplay.textContent = mainDisplay.textContent.slice(0, -1);
        firstNum = firstNum.toString().slice(0, -1);
    } else if (operator === '' && secondNum === '') {
        mainDisplay.textContent = mainDisplay.textContent.slice(0, -1);
        firstNum = firstNum.toString().slice(0, -1);
        mainDisplay.textContent = firstNum;
    } else {
        mainDisplay.textContent = mainDisplay.textContent.slice(0, -1);
        secondNum = secondNum.toString().slice(0, -1);
        mainDisplay.textContent = secondNum;
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