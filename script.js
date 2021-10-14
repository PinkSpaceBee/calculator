let calculator = document.querySelector('#js-calculator');
let equation = document.querySelector('#js-equation');
let digits = Array.from(document.querySelector('.js-digits').children);
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
let idk;
let test = document.querySelector('#js-test');

digits.forEach(digit => digit.addEventListener('click', inputEquation));
operators.forEach(operator => operator.addEventListener('click', inputEquation))
let point = document.querySelector('#js-point');

function parseNum(str) {
    let decimal = str.substr(str.lastIndexOf('.'), 2);

    if (str.includes('.')) {
        str = parseInt(str) + decimal;
    } else {
        str = parseInt(str) + '';
    }

    return str;
}

function inputEquation() {
        if (this.textContent !== '+' && o === '') {
            a += this.textContent;
            a = parseNum(a);
            equation.value = a;
            test.textContent = parseFloat(a);
        } else if (this.textContent === '+') {
            o = this.textContent;
            equation.value = o, 
            test.textContent = parseFloat(a + o);
        } else if (a !== 0 && o !== 0) {
                b += this.textContent;
                b = parseNum(b);
                equation.value = b, 
                test.textContent = parseFloat(a) + o + parseFloat(b);
        } 
}

calculateBtn.addEventListener('click', () => {
    result.textContent = operate(a,o,b);
});
clearBtn.addEventListener('click', () => {
    equationStr = [];
    a = 0;
    result.textContent = 0;
    equation.value = '';
});