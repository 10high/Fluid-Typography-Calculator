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
  inputToFocus: PropTypes.any,
};

let inputFieldID = "";

export default function KeypadButton({
  buttonValue,
  setInputFieldObjs,
  inputWithFocusId,
  setPerformCalculation,
  keypadButtonTyped,
  setKeypadButtonTyped,
  inputToFocus,
}) {
  const [inputCaretPosition, setInputCaretPosition] = useState(0);
  const [keypadButtonClicked, setKeypadButtonClicked] = useState(false);

  function handleDigitButton(digitValue) {
    const selectionStart = inputToFocus.current.selectionStart;
    const selectionEnd = inputToFocus.current.selectionEnd;

    const updatedValue =
      inputToFocus.current.value.substring(0, selectionStart) +
      digitValue +
      inputToFocus.current.value.substring(
        selectionEnd,
        inputToFocus.current.value.length
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
    inputToFocus.current.focus();
  }

  function handleCButton() {
    setInputFieldObjs((objs) =>
      objs.map((obj) =>
        obj.text === "1 rem:"
          ? { ...obj, inputValue: "16", inputIsInvalid: false }
          : { ...obj, inputValue: "0", inputIsInvalid: false }
      )
    );
    inputToFocus.current.focus();
  }

  function handleDeleteButton() {
    const selectionStart = inputToFocus.current.selectionStart;
    const selectionEnd = inputToFocus.current.selectionEnd;

    let updatedValue = "";

    if (selectionEnd - selectionStart > 0) {
      updatedValue =
        inputToFocus.current.value.substring(0, selectionStart) +
        inputToFocus.current.value.substring(
          selectionEnd,
          inputToFocus.current.value.length
        );
      setInputCaretPosition(selectionStart);
    } else {
      updatedValue =
        inputToFocus.current.value.substring(0, selectionStart - 1) +
        inputToFocus.current.value.substring(
          selectionEnd,
          inputToFocus.current.value.length
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

    inputToFocus.current.focus();
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
        inputToFocus.current.setSelectionRange(
          inputCaretPosition,
          inputCaretPosition
        );
        setKeypadButtonClicked(false);
      }
    },
    [
      keypadButtonClicked,
      inputCaretPosition,
      setKeypadButtonClicked,
      inputToFocus,
    ]
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
