import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(
    localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : []
  );

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (newCartItem) => {
    setCartItems((prevCartItems) => {
      // Sepette aynı ürünün (aynı id, renk ve boyutta) olup olmadığını kontrol et
      const existingCartItemIndex = prevCartItems.findIndex(
        (item) =>
          item._id === newCartItem._id &&
          item.colors._id === newCartItem.colors._id &&
          item.sizes._id === newCartItem.sizes._id
      );

      // Eğer ürün zaten sepette varsa, sadece miktarını güncelle
      if (existingCartItemIndex !== -1) {
        return prevCartItems.map((item, index) =>
          index === existingCartItemIndex
            ? { ...item, quantity: item.quantity + (newCartItem.quantity || 1) }
            : item
        );
      } else {
        // Ürün sepette yoksa, yeni bir öğe olarak ekle
        return [
          ...prevCartItems,
          { ...newCartItem, quantity: newCartItem.quantity || 1 },
        ];
      }
    });
  };

  const removeFromCart = (itemId, colorId, sizeId) => {
    setCartItems((prevCartItems) => {
      // Sepetteki ürünü bul
      const existingItemIndex = prevCartItems.findIndex(
        (item) =>
          item._id === itemId &&
          item.colors._id === colorId &&
          item.sizes._id === sizeId
      );

      if (existingItemIndex !== -1) {
        const existingItem = prevCartItems[existingItemIndex];

        // Eğer ürünün miktarı 1'den fazlaysa, sadece miktarını azalt
        if (existingItem.quantity > 1) {
          return prevCartItems.map((item, index) =>
            index === existingItemIndex
              ? { ...item, quantity: item.quantity - 1 }
              : item
          );
        } else {
          // Eğer miktarı 1 ise, ürünü sepetteki listeden çıkar
          return prevCartItems.filter(
            (_, index) => index !== existingItemIndex
          );
        }
      } else {
        // Ürün sepette bulunamazsa, mevcut sepeti geri döndür
        return prevCartItems;
      }
    });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

CartProvider.propTypes = {
  children: PropTypes.node,
};
