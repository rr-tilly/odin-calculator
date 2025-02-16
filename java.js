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

    if (inputCount() === 2) {
        console.log("need operands or operator")
        return;
    }
    else if (inputCount() === 1) {
        const text = (getDisplayText().split(" "))[0];
        updateResult(text);
        return;
    }
    else {
        console.log("performing operation");
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
    console.log(array);
    updateResult(result);

}

let array = [];

const allKeys = document.querySelectorAll(".keys");
allKeys.forEach(element => {
    element.addEventListener("click", element => pushedButton(element.target))
});

function pushedButton(button) {
    const key = button.textContent;

    //for chaining after operate has been called
    if (array.length === 0 && button.classList.contains("operator")) {
        array.push(getResultText());
        console.log(array);
    };

    if (key === "=") {
        console.log(key);
        array.push(key);
        operate();
        decimal(button);
    }
    //when operators are pressed consecutively replaced the last one with the new button pushed
    else if (!(Number(array[array.length - 1])) && button.classList.contains("operator")) {
        array[array.length - 1] = key;
        console.log(array);
        updateDisplay(button);

    }
    else if (key === ".") {
        decimal();
        return
    }
    else if (key === "C") {
        array = [];
        console.log(array);
        updateResult(key);
        updateDisplay(button);
        decimal(button);

    }
    else if (button.id === "backspace") {
        array.splice(array.length - 1, 1);
        console.log(array);
        updateDisplay(button);
    }
    else if (button.classList.contains("operator")) {

        console.log("operator pressed");

        if (inputCount() === 3) {
            operate();
            array.push(getResultText());
            array.push(button.textContent);
            console.log(array);
            updateDisplay(button);

        }
        else {
            console.log(key);
            array.push(key);
            console.log(array);
            updateDisplay(button);
        };

        decimal();
    }
    else if (key === ".") {
        console.log("decimal logged")
        updateDisplay(button);
        array.push(key);
        return;
    }
    else if (key === "+/-") {
        plusOrMinus();
        updateDisplay(button);
    }
    else if (key === "%") {
        console.log(`array in pushButton() is: ${array} `)
        percent();
        updateDisplay(button);

    }
    else {
        console.log(key);
        array.push(key);
        console.log(array);
        updateDisplay(button);
    };


}

function decimal(btnKey) {

    if (btnKey === "C" || btnKey === "=") {
        dot.classList.remove("disabled");
    }
    else {
        console.log("decimal called");
        const tokens = getTextfromArray()
        const dot = document.getElementById("dot");

        if (tokens.length === 0) {
            array.push("0.");
            updateDisplay("0.");
        }
        else if (tokens.length === 1) {
            dot.classList.add("disabled");
            if (!tokens[0].includes(".")) {
                dot.classList.add("disabled");
                array.push(".");
                updateDisplay(dot);
            };
        }
        else if (tokens.length === 2) {
            dot.classList.remove("disabled");
        }
        else {
            dot.classList.add("disabled");
            if (!tokens[2].includes(".")) {
                dot.classList.add("disabled");
                array.push(".");
                updateDisplay(dot);
            };
        };
    }
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
        console.log("updateResult called");
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
        display.textContent = button;
    }
    else {
        display.textContent = getTextfromArray().join(" ");
    };
}

function getTextfromArray() {
    const expression = array.join("");
    const tokens = expression.match(/(?<!\d)-?\d*\.?\d+|[()+\-x/]/g);
    return tokens == null ? [] : tokens;
}

function inputCount() {
    return getTextfromArray().length
}

function keepToEightDigits(result) {

    if (result > 99999999) {
        return result.toExponential(2)
    }
    else if (result.toString().length >= 9) {
        const stringResult = result.toString().slice(0, 10);
        const dotIndex = stringResult.indexOf(".");
        console.log(dotIndex);
        const decimalPlaces = 7 - dotIndex;
        return Number(result.toFixed(decimalPlaces));
    }
    else { return result };
}

function plusOrMinus() {
    const tokens = getTextfromArray();
    if (tokens.length > 2) {
        tokens[2] = tokens[2] * -1;
        array = tokens;
    } else if (tokens.length === 0) {
        const result = Number(getResultText()) * -1;
        array[0] = result;
        updateResult(result);
    }
    else {
        tokens[0] = tokens[0] * -1;
        array = tokens;
    };
}

function percent() {
    console.log(`array in percent() is: ${array} `)
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
    else if (event.code === "Digit8") {
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

function pseudoClick(btn) {
    if (btn === document.getElementById("dot")) console.log("button pressed");
    let clickEvent = new Event('click');
    btn.classList.toggle("active")
    setTimeout(() => btn.classList.toggle("active"), 100);
    btn.dispatchEvent(clickEvent);

}

