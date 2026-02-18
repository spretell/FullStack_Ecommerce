// import react to use JSX
import React from "react";
// import ReactDOM to render the app
import ReactDOM from "react-dom/client";
// import the main App component
import App from "./App";
// import styles
import "./styles/styles.css";
// import CartProvider to manage cart
import { CartProvider } from "./context/CartContext";

// finds the root element in the HTML and renders the App component inside it
ReactDOM.createRoot(document.getElementById("root")).render(
  // use strict mode to catch potential problems
  <React.StrictMode>
    {/* allows every component to access the cart context */}
    <CartProvider>
      {/* main app component */}
      <App />
    </CartProvider>
  </React.StrictMode>,
);
