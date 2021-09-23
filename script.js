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
function operate([a, operator, b]) {
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

let equationString = [];
foo();
//inputNum();
//inputOperator();
let test = function() {

}

let y = [...equationString];
//y.join('').split(' ').map(x => isNaN(parseFloat(x)) ? x : parseFloat(x));

function inputNum() {
    digits.forEach(digit => digit.addEventListener('click', () => {
        display.value += digit.textContent;
        equationString.push(digit.textContent);
    }));
    return equationString;
}

function inputOperator() {
    operators.forEach(operator => operator.addEventListener('click', () => {
        display.value += operator.textContent;
        equationString.push(' ',operator.textContent,' ');
    }));
}

function foo() {
    digits.forEach(digit => digit.addEventListener('click', () => {
        equationString.push('1');
    }))
}

/* calculator draft
let button = document.querySelector('#push-btn');

let arr = [];
let arrC1 = [];
foo();


function foo() {
    button.addEventListener('click', () => {
        arr.push('1');
        //arrC1.push('1');
        arrC1 = [...arr];
    });
}

let baz = function() {
    let arrC = [...arr];
   
*/