// link - clickable element that navigates to a new page without a full page reload
// navlink - special type of link that can apply an "active" class when the current URL matches the link's destination
import { NavLink, Link } from "react-router-dom";
// useEffect - hook that lets you perform side effects in function components
// useState - hook that lets you add state to function components
import { useEffect, useState } from "react";
// useCart - custom hook that provides access to cart context
import { useCart } from "../context/CartContext";

// define the functional component for the navbar ; exported so App.jsx can use it in the layout
export default function Navbar() {
  // open - controls whether the mobile menu is open or closed ; starts as false (closed)
  const [open, setOpen] = useState(false);

  // cart - provides access to cart actions and state
  const { openCart, count } = useCart();

  useEffect(() => {
    // whenever open changes , add or remove class from body to control scrolling of background content when mobile menu is open ; also ensures class is removed if component unmounts while menu is open
    if (open) document.body.classList.add("nav-open");
    else document.body.classList.remove("nav-open");

    // cleanup function to remove class if component unmounts while menu is open
    return () => document.body.classList.remove("nav-open");
  }, [open]);

  // closes the menu by setting open to false
  const closeMenu = () => setOpen(false);

  return (
    <>
      {/* top ticker */}
      <div className="top-ticker" aria-label="Promotions ticker">
        <div className="ticker-inner">
          <div className="ticker-track" aria-hidden="true">
            <span>Free shipping over $35</span>
            <span className="sep">○</span>
            <span>15-minute breakfasts</span>
            <span className="sep">○</span>
            <span>Small-batch mixes</span>
            <span className="sep">○</span>
            <span>Weekend brunch energy</span>
            <span className="sep">○</span>
          </div>

          {/* duplicate track */}
          <div className="ticker-track" aria-hidden="true">
            <span>Free shipping over $35</span>
            <span className="sep">○</span>
            <span>15-minute breakfasts</span>
            <span className="sep">○</span>
            <span>Small-batch mixes</span>
            <span className="sep">○</span>
            <span>Weekend brunch energy</span>
            <span className="sep">○</span>
          </div>
        </div>
      </div>

      <div className="page-shell">
        <header className="site-header">
          <Link className="logo" to="/" onClick={closeMenu}>
            Bake Brunch Co.
          </Link>

          <nav className="main-nav" aria-label="Main navigation">
            {/* mobile toggle */}
            <button
              className={`nav-toggle ${open ? "is-open" : ""}`}
              type="button"
              aria-expanded={open}
              aria-controls="primary-nav"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="sr-only">Toggle menu</span>
              <span className="bar" />
              <span className="bar" />
              <span className="bar" />
            </button>

            <ul
              id="primary-nav"
              className={`nav-links ${open ? "nav-open" : ""}`}
              onClick={closeMenu}
            >
              <li>
                <NavLink to="/" end>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/products">Products</NavLink>
              </li>
              <li>
                <NavLink to="/contact">Contact</NavLink>
              </li>
            </ul>

            {/* cart button */}
            <button
              className="cart-btn"
              type="button"
              aria-label="Open cart"
              onClick={openCart}
            >
              <svg
                className="cart-icon"
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 6h15l-1.5 9h-12z" />
                <path d="M6 6l-2-3H1" />
                <circle cx="9" cy="20" r="1.5" />
                <circle cx="18" cy="20" r="1.5" />
              </svg>

              {/* badge */}
              {count > 0 && <span className="cart-badge">{count}</span>}
            </button>
          </nav>
        </header>
      </div>
    </>
  );
}
