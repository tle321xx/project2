import { useState, useContext, createContext, useEffect } from "react";

const CartContext = createContext();
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    let existingCartItem = localStorage.getItem("cart");
    if (existingCartItem) {
      try {
        const parsedCart = JSON.parse(existingCartItem);
        if (Array.isArray(parsedCart)) {
          setCart(parsedCart);
        } else {
          setCart([]); // Initialize as empty array if parsedCart is not an array
        }
      } catch (error) {
        console.error("Error parsing cart data from local storage:", error);
        setCart([]); // Initialize as empty array in case of parsing error
      }
    }
  }, []);
  

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

// custom hook
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };