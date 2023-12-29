import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { message } from "antd";
import PropTypes from "prop-types";

export default function ReviewForm({setReviews, onUpdate}) {
  const apiUrl = import.meta.env.VITE_API_BASE_URL
  const token = JSON.parse(localStorage.getItem("token"));
  const params = useParams();
  const productId = params.id;
  const [star, setStar] = useState();
  const [formData, setFormData] = useState({
    rating: 0,
    text: "",
  });


  const handleReview = async (e) => {
    e.preventDefault();
    if (formData.rating === 0 || formData.text === "") {
      message.error("Lütfen bir puan verin ve yorumunuzu yazın.");
      return;
    }
    try {
      const response = await fetch(`${apiUrl}/reviews/addReview/${productId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.accessToken}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        try {
          const response2 = await fetch(`${apiUrl}/reviews/product/${productId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            },
          });
          const data2 = await response2.json();
          if (response2.ok) {
            setReviews(data2)
            onUpdate(data2)
          } else {
            message.error(
              response2.status == 400 ? data2.error : "Bir sorun oluştu"
            );
          }
        } catch (err) {
          console.log("Yorum hatası:", err);
        }
        message.success("Yorum eklendi.");
      } else {
        message.error(response.status == 401 ? data.error : "Bir sorun oluştu");
      }
    } catch (err) {
      console.log("Giriş hatası:", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleClick = (value) => {
    setStar(value);
  };

  useEffect(() => {
    if (star !== undefined) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        rating: star,
      }));
    }
  }, [star]);

  return (
    <form onSubmit={handleReview} className="comment-form">
      <p className="comment-notes">
        Your email address will not be published. Required fields are marked
        <span className="required">*</span>
      </p>
      <div className="comment-form-rating">
        <label>
          Your rating
          <span className="required">*</span>
        </label>
        <div className="stars">
          <a
            onClick={() => handleClick(1)}
            name="rating"
            className={`star ${star === 1 ? "active" : ""}`}
            style={{ cursor: "pointer" }}
          >
            <i className="bi bi-star-fill"></i>
          </a>
          <a
            onClick={() => handleClick(2)}
            name="rating"
            className={`star ${star === 2 ? "active" : ""}`}
            style={{ cursor: "pointer" }}
          >
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
          </a>
          <a
            onClick={() => handleClick(3)}
            name="rating"
            className={`star ${star === 3 ? "active" : ""}`}
            style={{ cursor: "pointer" }}
          >
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
          </a>
          <a
            onClick={() => handleClick(4)}
            name="rating"
            className={`star ${star === 4 ? "active" : ""}`}
            style={{ cursor: "pointer" }}
          >
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
          </a>
          <a
            onClick={() => handleClick(5)}
            name="rating"
            className={`star ${star === 5 ? "active" : ""}`}
            style={{ cursor: "pointer" }}
          >
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
          </a>
        </div>
      </div>
      <div className="comment-form-comment form-comment">
        <label htmlFor="comment">
          Your review
          <span className="required">*</span>
        </label>
        <textarea
          onChange={handleInputChange}
          name="text"
          id="comment"
          cols="50"
          rows="10"
        ></textarea>
      </div>
      <div className="form-submit">
        <input type="submit" className="btn submit" />
      </div>
    </form>
  );
}

ReviewForm.propTypes = {
  setReviews: PropTypes.func,
  onUpdate: PropTypes.func
};