function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    alert("Cannot divide by zero");
    return null;
  }

  return a / b;
}

function operate(operator, a, b) {
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
    default:
      throw new Error(`Unknown operator: ${operator}`);
  }
}

const display = document.querySelector("#display");
let firstNumber = "";
let secondNumber = "";
let currentOperator = "";
let waitingforSecondNum = false;
let justCalculated = false;

const cache = document.querySelector("#cache");

const numbers = document.querySelectorAll("[data-value]");
numbers.forEach((number) => number.addEventListener("click", activate));
const operators = document.querySelectorAll("[data-operator]");
operators.forEach((operator) => operator.addEventListener("click", activateop));
const actions = document.querySelectorAll("[data-action]");
actions.forEach((action) => action.addEventListener("click", handleAction));
function activate(e) {
  const value = e.target.textContent;
  const currentNumber = waitingforSecondNum ? secondNumber : firstNumber;

  if (value === "." && currentNumber.includes(".")) {
    return;
  }

  if (waitingforSecondNum) {
    secondNumber += secondNumber === "" && value === "." ? "0." : value;
    display.textContent = secondNumber;
  } else if (justCalculated) {
    firstNumber = value === "." ? "0." : value;
    justCalculated = false;
    display.textContent = firstNumber;
  } else {
    firstNumber += firstNumber === "" && value === "." ? "0." : value;
    display.textContent = firstNumber;
  }
}
function activateop(e) {
  if (!firstNumber) {
    return;
  }

  currentOperator = e.currentTarget.dataset.operator;
  const visibleOperator =
    currentOperator === "*"
      ? "×"
      : currentOperator === "/"
        ? "÷"
        : currentOperator;
  cache.textContent = `${firstNumber} ${visibleOperator}`;
  waitingforSecondNum = true;
  justCalculated = false;
}

function handleAction(e) {
  const action = e.currentTarget.dataset.action;

  if (action === "clear") {
    clearAll();
  } else if (action === "equals") {
    calculate();
  } else if (action === "sign") {
    toggleSign();
  } else if (action === "percent") {
    convertToPercent();
  }
}

function toggleSign() {
  if (waitingforSecondNum && secondNumber) {
    secondNumber = String(Number(secondNumber) * -1);
    display.textContent = secondNumber;
  } else if (firstNumber) {
    firstNumber = String(Number(firstNumber) * -1);
    display.textContent = firstNumber;
  }
}

function convertToPercent() {
  if (waitingforSecondNum && secondNumber) {
    secondNumber = String(Number(secondNumber) / 100);
    display.textContent = secondNumber;
  } else if (firstNumber) {
    firstNumber = String(Number(firstNumber) / 100);
    display.textContent = firstNumber;
  }
}

function calculate() {
  if (!firstNumber || !secondNumber || !currentOperator) {
    return;
  }

  const num1 = Number(firstNumber);
  const num2 = Number(secondNumber);
  let result = operate(currentOperator, num1, num2);

  if (result === null) {
    return;
  }

  if (typeof result === "number" && !Number.isInteger(result)) {
    result = Number(result.toFixed(4));
  }

  display.textContent = result;
  const visibleOperator =
    currentOperator === "*"
      ? "×"
      : currentOperator === "/"
        ? "÷"
        : currentOperator;
  cache.textContent = `${num1} ${visibleOperator} ${num2} =`;

  firstNumber = String(result);
  secondNumber = "";
  currentOperator = "";
  waitingforSecondNum = false;
  justCalculated = true;
}
function clearAll() {
  display.textContent = "0";
  firstNumber = "";
  secondNumber = "";
  currentOperator = "";
  waitingforSecondNum = false;
  cache.textContent = "";
  justCalculated = false;
}

const erase = document.getElementById("erase");
erase.addEventListener("click", eraseLast);

function eraseLast() {
  if (waitingforSecondNum) {
    secondNumber = secondNumber.slice(0, -1);
    display.textContent = secondNumber || "0";
  } else {
    firstNumber = firstNumber.slice(0, -1);
    justCalculated = false;
    display.textContent = firstNumber || "0";
  }
}
document.addEventListener("keydown", handleKeyboard);

function handleKeyboard(event) {
  const key = event.key;

  if (/^\d$/.test(key) || key === ".") {
    event.preventDefault();
    activate({ target: { textContent: key } });
    return;
  }

  const operator = key === "x" || key === "X" ? "*" : key;

  if (["+", "-", "*", "/"].includes(operator)) {
    event.preventDefault();
    activateop({
      currentTarget: {
        dataset: { operator },
      },
    });
    return;
  }

  if (key === "Enter" || key === "=") {
    event.preventDefault();
    calculate();
  } else if (key === "Backspace") {
    event.preventDefault();
    eraseLast();
  } else if (key === "Escape" || key === "Delete") {
    event.preventDefault();
    clearAll();
  } else if (key === "%") {
    event.preventDefault();
    convertToPercent();
  }
}