import "./CategoryItem.css"

export default function CategoryItem() {
  return (
    <li className="category-item">
      <a href="#">
        <img
          src="/img/categories/categories6.png"
          alt=""
          className="category-image"
        />
        <span className="category-title"> Fashion </span>
      </a>
    </li>
  );
}
