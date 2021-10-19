let calculator = document.querySelector('#js-calculator');
let input = document.querySelector('#js-input');
let digits = Array.from(document.querySelector('.js-digits').children);
let point = document.querySelector('#js-point');
let operators = Array.from(document.querySelector('.js-operators').children);
let result = document.querySelector('#js-result');
let calculateBtn = document.querySelector('#js-calculate');
let clearBtn = document.querySelector('#js-clear');

function add(a, b) {
    let result = parseFloat(a) + parseFloat(b);
    return result * 100 / 100;
    //return Math.floor((result * 100) / 100);
}
function substract(a, b) {
    let result = parseFloat(a - b) === parseInt(a - b) ? 
        (a - b).toFixed(0) :
        (a - b).toFixed(1);
    
    return result;
}
function multiply(a, b) {
    let result = parseFloat(a * b) === parseInt(a * b) ? 
        (a * b).toFixed(0) :
        (a * b).toFixed(1);
    
    return result;
}
function divide(a, b) {
    let result = b === 0? 'x_x' :
        parseFloat(a / b) === parseInt(a / b) ? 
        (a / b).toFixed(0) :
        (a / b).toFixed(1);
    
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
let o = '';
let b = '';
let equation = document.querySelector('#js-equation');

digits.forEach(digit => digit.addEventListener('click', inputEquation));
operators.forEach(operator => operator.addEventListener('click', inputEquation));

function parseNum(str) {
    let decimal = str.substr(str.lastIndexOf('.'), 2);

    if (str.includes('.')) {
        str = parseInt(str) + decimal;
    } else {
        str = parseInt(str) + '';
    }

    return str;
}

function inputEquation(e) {
    if (b !== '' && operators.includes(e.target)) {
        test();
        o = this.textContent;
        input.value = o, 
        equation.textContent = `${parseFloat(a)}${o}`;
        console.log(`00 ${this.textContent} ${a} ${o === ''} ${b === ''}`);
    } else if (a !== '' && o !== '') {
        b += this.textContent;
        b = parseNum(b);
        input.value = b, 
        equation.textContent =  `${parseFloat(a)}${o}${parseFloat(b)}`;
        console.log(`01 ${a === ''} ${o === ''} ${b === ''}`);
    } else if (operators.includes(e.target)) {
        o = this.textContent;
        input.value = o, 
        equation.textContent = `${parseFloat(a)}${o}`;
        console.log(`02 ${a === ''} ${o === ''} ${b === ''}`);
    } else if (!operators.includes(e.target) && o === '') {
        a += this.textContent;
        a = parseNum(a);
        input.value = a;
        equation.textContent = parseFloat(a);
        console.log(`03 ${a === ''} ${o === ''} ${b === ''}`);
    }
}

function test() {
    result.textContent = operate(a,o,b);
    a = result.textContent;
    o = '';
    b = '';
}

calculateBtn.addEventListener('click', () => {
test();
});
clearBtn.addEventListener('click', () => {
    a = '';
    o = '';
    b = '';
    input.value = '';
    equation.textContent = '';
    result.textContent = '';
});


