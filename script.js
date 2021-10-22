let calculator = document.querySelector('#js-calculator');
let input = document.querySelector('#js-input');
let digits = Array.from(document.querySelector('.js-digits').children);
let point = document.querySelector('#js-point');
let operators = Array.from(document.querySelector('.js-operators').children);
let result = document.querySelector('#js-result');
let calculateBtn = document.querySelector('#js-calculate');
let clearBtn = document.querySelector('#js-clear');
let undoBtn = document.querySelector('#js-undo');

function add(a, b) {
    let result = Math.floor((+a + +b) * 10) / 10;
    return result;
}
function substract(a, b) {
    let result = Math.floor((a - b) * 10) / 10;
    return result;
}
function multiply(a, b) {
    let result = Math.floor((a * b) * 10) / 10;
    return result;
}
function divide(a, b) {
    let result = Math.floor((a / b) * 10) / 10;
    return result;
}
function operate(a, operator, b) {
    switch (operator.toString()) {
        case '+':
            return add(a, b);
        case '-':
            return substract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
    }
}

let a = '';
let operator = '';
let b = '';
let equation = document.querySelector('#js-equation');

digits.forEach(digit => digit.addEventListener('click', inputEquation));
operators.forEach(operator => operator.addEventListener('click', inputEquation));
input.addEventListener('input', inputEquation);

function inputEquation(e) {
    function parseNum(str) {
        let decimal = str.substr(str.lastIndexOf('.'), 2);
    
        if (str.includes('.')) {
            str = parseInt(str) + decimal;
        } else {
            str = parseInt(str) + '';
        }
    
        return str;
    }
    function isOperator(e) {
        return operators.includes(e.target);
    }

    calculateBtn.disabled = true;

    if (isOperator(e)) {
        if (b === '') { 
            if (a === '') {
                if (this.textContent === '-') {
                    a = this.textContent;
                    input.textContent = a;
                } else {}
            } else {
                operator = this.textContent;
                input.textContent = operator;
                equation.textContent = `${parseNum(a)}${operator}`;
            }
        } else {
            calculate();
            operator = this.textContent;
            input.textContent = operator;
            equation.textContent = `${parseNum(a)}${operator}`;
        }
    } else {
        if (this.textContent === '.') {
            if (operator === '') {
                if (a === '') {
                    a = '0.';
                    input.textContent = a;
                } else {
                    a += this.textContent;
                    a = parseNum(a);
                    input.textContent = a;
                }
            } else {
                if (b === '') {
                    b = '0.';
                    input.textContent = b;
                } else {
                    b += this.textContent;
                    b = parseNum(b);
                    input.textContent = b;
                }
            }
        } else {
            if (operator === '') {
                a += this.textContent;
                a = parseNum(a);
                input.textContent = a;
            } else {
                b += this.textContent;
                b = parseNum(b);
                input.textContent = b;
                equation.textContent = `${parseNum(a)}${operator}${parseNum(b)}`;
                calculateBtn.disabled = false;
            }
        }
    }
}

function calculate() {
    result.textContent = operate(a,operator,b);
    a = result.textContent;
    operator = '';
    b = '';
}

calculateBtn.addEventListener('click', () => {
calculate();
console.log(a);
a = '';
});
clearBtn.addEventListener('click', () => {
    a = '';
    operator = '';
    b = '';
    input.textContent = '';
    equation.textContent = '';
    result.textContent = '';
});


