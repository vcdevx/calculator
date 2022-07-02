function operate(operator, num1, num2) {
    if (operator === '+') {
        return num1 + num2;
    } else if (operator === '-') {
        return num1 - num2;
    } else if (operator === '*') {
        return num1 * num2;
    } else if (operator === '/') {
        return num1 / num2;
    }
    return num2;
}

//Calculator

const calculator = {
    displayValue: '0',
    num1: null,
    waitingForNum2: false,
    operator: null,
};

function updateDisplay() {
    const display = document.querySelector('.displayText');
    display.value = calculator.displayValue;
}
updateDisplay();

//Calculator button functionality

const numberBtn = document.querySelectorAll(".number")
const operatorBtn = document.querySelectorAll(".operator");
const decmialBtn = document.querySelector(".decimal");
const acBtn = document.querySelector("ac");

const keys = document.querySelector('#btnContainer');
keys.addEventListener('click', (event) => {
    const { target } = event;
    if (!target.matches('button')) {
        return;
    }
    if (target.classList.contains('operator')) {
        handleOperator(target.value)
        updateDisplay();
        return;
    }
    if (target.classList.contains('decimal')) {
        inputDecimal(target.value);
        updateDisplay();
        return;
    }
    if (target.classList.contains('ac')) {
        clear();
    }
    inputDigit(target.value);
    updateDisplay();

});

function inputDigit(digit) {
    const { displayValue, waitingForNum2 } = calculator;
    if (waitingForNum2 === true) {
        calculator.displayValue = digit;
        calculator.waitingForNum2 = false;
    } else {
        calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
        console.log(calculator);
    }
}

function inputDecimal(dot) {
    if (!calculator.displayValue.includes(dot)) {
        calculator.displayValue += dot;
    }
}

function clear() {
    calculator.displayValue = '0';
    calculator.num1 = null;
    calculator.waitingForNum2 = false;
    calculator.operator = null;
}

function handleOperator(nextOperator) {
    const { num1, displayValue, operator } = calculator;
    const inputValue = parseFloat(displayValue);

    if (operator && calculator.waitingForNum2) {
        calculator.operator = nextOperator;
        return;
    }

    if (num1 == null && !isNaN(inputValue)) {
        calculator.num1 = inputValue;
    } else if (operator) {
    const result = operate(operator, num1, inputValue);
        
    calculator.displayValue = String(result);
    calculator.num1 = result;
}

    calculator.waitingForNum2 = true;
    calculator.operator = nextOperator;
    console.log(calculator);
}