import "./Search.css";
import Proptypes from "prop-types";
import { message } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Search({ isSearchShow, setIsSearchShow }) {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [searchProducts, setSearchProducts] = useState([]);
  const handleSearch = async (e) => {
    e.preventDefault();
    const productName = e.target[0].value;
    if (productName.trim().length !== 0) {
      try {
        const response = await fetch(
          `${apiUrl}/products/search/${productName}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.status) {
          message.error(
            response.status == 400 ? response.error : "Bir sorun oluştu"
          );
        }
        const products = await response.json();
        console.log(products);
        setSearchProducts(products);
      } catch (error) {
        console.log("Error:", error);
      }
    } else {
      setSearchProducts([])
    }
  };

  const handleClick = () => {
    setIsSearchShow(false)
    window.scrollTo(0, 0); // scrollun ortadan başlamasını engeller
  };

  return (
    <div className={`modal-search ${isSearchShow ? "show" : ""}`}>
      <div className="modal-wrapper">
        <h3 className="modal-title">Search for products</h3>
        <p className="modal-text">
          Start typing to see products you are looking for.
        </p>
        <form onSubmit={handleSearch} className="search-form">
          <input type="text" placeholder="Search a product" />
          <button type="submit">
            <i className="bi bi-search"></i>
          </button>
        </form>
        <div className="search-results">
          <div className="search-heading">
            <h3>RESULTS FROM PRODUCT</h3>
          </div>
          {searchProducts.length > 0 ? (
            <div className="results">
              {searchProducts.map((product, index) => (
                <Link onClick={handleClick} to={`product/${product._id}`} key={index} className="result-item">
                  <img src={`${apiUrl}${product.img[0]}`} alt="" className="search-thumb" />
                  <div className="search-info">
                    <h4>{product.name}</h4>
                    <span className="search-sku">SKU: PD0016</span>
                    <span className="search-price">
                      ${product.price.current.toFixed(2)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <h1 className="not-found-product">Hiç ürün bulunamadı</h1>
          )}
        </div>
        <i
          onClick={() => setIsSearchShow(false)}
          className="bi bi-x-circle"
          id="close-search"
        ></i>
      </div>
      <div
        className="modal-overlay"
        onClick={() => setIsSearchShow(false)}
      ></div>
    </div>
  );
}

Search.propTypes = {
  isSearchShow: Proptypes.bool,
  setIsSearchShow: Proptypes.func,
};
