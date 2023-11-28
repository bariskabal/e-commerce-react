import ProductItem from "./ProductItem";
import "./Products.css";
import productsData from "../../data.json";
import { useState } from "react";
import Slider from "react-slick";
import PropTypes from "prop-types";

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
  const [products] = useState(productsData);


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
                <ProductItem productItem={product} key={product.id} />
              ))}
            </Slider>
        </div>
      </div>
    </section>
  );
}
