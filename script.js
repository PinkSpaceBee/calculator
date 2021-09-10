let calculator = document.querySelector('#js-calculator');
let display = document.querySelector('#js-display');
let digits = Array.from(document.querySelector('.js-digits').children);
let operators = Array.from(document.querySelector('.js-operators').children);


function add (a, b) {
    let result = parseFloat(a) === parseInt(a) && parseFloat(b) === parseInt(b) ?
        (a + b).toFixed(0) : 
        (a + b).toFixed(1);

    return result;
}
function substract (a, b) {
    let result = parseFloat(a) === parseInt(a) && parseFloat(b) === parseInt(b) ?
        (a - b).toFixed(0) : 
        (a - b).toFixed(1);

    return result;
}
function multiply (a, b) {
    let result = parseFloat(a) === parseInt(a) && parseFloat(b) === parseInt(b) ?
        (a * b).toFixed(0) : 
        (a * b).toFixed(1);

    return result;
}
function divide (a, b) {
    let result = parseFloat(a) === parseInt(a) && parseFloat(b) === parseInt(b) ?
    (a / b).toFixed(0) : 
    (a / b).toFixed(1);

return result;
}
function operate([operator, a, b]) {
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

let equation = [];

function inputNum() {
    digits.forEach(digit => digit.addEventListener('click', () => {
        display.value += digit.textContent;
        equation.push(digit.textContent);
    }));
}

function inputOperator() {
    operators.forEach(operator => operator.addEventListener('click', () => {
        display.value += operator.textContent;
        equation.push(operator.textContent);
    }));
}

inputNum();
inputOperator();