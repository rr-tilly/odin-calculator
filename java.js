function add(a, b) {
    return a + b
}
function subtract(a, b) {
    return a - b
}
function multiply(a, b) {
    return a * b
}
function divide(a, b) {
    return a / b
}

function operate(array) {

    const operator = array[1];
    console.log(array);

    const a = Number(array[0]);
    const b = Number(array[2]);

    let result = "";

    switch (operator) {
        case "+":
            // if (array.length = )
            result = add(a, b);
            break;
        case "-":
            result = subtract(a, b);
            break;
        case "x":
            result = multiply(a, b);
            break;
        case "÷":
            result = divide(a, b);
            break;

    }

    updateResult(result);
    return result;

}

const allKeys = document.querySelectorAll(".keys");
allKeys.forEach(element => {
    element.addEventListener("click", element => buttonPushed(element.target.id))
});

function buttonPushed(id) {

    const char = document.querySelector(`#${id}`).textContent;
    const lastChar = getDisplayText().charAt(getDisplayText().length - 1);

    switch (id) {
        case "c":
            updateDisplay("");
            updateResult("");
            break;

        case "backspace":
            if (lastChar === " ") {
                updateDisplay("delete operand");
            } else {
                updateDisplay("delete number");
            }
            break;

        case "equals":
            operate(convertDisplaytoArr(getDisplayText()));
            break;

        case "plus":
        case "minus":
        case "multiply":
        case "divide":

            const array = convertDisplaytoArr(getDisplayText());
            console.log(array);
            if (lastChar === " ") {
                updateDisplay(getDisplayText().substring(0, getDisplayText().length - 3) + " " + char + " ");
                break;
            };

            if (array.length == 3) {
                const result = operate(array);
                updateDisplay(result + " " + char + " ");

            }
            else { updateDisplay(getDisplayText() + " " + char + " ") };

            break;

        default:
            console.log(char);
            updateDisplay(getDisplayText() + char);
            break;
    }
}

function convertDisplaytoArr(expression) {
    const array = expression.split(" ");
    return array;
}

function updateResult(result) {
    resultDisplay = document.querySelector(".result");
    resultDisplay.textContent = Math.round(result * 100) / 100;
}

function getDisplayText() {
    return document.querySelector(".operation").textContent;
}

function updateDisplay(text) {
    const display = document.querySelector(".operation");
    if (text === "delete operand") display.textContent = display.textContent.substring(0, display.textContent.length - 3)
    else if (text === "delete number") display.textContent = display.textContent.substring(0, display.textContent.length - 1)
    else display.textContent = text;
}
