import React, { useState, useRef, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CONSUMERBRANDANDINSIGHTS } from "../../constants/constants";
import IconNext from "../../assets/icons/slidernext.svg";

export default function NewCustomerBrandsInsights() {

    const [customerBrandsAndInsights, setCustomerBrandsAndInsights] = useState<any>(CONSUMERBRANDANDINSIGHTS);
    const [autoplay, setAutoplay] = useState(true);
    const [slideTo, setSlideTo] = useState(0);
    const sliderRef: any = useRef(null);
    const [isLTR, setIsLTR] = useState(false);
    const [slidePreviewCount, setSlidePreviewCount] = useState<number>(2);
    const [screenSize, setScreenSize] = useState<any>({
        dynamicWidth: window.innerWidth,
        dynamicHeight: window.innerHeight
    });

    const settings = {
        autoplay,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        rtl: isLTR,
        infinite: true,
        speed: 500,
        slidesToShow: slidePreviewCount,
        slidesToScroll: 1,
        afterChange: (currentSlide: any) => {
        console.log("Current Slide:", currentSlide);
        },
    };

    const goToSlide = (slideIndex: any) => {
        setSlideTo(slideIndex);
        sliderRef.current.slickGoTo(slideIndex);
    };

    const slideForward = () => {
        sliderRef.current.slickNext();
    };

    const slideReverse = () => {
        sliderRef.current.slickPrev();
    };

    const toggleAutoplay = () => {
        setAutoplay(!autoplay);
    };

    const setDimension = () => {
        setScreenSize({
          dynamicWidth: window.innerWidth,
          dynamicHeight: window.innerHeight
        });
        _setSlidePreviewCount();
      }
    
      const _setSlidePreviewCount = () => {
        if(screenSize?.dynamicWidth <= 767 ) {
            setSlidePreviewCount(1);
        }
        if(screenSize?.dynamicWidth >= 768 &&  screenSize?.dynamicWidth <= 991) {
            setSlidePreviewCount(2);
        }
        if(screenSize?.dynamicWidth >= 992 &&  screenSize?.dynamicWidth <= 1199) {
            setSlidePreviewCount(3);
        }
        if(screenSize?.dynamicWidth >= 1200 && screenSize?.dynamicWidth <= 1649) {
            setSlidePreviewCount(3);
        }
        if(screenSize?.dynamicWidth > 1650 ) {
          setSlidePreviewCount(4);
        }
    }

    const playSlideReverse = () => {
        setAutoplay(true);
        setIsLTR(true);
        sliderRef?.current?.slickPrev();
    }
    
    const playSlideForward = () => {
        setAutoplay(true);
        setIsLTR(false);
        sliderRef?.current?.slickNext();
    }

    useEffect(() => {
        window.addEventListener("resize", setDimension);

        return(() => {
            window.removeEventListener("resize", setDimension);
        });
    }, [screenSize, slidePreviewCount]);

  return (
    <div>

        <button 
            onClick={() => toggleAutoplay()}
        >
            {autoplay ? "Pause Autoplay" : "Resume Autoplay"}
        </button>

        <button
            onClick={() => goToSlide(3)}
        >
            Go to Slide 3
        </button>

        <button
            onClick={() => slideForward()}
        >
            Slide forward
        </button>

        <button
            onClick={() => slideReverse()}
        >
            Slide reverse
        </button>


        <div className="row Slider">
            <div className="col-1 text-start align-self-center">
                <img
                className="icon-prev"
                src={IconNext}
                onClick={() => {
                    playSlideReverse();
                }}
                />
            </div>

            <div className="col-10 text-center align-self-center">
                <Slider ref={sliderRef} {...settings}>
                    {customerBrandsAndInsights && customerBrandsAndInsights?.length > 0 && 
                    customerBrandsAndInsights.map((story: any, index: any) => (
                    <div key={story?.id || index}>
                        <div className="story-slide-item-wrapper">
                        <button
                            className="story-slide-item"
                            style={{
                                boxShadow: story?.isSelected ? 
                                `0 0 20px 5px ${story?.textcolor}, inset 0 0 0px 200px ${story?.textcolor}` :
                                `0 0 25px 0px ${story?.textcolor}, inset 0 0 25px 3px ${story?.textcolor}`
                            }}
                            onClick={() => {
                                setAutoplay(false);
                            }}
                        >
                            <h1
                                className="story-name"
                                style={{color: story?.isSelected ? `${"#FFFFFF"}` : `${story?.textcolor}`}}
                            >
                                {story?.name}
                            </h1>
                            <p
                                style={{color: story?.isSelected ? `${"#FFFFFF"}` : `${"#000000"}`}}
                                className="story-desc"
                            >
                                {story?.description}
                            </p>
                        </button>
                        </div> 
                    </div>
                    ))}
                </Slider>
            </div>

            <div className="col-1 text-end align-self-center">
                <img
                className="icon-next"
                src={IconNext}
                onClick={() => {
                    playSlideForward();
                }}
                />
            </div>
        </div>

        

    </div>
  );
}
