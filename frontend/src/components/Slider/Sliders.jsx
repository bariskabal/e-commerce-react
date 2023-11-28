import SliderItem from "./SliderItem";
import "./Sliders.css";
import { useState } from "react";

export default function Sliders() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () =>  {
    const slideNumber = (currentSlide + 1) % 3
    setCurrentSlide(slideNumber)
  }

  const prevSlide = () =>  {
    const slideNumber = (currentSlide - 1 + 3) % 3
    setCurrentSlide(slideNumber)
  }

  return (
    <section className="slider">
      <div className="slider-elements">
        {currentSlide === 0 && <SliderItem imageSrc="/img/slider/slider1.jpg" />}
        {currentSlide === 1 && <SliderItem imageSrc="/img/slider/slider2.jpg" />}
        {currentSlide === 2 && <SliderItem imageSrc="/img/slider/slider3.jpg" />}
        <div className="slider-buttons">
          <button onClick={prevSlide}>
            <i className="bi bi-chevron-left"></i>
          </button>
          <button onClick={nextSlide}>
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>
        <div className="slider-dots">
          <button onClick={() => setCurrentSlide(0)} className={`slider-dot ${currentSlide === 0 ? "active" : ""}`}>
            <span></span>
          </button>
          <button onClick={() => setCurrentSlide(1)} className={`slider-dot ${currentSlide === 1 ? "active" : ""}`}>
            <span></span>
          </button>
          <button onClick={() => setCurrentSlide(2)} className={`slider-dot ${currentSlide === 2 ? "active" : ""}`}>
            <span></span>
          </button>
        </div>
      </div>
    </section>
  );
}