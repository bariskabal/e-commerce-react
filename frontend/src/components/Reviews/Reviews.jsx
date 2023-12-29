import ReviewForm from "./ReviewForm";
import ReviewItem from "./ReviewItem";
import "./Reviews.css";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { message } from "antd";

export default function Reviews({ active, productId, onUpdate }) {
  const token = JSON.parse(localStorage.getItem("token"));
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [reviews,setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`${apiUrl}/reviews/product/${productId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (response.ok) {
          setReviews(data);
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

  return (
    <div className={`tab-panel-reviews content ${active}`}>
      {reviews?.length > 0 && `${reviews.length} reviews for Basic Colored Sweatpants With Elastic Hems`}
      {reviews?.length > 0 ? (
        <div className="comments">
          <ol className="comment-list">
            {reviews.map((review, index) => (
              <ReviewItem key={index} review={review} />
            ))}
          </ol>
        </div>
      ) : (
        <h3 style={{ color: "red" }}>No Comments</h3>
      )}
      {token && <div className="review-form-wrapper">
        <h2>Add a review</h2>
        <ReviewForm setReviews={setReviews} onUpdate={onUpdate} />
      </div>}
    </div>
  );
}

Reviews.propTypes = {
  active: PropTypes.string,
  productId: PropTypes.string,
  onUpdate: PropTypes.func
};
