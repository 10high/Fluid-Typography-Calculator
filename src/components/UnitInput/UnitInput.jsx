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
  setKeypadButtonTyped: PropTypes.func,
};

export default function UnitInput({
  fieldId,
  setInputFieldObjs,
  setInputWithFocusId,
  setPerformCalculation,
  inputValue,
  inputIsInvalid,
  setKeypadButtonTyped,
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

  function handleOnKeyDown(event) {
    if (
      ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(event.key)
    ) {
      setKeypadButtonTyped(event.key);
    }

    if (["Enter", "Backspace", "c"].includes(event.key)) {
      const actualCharacter = ["Enter", "Backspace", "c"].indexOf(event.key);
      setKeypadButtonTyped(["=", "←", "C"][actualCharacter]);
    }

    if (event.key === "c") {
      setInputFieldObjs((objs) =>
        objs.map((obj) =>
          obj.text === "1 rem:"
            ? { ...obj, inputValue: "16", inputIsInvalid: false }
            : { ...obj, inputValue: "0", inputIsInvalid: false }
        )
      );
    }

    if (event.key === "Enter") {
      setPerformCalculation(true);
    }
  }

  useEffect(() => {
    if (!hasLostFocus) return;
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
          onKeyDown={(event) => handleOnKeyDown(event)}
          onKeyUp={() => setKeypadButtonTyped("")}
        />
        <abbr className={Styles.calculator__measureUnit} title="pixels">
          px
        </abbr>
      </span>
    </>
  );
}
