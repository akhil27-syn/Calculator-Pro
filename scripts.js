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
    return "";
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

const cache = document.querySelector("#cache");

const numbers = document.querySelectorAll("[data-value]");
numbers.forEach((number) => number.addEventListener("click", activate));
const operators = document.querySelectorAll("[data-operator]");
operators.forEach((operator) => operator.addEventListener("click", activateop));
function activate(e) {
  if (waitingforSecondNum) {
    secondNumber += e.target.textContent;
    display.textContent = secondNumber;
  } else {
    firstNumber += e.target.textContent;
    display.textContent = firstNumber;
  }
}
function activateop(e) {
  if (!firstNumber) {
    return;
  }

  currentOperator = e.target.textContent;
  cache.textContent = `${firstNumber} ${currentOperator}`;
  waitingforSecondNum = true;
}
const equals = document.getElementById("equals");
equals.addEventListener("click", calculate);

function calculate() {
  if (!firstNumber || !secondNumber || !currentOperator) {
    return;
  }

  const num1 = Number(firstNumber);
  const num2 = Number(secondNumber);
  let result = operate(currentOperator, num1, num2);

  if (typeof result === "number" && !Number.isInteger(result)) {
    result = Number(result.toFixed(4));
  }

  display.textContent = result;
  cache.textContent = `${num1} ${currentOperator} ${num2} =`;

  firstNumber = String(result);
  secondNumber = "";
  currentOperator = "";
  waitingforSecondNum = false;
}
const clear = document.getElementById("clear");
clear.addEventListener("click", clearAll);
function clearAll() {
  display.textContent = "0";
  firstNumber = "";
  secondNumber = "";
  currentOperator = "";
  waitingforSecondNum = false;
  cache.textContent = "";
}
