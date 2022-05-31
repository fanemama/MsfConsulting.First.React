import React, { useContext, useEffect, useReducer } from "react";
import CartItemModel from "../model/cartItem.model";
import cartReducer from "../reducer/cartReducer";
import { Dispatch } from "react";

interface CartContextData  {
  dispatch: Dispatch<any>;
  cart: CartItemModel[];
}

const CartContext = React.createContext<CartContextData|null>(null);
const getInitialState = (): CartItemModel[] => {
  try {
    const defaultCart = localStorage.getItem("cart");
    if (defaultCart) return (JSON.parse(defaultCart) ?? []) as CartItemModel[];
    else return [] as CartItemModel[];
  } catch {
    console.error("The cart could not be parsed into JSON.");
    return [] as CartItemModel[];
  }
};

export const CartProvider = (props: any) => {
  const [cart, dispatch] = useReducer(
    cartReducer,
    getInitialState() as CartItemModel[]
  );
  useEffect(() => localStorage.setItem("cart", JSON.stringify(cart)), [cart]);
  const contextValue = { cart, dispatch,};
  return (
    <CartContext.Provider value={contextValue}>
      {props.children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error(
      "useCart must be used within a CartProvider. Wrap a parent component in <CartProvider> to fix this error."
    );
  }
  return context;
};
