import Styles from "./styles.module.css";

import PropTypes from "prop-types";

VerticalConnectingLine.propTypes = {
  height: PropTypes.number,
};

const key = self.crypto.randomUUID();

export default function VerticalConnectingLine({ height }) {
  return (
    <>
      <div></div>

      <div
        key={key}
        style={{ height: height }}
        className={Styles.connectingLine}
      ></div>

      <div></div>
    </>
  );
}
