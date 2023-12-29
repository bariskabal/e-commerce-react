import "./Info.css";
import PropTypes from "prop-types";
import { useState, useContext, useEffect } from "react";
import { CartContext } from "../../../context/CartProvider";
import { message } from "antd";

export default function Info({ productItem, tabsData }) {
  const { addToCart } = useContext(CartContext);
  const [selectedSize, setSelectedSize] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [showAddedToCartPopup, setShowAddedToCartPopup] = useState(false);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [reviews, setReviews] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [star, setStar] = useState([]);

  const handleAddToCart = () => {
    addToCart({
      ...productItem,
      sizes: productItem.sizes[selectedSize],
      colors: productItem.colors[selectedColor],
      price: discountedPrice,
      quantity: Number(selectedQuantity), // Sayısal değer olduğundan emin ol
    });

    // Popup göster
    setShowAddedToCartPopup(true);

    // 3 saniye sonra popup'ı gizle
    setTimeout(() => setShowAddedToCartPopup(false), 3000);
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/reviews/product/${productItem._id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        if (response.ok) {
          await setReviews(data);
        } else {
          message.error(
            response.status == 401 ? data.error : "Bir sorun oluştu"
          );
        }
      } catch (err) {
        console.log("Giriş hatası:", err);
      }
    };
    fetchReviews();
  }, [apiUrl]);

  useEffect(() => {
    if (tabsData) {
      setReviews(tabsData); // tabsData ile reviews'i güncelle
    }
  }, [tabsData]);

  useEffect(() => {
    const reviewAverage = () => {
      if (reviews.length == 0) {
        setRatings(0);
      } else if (reviews.length == 1) {
        setRatings(reviews[0].rating);
      } else if (reviews.length > 1) {
        let rating = Object.values(reviews).map((review) => review.rating);
        let sum = rating.reduce((acc, cur) => acc + cur, 0);
        let average = Math.round(sum / rating.length);
        setRatings(average);
      } else {
        setRatings(0);
      }
    };
    const TekrarlayanElemanlar = () => {
      setStar(Array.from({ length: ratings }));
    };
    TekrarlayanElemanlar();
    reviewAverage();
  }, [reviews,ratings]);

  const discountedPrice =
    productItem.price.current -
    productItem.price.current * (productItem.price.discount / 100);

  return (
    <div className="product-info">
      {showAddedToCartPopup && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            backgroundColor: "green",
            color: "white",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          Ürün sepete eklendi!
        </div>
      )}
      <h1 className="product-title">{productItem.name}</h1>
      <div className="product-review">
        <ul className="product-star">
          {star.map((_, index) => (
            <li key={index}>
              <i className="bi bi-star-fill"></i>
            </li>
          ))}
        </ul>
        <span>{reviews.length > 0 ? reviews.length : "0"} reviews</span>
      </div>
      <div className="product-price">
        <div className="product-price">
          {productItem.price.discount ? (
            <>
              <s className="old-price">
                ${productItem.price.current.toFixed(2)}
              </s>
              <strong className="new-price">
                ${discountedPrice.toFixed(2)}
              </strong>
            </>
          ) : (
            <strong className="price">
              ${productItem.price.current.toFixed(2)}
            </strong>
          )}
        </div>
      </div>
      <p
        className="product-description"
        dangerouslySetInnerHTML={{ __html: productItem.description }}
      />
      <form className="variations-form">
        <div className="variations">
          <div className="colors">
            <div className="colors-label">
              <span>Color</span>
            </div>
            <div className="colors-wrapper">
              {productItem.colors.map((color, index) => (
                <div
                  onClick={() => setSelectedColor(index)}
                  className={`${
                    selectedColor === index ? "active" : ""
                  } color-wrapper`}
                  key={index}
                  style={{ border: "1px solid black" }}
                >
                  <label style={{ backgroundColor: color.code }}>
                    <input type="radio" name="product-color" />
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="values">
            <div className="values-label">
              <span>Size</span>
            </div>
            <div className="values-list">
              {productItem.sizes.map((size, index) => (
                <span
                  onClick={() => setSelectedSize(index)}
                  key={size._id}
                  className={selectedSize === index ? "active" : ""}
                >
                  {size.size.toUpperCase()}
                </span>
              ))}
            </div>
          </div>
          <div className="cart-button">
            <input
              onChange={(e) => setSelectedQuantity(e.target.value)}
              type="number"
              defaultValue="1"
              min="1"
              id="quantity"
            />
            <button
              className="btn btn-lg btn-primary"
              id="add-to-cart"
              type="button"
              onClick={() => handleAddToCart()}
            >
              Add to cart
            </button>
          </div>
          <div className="product-extra-buttons">
            <a href="#">
              <i className="bi bi-globe"></i>
              <span>Size Guide</span>
            </a>
            <a href="#">
              <i className="bi bi-heart"></i>
              <span>Add to Wislist</span>
            </a>
            <a href="#">
              <i className="bi bi-share"></i>
              <span>Share this Product</span>
            </a>
          </div>
        </div>
      </form>
      <div className="divider"></div>
      <div className="product-meta">
        <div className="product-sku">
          <span>SKU:</span>
          <strong>BE45VGRT</strong>
        </div>
        <div className="product-categories">
          <span>Categories:</span>
          <strong>{productItem.category}</strong>
        </div>
        <div className="product-tags">
          <span>Tags:</span>
          <a href="#">black</a>,<a href="#">white</a>
        </div>
      </div>
    </div>
  );
}

Info.propTypes = {
  productItem: PropTypes.object,
  tabsData : PropTypes.array
};
