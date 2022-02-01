import "./ShoesStore.css";
import Footer from "./Footer";
import Header from "./Header";
import Products from "./Products";
import { Route, Routes } from "react-router-dom";
import Product from "./Product";
import Cart from "./Cart";
import { useEffect, useState } from "react";
import CartItemModel from "./model/cartItem.model";

const ShoesStore = () => {
  const [cart, setCart] = useState(() => {
    try {
      const defaultCart = localStorage.getItem("cart");
      if (defaultCart)
        return (JSON.parse(defaultCart) ?? []) as CartItemModel[];
      return [] as CartItemModel[];
    } catch {
      console.error("The cart could not be parsed into JSON.");
      return [] as CartItemModel[];
    }
  });

  useEffect(() => localStorage.setItem("cart", JSON.stringify(cart)), [cart]);

  const addToCard = (id: number, sku: string) => {
    setCart((items) => {
      let item = items.find((x) => x.sku === sku);
      if (!item) return [...items, { id, sku, quantity: 1 }];

      const updatedItem = {
        id: item.id,
        sku: item.sku,
        quantity: item.quantity++,
      };
      return [...items.filter((x) => x.sku !== sku), updatedItem];
    });
  };

  const updateQuantity = (sku: string, quantity: number) => {
    setCart((items) => {
      return quantity === 0
        ? items.filter((x) => x.sku !== sku)
        : items.map((x) => (x.sku === sku ? { ...x, quantity } : x));
    });
  };

  return (
    <>
      <div className="content">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<h1>Welcome to Carved Rock Fitness</h1>} />
            <Route path="/:category" element={<Products />} />
            <Route
              path="/:category/:id"
              element={<Product addToCard={addToCard} />}
            />
            <Route
              path="/cart"
              element={<Cart updateQuantity={updateQuantity} cart={cart} />}
            />
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default ShoesStore;
