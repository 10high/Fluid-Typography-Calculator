import { useEffect, useState } from "react";
import Styles from "./styles.module.css";
import PropTypes from "prop-types";

KeypadButton.propTypes = {
  buttonValue: PropTypes.string.isRequired,
  inputFieldObjs: PropTypes.array,
  setInputFieldObjs: PropTypes.func,
  inputWithFocusId: PropTypes.string,
};

export default function KeypadButton({
  buttonValue,
  setInputFieldObjs,
  inputWithFocusId,
}) {
  const [inputCaretPosition, setInputCaretPosition] = useState(0);
  const [keypadButtonClicked, setKeypadButtonClicked] = useState(false);

  function handleOnClick({ target }) {
    if (inputWithFocusId === "") return;
    const elementWithFocus = document.getElementById(inputWithFocusId);

    const selectionStart = elementWithFocus.selectionStart;
    const selectionEnd = elementWithFocus.selectionEnd;

    const updatedValue =
      elementWithFocus.value.substring(0, selectionStart) +
      target.value +
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
