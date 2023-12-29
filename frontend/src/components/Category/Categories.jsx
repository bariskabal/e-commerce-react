import "./Categories.css";
import CategoryItem from "./CategoryItem";
import { useState, useEffect } from "react";
import { message } from "antd";

export default function Categories() {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const maxCategoriesToShow = 6;
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${apiUrl}/categories`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (response.ok) {
          setCategories(data);
        } else {
          message.error(
            response.status == 401 ? data.error : "Bir sorun oluştu"
          );
        }
      } catch (err) {
        console.log("Giriş hatası:", err);
      }
    };
    fetchCategories();
  }, [apiUrl]);
  return (
    <section className="categories">
      <div className="container">
        <div className="section-title">
          <h2>All Categories</h2>
          <p>Summer Collection New Morden Design</p>
        </div>
        <ul className="category-list">
          {categories.slice(0, maxCategoriesToShow).map((category) => (
            <CategoryItem key={category._id} category={category} />
          ))}
        </ul>
      </div>
    </section>
  );
}
