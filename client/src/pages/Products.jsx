// import react tools :
// useEffect (runs code when something changes) ,
// useMemo (cache a calculated value so it doesn't recalc every render) ,
// useState (create state variables)
import { useEffect, useMemo, useState } from "react";
// import styles
import "../styles/products.css";
// import custom useCart hook to access cart context and actions
import { useCart } from "../context/CartContext";

// main component for products page ; exported so App.jsx can use it in the route
export default function Products() {
  // products - holds array from the database
  // setProducts - function to update products state
  // starts as empty array ([])
  const [products, setProducts] = useState([]);
  // stores which category is currently selected for filtering ; starts with "all" to show all products
  const [category, setCategory] = useState("all");
  // stores the selected sorting option ; starts with "default" to show products in original order
  const [sortBy, setSortBy] = useState("default");
  // controls 'loading mixes...' message visibility ; starts as true because we want to show loading message until products are loaded
  const [loading, setLoading] = useState(true);
  // stores any error messages ; starts as empty string
  const [error, setError] = useState("");
  // destructure addToCart function from useCart hook
  const { addToCart } = useCart();
  useEffect(() => {
    // we use async because we need to wait for the fetch request to complete before we can update the products state
    async function loadProducts() {
      try {
        // set loading to true and clear any previous errors before starting the fetch request
        setLoading(true);
        setError("");

        // fetch products from the backend server
        const res = await fetch("http://localhost:5001/api/products");

        // if the response is not ok , throw an error to be caught in the catch block
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        // converts response body from json string into javascript array of product objects and stores it in data variable
        const data = await res.json();

        // update products state with the data from the server
        setProducts(data);
      } catch (err) {
        // if any error occurs during the fetch or json parsing , log it to the console and update the error state to show a user-friendly message on the page
        console.error(err);
        setError("We couldn’t load the mixes. Check the server and console.");
      } finally {
        // set loading to false after the fetch attempt is complete , regardless of success or failure , to hide the loading message
        setLoading(false);
      }
    }

    // call the function to load products when the component mounts (runs once on startup) ; the empty dependency array [] means it won't run again on updates
    loadProducts();
  }, []);

  // useMemo to create a filtered and sorted version of the products array based on the selected category and sorting option ; it only recalculates when products , category , or sortBy change
  const filteredAndSorted = useMemo(() => {
    let list = [...products];

    // filter by category
    if (category !== "all") {
      list = list.filter((p) => p.category === category);
    }

    // sort by price
    if (sortBy === "price-asc") {
      list.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortBy === "price-desc") {
      list.sort((a, b) => Number(b.price) - Number(a.price));
    }

    // return the final list of products that match the selected category and are sorted according to the selected option
    return list;
  }, [products, category, sortBy]);

  // helper function to convert category values into user-friendly labels for display on the product cards
  function categoryToLabel(cat) {
    switch (cat) {
      case "pancake":
        return "Pancake mix";
      case "waffle":
        return "Waffle mix";
      case "gluten-free":
        return "Gluten-free";
      case "vegan":
        return "Vegan";
      case "seasonal":
        return "Seasonal drop";
      default:
        return "Brunch mix";
    }
  }

  return (
    <main>
      {/* how it works */}
      <section className="how-it-works section-break-cream">
        <div className="section-inner">
          <header className="how-header">
            <p className="how-kicker">Simple steps</p>
            <h2 className="how-title">How It Works</h2>
            <p className="how-subtitle">
              Mix, cook, and brunch like you mean it — in about 15 minutes.
            </p>
          </header>

          <ol className="how-steps">
            <li className="how-step">
              <div className="how-step-badge">1</div>

              <div className="how-img-wrapper">
                <img src="/media/step1.jpeg" alt="Add water to the mix" />
              </div>

              <h3>Add Water</h3>
              <p>
                Pour your mix into a bowl and add water (or milk for extra
                cozy).
              </p>
            </li>

            <li className="how-step">
              <div className="how-step-badge">2</div>

              <div className="how-img-wrapper zoom-step2">
                <img src="/media/step2.jpg" alt="Mix batter and cook" />
              </div>

              <h3>Mix &amp; Bake</h3>
              <p>Stir, pour, and cook — pancakes or waffles, your call.</p>
            </li>

            <li className="how-step">
              <div className="how-step-badge">3</div>

              <div className="how-img-wrapper">
                <img src="/media/step3.jpg" alt="Enjoy your brunch" />
              </div>

              <h3>Enjoy!</h3>
              <p>Top it, stack it, share it… or don’t. We won’t tell.</p>
            </li>
          </ol>
        </div>
      </section>

      {/* products section */}
      <section className="section section-products">
        <div className="page-shell">
          <header className="products-header">
            <h1>All mixes</h1>

            <form
              className="products-controls"
              aria-label="Filter and sort products"
            >
              <label>
                Category
                {/* dropdown displays available categories ; onChange updates state when user picks new option */}
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="pancake">Pancake</option>
                  <option value="waffle">Waffle</option>
                  <option value="gluten-free">Gluten-free</option>
                  <option value="vegan">Vegan</option>
                  <option value="seasonal">Seasonal</option>
                </select>
              </label>

              <label>
                Sort by
                {/* dropdown displays available sorting options ; onChange updates state when user picks new option */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="default">Default</option>
                  <option value="price-asc">Price: low to high</option>
                  <option value="price-desc">Price: high to low</option>
                </select>
              </label>
            </form>
          </header>

          <div className="products-grid" aria-live="polite">
          {/* if loading is true , show paragraph ; else , show nothing */}
            {loading && <p className="products-empty">Loading mixes…</p>}

            {/* if an error occurred during the fetch or json parsing , show the error message */}
            {error && <p className="products-error">{error}</p>}

            {/* if no products match the selected filters , show a message */}
            {!loading && !error && filteredAndSorted.length === 0 && (
              <p className="products-empty">
                No mixes match those filters. Try a different category.
              </p>
            )}

            {/* if products are available , display them ; loop over array and return a product card for each */}
            {!loading &&
              !error &&
              filteredAndSorted.map((p) => (
                <article
                  key={p.id ?? p.name}
                  className={`product-card product-card--${p.category}`}
                >
                  <div className="product-media">
                    <span className="product-tag">
                      {categoryToLabel(p.category)}
                    </span>
                    <img src={p.image} alt={p.name} loading="lazy" />
                  </div>

                  <div className="product-body">
                    <h2>{p.name}</h2>
                    <p className="product-description">{p.description}</p>

                    <div className="product-meta-row">
                      <p className="product-price">
                        ${Number(p.price).toFixed(2)}
                      </p>
                      <button
                        className="btn secondary"
                        type="button"
                        onClick={() => addToCart(p)}
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                </article>
              ))}
          </div>
        </div>
      </section>
    </main>
  );
}
