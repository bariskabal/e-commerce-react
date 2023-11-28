import { createContext } from "react";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";

export const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(
    localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : []
  );
  console.log(cartItems.length);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (cartItem) => {
    setCartItems((prevCart) => [...prevCart, {
      ...cartItem,
      quantity: cartItem.quantity ? cartItem.quantity : 1
    }]);
  };

  const removeFromCart = (itemId) => {
    const filteredCartItems = cartItems.filter((cartItem) => {
      return cartItem.id !== itemId;
    });
    setCartItems(filteredCartItems);
  };

  return (
    <CartContext.Provider
      value={{
        setCartItems: setCartItems,
        addToCart: addToCart,
        cartItems: cartItems,
        removeFromCart: removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

CartProvider.propTypes = {
  children: PropTypes.node,
};
