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

window.addEventListener('keydown', inputEquationKeys);

function parseNum(str) {
    let decimal = str.substr(str.lastIndexOf('.'), 2);

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
    } else if (e.key === 'Backspace') {
        undo();
    } else if (operatorsStr.includes(e.key) && b !== '') {
        calculate();
        operator = e.key;
        input.textContent = operator;
        equation.textContent = isFinite(parseNum(a)) ?`${parseNum(a)}${operator}` : clear();
    } else if (operatorsStr.includes(e.key) && a !== '') {
        operator = e.key;
        input.textContent = operator;
        equation.textContent = `${parseNum(a)}${operator}`;
    } else if (digitsStr.includes(e.key) && operator !== '') {
        b += e.key;
        b = parseNum(b);
        input.textContent = b;
        equation.textContent = `${a}${operator}${b}`;

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


function inputEquation(e) {
    function isOperator(e) {
        return operators.includes(e.target);
    }

    calculateBtn.disabled = true;

    if (isOperator(e) && b !== '') {
        calculate();
        operator = this.textContent;
        input.textContent = operator;
        equation.textContent = isFinite(parseNum(a)) ?`${parseNum(a)}${operator}` : clear();
    } else if (isOperator(e) && a !== '') {
        operator = this.textContent;
        input.textContent = operator;
        equation.textContent = `${parseNum(a)}${operator}`;
    } else if (operator !== '') {
        b += this.textContent;
        b = parseNum(b);
        input.textContent = b;
        equation.textContent = `${a}${operator}${b}`;

        calculateBtn.disabled = false;
    } else if (a === '' && this.textContent === '-') {
        a = '-';
        input.textContent = a; 
        equation.textContent = a;
    } else {
        a += this.textContent;
        a = parseNum(a);
        input.textContent = a; 
        equation.textContent = a;
    }
}

function calculate() {
    result.textContent = operate(a,operator,b); 

    if (isFinite(result.textContent)) {
        result.textContent;
        a = result.textContent;
        operator = '';
        b = '';
        input.textContent = '';
    }  else {
        clear();
    }
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

function clear() {
    a = '';
    operator = '';
    b = '';
    input.textContent = '';
    equation.textContent = '';
    result.textContent = '';
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


