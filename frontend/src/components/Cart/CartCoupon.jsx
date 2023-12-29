import { useState, useContext } from "react";
import { message } from "antd";
import { CartContext } from "../../context/CartProvider";

export default function CartCoupon() {
  const [couponCode, setCouponCode] = useState("");
  const { cartItems, setCartItems } = useContext(CartContext);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const applyCoupon = async () => {
    if (couponCode.trim().length !== 0) {
      try {
        const response = await fetch(`${apiUrl}/coupon/code/${couponCode}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (!response.ok) {
          message.warning(response.status == 404 ? data.error : "Kupon yok");
        } else {
          const discountPercent =(data.discountPercent);
          const updatedCartItems = cartItems.map((item) => {
            const price = parseFloat(item.price);
            const discount = parseFloat(discountPercent);
            const updatePrice = price *(1- discount/ 100)
            return {...item,price: updatePrice}
          })
          setCartItems(updatedCartItems)
          message.success(`${couponCode} kupon kodu başarıyla uygulandı.`)
        }
      } catch (err) {
        console.log("Giriş hatası:", err);
      }
    }
  };
  return (
    <div className="actions-wrapper">
      <div className="coupon">
        <input
          type="text"
          className="input-text"
          onChange={(e) => setCouponCode(e.target.value)}
          value={couponCode}
          placeholder="Coupon code"
        />
        <button type="button" className="btn" onClick={applyCoupon}>
          Apply Coupon
        </button>
      </div>
      <div className="update-cart">
        <button className="btn">Update Cart</button>
      </div>
    </div>
  );
}
