import { useEffect, useState } from "react";
import Styles from "./styles.module.css";
import PropTypes from "prop-types";

KeypadButton.propTypes = {
  buttonValue: PropTypes.string.isRequired,
  inputFieldObjs: PropTypes.array,
  setInputFieldObjs: PropTypes.func,
  inputWithFocusId: PropTypes.string,
  setPerformCalculation: PropTypes.func,
};

export default function KeypadButton({
  buttonValue,
  setInputFieldObjs,
  inputWithFocusId,
  setPerformCalculation,
}) {
  const [inputCaretPosition, setInputCaretPosition] = useState(0);
  const [keypadButtonClicked, setKeypadButtonClicked] = useState(false);

  function handleDigitButton(digitValue) {
    const elementWithFocus = document.getElementById(inputWithFocusId);

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
          obj.fieldId === inputWithFocusId
            ? { ...obj, inputValue: `${newInput}` }
            : obj
        )
      );
      setInputCaretPosition(selectionEnd - (selectionEnd - selectionStart) + 1);
      setKeypadButtonClicked(true);
    }

    elementWithFocus.focus();
  }

  function handleCButton() {
    const elementWithFocus = document.getElementById(inputWithFocusId);
    setInputFieldObjs((objs) =>
      objs.map((obj) =>
        obj.text === "1 rem:"
          ? { ...obj, inputValue: "16" }
          : { ...obj, inputValue: "0" }
      )
    );
    elementWithFocus.focus();
  }

  function handleDeleteButton() {
    const elementWithFocus = document.getElementById(inputWithFocusId);

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
        obj.fieldId === inputWithFocusId
          ? { ...obj, inputValue: `${updatedValue}` }
          : obj
      )
    );

    setKeypadButtonClicked(true);

    elementWithFocus.focus();
  }

  function handleOnClick({ target }) {
    if (inputWithFocusId === "") return;
    if (target.value === "C") {
      handleCButton();
      return;
    }
    if (target.value === "←") {
      handleDeleteButton();
      return;
    }
    if (target.value === "=") {
      setPerformCalculation(true);
      return;
    }
    handleDigitButton(target.value);
  }

  useEffect(
    function () {
      if (keypadButtonClicked) {
        const elementWithFocus = document.getElementById(inputWithFocusId);
        elementWithFocus.setSelectionRange(
          inputCaretPosition,
          inputCaretPosition
        );
        setKeypadButtonClicked(false);
      }
    },
    [
      keypadButtonClicked,
      inputWithFocusId,
      inputCaretPosition,
      setKeypadButtonClicked,
    ]
  );

  return (
    <input
      className={Styles.keypad__button}
      type="button"
      tabIndex="-1"
      aria-hidden="true"
      value={buttonValue}
      onClick={(event) => handleOnClick(event)}
      data-testid="keypadButton"
    ></input>
  );
}
