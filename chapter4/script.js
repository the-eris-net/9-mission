const resultElement = document.querySelector('.display-body > span');


let firstOperand = null;
let operator = null;
let secondOperand = null;
let reset = false;

document.querySelectorAll('.button').forEach((btn) => {
    btn.addEventListener('click', btnClick)
})

function btnClick(event) {
    // event.target은 유사 배열 객체라서 includes가 안되니 배열로 바꿔준다
    if (Array.from(event.target.classList).includes('number')) {
        btnClickNumber(event.target.textContent);
        return;
    }
    if (Array.from(event.target.classList).includes('dot')) {
        btnClickDot();
        return;
    }
    if (Array.from(event.target.classList).includes('function')) {
        btnClickFunction(event.target.textContent);
        return;
    }
    if (Array.from(event.target.classList).includes('operator')) {
        btnClickOperator(event.target.textContent);
        return;
    }
}

function btnClickNumber(number) {
    if ((Number(resultElement.textContent) === 0 && !hasDot()) || reset) {
        resultElement.textContent = number;
        reset = false;
        return;
    }
    resultElement.textContent += number;
}

function btnClickDot() {
    if (!hasDot()) {
        resultElement.textContent += '.'
    }
}

function hasDot() {
    return resultElement.textContent.includes('.');
}

function btnClickFunction(fn) {
    switch (fn) {
        case 'C':
            resultElement.textContent = 0;
            break;
        default:
    }
}

function btnClickOperator(op) {
    btnClickOperatorByOperatorIsEqual(op);
    operator = op;
    reset = true;
    resultElement.textContent = firstOperand;
    console.log(`First Operand: ${firstOperand}\nOperator: ${operator}`);
}

function btnClickOperatorByOperatorIsEqual(op) {
    if (op === '=') {
        btnClickOperatorIfOperatorIsEqual();
        return;
    }
    btnClickOperatorIfOperatorIsNotEqual();
}

function btnClickOperatorIfOperatorIsEqual() {
    secondOperand = resultElement.textContent;
    // firstOperandOrigin = calculate(Number(firstOperand), operator, Number(secondOperand));
    // firstOperandRound2 = calculate(Number(firstOperand), operator, Number(secondOperand)).toFixed(2);
    firstOperand = Number(calculate(Number(firstOperand), operator, Number(secondOperand)).toFixed(2));
    // console.log(firstOperandOrigin, firstOperandRound2);
}

function btnClickOperatorIfOperatorIsNotEqual() {
    if (firstOperand === null) {
        firstOperand = resultElement.textContent;
    }
    if (operator !== '=' && operator !== null) {
        btnClickOperatorIfOperatorIsEqual();
    }
}

function calculate(firstOperand, operator, secondOperand) {
    switch (operator) {
        case '+':
            return firstOperand + secondOperand;
        case '-':
            return firstOperand - secondOperand;
        case '*':
            return firstOperand * secondOperand;
        case '/':
            return firstOperand / secondOperand;
    }
}