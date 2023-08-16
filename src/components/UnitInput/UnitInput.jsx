import { useEffect, useState } from "react";
import Styles from "./styles.module.css";
import PropTypes from "prop-types";

UnitInput.propTypes = {
  children: PropTypes.any,
  inputValue: PropTypes.string,
  fieldId: PropTypes.string,
  setInputFieldObjs: PropTypes.func,
  setInputWithFocusId: PropTypes.func,
};

export default function UnitInput({
  fieldId,
  setInputFieldObjs,
  setInputWithFocusId,
  inputValue,
  children,
}) {
  const [hasLostFocus, setHasLostFocus] = useState(false);

  function handleInputFieldOnChange(fieldId, inputValue) {
    const newInput = Number(inputValue);
    if (newInput >= 0 && newInput <= 9999) {
      setInputFieldObjs((objs) =>
        objs.map((obj) =>
          obj.fieldId === fieldId ? { ...obj, inputValue: `${newInput}` } : obj
        )
      );
    }
  }

  function handleOnBlur() {
    setInputWithFocusId(fieldId);
    setHasLostFocus(true);
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
    <div className={Styles.calculator__inputBorder}>
      <label htmlFor={fieldId}>{children}</label>
      <input
        id={fieldId}
        type="text"
        value={inputValue}
        onChange={(event) =>
          handleInputFieldOnChange(fieldId, event.target.value)
        }
        onBlur={handleOnBlur}
      />
      <abbr className={Styles.calculator__measureUnit} title="pixels">
        px
      </abbr>
    </div>
  );
}
