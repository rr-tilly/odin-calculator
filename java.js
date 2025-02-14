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


    switch (operator) {
        case "+":
            updateResult(add(a, b));
            break;
        case "-":
            updateResult(subtract(a, b));
            break;
        case "x":
            updateResult(multiply(a, b));
            break;
        case "÷":
            updateResult(divide(a, b));
            break;
    }

}

const allKeys = document.querySelectorAll(".keys");
allKeys.forEach(element => {
    element.addEventListener("click", element => buttonPushed(element.target.id))
});

function buttonPushed(id) {

    const char = document.querySelector(`#${id}`).textContent;
    switch (id) {
        case "c":
            updateDisplay("");
            updateResult("");
            break;

        case "backspace":
            const deleteChar = getDisplayText().charAt(getDisplayText().length - 1);
            if (deleteChar === " ") {
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
            if (array.length == 3) {
                array.push(char);
                operate(array);
            }
            else { updateDisplay(getDisplayText() + " " + char + " ") }

            break;

        default:
            console.log(char);
            updateDisplay(getDisplayText() + char);
            break;
    }
}

function convertDisplaytoArr(expression) {
    const array = expression.split(" ");
    console.table(array);
    return array;
}

function updateResult(result) {
    resultDisplay = document.querySelector(".result");
    resultDisplay.textContent = result;
}

function getDisplayText() {
    return document.querySelector(".operation").textContent;
}

function updateDisplay(text) {
    const display = document.querySelector(".operation");

    if (text === "delete operand") display.textContent = display.textContent.substring(0, display.textContent.length - 3)
    else if (text === "delete number") display.textContent = display.textContent.substring(0, display.textContentlength - 1)
    else display.textContent = text;
}
