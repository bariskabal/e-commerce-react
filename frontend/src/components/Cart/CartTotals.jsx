import { message } from "antd";
import { useState, useContext } from "react";
import { CartContext } from "../../context/CartProvider";
import { loadStripe } from "@stripe/stripe-js";

export default function CartTotals() {
  const [fastCargoChecked, setFastCargoChecked] = useState(false);
  const [user, setUser] = useState();
  const { cartItems } = useContext(CartContext);
  const stripePublicKey = import.meta.env.VITE_API_STRIPE_PUBLIC_KEY;
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const token = JSON.parse(localStorage.getItem("token"));

  const subTotals = cartItems.reduce((previousValue, item) => {
    return previousValue + item.price * item.quantity;
  }, 0); // Başlangıç değeri olarak 0 ekledik.

  const handlePayment = async () => {
    try {
      const response = await fetch(`${apiUrl}/user/currentUserInfo`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.accessToken}`,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        message.warning(
          response.status == 404 ? data.error : "Bir sorun oluştu"
        );
      } else {
        console.log(data);
        await setUser(data);
      }
    } catch (err) {
      message.error(err);
    }
    const body = {
      products: cartItems,
      user: user,
      cargoFee: fastCargoChecked ? cargoFee : 0,
    };

    try {
      const stripe = await loadStripe(stripePublicKey);
      const res =  await fetch(`${apiUrl}/payment`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
      })
      if(!res.ok) {
        return message.error("Ödeme işlemi başarısız oldu")
      }

      const session = await res.json();
      const result = await stripe.redirectToCheckout({
        sessionId: session.id
      })
      if(result.error) {
        throw new Error(result.error.message)
      }
    } catch (err) {
      console.log(err);
    }
  };

  const cargoFee = 15;

  const cartTotals = fastCargoChecked
    ? (subTotals + cargoFee).toFixed(2)
    : subTotals.toFixed(2);

  return (
    <div className="cart-totals">
      <h2>Cart totals</h2>
      <table>
        <tbody>
          <tr className="cart-subtotal">
            <th>Subtotal</th>
            <td>
              <span id="subtotal">{subTotals.toFixed(2)}</span>
            </td>
          </tr>
          <tr>
            <th>Shipping</th>
            <td>
              <ul>
                <li>
                  <label>
                    Fast Cargo: ${cargoFee.toFixed(2)}
                    <input
                      type="checkbox"
                      id="fast-cargo"
                      checked={fastCargoChecked}
                      onChange={() => setFastCargoChecked(!fastCargoChecked)}
                    />
                  </label>
                </li>
                <li>
                  <a href="#">Change Address</a>
                </li>
              </ul>
            </td>
          </tr>
          <tr>
            <th>Total</th>
            <td>
              <strong id="cart-total">{cartTotals}</strong>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="checkout">
        <button onClick={handlePayment} className="btn btn-lg">
          Proceed to checkout
        </button>
      </div>
    </div>
  );
}
