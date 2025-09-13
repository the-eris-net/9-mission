const resultElement = document.querySelector('.display-body > span');

document.querySelectorAll('.button').forEach((btn) => {
    btn.addEventListener('click', btnClick)
})

function btnClick(event) {
    // event.target은 유사 배열 객체라서 includes가 안되니 배열로 바꿔준다
    if (Array.from(event.target.classList).includes('number')) {
        btnClickNumber(event.target.textContent);
    }
    if (Array.from(event.target.classList).includes('dot')) {
        btnClickDot();
    }
    if (event.target.classList.contains('function')) {
        btnClickFunction(event.target.textContent);
    }
    console.log(event.target.textContent);
}

function btnClickNumber(number) {
    if ((Number(resultElement.textContent) === 0 && !hasDot())) {
        resultElement.textContent = number;
        return;
    }
    resultElement.textContent += number;
}

function btnClickDot() {
    if (!hasDot()) {
        resultElement.textContent += '.'
    }
}

function hasDot(){
    return resultElement.textContent.includes('.');
}

function btnClickFunction(operator) {
    console.log(operator);
    switch (operator) {
        case 'C':
            console.log('hihi');
            resultElement.textContent = 0;
            break;
        default:
    }
}