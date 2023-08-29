import { useEffect } from "react";
import Styles from "./styles.module.css";
import PropTypes from "prop-types";

ResultDisplay.propTypes = {
  setInputFieldObjs: PropTypes.func,
  inputFieldObjs: PropTypes.array,
  performCalculation: PropTypes.bool,
  setPerformCalculation: PropTypes.func,
  setResultValue: PropTypes.func,
  resultValue: PropTypes.string,
  annotate: PropTypes.bool,
};

export default function ResultDisplay({
  setInputFieldObjs,
  inputFieldObjs,
  performCalculation,
  setPerformCalculation,
  setResultValue,
  resultValue,
  annotate,
}) {
  useEffect(
    function () {
      if (performCalculation) {
        if (inputFieldObjs.some((item) => item.inputValue < 1)) {
          setInputFieldObjs((curr) =>
            curr.map((obj) =>
              obj.inputValue < 1 ? { ...obj, inputIsInvalid: true } : obj
            )
          );
          setPerformCalculation(false);
          return;
        }

        const remInput = Number(inputFieldObjs[0].inputValue);
        const minScreen = Number(inputFieldObjs[1].inputValue);
        const maxScreen = Number(inputFieldObjs[2].inputValue);
        const minClamp = Number(inputFieldObjs[3].inputValue);
        const maxClamp = Number(inputFieldObjs[4].inputValue);

        const vw = (
          (100 * (maxClamp - minClamp)) /
          (maxScreen - minScreen)
        ).toFixed(3);
        const rem = (
          (minScreen * maxClamp - maxScreen * minClamp) /
          (minScreen - maxScreen) /
          remInput
        ).toFixed(3);

        let result = `clamp(${parseFloat(
          (minClamp / remInput).toFixed(3)
        )}rem, ${parseFloat(vw)}vw + ${parseFloat(rem)}rem, ${parseFloat(
          (maxClamp / remInput).toFixed(3)
        )}rem)`;

        if (annotate) {
          result = `${result} //rem: ${remInput}px, min screen width: ${minScreen}px, max screen width: ${maxScreen}px, clamp min: ${minClamp}px, clamp max: ${maxClamp}px`;
        }

        setResultValue(result);
        setPerformCalculation(false);
      }
    },
    [
      performCalculation,
      inputFieldObjs,
      setPerformCalculation,
      setResultValue,
      annotate,
      setInputFieldObjs,
    ]
  );

  return (
    <input
      className={Styles.resultDisplay}
      type="text"
      readOnly={true}
      inputMode="none"
      value={resultValue}
      title={`result: ${resultValue}`}
    />
  );
}
