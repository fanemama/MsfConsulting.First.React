import "./ShoesStore.css";
import Footer from "./Footer";
import Header from "./Header";
import Products from "./Products";
import { Route, Routes } from "react-router-dom";
import Product from "./Product";
import Cart from "./Cart";
import { useEffect, useReducer } from "react";
import CartItemModel from "./model/cartItem.model";
import Checkout from "./Checkout";
import cartReducer from "./reducer/cartReducer";
import CartContext from "./context/cartContext";

let intialState: CartItemModel[];
try {
  const defaultCart = localStorage.getItem("cart");
  if (defaultCart)
    intialState = (JSON.parse(defaultCart) ?? []) as CartItemModel[];
  else intialState = [] as CartItemModel[];
} catch {
  console.error("The cart could not be parsed into JSON.");
  intialState = [] as CartItemModel[];
}
const ShoesStore = () => {
  const [cart, dispatch] = useReducer(
    cartReducer,
    intialState as CartItemModel[]
  );

  useEffect(() => localStorage.setItem("cart", JSON.stringify(cart)), [cart]);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      <div className="content">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<h1>Welcome to Carved Rock Fitness</h1>} />
            <Route path="/:category" element={<Products />} />
            <Route
              path="/:category/:id"
              element={<Product dispatch={dispatch} />}
            />
            <Route
              path="/cart"
              element={<Cart dispatch={dispatch} cart={cart} />}
            />
            <Route
              path="/checkout"
              element={<Checkout cart={cart} dispatch={dispatch} />}
            />
          </Routes>
        </main>
      </div>
      <Footer />
    </CartContext.Provider>
  );
};

export default ShoesStore;
