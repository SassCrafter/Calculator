

function updateDisplay(value) {
    display.innerText = value;
}

function calculation() {
    let result = undefined;
    switch (operator) {
        case '+':
            result = firstNum + secondNum;
            break;
        case '-':
            result = firstNum - secondNum;
            break;
        case '×':
            result = firstNum * secondNum;
            break;
        case '÷':
            result = firstNum / secondNum;
            break;
    }
    updateDisplay(result);
}

function clear() {
    numStr = '0';
    updateDisplay(numStr);
    numStr = '';
}

function removeClass(arr, className) {
    arr.forEach(el => { el.classList.remove(`${className}`)});
}

function checkKey(e) {
    const key = e.target;
    const action = key.dataset.action;
    const currentValue = this.innerText;


    // Check if pressed key is an operator key and sets class pressed and data-previous-key-type to operator if operator key
    if (key.classList.contains('operators-btn')) {
        operator = currentValue;
        removeClass(operKeys, 'operator-pressed');
        key.classList.add('operator-pressed');
        calculator.dataset.previousKeyType = 'operator';
    } else {
        removeClass(operKeys, 'operator-pressed');

        // Check if previous pressed key is operator key if so sets first number to firstNum variable
        if (calculator.dataset.previousKeyType === 'operator') {
            calculator.dataset.previousKeyType = 'not-operator'
            firstNum = Number(numStr);
            numStr = '';
        }

        if (!action) {
            numStr += currentValue;
            updateDisplay(numStr);
        }  else if (action === 'clear') {
            clear();
        } else if (action === 'decimal') {
            numStr += '.';
            updateDisplay(numStr);
        } else if (action === 'calculate') {
            secondNum = Number(numStr);
            numStr = '';
            calculation();
        }
    }

    
}

const calculator = document.querySelector('.calculator');
const buttons = document.querySelectorAll('.calculator__btn');
const display = document.querySelector('.calculator__display');
const operKeys = document.querySelectorAll('.operators-btn');
let numStr = '';
    firstNum = undefined;
    secondNum = undefined;
    operator = '';

buttons.forEach(button => { button.addEventListener('click', checkKey)});