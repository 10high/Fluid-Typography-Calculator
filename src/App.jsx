import { useEffect, useState } from "react";
import Styles from "./App.module.css";
import Tooltip from "./components/Tooltip/Tooltip";
import UnitInput from "./components/UnitInput/UnitInput";
import KeypadButton from "./components/KeypadButton/KeypadButton";
import ResultDisplay from "./components/ResultDisplay/ResultDisplay";
import CopyToClipbpard from "./components/CopyToClipboard/CopyToClipboard";
import AnnotateResult from "./components/AnnotateResult/AnnotateResult";
import VerticalConnectingLine from "./layout/VerticalConnectingLine/VerticalConnectingLine";
import NavBar from "./components/NavBar/NavBar";
import Header from "./components/Header/Header";
import Description from "./components/Description/Description";
import Footer from "./components/Footer/Footer";

const keypadButtons = [
  { value: "7", key: self.crypto.randomUUID() },
  { value: "8", key: self.crypto.randomUUID() },
  { value: "9", key: self.crypto.randomUUID() },
  { value: "4", key: self.crypto.randomUUID() },
  { value: "5", key: self.crypto.randomUUID() },
  { value: "6", key: self.crypto.randomUUID() },
  { value: "1", key: self.crypto.randomUUID() },
  { value: "2", key: self.crypto.randomUUID() },
  { value: "3", key: self.crypto.randomUUID() },
  { value: "0", key: self.crypto.randomUUID() },
];

const inputFields = [
  {
    text: "1 rem:",
    fieldId: self.crypto.randomUUID(),
    inputValue: "16",
    inputIsInvalid: false,
  },
  {
    text: "min viewport:",
    fieldId: self.crypto.randomUUID(),
    inputValue: "0",
    inputIsInvalid: false,
  },
  {
    text: "max viewport:",
    fieldId: self.crypto.randomUUID(),
    inputValue: "0",
    inputIsInvalid: false,
  },
  {
    text: "clamp min:",
    fieldId: self.crypto.randomUUID(),
    inputValue: "0",
    inputIsInvalid: false,
  },
  {
    text: "clamp max:",
    fieldId: self.crypto.randomUUID(),
    inputValue: "0",
    inputIsInvalid: false,
  },
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

const unitInputDivSpacerKeys = [
  self.crypto.randomUUID(),
  self.crypto.randomUUID(),
  self.crypto.randomUUID(),
  self.crypto.randomUUID(),
  self.crypto.randomUUID(),
  self.crypto.randomUUID(),
  self.crypto.randomUUID(),
  self.crypto.randomUUID(),
  self.crypto.randomUUID(),
  self.crypto.randomUUID(),
];

function App() {
  const [inputFieldObjs, setInputFieldObjs] = useState(inputFields);
  const [inputWithFocusId, setInputWithFocusId] = useState("");
  const [performCalculation, setPerformCalculation] = useState(false);
  const [resultValue, setResultValue] = useState(
    `clamp(2.625rem, 1.019vw + 2.396rem, 3.313rem)`
  );
  const [annotate, setAnnotate] = useState(false);
  const [screenIsSmall, setScreenIsSmall] = useState(false);
  const [keypadButtonTyped, setKeypadButtonTyped] = useState("");

  useEffect(function handleWindowResize() {
    if (window.innerWidth < 1001) {
      setScreenIsSmall(true);
    } else {
      setScreenIsSmall(false);
    }
    window.addEventListener("resize", handleWindowResize);
    return function () {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <>
      <NavBar />

      <main>
        <div className={Styles.main__Container}>
          {!screenIsSmall && (
            <>
              <div></div>
              <div className={Styles.description__leftContainer}>
                <Description />
                <div className={Styles.description__leftConnectingLine}></div>
              </div>
            </>
          )}
          <div className={Styles.header}>
            <Header />
          </div>
          <div className={Styles.calculator}>
            <div></div>
            <div className={Styles.resultDisplay__border}>
              <ResultDisplay
                setInputFieldObjs={setInputFieldObjs}
                inputFieldObjs={inputFieldObjs}
                performCalculation={performCalculation}
                setPerformCalculation={setPerformCalculation}
                setResultValue={setResultValue}
                resultValue={resultValue}
                annotate={annotate}
              />
              <AnnotateResult annotate={annotate} setAnnotate={setAnnotate} />
              <CopyToClipbpard resultValue={resultValue} />
            </div>
            <div className={Styles.resultDisplay__rightLine}></div>
            <VerticalConnectingLine height={16} width={"50%"} />
            {inputFieldObjs.map((item, index) => (
              <>
                <div key={unitInputDivSpacerKeys[index]}></div>
                <div
                  className={Styles.unitInput__wrapper}
                  key={unitInputItemWrapperKey[index]}
                >
                  <div className={Styles.unitInput__border}>
                    <UnitInput
                      inputValue={item.inputValue}
                      setInputFieldObjs={setInputFieldObjs}
                      setInputWithFocusId={setInputWithFocusId}
                      setPerformCalculation={setPerformCalculation}
                      fieldId={item.fieldId}
                      inputIsInvalid={item.inputIsInvalid}
                      setKeypadButtonTyped={setKeypadButtonTyped}
                      key={item.fieldId}
                    >
                      {item.text}
                    </UnitInput>
                  </div>
                  <Tooltip key={tooltips[item.fieldId].key}>
                    {tooltips[item.fieldId].text}
                  </Tooltip>
                </div>
                <div key={unitInputDivSpacerKeys[++index]}></div>
                <VerticalConnectingLine height={12} width={"50%"} />
              </>
            ))}
            <VerticalConnectingLine height={4} width={"50%"} />
            <div></div>
            <div className={Styles.keypad}>
              <div className={Styles.keypadContainer}>
                <KeypadButton
                  buttonValue="←"
                  setInputFieldObjs={setInputFieldObjs}
                  key={miscKeys.deleteButton}
                  inputWithFocusId={inputWithFocusId}
                  keypadButtonTyped={keypadButtonTyped}
                  setKeypadButtonTyped={setKeypadButtonTyped}
                />
                <KeypadButton
                  buttonValue="C"
                  setInputFieldObjs={setInputFieldObjs}
                  key={miscKeys.clearButton}
                  inputWithFocusId={inputWithFocusId}
                  keypadButtonTyped={keypadButtonTyped}
                  setKeypadButtonTyped={setKeypadButtonTyped}
                />
                <KeypadButton
                  buttonValue="="
                  setInputFieldObjs={setInputFieldObjs}
                  key={miscKeys.performCalculationButton}
                  inputWithFocusId={inputWithFocusId}
                  setPerformCalculation={setPerformCalculation}
                  keypadButtonTyped={keypadButtonTyped}
                  setKeypadButtonTyped={setKeypadButtonTyped}
                />
                {keypadButtons.map((item) => (
                  <KeypadButton
                    buttonValue={item.value}
                    setInputFieldObjs={setInputFieldObjs}
                    key={item.key}
                    inputWithFocusId={inputWithFocusId}
                    keypadButtonTyped={keypadButtonTyped}
                    setKeypadButtonTyped={setKeypadButtonTyped}
                  />
                ))}
              </div>
            </div>
            <div></div>
          </div>
          {screenIsSmall && (
            <>
              <VerticalConnectingLine height={64} width={"0%"} />
              <Description />
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
