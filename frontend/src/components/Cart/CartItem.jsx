import PropTypes from "prop-types";
import { useContext } from "react";
import {CartContext} from "../../context/CartProvider"
import Image from "../../config/Images/image";

export default function CartItem({ cartItem }) {

  const { removeFromCart } = useContext(CartContext);
  console.log(cartItem)
  return (
    <tr className="cart-item">
      <td></td>
      <td className="cart-image">
      <Image
          imageUrl={cartItem.img[0]}
          id="single-image"
        />
        <img src={cartItem.img.singleImage} alt="" />
        <i onClick={() => removeFromCart(cartItem._id,cartItem.colors._id,cartItem.sizes._id)} className="bi bi-x delete-cart"></i>
      </td>
      <td>{cartItem.name}</td>
      <td>${cartItem.price.toFixed(2)}</td>
      <td className="product-quantity">{cartItem.quantity}</td>
      <td className="product-subtotal">${(cartItem.price * cartItem.quantity).toFixed(2)}</td>
    </tr>
  );
}

CartItem.propTypes = {
  cartItem: PropTypes.object,
};
