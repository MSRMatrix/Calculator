import { useState } from "react";
import Frame from "../components/frame/Frame";

const Layout = () => {
  const [display, setDisplay] = useState("0");
  const [firstValue, setFirstValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecondValue, setWaitingForSecondValue] =
    useState(false);

  // Zahlen eingeben
  const handleDigit = (digit) => {
    if (waitingForSecondValue) {
      setDisplay(digit);
      setWaitingForSecondValue(false);
      return;
    }

    setDisplay((current) =>
      current === "0" ? digit : current + digit
    );
  };

  // Kommazahl eingeben
  const handleDecimal = () => {
    if (waitingForSecondValue) {
      setDisplay("0.");
      setWaitingForSecondValue(false);
      return;
    }

    setDisplay((current) =>
      current.includes(".") ? current : current + "."
    );
  };

  // Vorzeichen wechseln
  const handleSign = () => {
    setDisplay((current) => {
      const value = Number(current);
      return String(value * -1);
    });
  };

  // Prozent berechnen
  const handlePercent = () => {
    setDisplay((current) => String(Number(current) / 100));
  };

  // Alles zurücksetzen
  const handleClear = () => {
    setDisplay("0");
    setFirstValue(null);
    setOperator(null);
    setWaitingForSecondValue(false);
  };

  // Rechenoperation durchführen
  const calculate = (a, b, op) => {
    switch (op) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "*":
        return a * b;
      case "/":
        return b === 0 ? "Error" : a / b;
      default:
        return b;
    }
  };

  // Operator auswählen
  const handleOperator = (nextOperator) => {
    const currentValue = Number(display);

    if (display === "Error") return;

    if (operator && !waitingForSecondValue) {
      const result = calculate(
        firstValue,
        currentValue,
        operator
      );

      if (result === "Error") {
        setDisplay("Error");
        setFirstValue(null);
        setOperator(null);
        setWaitingForSecondValue(true);
        return;
      }

      setDisplay(String(result));
      setFirstValue(result);
    } else {
      setFirstValue(currentValue);
    }

    setOperator(nextOperator);
    setWaitingForSecondValue(true);
  };

  // Ergebnis berechnen
  const handleEquals = () => {
    if (
      operator === null ||
      firstValue === null ||
      waitingForSecondValue ||
      display === "Error"
    ) {
      return;
    }

    const result = calculate(
      firstValue,
      Number(display),
      operator
    );

    setDisplay(String(result));
    setFirstValue(null);
    setOperator(null);
    setWaitingForSecondValue(true);
  };

  const buttons = [
    { label: "AC", type: "function", onClick: handleClear },
    { label: "+/-", type: "function", onClick: handleSign },
    { label: "%", type: "function", onClick: handlePercent },
    { label: "/", type: "operator", onClick: () => handleOperator("/") },

    { label: "7", type: "number", onClick: () => handleDigit("7") },
    { label: "8", type: "number", onClick: () => handleDigit("8") },
    { label: "9", type: "number", onClick: () => handleDigit("9") },
    { label: "*", type: "operator", onClick: () => handleOperator("*") },

    { label: "4", type: "number", onClick: () => handleDigit("4") },
    { label: "5", type: "number", onClick: () => handleDigit("5") },
    { label: "6", type: "number", onClick: () => handleDigit("6") },
    { label: "-", type: "operator", onClick: () => handleOperator("-") },

    { label: "1", type: "number", onClick: () => handleDigit("1") },
    { label: "2", type: "number", onClick: () => handleDigit("2") },
    { label: "3", type: "number", onClick: () => handleDigit("3") },
    { label: "+", type: "operator", onClick: () => handleOperator("+") },

    { label: "0", type: "number zero", onClick: () => handleDigit("0") },
    { label: ".", type: "number", onClick: handleDecimal },
    { label: "=", type: "equals", onClick: handleEquals },
  ];

  return (
    <Frame>
      <div className="calculator">
        <div className="display">{display}</div>

        <div className="buttons">
          {buttons.map((button) => (
            <button
              key={button.label}
              className={`button ${button.type}`}
              onClick={button.onClick}
            >
              {button.label}
            </button>
          ))}
        </div>
      </div>
    </Frame>
  );
};

export default Layout;
