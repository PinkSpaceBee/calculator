let calculator = document.querySelector('#js-calculator');
let input = document.querySelector('#js-input');
let digits = Array.from(document.querySelector('.js-digits').querySelectorAll('button'));
let point = document.querySelector('#js-point');
let operators = Array.from(document.querySelector('.js-operators').children);
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
        case 'x':
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

window.addEventListener('keydown', inputEquationKeys);

function parseNum(str) {
    let decimal = str.substr(str.lastIndexOf('.'), 2);

    if (str.includes('.')) {
        if (str.startsWith('.')) {
            str = '0.';
        }
        else {
            str = parseInt(str) + decimal;
        }
    } else {
        str = parseInt(str) + '';
    }

    return str;
}

let digitsStr = [];
let operatorsStr = [];
digits.forEach(i => digitsStr.push(i.textContent));
operators.forEach(i => operatorsStr.push(i.textContent));

function inputEquationKeys(e) {
    if (e.key === '*') {
        operator = 'x';
        input.textContent = operator;
        equation.textContent = `${a} ${operator} ${b}`;
    } else if (e.key === '=') {    
        input.textContent = operate(a, operator, b);
        equation.textContent = `${a} ${operator} ${b} =`;
    } else if (e.key === 'Backspace') {
        undo();
    } else if (operatorsStr.includes(e.key) && b !== '') {
        calculate();
        operator = e.key;
        input.textContent = operator;
        equation.textContent = isFinite(parseNum(a)) ?`${parseNum(a)} ${operator}` : clear();
    } else if (operatorsStr.includes(e.key) && a !== '') {
        operator = e.key;
        input.textContent = operator;
        equation.textContent = `${parseNum(a)} ${operator}`;
    } else if (digitsStr.includes(e.key) && operator !== '') {
        b += e.key;
        b = parseNum(b);
        input.textContent = b;
        equation.textContent = `${a} ${operator} ${b}`;

        calculateBtn.disabled = false;
    } else if (a === '' && e.key === '-') {
        a = '-';
        input.textContent = a; 
        equation.textContent = a;
    } else if (digitsStr.includes(e.key)) {
        a += e.key;
        a = parseNum(a);
        input.textContent = a; 
        equation.textContent = a;
    }
}

function inputEquation() {
    if (this.textContent === '=') {
        calculate();
        calculateBtn.disabled = true;
    } else if (operatorsStr.includes(this.textContent) && b !== '') {
        calculate();
        operator = this.textContent;
        input.textContent = operator;
        equation.textContent = isFinite(parseNum(a)) ?`${parseNum(a)} ${operator}` : clear();
    } else if (operatorsStr.includes(this.textContent) && a !== '') {
        operator = this.textContent;
        input.textContent = operator;
        equation.textContent = `${parseNum(a)} ${operator} `;
    } else if (digitsStr.includes(this.textContent) && operator !== '') {
        b += this.textContent;
        b = parseNum(b);
        input.textContent = b;
        equation.textContent = `${a} ${operator} ${b} `;

        calculateBtn.disabled = false;
    } else if (a === '' && this.textContent === '-') {
        a = '-';
        input.textContent = a; 
        equation.textContent = a;
    } else if (digitsStr.includes(this.textContent)) {
        a += this.textContent;
        a = parseNum(a);
        input.textContent = a; 
        equation.textContent = a;
    }
}

function calculate() {

    input.textContent = operate(a,operator,b); 
    equation.textContent = `${equation.textContent} =`;

    if (isFinite(input.textContent)) {
        input.textContent;
        a = input.textContent;
        operator = '';
        b = '';
    }  else {
        clear();
    }


}

function undo () {
    if (equation.textContent.includes('=')) {
        clear();
    } else {
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
}

function clear() {
    a = '';
    operator = '';
    b = '';
    input.textContent = '';
    equation.textContent = '';
}

undoBtn.addEventListener('click', () => {
    undo();
})


calculateBtn.addEventListener('click', () => {
    calculate();
    calculateBtn.disabled = true;
});

clearBtn.addEventListener('click', () => {
    clear();
})


