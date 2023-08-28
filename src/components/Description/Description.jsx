import Styles from "./styles.module.css";

export default function Description() {
  return (
    <aside className={Styles.description}>
      <p className={Styles.description__paragraph}>
        This{" "}
        <span className={Styles.boldText}>fluid typography calculator</span> is
        based on the article{" "}
        <a
          className={Styles.description__link}
          href="https://www.smashingmagazine.com/2022/01/modern-fluid-typography-css-clamp/"
        >
          {" "}
          Modern Fluid Typography
        </a>{" "}
        by Adrian Bece in{" "}
        <a
          className={Styles.description__link}
          href="https://www.smashingmagazine.com/"
        >
          {" "}
          Smashing Magazine
        </a>
        . <br /> <br /> Fluid typography helps you to build{" "}
        <span className={Styles.boldText}>responsive Web pages</span> with{" "}
        <span className={Styles.boldText}>CSS clamp()</span> by setting a
        minimum, maximum, and preferred value for{" "}
        <span className={Styles.boldText}>scaling</span> the widths, heights,
        and sizes of fonts and other elements to the{" "}
        <span className={Styles.boldText}>viewport width.</span>
      </p>
    </aside>
  );
}
