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
let operatorsStr = ['*'];
digits.forEach(i => digitsStr.push(i.textContent));
operators.forEach(i => operatorsStr.push(i.textContent));

function inputEquationKeys(e) {

    if (e.key === 'Backspace') {
        console.log(`00 ${e.key}`);
        undo();
    } else if (e.key === '=') {
            operator === '*' ? input.textContent = operate(a, 'x', b) : input.textContent = operate(a, operator, b);

            if (isFinite(parseFloat(input.textContent))) {
                operator === '*' ? equation.textContent = `${a} x ${b} =` : equation.textContent = `${a} ${operator} ${b} =`;
            } else {
                clear();
            }

    } else if (operatorsStr.includes(e.key) && b !== '') {
        operator === '*' ? input.textContent = operate(a, 'x', b) : input.textContent = operate(a, operator, b);

        if (isFinite(parseFloat(input.textContent))) {
            operator === '*' ? equation.textContent = `${a} x ${b} =` 
            : equation.textContent = `${a} ${operator} ${b} =`;
            a = input.textContent;

            b = '';

            operator = e.key;

            operator === '*' ? input.textContent = 'x' : input.textContent = operator;
            operator === '*' ? equation.textContent = `${a} x ` : equation.textContent = `${a} ${operator}`;
        } else {
            clear();
        }

    } else if (digitsStr.includes(e.key) && operator !== '') {
        if (operator === '*') {
            b += e.key;
            b = parseNum(b);
            calculateBtn.disabled = false;
            equation.textContent = `${a} x ${b}`;
        } else {
            b += e.key;
            b = parseNum(b);
            calculateBtn.disabled = false;
            equation.textContent = `${a} ${operator} ${b}`;
        }
    } else if (a !== '' && operatorsStr.includes(e.key)) {
        if (e.key === '*') {
            operator = e.key;
            input.textContent = 'x';
            equation.textContent = `${a} x`;
        } else {
            operator = e.key;
            input.textContent = e.key;
            equation.textContent = `${a} ${operator}`
        }
    } else if (digitsStr.includes(e.key) || e.key === '-') {
        if (e.key === '-') {
            a = 0;
            operator = '-';
            equation.textContent = `${a} ${operator}`;
            input.textContent = `${a} ${operator}`;
        } else {
            a += e.key;
            a = parseNum(a);
            input.textContent = a; 
            equation.textContent = a;
        }
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
    } else if (operator === '' && digitsStr.includes(this.textContent) || this.textContent === '-') {
        if (this.textContent === '-') {
            a = 0;
            operator = '-';
            equation.textContent = `${a} ${operator}`;
            input.textContent = `${a} ${operator}`;
        } else {
            a += this.textContent;
            a = parseNum(a);
            input.textContent = a; 
            equation.textContent = a;
        }
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
    if (equation.textContent.includes('=') || a === '0') {
        clear();
    } else {
        equation.textContent = equation.textContent.slice(0, -2);
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


