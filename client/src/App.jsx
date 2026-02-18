// import routing tools from react router
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import page components
import Home from "./pages/Home";
import Products from "./pages/Products";
import Contact from "./pages/Contact";

// import layout components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";

// main app component
function App() {
  return (
    // enable routing in app with browser router
    <BrowserRouter>
      {/* navbar on every page */}
      <Navbar />
      {/* cart drawer exists globablly */}
      <CartDrawer />

      {/* main content area */}
      <main>
        {/* define routes for different pages */}
        <Routes>
          {/* home page */}
          <Route path="/" element={<Home />} />
          {/* products page */}
          <Route path="/products" element={<Products />} />
          {/* contact page */}
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      {/* footer on every page */}
      <Footer />
    </BrowserRouter>
  );
}

// export so main.jsx can use it
export default App;
