import "./CategoryItem.css";
import PropTypes from "prop-types";

export default function CategoryItem({ category }) {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const imageUrl = Array.isArray(category.img) ? category.img[0] : category.img;
  return (
    <li className="category-item">
      <a href="#">
        <img
          src={`${apiUrl}${imageUrl}`}
          alt=""
          className="category-image"
        />
        <span className="category-title"> {category.name} </span>
      </a>
    </li>
  );
}

CategoryItem.propTypes = {
  category: PropTypes.object,
};
