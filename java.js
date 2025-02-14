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

function operate(expression) {
    console.log(expression);
    console.log(typeof expression);

    const regexp = /(\d+|[a-z]+)/g;

    const array = expression.split(" ");
    console.table(array);

    const operator = array[1];
    console.log(operator);

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
    element.addEventListener("click", element => updateDisplay(element.target.id))
});

function updateDisplay(id) {
    const display = document.querySelector(".operation");
    const char = document.querySelector(`#${id}`).textContent;
    switch (id) {
        case "c":
            display.textContent = "";
            const resultDisplay = document.querySelector(".result");
            resultDisplay.textContent = "";
            break;
        case "backspace":
            const textDisplay = display.textContent;
            const deleteChar = textDisplay.charAt(textDisplay.length - 1);

            console.log(deleteChar);
            console.log(typeof deleteChar);

            if (deleteChar === " ") {
                display.textContent = textDisplay.substring(0, textDisplay.length - 3);
            } else {
                display.textContent = textDisplay.substring(0, textDisplay.length - 1);
            }

            break;
        case "equals":
            operate(display.textContent);
            break;
        case "plus":
        case "minus":
        case "multiply":
        case "divide":
            display.textContent = display.textContent + " " + char + " ";
            break;
        default:
            console.log(char);
            display.textContent = display.textContent + char;
            break;
    }
}


function updateResult(result) {
    resultDisplay = document.querySelector(".result");
    resultDisplay.textContent = result;
}

