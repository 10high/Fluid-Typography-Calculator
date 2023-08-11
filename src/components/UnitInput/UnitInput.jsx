import { useState } from "react";
import Styles from "./styles.module.css";
import PropTypes from "prop-types";

UnitInput.propTypes = {
  children: PropTypes.any,
  defaultInput: PropTypes.string,
};

export default function UnitInput({ defaultInput = "0", children }) {
  const [input, setInput] = useState(defaultInput);

  function handleInputOnChange({ target }) {
    const newInput = Number(target.value);
    if (newInput >= 0 && newInput <= 9999) setInput(`${newInput}`);
  }

  return (
    <div className={Styles.calculator__inputBorder}>
      <label htmlFor="unitInputField">{children}</label>
      <input
        id="unitInputField"
        type="text"
        value={input}
        onChange={(event) => handleInputOnChange(event)}
      />
      <abbr className={Styles.calculator__measureUnit} title="pixels">
        px
      </abbr>
    </div>
  );
}
