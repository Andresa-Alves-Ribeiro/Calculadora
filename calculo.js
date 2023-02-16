const calcScreen = document.getElementById("last-calc")
const resultScreen = document.getElementById("result-screen");

function addToScreen(value) {
    calcScreen.innerHTML += value;
}

function calculate() {
    const calculation = calcScreen.innerHTML;
    const result = eval(calculation);
    resultScreen.innerHTML = result;
}

function toggleSign() {
    const currentValue = calcScreen.innerHTML;
    if (currentValue !== '0') {
        calcScreen.innerHTML = currentValue.includes('-')
            ? currentValue.slice(1)
            : '-' + currentValue;
    }
}


const calculator = document.getElementById("calculator");
const keyboard = document.getElementById("keyboard");

keyboard.addEventListener("click", (event) => {
    const target = event.target;

    if (target.matches("button")) {
        const action = target.dataset.action;

        if (!action) {
            addToScreen(target.innerHTML);
        } else if (action === "decimal") {
            if (!resultScreen.innerHTML.includes(".")) {
                addToScreen(".");
            }
        } else if (action === "clear") {
            calcScreen.innerHTML = ""
            resultScreen.innerHTML = "";
        } else if (action === "delete") {
            calcScreen.innerHTML = calcScreen.innerHTML.slice(0, -1);
        } else if (action === "calculate") {
            calculate();
        } else if (action === "plusMinus") {
            toggleSign();
        } else {
            addToScreen(action);
        }
    }
});