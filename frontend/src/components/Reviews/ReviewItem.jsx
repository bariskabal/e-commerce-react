import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import moment from 'moment';
import Image from "../../config/Images/image";

export default function ReviewItem({review}) {
  const [star,setStar] = useState([]);
  useEffect(() => {
    
    const TekrarlayanElemanlar = () => {
      // 5 defa dönecek bir dizi oluştur
      setStar(Array.from({ length: review.rating })); }
    TekrarlayanElemanlar()
  }, []);
  return (
    <li className="comment-item">
      <div className="comment-avatar">
      <Image
          imageUrl={review.userDetails.avatar}
          style={{width: '60px', heigth: '60px'}}
        />
      </div>
      <div className="comment-text">
        <ul className="comment-star">
          {star.map((_,index) => (
            <li key={index}>
              <i className="bi bi-star-fill"></i>
            </li>
          ))}
        </ul>
        <div className="comment-meta">
          <strong>{review.userDetails.username}</strong>
          <span> - </span>
          <time>{moment(review.createdAt).format('DD MMMM YYYY')}</time>
        </div>
        <div className="comment-description">
          <p>
            {review.text}
          </p>
        </div>
      </div>
    </li>
  );
}

ReviewItem.propTypes = {
  review: PropTypes.object,
}