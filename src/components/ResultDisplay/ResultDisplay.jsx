import { useEffect, useState } from "react";
import Styles from "./styles.module.css";
import PropTypes from "prop-types";

ResultDisplay.propTypes = {
  inputFieldObjs: PropTypes.array,
  performCalculation: PropTypes.bool,
  setPerformCalculation: PropTypes.func,
};

export default function ResultDisplay({
  inputFieldObjs,
  performCalculation,
  setPerformCalculation,
}) {
  const [resultValue, setResultValue] = useState(
    `clamp(2.625rem, 1.019vw + 2.396rem, 3.313rem)`
  );

  useEffect(
    function () {
      if (performCalculation) {
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

        const result = `clamp(${parseFloat(
          (minClamp / remInput).toFixed(3)
        )}rem, ${parseFloat(vw)}vw + ${parseFloat(rem)}rem, ${parseFloat(
          (maxClamp / remInput).toFixed(3)
        )}rem)`;

        setResultValue(result);
        setPerformCalculation(false);
      }
    },
    [performCalculation, inputFieldObjs, setPerformCalculation]
  );

  return (
    <input
      name="calculator"
      className={Styles.calculator__output}
      type="text"
      readOnly={true}
      inputMode="none"
      value={resultValue}
      title={`result: ${resultValue}`}
    />
  );
}
