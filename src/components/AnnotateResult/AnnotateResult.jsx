import Styles from "./styles.module.css";
import PropTypes from "prop-types";

AnnotateResult.propTypes = {
  setAnnotate: PropTypes.func,
  annotate: PropTypes.bool,
};

export default function AnnotateResult({ setAnnotate, annotate }) {
  return (
    <input
      className={Styles.annotate}
      type="checkbox"
      title="Annotate result with pixel values as a comment."
      value={annotate}
      onClick={() => setAnnotate((curr) => !curr)}
    />
  );
}
