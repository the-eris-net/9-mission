const resultElement = document.querySelector('.display-body > span');

let state = {
    firstOperand: 0,
    operator: null,
    secondOperand: null,
    reset: false,
    displayNumber: null,
}

document.querySelectorAll('.button').forEach((btn) => {
    btn.addEventListener('click', btnClick)
})

function getData(classList, currentValue, number) {
    return {
        number,
        currentValue,
        btnType: getBtnType(classList),
    }
}

function getState(state, number, currentValue, btnType) {
    switch (btnType) {
        case 'number':
            return { ...btnClickNumber(state, currentValue, number) };
        case 'dot':
            return { ...btnClickDot(state, number) };
        case 'function':
            return { ...btnClickFunction(state, currentValue) };
        case 'operator':
            return { ...btnClickOperator(state, currentValue, number) };
    }
}

function display(state) {
    resultElement.textContent = state.firstOperand;
}

function getBtnType(classList) {
    if (Array.from(classList).includes('number')) {
        return 'number';
    }
    if (Array.from(classList).includes('dot')) {
        return 'dot';
    }
    if (Array.from(classList).includes('function')) {
        return 'function';
    }
    if (Array.from(classList).includes('operator')) {
        return 'operator';
    }
    return 'unknown';
}


function btnClick(event) {
    const { number, currentValue, btnType } = getData(event.target.classList,
        event.target.textContent,
        resultElement.textContent);

    state = getState(state, number, currentValue, btnType);
    display(state);
}

function btnClickNumber(state, currentValue, number) {
    if ((Number(number) === 0 && !hasDot(number)) || state.reset) {
        return {
            ...state,
            firstOperand: currentValue,
            reset: false
        };
    }
    return {
        ...state,
        firstOperand: number + currentValue
    };
}

function btnClickDot(state, number) {
    if (!hasDot(number)) {
        number += '.';
    }
    return { ...state, firstOperand: number };
}

function hasDot(number) {
    return number.includes('.');
}

function btnClickFunction(state, fn) {
    switch (fn) {
        case 'C':
            return {
                ...state,
                firstOperand: 0
            }
        case '±':
            return {
                ...state,
                firstOperand: -state.firstOperand
            }
        case '%':
            return {
                ...state,
                firstOperand: `${Number(state.firstOperand) / 100}`
            }
        default:
            return {
                ...state,
            }
    }
}

function btnClickOperator(state, operator, currentNumber) {
    return {
        ...btnClickOperatorByOperatorIsEqual(state, operator, currentNumber),
        operator,
        reset: true
    };;
}

function btnClickOperatorByOperatorIsEqual(state, operator, currentNumber) {
    if (operator === '=') {
        return btnClickOperatorIfOperatorIsEqual(state, currentNumber);
    }
    return btnClickOperatorIfOperatorIsNotEqual(state, currentNumber);
}

function btnClickOperatorIfOperatorIsEqual(state, currentNumber) {
    return {
        ...state,
        firstOperand: Number(calculate(Number(state.secondOperand),
            state.operator,
            Number(currentNumber)).toFixed(2))
    };
}

function btnClickOperatorIfOperatorIsNotEqual(state, currentNumber) {
    // a (+ b) = c (+ d) = e (+ f) [- d]
    if (state.operator !== '=' && state.operator !== null) {
        const firstOperand = Number(calculate(Number(state.secondOperand),
            state.operator,
            Number(currentNumber)).toFixed(2));
        return {
            ...state,
            firstOperand,
            secondOperand: firstOperand,
        };
    }
    return {
        ...state,
        secondOperand: currentNumber
    };
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