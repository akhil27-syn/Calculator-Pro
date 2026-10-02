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

const cache = document.querySelector("#cache");

function updateDisplay(value) {
  display.textContent = value || "0";
}

const numbers = document.querySelectorAll("[data-value]");
numbers.forEach((number) => number.addEventListener("click", activate));
const operators = document.querySelectorAll("[data-operator]");
operators.forEach((operator) => operator.addEventListener("click", activateop));
function activate(e) {
  firstNumber += e.target.textContent;
  console.log(firstNumber);
  display.textContent = firstNumber;
}
function activateop(e) {
  currentOperator = e.target.textContent;
  console.log(currentOperator);
  cache.textContent = firstNumber + currentOperator;
  firstNumber = "";
}
