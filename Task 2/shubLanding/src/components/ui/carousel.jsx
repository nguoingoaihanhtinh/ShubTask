import React, { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const Carousel = ({ children, totalItems }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const itemWidth = 17.1;

  const scrollPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? totalItems - 1 : prevIndex - 1));
  };

  const scrollNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === totalItems - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="relative">
      {/* Carousel Container */}
      <div className="flex overflow-hidden">
        <div
          className="flex transition-transform gap-8"
          style={{
            transform: `translateX(-${itemWidth * currentIndex}%)`,
            width: `${100 * totalItems}%`,
          }}
        >
          {children}
        </div>
      </div>
      {/* Navigation Buttons */}
      <button
        onClick={scrollPrev}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white text-black border p-2 rounded-full"
      >
        <ArrowLeft />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white text-black  p-2 rounded-full"
      >
        <ArrowRight />
      </button>
    </div>
  );
};

export { Carousel };
