import "./Gallery.css";
import { useState } from "react";
import Slider from "react-slick";
import PropTypes from "prop-types";
import Image from "../../../config/Images/image";

function PrevBtn({ onClick }) {
  return (
    <button
      className="glide__arrow glide__arrow--left"
      data-glide-dir="<"
      onClick={onClick}
      style={{
        zIndex: "2",
      }}
    >
      <i className="bi bi-chevron-left"></i>
    </button>
  );
}

function NextBtn({ onClick }) {
  return (
    <button
      className="glide__arrow glide__arrow--right"
      data-glide-dir=">"
      onClick={onClick}
      style={{
        zIndex: "",
      }}
    >
      <i className="bi bi-chevron-right"></i>
    </button>
  );
}

NextBtn.propTypes = {
  onClick: PropTypes.func,
};

PrevBtn.propTypes = {
  onClick: PropTypes.func,
};

export default function Gallery( {productImages}) {
  const [activeImg, setActiveImg] = useState({
    img: productImages[0],
    imgIndex: 0,
  });

  const sliderSettings = {
    dots: false,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    nextArrow: <NextBtn />,
    prevArrow: <PrevBtn />,
  };

  return (
    <div className="product-gallery">
      <div className="single-image-wrapper">
        <Image
          imageUrl={activeImg.img}
          id="single-image"
        />
      </div>
      <div className="product-thumb">
        <div className="glide__track" data-glide-el="track">
          <ol className="gallery-thumbs glide__slides">
            <Slider {...sliderSettings}>
              {productImages.map((itemImg, index) => (
                <li
                  className="glide__slide glide__slide--active"
                  key={index}
                  onClick={() =>
                    setActiveImg({
                      img: itemImg,
                      imgIndex: index,
                    })
                  }
                >
                  <Image
                    imageUrl={itemImg}
                    active={activeImg.imgIndex}
                    index={index}
                  />
                </li>
              ))}
            </Slider>
          </ol>
        </div>
      </div>
    </div>
  );
}

Gallery.propTypes = {
  productImages: PropTypes.array,
};
