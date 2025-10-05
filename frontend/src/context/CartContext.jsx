import { createContext, useState, useContext } from "react";

export const CartContext = createContext(); // <-- export here

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (spice) => {
    setCart((prev) => {
      const existing = prev.find((item) => item._id === spice._id);
      if (existing) {
        return prev.map((item) =>
          item._id === spice._id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...spice, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item._id !== id));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
