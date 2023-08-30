import { useEffect, useState } from "react";
import Styles from "./styles.module.css";
import PropTypes from "prop-types";

KeypadButton.propTypes = {
  buttonValue: PropTypes.string.isRequired,
  inputFieldObjs: PropTypes.array,
  setInputFieldObjs: PropTypes.func,
  inputWithFocusId: PropTypes.string,
  setPerformCalculation: PropTypes.func,
  keypadButtonTyped: PropTypes.string,
  setKeypadButtonTyped: PropTypes.func,
};

let inputFieldID = "";

export default function KeypadButton({
  buttonValue,
  setInputFieldObjs,
  inputWithFocusId,
  setPerformCalculation,
  keypadButtonTyped,
  setKeypadButtonTyped,
}) {
  const [inputCaretPosition, setInputCaretPosition] = useState(0);
  const [keypadButtonClicked, setKeypadButtonClicked] = useState(false);

  function handleDigitButton(digitValue) {
    const elementWithFocus = document.getElementById(inputFieldID);

    const selectionStart = elementWithFocus.selectionStart;
    const selectionEnd = elementWithFocus.selectionEnd;

    const updatedValue =
      elementWithFocus.value.substring(0, selectionStart) +
      digitValue +
      elementWithFocus.value.substring(
        selectionEnd,
        elementWithFocus.value.length
      );
    const newInput = Number(`${updatedValue}`);
    if (newInput >= 0 && newInput <= 9999) {
      setInputFieldObjs((objs) =>
        objs.map((obj) =>
          obj.fieldId === inputFieldID
            ? { ...obj, inputValue: `${newInput}`, inputIsInvalid: false }
            : obj
        )
      );
      setInputCaretPosition(selectionEnd - (selectionEnd - selectionStart) + 1);
      setKeypadButtonClicked(true);
    }
    elementWithFocus.focus();
  }

  function handleCButton() {
    const elementWithFocus = document.getElementById(inputFieldID);
    setInputFieldObjs((objs) =>
      objs.map((obj) =>
        obj.text === "1 rem:"
          ? { ...obj, inputValue: "16", inputIsInvalid: false }
          : { ...obj, inputValue: "0", inputIsInvalid: false }
      )
    );
    elementWithFocus.focus();
  }

  function handleDeleteButton() {
    const elementWithFocus = document.getElementById(inputFieldID);

    const selectionStart = elementWithFocus.selectionStart;
    const selectionEnd = elementWithFocus.selectionEnd;

    let updatedValue = "";

    if (selectionEnd - selectionStart > 0) {
      updatedValue =
        elementWithFocus.value.substring(0, selectionStart) +
        elementWithFocus.value.substring(
          selectionEnd,
          elementWithFocus.value.length
        );
      setInputCaretPosition(selectionStart);
    } else {
      updatedValue =
        elementWithFocus.value.substring(0, selectionStart - 1) +
        elementWithFocus.value.substring(
          selectionEnd,
          elementWithFocus.value.length
        );
      setInputCaretPosition(selectionStart - 1);
    }

    setInputFieldObjs((objs) =>
      objs.map((obj) =>
        obj.fieldId === inputFieldID
          ? {
              ...obj,
              inputValue: `${updatedValue === "" ? "0" : updatedValue}`,
            }
          : obj
      )
    );

    setKeypadButtonClicked(true);

    elementWithFocus.focus();
  }

  function handleOnClick({ target }) {
    if (target.value === "C") {
      handleCButton();
      return;
    }
    if (target.value === "=") {
      setPerformCalculation(true);
      return;
    }
    if (inputFieldID === "") return;

    if (target.value === "←") {
      handleDeleteButton();
      return;
    }
    handleDigitButton(target.value);
  }

  function handleOnFocus() {
    inputWithFocusId !== ""
      ? (inputFieldID = inputWithFocusId)
      : (inputFieldID = "");
  }

  useEffect(
    function () {
      if (keypadButtonClicked) {
        const elementWithFocus = document.getElementById(inputFieldID);
        elementWithFocus.setSelectionRange(
          inputCaretPosition,
          inputCaretPosition
        );
        setKeypadButtonClicked(false);
      }
    },
    [keypadButtonClicked, inputCaretPosition, setKeypadButtonClicked]
  );

  return (
    <input
      className={`${Styles.keypad__button} ${
        keypadButtonTyped === buttonValue && Styles.keypad__button__pressed
      }`}
      type="button"
      tabIndex="-1"
      aria-hidden="true"
      value={buttonValue}
      onClick={(event) => handleOnClick(event)}
      onFocus={handleOnFocus}
      onMouseDown={() => setKeypadButtonTyped(buttonValue)}
      onMouseUp={() => setKeypadButtonTyped("")}
      data-testid="keypadButton"
    ></input>
  );
}
