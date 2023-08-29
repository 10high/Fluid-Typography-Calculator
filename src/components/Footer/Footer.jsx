import Styles from "./styles.module.css";

export default function Footer() {
  return (
    <footer>
      <a
        className={`${Styles.footerLegalLink} ${Styles.imageAttribution}`}
        href="https://www.vecteezy.com/free-vector/paper"
        target="_blank"
        rel="noreferrer"
      >
        Image attribution: Paper Vectors by Vecteezy
      </a>
      <div className={Styles.footerLinksWrapper}>
        <a
          className={Styles.footerLegalLink}
          href="https://flyingtens.com/LegalPages/impressum.html"
        >
          Impressum
        </a>
        <a
          className={Styles.footerLegalLink}
          href="https://flyingtens.com/LegalPages/datenschuetzErklaerung.html"
        >
          Datenschutzerkl&auml;rung
        </a>
        <a
          className={Styles.footerLegalLink}
          href="https://flyingtens.com/LegalPages/haftungsausschluss.html"
        >
          Haftungsausschluss
        </a>
      </div>
    </footer>
  );
}
