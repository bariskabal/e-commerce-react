import ProductItem from "./ProductItem";
import "./Products.css";
import { useState, useEffect } from "react";
import Slider from "react-slick";
import PropTypes from "prop-types";
import { message } from "antd";

function NextBtn({ onClick }) {
  return (
    <button onClick={onClick} className="glide__arrow glide__arrow--right">
      <i className="bi bi-chevron-right"></i>
    </button>
  );
}

NextBtn.propTypes = {
  onClick: PropTypes.func,
};

function PrevBtn({ onClick }) {
  return (
    <button onClick={onClick} className="glide__arrow glide__arrow--left" data-glide-dir="<">
      <i className="bi bi-chevron-left"></i>
    </button>
  );
}

PrevBtn.propTypes = {
  onClick: PropTypes.func,
};

export default function Products() {
  const [products,setProducts] = useState([]);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${apiUrl}/products`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (response.ok) {
          setProducts(data);
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


  const sliderSettings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextBtn />,
    prevArrow: <PrevBtn />,
    autoplaySpeed: 3000,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 582,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  return (
    <section className="products">
      <div className="container">
        <div className="section-title">
          <h2>Featured Products</h2>
          <p>Summer Collection New Morden Design</p>
        </div>
        <div className="product-wrapper product-carousel">
            <Slider {...sliderSettings}>
              {products.map((product) => (
                <ProductItem productItem={product} key={product._id} />
              ))}
            </Slider>
        </div>
      </div>
    </section>
  );
}
