import "./Advertisement.scss";
import "swiper/css";
import "swiper/css/bundle";
import React, { useEffect, useState } from "react";
import { ADVERTISMENT_IMAGES } from "../../../constants/constants";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { } from "swiper";
import { Autoplay, Navigation } from "swiper";

export default function Advertisement() {

    const swiperRef: any = React.useRef(null);
    const [advertisementImages] = useState<any>(ADVERTISMENT_IMAGES);
    const [slidePreviewCount, setSlidePreviewCount] = useState<number>(4);
    const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
    const [screenSize, setScreenSize] = useState<any>({
        dynamicWidth: window.innerWidth,
        dynamicHeight: window.innerHeight
    });
    SwiperCore.use([Autoplay]);

    const setDimension = () => {
        setScreenSize({
          dynamicWidth: window.innerWidth,
          dynamicHeight: window.innerHeight
        });
        _setSlidePreviewCount();
    }
    
    const _setSlidePreviewCount = () => {
        if (screenSize?.dynamicWidth <= 540) {
          setSlidePreviewCount(1);
        }
        if (screenSize?.dynamicWidth >= 541 && screenSize?.dynamicWidth <= 820) {
          setSlidePreviewCount(2);
        }
    
        if (screenSize?.dynamicWidth >= 821) {
          setSlidePreviewCount(4);
        }
    };

    useEffect(() => {
        _setSlidePreviewCount();
        window.addEventListener("resize", setDimension);
        return(() => {
            window.removeEventListener("resize", setDimension);
        });
    }, [screenSize, slidePreviewCount]);
    
    return (
        <div>
            <Swiper
                className="advertisment-slider"
                navigation={true}
                modules={[Navigation]}
                loop={true}
                loopPreventsSliding={true}
                loopedSlides={null}
                autoplay={true}
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                }}
                slidesPerView={slidePreviewCount}
                onSlideChange={(slide: any) => {
                    setCurrentSlideIndex(slide?.realIndex);
                }}
                onReachEnd={() => {
                }}
            >
                {advertisementImages && advertisementImages?.length > 0 && 
                advertisementImages.map((ads: any, index: any) => (
                    <SwiperSlide key={ads?.id || index}>
                        <div className="advertisement-container">
                            <img className="advertisement-images" src={ads?.url} />
                        </div> 
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
