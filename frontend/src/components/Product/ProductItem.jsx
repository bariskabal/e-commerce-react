import "./ProductItem.css";
import PropTypes from "prop-types";
import { useContext } from "react";
import { CartContext } from "../../context/CartProvider";
import { Link } from "react-router-dom";

export default function ProductItem({ productItem }) {
  const { cartItems, addToCart } = useContext(CartContext);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const filteredCart = cartItems.find(
    (cartItem) => cartItem.id === productItem.id
  );

  const discountedPrice =
    productItem.price.current -
    productItem.price.current * (productItem.price.discount / 100);

  const handleClick = () => {
    window.scrollTo(0, 0); // scrollun ortadan başlamasını engeller
  };
  return (
    <div className="product-item glide__slide">
      <div className="product-image">
        <a href="#">
          <img src={`${apiUrl}${productItem.img[0]}`} alt="" className="img1" />
          <img src={`${apiUrl}${productItem.img[1]}`} alt="" className="img2" />
        </a>
      </div>
      <div className="product-info">
        <a href="$" className="product-title">
          {productItem.name}
        </a>
        <ul className="product-star">
          <li>
            <i className="bi bi-star-fill"></i>
          </li>
          <li>
            <i className="bi bi-star-fill"></i>
          </li>
          <li>
            <i className="bi bi-star-fill"></i>
          </li>
          <li>
            <i className="bi bi-star-fill"></i>
          </li>
          <li>
            <i className="bi bi-star-half"></i>
          </li>
        </ul>
        {productItem.price.discount !== 0 ? (
          <div className="product-prices">
            <strong className="new-price">${discountedPrice.toFixed(2)}</strong>
            <span className="old-price">
              ${productItem.price.current.toFixed(2)}
            </span>
          </div>
        ) : (
          <div className="product-prices">
            <strong className="new-price">${discountedPrice.toFixed(2)}</strong>
          </div>
        )}
        {productItem.price.discount !== 0 && (
          <span className="product-discount">
            -{productItem.price.discount}%
          </span>
        )}
        <div className="product-links">
          <button
            disabled={filteredCart}
            onClick={() => addToCart(productItem)}
            className="add-to-cart"
          >
            <i className="bi bi-basket-fill"></i>
          </button>
          <button>
            <i className="bi bi-heart-fill"></i>
          </button>
          <Link
            onClick={handleClick}
            to={`product/${productItem._id}`}
            className="product-link"
          >
            <i className="bi bi-eye-fill"></i>
          </Link>
          <a href="#">
            <i className="bi bi-share-fill"></i>
          </a>
        </div>
      </div>
    </div>
  );
}

ProductItem.propTypes = {
  productItem: PropTypes.object,
  setCartItems: PropTypes.func,
};
