import { useState } from "react";
import "./App.css";
import Tooltip from "./components/Tooltip/Tooltip";
import UnitInput from "./components/UnitInput/UnitInput";
import KeypadButton from "./components/KeypadButton/KeypadButton";
import ResultDisplay from "./components/ResultDisplay/ResultDisplay";
import CopyToClipbpard from "./components/CopyToClipboard/CopyToClipboard";

const keypadButtons = [
  { value: "0", key: self.crypto.randomUUID() },
  { value: "1", key: self.crypto.randomUUID() },
  { value: "2", key: self.crypto.randomUUID() },
  { value: "3", key: self.crypto.randomUUID() },
  { value: "4", key: self.crypto.randomUUID() },
  { value: "5", key: self.crypto.randomUUID() },
  { value: "6", key: self.crypto.randomUUID() },
  { value: "7", key: self.crypto.randomUUID() },
  { value: "8", key: self.crypto.randomUUID() },
  { value: "9", key: self.crypto.randomUUID() },
];

const inputFields = [
  { text: "1 rem:", fieldId: self.crypto.randomUUID(), inputValue: "16" },
  {
    text: "min screen width:",
    fieldId: self.crypto.randomUUID(),
    inputValue: "0",
  },
  {
    text: "max screen width:",
    fieldId: self.crypto.randomUUID(),
    inputValue: "0",
  },
  { text: "clamp min:", fieldId: self.crypto.randomUUID(), inputValue: "0" },
  { text: "clamp max:", fieldId: self.crypto.randomUUID(), inputValue: "0" },
];

const tooltips = {
  [inputFields[0].fieldId]: {
    text: "1 rem in pixels. \n Default is 16px.",
    key: self.crypto.randomUUID(),
  },
  [inputFields[1].fieldId]: {
    text: "The starting viewport width in pixels. \n The clamp() min value is used at this viewport width.",
    key: self.crypto.randomUUID(),
  },
  [inputFields[2].fieldId]: {
    text: "The end viewport width in pixels. \n The clamp() max value is used at this viewport width.",
    key: self.crypto.randomUUID(),
  },
  [inputFields[3].fieldId]: {
    text: "The starting clamp() value. \n This value is used at the min viewport value.",
    key: self.crypto.randomUUID(),
  },
  [inputFields[4].fieldId]: {
    text: "The end clamp() value. \n This value is used at the max viewport value.",
    key: self.crypto.randomUUID(),
  },
};

const unitInputItemWrapperKey = [
  self.crypto.randomUUID(),
  self.crypto.randomUUID(),
  self.crypto.randomUUID(),
  self.crypto.randomUUID(),
  self.crypto.randomUUID(),
];

const miscKeys = {
  clearButton: self.crypto.randomUUID(),
  deleteButton: self.crypto.randomUUID(),
  performCalculationButton: self.crypto.randomUUID(),
};

function App() {
  const [inputFieldObjs, setInputFieldObjs] = useState(inputFields);
  const [inputWithFocusId, setInputWithFocusId] = useState("");
  const [performCalculation, setPerformCalculation] = useState(false);
  const [resultValue, setResultValue] = useState(
    `clamp(2.625rem, 1.019vw + 2.396rem, 3.313rem)`
  );

  return (
    <div>
      <ResultDisplay
        inputFieldObjs={inputFieldObjs}
        performCalculation={performCalculation}
        setPerformCalculation={setPerformCalculation}
        setResultValue={setResultValue}
        resultValue={resultValue}
      />
      <CopyToClipbpard resultValue={resultValue} />
      <div className="unitInputContainer">
        {inputFieldObjs.map((item, index) => (
          <div
            className="unitInputItemWrapper"
            key={unitInputItemWrapperKey[index]}
          >
            <UnitInput
              inputValue={item.inputValue}
              setInputFieldObjs={setInputFieldObjs}
              setInputWithFocusId={setInputWithFocusId}
              setPerformCalculation={setPerformCalculation}
              fieldId={item.fieldId}
              key={item.fieldId}
            >
              {item.text}
            </UnitInput>
            <Tooltip key={tooltips[item.fieldId].key}>
              {tooltips[item.fieldId].text}
            </Tooltip>
          </div>
        ))}
      </div>

      <div className="keypadButtonsContainer">
        {keypadButtons.map((item) => (
          <KeypadButton
            buttonValue={item.value}
            setInputFieldObjs={setInputFieldObjs}
            key={item.key}
            inputWithFocusId={inputWithFocusId}
          />
        ))}
        <KeypadButton
          buttonValue="←"
          setInputFieldObjs={setInputFieldObjs}
          key={miscKeys.deleteButton}
          inputWithFocusId={inputWithFocusId}
        />
        <KeypadButton
          buttonValue="C"
          setInputFieldObjs={setInputFieldObjs}
          key={miscKeys.clearButton}
          inputWithFocusId={inputWithFocusId}
        />
        <KeypadButton
          buttonValue="="
          setInputFieldObjs={setInputFieldObjs}
          key={miscKeys.performCalculationButton}
          inputWithFocusId={inputWithFocusId}
          setPerformCalculation={setPerformCalculation}
        />
      </div>
    </div>
  );
}

export default App;
