import { useEffect, useState } from "react";
import { Carousel } from "./ui/carousel";

const LandingSection = () => {
  const [totalItems, setTotalItems] = useState(6);

  const pictures = [
    { id: 1, src: "https://shub.edu.vn/images/landing/ver3/image-section/carousel2.png" },
    { id: 2, src: "https://shub.edu.vn/images/landing/ver3/image-section/carousel3.png" },
    { id: 3, src: "https://shub.edu.vn/images/landing/ver3/image-section/carousel4.png" },
    { id: 4, src: "https://shub.edu.vn/images/landing/ver3/image-section/carousel1.png" },
    { id: 5, src: "https://shub.edu.vn/images/landing/ver3/image-section/carousel6.png" },
    { id: 6, src: "https://shub.edu.vn/images/landing/ver3/image-section/carousel5.png" },
    { id: 7, src: "https://shub.edu.vn/images/landing/ver3/image-section/carousel2.png" },
    { id: 8, src: "https://shub.edu.vn/images/landing/ver3/image-section/carousel3.png" },
    { id: 9, src: "https://shub.edu.vn/images/landing/ver3/image-section/carousel4.png" },
    { id: 10, src: "https://shub.edu.vn/images/landing/ver3/image-section/carousel1.png" },
    { id: 11, src: "https://shub.edu.vn/images/landing/ver3/image-section/carousel6.png" },
    { id: 12, src: "https://shub.edu.vn/images/landing/ver3/image-section/carousel5.png" },
  ];

  useEffect(() => {
    const updateTotalItems = () => {
      if (window.innerWidth <= 760) {
        setTotalItems(4); 
      } else {
        setTotalItems(6); 
      }
    };

    updateTotalItems();

    window.addEventListener("resize", updateTotalItems);

    return () => {
      window.removeEventListener("resize", updateTotalItems);
    };
  }, []);

  return (
    <div className="w-full">
      <div className="top-container flex flex-col gap-5">
        <h1 className="text-4xl font-bold">Hoạt động tiêu biểu từ cộng đồng giáo dục</h1>
        <p className="text-2xl text-gray-600">
          Hình ảnh được chính những giáo viên từ khắp 3 miền ghi lại trong quá trình giảng dạy, dạy học ứng dụng công
          nghệ SHub Classroom.
        </p>
      </div>
      <div className="picture-container mt-8 h-[450px]">
        <Carousel totalItems={totalItems}>
          {pictures.slice(0, totalItems).map((picture, index) => (
            <div
              key={picture.id}
              className={`w-[40%] md:w-[20%] lg:w-[13.16%] h-[475px] flex-shrink-0  bg-cover bg-center mx-2 rounded-xl ${
                (index + 1) % 2 === 0 ? "transform mt-6 h-[450px] rounded-xl" : "transform mb-6 h-[450px]"
              }`}
              style={{ backgroundImage: `url(${picture.src})`, backgroundSize: "cover" }}
            ></div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default LandingSection;
