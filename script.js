let calculator = document.querySelector('#js-calculator');
let equation = document.querySelector('#js-equation');
let digits = Array.from(document.querySelector('.js-digits').children);
let operators = Array.from(document.querySelector('.js-operators').children);
let result = document.querySelector('#js-result');
let calculateBtn = document.querySelector('#js-calculate');
let clearBtn = document.querySelector('#js-clear');

function add(a, b) {
    let result = parseFloat(a + b) === parseInt(a + b) ? 
        (a + b).toFixed(0) :
        (a + b).toFixed(1);
    
    return result;
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

let equationStr = [];
inputEquation();
parseEquation(equationStr);

function inputEquation() {
    digits.forEach(digit => digit.addEventListener('click', () => {
        equation.value += digit.textContent;
        equationStr.push(digit.textContent);
        y = [...equationStr];
    }));
    operators.forEach(operator => operator.addEventListener('click', () => {
        equation.value += operator.textContent;
        equationStr.push(' ',operator.textContent,' ');
    }));
}
function parseEquation(arr) {
    return arr.join('').split(' ').map(x => isNaN(parseFloat(x)) ? x : parseFloat(x));
}

calculateBtn.addEventListener('click', () => {
    result.textContent = operate(parseEquation(equationStr));

});
clearBtn.addEventListener('click', () => {
    equationStr = [];
    result.textContent = 0;
    equation.value = '';
});


