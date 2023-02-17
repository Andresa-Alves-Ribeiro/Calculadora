import React, { useState } from "react";
import './App.css';

function App() {
  const [calculation, setCalculation] = useState("");
  const [result, setResult] = useState("");

  function addToScreen(value) {
    setCalculation(calculation + value);
  }

  function calculate() {
    let calculationResult = "";
    if (calculation.includes("%")) {
      const [percentValue, numberValue] = calculation.split("%");
      const result = parseFloat(numberValue) * (parseFloat(percentValue) / 100);
      calculationResult = result;
    } else {
      calculationResult = eval(calculation);
    }
    setResult(calculationResult);
  }

  function toggleSign() {
    const currentValue = calculation;
    if (currentValue !== "0") {
      setCalculation(
        currentValue.includes("-") ? currentValue.slice(1) : "-" + currentValue
      );
    }
  }

  function handleButtonClick(event) {
    const target = event.target;

    if (target.matches("button")) {
      const action = target.dataset.action;

      if (!action) {
        addToScreen(target.innerHTML);
      } else if (action === "decimal") {
        if (!result.includes(".")) {
          addToScreen(".");
        }
      } else if (action === "clear") {
        setCalculation("");
        setResult("");
      } else if (action === "delete") {
        setCalculation(calculation.slice(0, -1));
      } else if (action === "calculate") {
        calculate();
      } else if (action === "plusMinus") {
        toggleSign();
      } else {
        addToScreen(action);
      }
    }
  }

  return (
    <div>
      <div id="calculator">
        <div id="calc">
          <div id="last-calc"></div>
          <div id="result">
            <img src="./src/assets/equals.svg" alt="sinal de igual" />
            <span id="calculation-screen">{result || calculation || "0"}</span>
          </div>
        </div>

        <div id="keyboard" onClick={handleButtonClick}>
          <button className="secondary" data-action="clear">C</button>
          <button data-action="delete">DEL</button>
          <button data-action="%">%</button>
          <button className="tertiary" data-action="/">/</button>
          <button>7</button>
          <button>8</button>
          <button>9</button>
          <button className="tertiary" data-action="*">X</button>
          <button>4</button>
          <button>5</button>
          <button>6</button>
          <button className="tertiary" data-action="-">-</button>
          <button>1</button>
          <button>2</button>
          <button>3</button>
          <button className="tertiary" data-action="+">+</button>
          <button data-action="plusMinus">+/-</button>
          <button>0</button>
          <button data-action="decimal">.</button>
          <button className="quartiary" data-action="calculate">=</button>
        </div>
      </div>
    </div>

  );
}

export default App;
