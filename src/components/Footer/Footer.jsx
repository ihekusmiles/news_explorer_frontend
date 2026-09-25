import githubIcon from "../../assets/github.svg";
import linkedinIcon from "../../assets/linkedin.svg";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <section className="footer">
      <p className="footer__info">© 2026 Supersite, Powered by News API</p>
      <div className="footer__links">
        <div className="footer__page-links">
          <Link to="/" className="footer__link">
            Home
          </Link>
          <a href="https://www.tripleten.com" className="footer__link">
            TripleTen
          </a>
        </div>

        <div className="footer__socialmedia-links">
          <ul className="footer__list">
            <li className="footer__list-item">
              <a
                href="https://github.com/ihekusmiles"
                className="footer__link-icon"
              >
                <img
                  src={githubIcon}
                  alt="GitHub icon"
                  className="footer__social-icon"
                />
              </a>
            </li>
            <li className="footer__list-item">
              <a
                href="https://www.linkedin.com/in/hectorrobles-engineer"
                className="footer__link-icon"
              >
                <img
                  src={linkedinIcon}
                  alt="TripleTen icon"
                  className="footer__social-icon"
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Footer;
