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
/*
['click', 'keydown'].forEach(e => digits.forEach(digit => digit.addEventListener(e, inputEquation)));
*/
digits.forEach(digit => digit.addEventListener('click', inputEquation));

operators.forEach(operator => operator.addEventListener('click', inputEquation));
input.addEventListener('input', inputEquation);

window.addEventListener('keydown', inputEquationKeys);

function parseNum(str) {
    let decimal = str.substr(str.lastIndexOf('.'), 2);

    if (str === '-') {
        str = '-'
    } else
    if (str.includes('.')) {
        str = parseInt(str) + decimal;
    } else {
        str = parseInt(str) + '';
    }

    return str;
}

function inputEquationKeys(e) {
    let digitsStr = [];
    let operatorsStr = [];
    digits.forEach(i => digitsStr.push(i.textContent));
    operators.forEach(i => operatorsStr.push(i.textContent));

    if (e.key === '=') {
        calculate();
        calculateBtn.disabled = true;
    } else if (operatorsStr.includes(e.key) && b !== '') {
        calculate();
        operator = e.key;
        input.textContent = operator;
        equation.textContent = `${parseNum(a)}${operator}`;
    } else if (digitsStr.includes(e.key) && operator !== '') {
        b += e.key;
        b = parseNum(b);
        calculateBtn.disabled = false;
        equation.textContent = `${a}${operator}${b}`;
    } else if (a !== '' && operatorsStr.includes(e.key)) {
        operator = e.key;
        equation.textContent = `${a}${operator}`
    } else if (digitsStr.includes(e.key) || e.key === '-') {
        a += e.key;
        a = parseNum(a);
        input.textContent = a;
    } else if (e.key === 'Backspace') {
        console.log(`00 ${e.key}`);
        undo();
    }
 }

function inputEquation(e) {


    function isOperator(e) {
        return operators.includes(e.target);
    }

    calculateBtn.disabled = true;

    if (isOperator(e)) {
        if (b === '') { 
                operator = this.textContent;
                input.textContent = operator;
                equation.textContent = `${parseNum(a)}${operator}`;
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
                //a += e.key;
                a += this.textContent;
                //console.log(typeof e.key);
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

function undo () {
    equation.textContent = equation.textContent.slice(0, -1);
    input.textContent = input.textContent.slice(0, -1);

    if(operator === '') {
        a = a.slice(0, -1);
    } else if (b === '') {
        operator = '';
    } else {
        b = b.slice(0, -1);
    }
}

undoBtn.addEventListener('click', () => {
    undo();
})
calculateBtn.addEventListener('click', () => {
calculate();
calculateBtn.disabled = true;
});
clearBtn.addEventListener('click', () => {
    a = '';
    operator = '';
    b = '';
    input.textContent = '';
    equation.textContent = '';
    result.textContent = '';
});


