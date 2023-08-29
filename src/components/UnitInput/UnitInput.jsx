import { useEffect, useState } from "react";
import Styles from "./styles.module.css";
import PropTypes from "prop-types";

UnitInput.propTypes = {
  children: PropTypes.any,
  inputValue: PropTypes.string,
  fieldId: PropTypes.string,
  setInputFieldObjs: PropTypes.func,
  setInputWithFocusId: PropTypes.func,
  setPerformCalculation: PropTypes.func,
  inputIsInvalid: PropTypes.bool,
};

export default function UnitInput({
  fieldId,
  setInputFieldObjs,
  setInputWithFocusId,
  setPerformCalculation,
  inputValue,
  inputIsInvalid,
  children,
}) {
  const [hasLostFocus, setHasLostFocus] = useState(false);

  function handleInputFieldOnChange(fieldId, inputValue) {
    const newInput = Number(inputValue);
    if (newInput >= 0 && newInput <= 9999) {
      setInputFieldObjs((objs) =>
        objs.map((obj) =>
          obj.fieldId === fieldId
            ? { ...obj, inputValue: `${newInput}`, inputIsInvalid: false }
            : obj
        )
      );
    }
  }

  function handleOnBlur() {
    setInputWithFocusId(fieldId);
    setHasLostFocus(true);
  }

  function handleOnFocus() {
    if (inputValue === "0") {
      const elementWithFocus = document.getElementById(fieldId);
      elementWithFocus.setSelectionRange(0, 1);
    }
  }

  function handleOnKeyDown(event) {
    if (event.key === "Enter") {
      setPerformCalculation(true);
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setInputWithFocusId("");
    }, 300);

    setHasLostFocus(false);

    return function () {
      clearTimeout(timer);
    };
  }, [hasLostFocus, setInputWithFocusId, setHasLostFocus]);

  return (
    <>
      <label htmlFor={fieldId}>{children}</label>
      <span>
        <input
          className={`${Styles.calculator__inputField} ${
            inputIsInvalid && Styles.calculator__inputField__invalid
          }`}
          id={fieldId}
          type="text"
          value={inputValue}
          onChange={(event) =>
            handleInputFieldOnChange(fieldId, event.target.value)
          }
          onBlur={handleOnBlur}
          onFocus={handleOnFocus}
          onKeyDown={(event) => handleOnKeyDown(event)}
        />
        <abbr className={Styles.calculator__measureUnit} title="pixels">
          px
        </abbr>
      </span>
    </>
  );
}
