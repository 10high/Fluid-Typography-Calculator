import Styles from "./styles.module.css";

export default function Header() {
  return (
    <>
      <h1 className={Styles.sr__only}>Fluid Typography Calculator</h1>

      <div className={Styles.pageTitle}>
        <h2 className={Styles.pageTitle__fluid}>fluid</h2>
        <h2 className={Styles.pageTitle__typography}>typography</h2>
        <div className={Styles.pageTitle__lineRight}></div>
        <div className={Styles.pageTitle__lineDown}></div>
      </div>
    </>
  );
}
