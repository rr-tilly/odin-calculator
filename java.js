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

function operate() {

    const tokens = getTextfromArray();

    const operator = tokens[1];

    const a = Number(tokens[0]);
    const b = Number(tokens[2]);

    let result = "";


    if (tokens.length === 2) {
        updateResult(a);
        return;
    }
    else if (inputCount() === 1) {
        updateResult(keepToEightDigits(a));
        return;
    }
    else {

        //perform operation
        switch (operator) {
            case "+":
                result = add(a, b);
                break;
            case "-":
                result = subtract(a, b);
                break;
            case "x":
                result = multiply(a, b);
                break;
            case "/":
                if (a === 0 || b === 0) {
                    updateResult("that's sus");
                    return;
                }
                result = divide(a, b)
                break;
        }
    };


    result = keepToEightDigits(result);
    array = [];

    updateResult(result);

}

let array = [];

const allKeys = document.querySelectorAll(".keys");
allKeys.forEach(element => {
    element.addEventListener("click", element => pushedButton(element.target))
});

function pushedButton(button) {
    const key = button.textContent;
    const tokens = getTextfromArray();
    //for chaining after operate has been called
    if (array.length === 0 && button.classList.contains("operator")) {
        array.push(getResultText());

    };

    if (key === "=") {

        operate();
        enableDecimal();
    }
    //when operators are pressed consecutively replaced the last one with the new button pushed
    else if (tokens.length === 2 && button.classList.contains("operator")) {
        array[array.length - 1] = key;

        updateDisplay(button);
    }
    else if (key === ".") {
        decimal();
        return
    }
    else if (key === "C") {
        array = [];

        updateResult(key);
        updateDisplay(button);
        enableDecimal();

    }
    else if (button.id === "backspace") {
        array.splice(array.length - 1, 1);

        updateDisplay(button);
    }
    else if (button.classList.contains("operator")) {


        if (inputCount() === 3) {
            operate();
            array.push(getResultText());
            array.push(button.textContent);

            updateDisplay(button);

        }
        else {

            array.push(key);

            updateDisplay(button);
        };

        enableDecimal();
    }
    else if (key === ".") {

        updateDisplay(button);
        array.push(key);
        return;
    }
    else if (key === "+/-") {
        plusOrMinus();
        updateDisplay(button);
    }
    else if (key === "%") {
        percent();
        updateDisplay(button);

    }
    else {
        array.push(key);
        updateDisplay(button);
    };
}

function enableDecimal() {
    const dot = document.querySelector("#dot");
    dot.classList.remove("disabled")
}

function decimal() {
    const tokens = array.join("").split(/[\+\-\*\/]/);

    const dot = document.querySelector("#dot");

    if ((tokens.length === 1 && tokens[0].includes(".") == false)
        || (tokens.length === 2 && tokens[1].includes(".") == false)) {

        // If the first number starts with ".", push "0."
        if (tokens.length === 1 && tokens[0] === "") {
            array.push("0.");
            updateDisplay("0.");
        }
        // If the second number starts with ".", push "0."
        else if (tokens.length === 2 && tokens[1] === "") {
            array.push("0.");
            updateDisplay("0.");
        }
        // Otherwise, just push "."
        else {
            array.push(".");
            updateDisplay(dot);
        };

        dot.classList.add("disabled");
    }
    else {
        dot.classList.add("disabled");
        return;
    };
}

function getResultText() {
    return document.querySelector(".result").textContent;
}

function getDisplayText() {
    return document.querySelector(".operation").textContent;
}

function updateResult(text) {
    const resultDisplay = document.querySelector(".result");

    if (text === "C") {
        resultDisplay.textContent = "";
        return;
    }
    else {

        resultDisplay.textContent = text;
    }

}

function updateDisplay(button) {
    const display = document.querySelector(".operation");
    if (button.textContent === "C") {
        display.textContent = "";
    }
    else if (button.textContent === ".") {
        display.textContent = display.textContent + ".";
        return;

    }
    else if (button.textContent === "=") {
        return;
    }
    else if (button === "0.") {
        display.textContent = display.textContent + button;
    }
    else {
        display.textContent = getTextfromArray().join(" ");
    };
}

function getTextfromArray() {
    const expression = array.join("");
    console.log("Expression:", expression);

    let tokens = expression.match(/\d*\.?\d+(?:e[+-]?\d+)?|[()+\-x/]/gi) || [];


    tokens = tokens.reduce((acc, token, index) => {
        if (token === "-" && (index === 0 || "+-x/(".includes(tokens[index - 1]))) {
            acc.push("-" + tokens[index + 1]);
            tokens.splice(index + 1, 1);
        } else {
            acc.push(token);
        }
        return acc;
    }, []);

    console.log("Tokens:", tokens);
    return tokens;
}

function inputCount() {
    return getTextfromArray().length
}

function keepToEightDigits(result) {
    if (Math.abs(result) >= 1e8) {
        return result.toExponential(2);
    }

    let resultStr = result.toString();


    if (resultStr.includes("e")) {
        return result.toExponential(2);
    }

    if (resultStr.replace(".", "").length > 8) {
        return Number(result.toPrecision(8));
    }

    return result;
}


function plusOrMinus() {
    const tokens = getTextfromArray();
    if (tokens.length > 2) {
        tokens[2] = tokens[2] * -1;
        array = tokens;
    } else if (tokens.length === 1) {
        tokens[0] = tokens[0] * -1;
        array = tokens;
        const result = tokens[0];
        updateResult(result);
    }
    else {
        return;
    };
}

function percent() {

    const tokens = getTextfromArray();
    if (tokens.length > 2) {
        tokens[2] = keepToEightDigits(tokens[2] / 100);
        array = tokens;
    } else {
        const result = keepToEightDigits(Number(getResultText()) / 100);
        if (tokens.length === 0) {

            array[0] = result;
            updateResult(result);
        }
        else {
            tokens[0] = keepToEightDigits(tokens[0] / 100);
            updateResult(tokens[0]);
            array = tokens;
        };
    };
}

//keyboard support here 
document.addEventListener('keydown', (event) => {

    if (event.code === "Digit1") {
        const btn = document.getElementById("one");
        pseudoClick(btn);

    }
    else if (event.code === "Digit2") {
        const btn = (document.getElementById("two"));
        pseudoClick(btn);
    }
    else if (event.code === "Digit3") {
        const btn = (document.getElementById("three"));
        pseudoClick(btn);
    }
    else if (event.code === "Digit4") {
        const btn = (document.getElementById("four"));
        pseudoClick(btn);
    }
    else if (!event.shiftKey && event.code === "Digit5") {
        const btn = (document.getElementById("five"));
        pseudoClick(btn);
    }
    else if (event.code === "Digit6") {
        const btn = (document.getElementById("six"));
        pseudoClick(btn);
    }
    else if (event.code === "Digit7") {
        const btn = (document.getElementById("seven"));
        pseudoClick(btn);
    }
    else if (!event.shiftKey && event.code === "Digit8") {
        const btn = (document.getElementById("eight"));
        pseudoClick(btn);
    }
    else if (event.code === "Digit9") {
        const btn = (document.getElementById("nine"));
        pseudoClick(btn);
    }
    else if (event.code === "Digit0") {
        const btn = (document.getElementById("zero"));
        pseudoClick(btn);
    }
    else if (event.shiftKey && event.code === "Equal") {
        const btn = (document.getElementById("plus"));
        pseudoClick(btn);
    }
    else if (event.shiftKey && event.code === "Digit8") {
        const btn = (document.getElementById("multiply"));
        pseudoClick(btn);
    }
    else if (!event.shiftKey && event.code === "Equal" || event.code === "Enter") {
        const btn = (document.getElementById("equals"));
        pseudoClick(btn);
    }
    else if (event.metaKey && event.code === "KeyC") {
        const btn = (document.getElementById("c"));
        pseudoClick(btn);
    }
    else if (event.altKey && event.code === "Minus") {
        const btn = (document.getElementById("plusOrMinus"));
        pseudoClick(btn);
    }
    else if (event.shiftKey && event.code === "Digit5") {
        const btn = (document.getElementById("percent"));
        pseudoClick(btn);
    }
    else if (event.code === "Slash") {
        const btn = (document.getElementById("divide"));
        pseudoClick(btn);
    }
    else if (!event.altKey && event.code === "Minus") {
        const btn = (document.getElementById("minus"));
        pseudoClick(btn);
    }
    else if (event.code === "Period") {
        const btn = (document.getElementById("dot"));
        pseudoClick(btn);
    }
    else if (event.code === "Backspace") {
        const btn = (document.getElementById("c"));
        pseudoClick(btn);
    }
    else if (event.ctrlKey && event.code === "Backspace") {
        const btn = (document.getElementById("backspace"));
        pseudoClick(btn);
    }
    else {
        return;
    };


});

//animates button when keyboard is pressed
function pseudoClick(btn) {

    let clickEvent = new Event('click');
    btn.classList.toggle("active")
    setTimeout(() => btn.classList.toggle("active"), 100);
    btn.dispatchEvent(clickEvent);
}
