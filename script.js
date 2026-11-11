
const currentDisplay = document.getElementById("current");
const previousDisplay = document.getElementById("previous");
const buttons = document.querySelector(".buttons");

let current = "0";
let previous = "";
let operator = null;
let shouldReset = false;

function updateDisplay() {
    currentDisplay.textContent = current;
    previousDisplay.textContent = previous;
}

function inputNumber(number) {
    if (current === "Error") current = "0";

    if (shouldReset) {
        current = number;
        shouldReset = false;
    } else {
        current = current === "0" ? number : current + number;
    }

    updateDisplay();
}

function inputDecimal() {
    if (current === "Error" || shouldReset) {
        current = "0";
        shouldReset = false;
    }

    if (!current.includes(".")) {
        current += ".";
    }

    updateDisplay();
}

function chooseOperator(op) {
    if (current === "Error") return;

    if (operator && !shouldReset) {
        calculate();
    }

    previous = current;
    operator = op;
    shouldReset = true;
    updateDisplay();
}

function calculate() {
    if (!operator || shouldReset) return;

    const first = parseFloat(previous);
    const second = parseFloat(current);
    let result;

    if (operator === "/" && second === 0) {
        current = "Error";
        previous = "Cannot divide by zero";
        operator = null;
        shouldReset = true;
        updateDisplay();
        return;
    }

    switch (operator) {
        case "+":
            result = first + second;
            break;
        case "-":
            result = first - second;
            break;
        case "*":
            result = first * second;
            break;
        case "/":
            result = first / second;
            break;
    }

    previous = `${previous} ${operator} ${current} =`;
    current = String(Number(result.toPrecision(12)));

    operator = null;
    shouldReset = true;
    updateDisplay();
}

function clearCalculator() {
    current = "0";
    previous = "";
    operator = null;
    shouldReset = false;
    updateDisplay();
}

function deleteNumber() {
    if (current === "Error" || shouldReset) {
        current = "0";
        shouldReset = false;
    } else {
        current = current.length > 1
            ? current.slice(0, -1)
            : "0";
    }

    updateDisplay();
}

buttons.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;

    const action = button.dataset.action;
    const value = button.dataset.value;

    if (action === "number") inputNumber(value);
    if (action === "decimal") inputDecimal();
    if (action === "operator") chooseOperator(value);
    if (action === "equals") calculate();
    if (action === "clear") clearCalculator();
    if (action === "delete") deleteNumber();
});

updateDisplay();
