//import link for internal navigation
import { Link } from "react-router-dom";

// define functional component for the footer ; exported so App.jsx can use it in the layout
export default function Footer() {
  // items to display in the ticker ; duplicated in the JSX to create two tracks for seamless scrolling
  const tickerItems = [
    "Enjoy.",
    "Yummy",
    "A better way to brunch",
    "Mornings full of flavor",
    "Pour. Flip. Enjoy.",
    "Yummy",
  ];

  return (
    <>
      {/* set aria-hidden to true for decorative ticker */}
      <div className="top-ticker bottom-ticker" aria-hidden="true">
        <div className="ticker-inner">
          <div className="ticker-track">
            {/* for each item in the tickerItems array , create a span with the item text and a separator ; use index as key since items are static and won't change */}
            {tickerItems.map((item, index) => (
              <span key={`t1-${index}`}>
                {item} <span className="sep">○</span>
              </span>
            ))}
          </div>

            {/* duplicate track for seamless scrolling */}
          <div className="ticker-track" aria-hidden="true">
            {tickerItems.map((item, index) => (
              <span key={`t2-${index}`}>
                {item} <span className="sep">○</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <footer className="site-footer">
        <div className="page-shell footer-inner">
          <p className="footer-tagline">EAT BAKE BRUNCH</p>

          <p className="footer-copy">
            {/* dynamically display the current year using JavaScript's Date object to always show the correct year without needing manual updates */}
            &copy; {new Date().getFullYear()} Bake Brunch Co.
          </p>

          <div className="footer-row">
            <nav>
              <ul className="footer-links">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/products">Products</Link>
                </li>
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
              </ul>
            </nav>

            <ul className="social-links">
              <li>
                <a
                  href="https://github.com/spretell/EcommerceProject"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/stephaniepretell/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}
