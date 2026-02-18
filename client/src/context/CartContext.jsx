// import react tools :
// createContext (creates a shared 'global' storage area for data) ,
// useContext (allows to read from that storage) ,
// useEffect (runs code when something changes) ,
// useMemo (cache a calculated value so it doesn't recalc every render) ,
// useState (create state variables)
import { createContext, useContext, useEffect, useMemo, useState } from "react";

// create cart context to hold cart data and actions ; initial value is null because it will be provided by CartProvider
const CartContext = createContext(null);

// key name used to store cart data in local storage ; helps avoid conflicts with other data and makes it easy to find
const STORAGE_KEY = "bakebrunch_cart_v1";

// functional react component that provides cart data to everything inside ; exported so main.jsx can use it to wrap the app
export function CartProvider({ children }) {
  // items = array of cart items
  // setitems = function to update cart items
  // use a function inside usestate so localstorage is read only once on startup
  const [items, setItems] = useState(() => {
    try {
      // try to load saved cart from localstorage
      const raw = localStorage.getItem(STORAGE_KEY);
      // if exists , parse it from json into a js array ; if not , start with empty array
      return raw ? JSON.parse(raw) : [];
    } catch {
      // if parsing fails , use empty cart
      return [];
    }
  });

  // isopen controls whether the cart drawer is visible ; starts closed (false)
  const [isOpen, setIsOpen] = useState(false);

  // whenever items change , save it to localstorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  // count -  total number of items in cart (sum of all qty values)
  // useMemo to cache the result and only recalc when items change
  const count = useMemo(
    // reduce loops through items and sums up the qty of each item to get total count
    () => items.reduce((sum, i) => sum + i.qty, 0),
    [items],
  );

  // function to open cart drawer
  function openCart() {
    // true - show the cart drawer
    setIsOpen(true);
    // add class to body to prevent scrolling of background content when cart is open
    document.body.classList.add("cart-open");
  }

  // function to close cart drawer ; also removes the class from body to allow scrolling again
  function closeCart() {
    // false - hide the cart drawer
    setIsOpen(false);
    // remove class from body
    document.body.classList.remove("cart-open");
  }

  // function to add a product to the cart ; if product already in cart , increase qty by 1 ; if not , add new item with qty 1 ; also opens cart drawer
  function addToCart(product) {
    // prev is the most up-to-date value of items ; we return a new array based on prev with the new product added or updated
    setItems((prev) => {
      // check if product is already in cart by looking for an item with the same id
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        // if exists , increase qty
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i,
        );
      }
      return [
        // copy old array of items
        ...prev,
        // append new object representing the product being added to cart ; includes id , name , price (converted to number) , image url , and starting qty of 1
        {
          id: product.id,
          name: product.name,
          price: Number(product.price),
          image: product.image,
          qty: 1,
        },
      ];
    });

    // after adding to cart , open the cart drawer so user can see their updated cart
    openCart();
  }

  // remove one product from cart by id ; filter out the item with matching id from items array
  function removeFromCart(id) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  // set quantity of a product in the cart by id ; ensures qty is between 1 and 99
  function setQty(id, qty) {
    // 'Number(qty) || 1' - if conversion fails (NaN) , use 1 as default ; min - can't exceed 99 ; max - can't be less than 1
    const safeQty = Math.max(1, Math.min(99, Number(qty) || 1));
    setItems((prev) =>
      // update state by mapping through previous items and updating the one with matching id to have the new qty ; other items remain unchanged
      prev.map((i) => (i.id === id ? { ...i, qty: safeQty } : i)),
    );
  }

  // clear all items from the cart
  function clearCart() {
    setItems([]);
  }

  // total - total cost of cart` (sum of price * qty for all items) ; useMemo to only recalc when items change
  const total = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.qty, 0),
    [items],
  );

  // build value object that gets shared globablly ; anything inside it is accessible anywhere in the app using the useCart hook
  const value = {
    items,
    count,
    total,
    isOpen,
    openCart,
    closeCart,
    addToCart,
    removeFromCart,
    setQty,
    clearCart,
  };

  // return the provider component with the value object ; children are the components that will have access to this context (whatever is wrapped inside <CartProvider> in main.jsx)
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// custom hook to access cart context easily
export function useCart() {
  // grab the context value
  const ctx = useContext(CartContext);
  // if someone tries to use usecart without wrapping in cartprovider , throw an error
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  // return the cart data + functions
  return ctx;
}
