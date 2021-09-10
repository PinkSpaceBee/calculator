function add (a, b) {
    let result = (a + b).toFixed(1);
    return result;
}
function substract (a, b) {
    let result = (a - b).toFixed(1);
    return result;
}
function multiply (a, b) {
    let result = (a * b).toFixed(1);
    return result;
}
function divide (a, b) {
    let result = (a / b).toFixed(1);
    return result;
}

//don't forget to pass a math operator as a string
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

