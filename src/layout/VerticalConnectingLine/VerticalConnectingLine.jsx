import PropTypes from "prop-types";

VerticalConnectingLine.propTypes = {
  height: PropTypes.number,
  width: PropTypes.string,
};

const key = self.crypto.randomUUID();

export default function VerticalConnectingLine({ height, width }) {
  return (
    <>
      <div></div>

      <div
        key={key}
        style={{
          height: height,
          width: width,
          borderRight: "solid 1.5px black",
        }}
      ></div>

      <div></div>
    </>
  );
}
