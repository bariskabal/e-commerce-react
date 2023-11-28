import PropTypes from "prop-types";
import { useContext } from "react";
import {CartContext} from "../../context/CartProvider"

export default function CartItem({ cartItem }) {

  const { removeFromCart } = useContext(CartContext);

  return (
    <tr className="cart-item">
      <td></td>
      <td className="cart-image">
        <img src={cartItem.img.singleImage} alt="" />
        <i onClick={() => removeFromCart(cartItem.id)} className="bi bi-x delete-cart"></i>
      </td>
      <td>{cartItem.name}</td>
      <td>${cartItem.price.newPrice.toFixed(2)}</td>
      <td className="product-quantity">{cartItem.quantity}</td>
      <td className="product-subtotal">${(cartItem.price.newPrice * cartItem.quantity).toFixed(2)}</td>
    </tr>
  );
}

CartItem.propTypes = {
  cartItem: PropTypes.object,
};
