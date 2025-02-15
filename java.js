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
    }
    else if (button.id === "backspace") {
        array.splice(array.length - 1, 1);
        console.log(array);
        updateDisplay(button);
    }
    else if (button.classList.contains("operator")) {
        const dotButton = document.querySelector("#dot")
        console.log(dotButton);
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
    }
    else if (key === ".") {
        console.log("decimal logged")
        updateDisplay(button);
        array.push(key);
        return;
    }

    else {
        console.log(key);
        array.push(key);
        console.log(array);
        updateDisplay(button);
    };


}

function decimal() {
    const textArr = getTextfromArray()
    const currentNum = textArr[textArr.length - 1];
    if (currentNum.includes(".")) {
        console.log("decimal disabled");
    }
    else {
        const decButton = document.getElementById("dot");
        array.push(".");
        updateDisplay(decButton)
        console.log("decimal is added");
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
    else {
        display.textContent = getTextfromArray().join(" ");
    };
}

function getTextfromArray() {
    const expression = array.join("");
    console.log(expression);
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