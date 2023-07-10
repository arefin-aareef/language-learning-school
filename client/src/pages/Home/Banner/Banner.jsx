/* eslint-disable react/no-unescaped-entities */
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import "./Banner.css";
import bannerImg1 from "../../../assets/banner1.jpg";
import bannerImg2 from "../../../assets/banner2.jpg";
import bannerImg3 from "../../../assets/banner3.jpg";
import bannerImg4 from "../../../assets/banner4.jpg";
import hero from "../../../assets/hero.jpg";

const Banner = () => {
  const [sliderRef] = useKeenSlider({
    loop: true,
    mode: "free",
    slides: {
      perView: 3,
      spacing: 15,
    },
  });

  return (
    <div>
        <div className="hero min-h-screen " style={{ backgroundImage: `url(${hero})` }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="w-3/4">
                <h1 className="mb-5 text-4xl md:text-6xl font-bold">Welcome To Pyrates School</h1>
                <p className="mt-6 md:text-xl">Unlock the world's languages with our immersive and interactive language learning platform. Discover a personalized journey that combines cutting-edge technology with expert guidance, empowering you to confidently communicate in any language.</p>
                </div>
            </div>
        </div>

      <div ref={sliderRef} className="keen-slider my-2">
        <div className="keen-slider__slide number-slide1">
          <img className="h-[98%]" src={bannerImg1} alt="" />
        </div>
        <div className="keen-slider__slide number-slide2">
          <img className="h-[98%]" src={bannerImg2} alt="" />
        </div>
        <div className="keen-slider__slide number-slide3">
          <img className="h-[98%]" src={bannerImg3} alt="" />
        </div>
        <div className="keen-slider__slide number-slide4">
          <img className="h-[98%]" src={bannerImg4} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Banner;
