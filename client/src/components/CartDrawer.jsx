// import custom hook to access cart data and actions
import { useCart } from "../context/CartContext";

export default function CartDrawer() {
  // get cart data and actions from context ; destructuring for easier access
  const { items, total, isOpen, closeCart, removeFromCart, setQty, clearCart } =
    useCart();

  return (
    <>
      {/* dark overlay background ; if isopen is true , show overlay ; clicking overlay closes cart */}
      <div
        className={`cart-overlay ${isOpen ? "is-open" : ""}`}
        onClick={closeCart}
        aria-hidden={!isOpen}
      />

      {/* slide out panel ; if isopen is true , show panel */}
      <aside
        className={`cart-drawer ${isOpen ? "is-open" : ""}`}
        aria-label="Shopping cart"
        aria-hidden={!isOpen}
      >
        {/* 'your cart' title */}
        <header className="cart-header">
          <h2>Your cart</h2>

          {/* button to close cart */}
          <button className="cart-close" type="button" onClick={closeCart}>
            ✕
          </button>
        </header>

        {/* if no items , show empty message ; else show cart items */}
        {items.length === 0 ? (
          <p className="cart-empty">Your cart is empty. Add a mix to start.</p>
        ) : (
          <>
            <ul className="cart-list">
              {/* loop through cart items and display each one with image , name , price , qty input , and remove button */}
              {items.map((i) => (
                <li key={i.id} className="cart-item">
                  <img className="cart-thumb" src={i.image} alt={i.name} />
                  <div className="cart-item-body">
                    <p className="cart-item-name">{i.name}</p>
                    <p className="cart-item-price">${i.price.toFixed(2)}</p>

                    <div className="cart-item-actions">
                      <label className="cart-qty">
                        Qty
                        <input
                          type="number"
                          min="1"
                          max="99"
                          value={i.qty}
                          onChange={(e) => setQty(i.id, e.target.value)}
                        />
                      </label>

                      <button
                        className="cart-remove"
                        type="button"
                        onClick={() => removeFromCart(i.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* bottom section of cart */}
            <footer className="cart-footer">
              {/* total price */}
              <div className="cart-total">
                <span>Total</span>
                <strong>${total.toFixed(2)}</strong>
              </div>

              {/* clear cart and checkout buttons */}
              <div className="cart-footer-actions">
                <button
                  className="btn secondary"
                  type="button"
                  onClick={clearCart}
                >
                  Clear cart
                </button>
                <button className="btn primary" type="button">
                  Checkout
                </button>
              </div>
            </footer>
          </>
        )}
      </aside>
    </>
  );
}
