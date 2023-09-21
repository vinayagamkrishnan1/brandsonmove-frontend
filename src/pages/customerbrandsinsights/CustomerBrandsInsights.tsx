import "swiper/css";
import "swiper/css/bundle";
import "./CustomerBrandInsights.scss";
import { useEffect, useRef, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import IconNext from "../../assets/icons/slidernext.svg";
import { CONSUMERBRANDANDINSIGHTS, CONSUMERBRANDANDINSIGHTS_DEFAULTCONTENT } from "../../constants/constants";
import SlideItem from "./components/SlideItem";
import SlideItemDetail from "../components/stories/SlideItemDetail";

export default function CustomerBrandsInsights() {
  const swiperRef: any = useRef(null);
  const [autoPlay, setAutoPlay] = useState<any>({
    delay: 18000,
    disableOnInteraction: false,
    reverseDirection: false,
  });
  const [isUserClickedPrevButton, setIsUserClickedPrevButton] =
  useState<boolean>(false);
  const [isUserClickedNextButton, setIsUserClickedNextButton] =
  useState<boolean>(true);
  const [slideTimeOut, setSlideTimeOut] = useState<any>(null);
  const [showFullViewImage, setShowFullViewImage] = useState<boolean>(true);
  const [selectedItem, setSelectedItem] = useState<any>({});
  const [customerBrandsAndInsights] =
  useState<any>(CONSUMERBRANDANDINSIGHTS);
  const [isSlideStoped, setIsSlideStoped] = useState<boolean>(false);
  const [showDefaultContent, setShowDefaultContent] = useState<boolean>(true);
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [screenSize, setScreenSize] = useState<any>({
    dynamicWidth: window.innerWidth,
    dynamicHeight: window.innerHeight,
  });
  const [slidePreviewCount, setSlidePreviewCount] = useState<number>(2);
  const [slideSpace, setSlideSpace] = useState<number>(45);

  const setDimension = () => {
    setScreenSize({
      dynamicWidth: window.innerWidth,
      dynamicHeight: window.innerHeight,
    });
    _setSlidePreviewCount();
  };

  const _setSlidePreviewCount = () => {
    if (screenSize?.dynamicWidth <= 540) {
      setSlidePreviewCount(1);
      setSlideSpace(10);
    }
    if (screenSize?.dynamicWidth >= 541 && screenSize?.dynamicWidth <= 820) {
      setSlidePreviewCount(2);
      setSlideSpace(20);
    }
    if (screenSize?.dynamicWidth >= 821 && screenSize?.dynamicWidth <= 1200) {
      setSlidePreviewCount(3);
      setSlideSpace(20);
    }
    if (screenSize?.dynamicWidth >= 1201) {
      setSlidePreviewCount(4);
      setSlideSpace(30);
    }
  };

  const getSlideIntemBasedOnIndex = (index: number) => {
    return customerBrandsAndInsights[index];
  };

  const setSelectedStoryAndActiveSlide = async () => {
    const story: any = getSlideIntemBasedOnIndex(currentSlideIndex);
    await customerBrandsAndInsights.find((_story: any) => {
      if (_story.id === story.id) {
        _story.isSelected = true;
      } else {
        _story.isSelected = false;
      }
    });
    setSelectedItem(story);
  };

  const playSlideReverse = () => {
    setIsSlideStoped(false);
    setIsUserClickedPrevButton(true);
    setIsUserClickedNextButton(false);
    setAutoPlay({
      delay: 11000,
      disableOnInteraction: false,
      reverseDirection: true,
    });
    swiperRef.current.slidePrev();
    if (isSlideStoped) {
      swiperRef?.current?.autoplay?.resume();
    }
  };

  const playSlideForward = () => {
    setIsSlideStoped(false);
    setIsUserClickedPrevButton(false);
    setIsUserClickedNextButton(true);
    setAutoPlay({
      delay: 11000,
      disableOnInteraction: false,
      reverseDirection: false,
    });
    swiperRef.current.slideNext();
    if (isSlideStoped) {
      swiperRef?.current?.autoplay?.resume();
    }
  };

  const stopSlide = () => {
    setIsSlideStoped(true);
    swiperRef?.current?.autoplay?.pause();
  };

  useEffect(() => {
    window.addEventListener("resize", setDimension);
    _setSlidePreviewCount();
    if (showDefaultContent) {
      setSelectedItem(CONSUMERBRANDANDINSIGHTS_DEFAULTCONTENT);
      stopSlide();
      const timer = setTimeout(() => {
        setAutoPlay({
          delay: 11000,
          disableOnInteraction: false,
          reverseDirection: false,
        });
        setShowDefaultContent(false);
        setSelectedItem(customerBrandsAndInsights[0]);
        swiperRef?.current?.autoplay?.resume();
        setSelectedStoryAndActiveSlide();
      }, 7000);
      setSlideTimeOut(timer);
    } else {
      setSelectedStoryAndActiveSlide();
    }
    if (!showDefaultContent) {
      clearTimeout(slideTimeOut);
      setSlideTimeOut(null);
    }
    return () => {
      window.removeEventListener("resize", setDimension);
      clearTimeout(slideTimeOut);
      setSlideTimeOut(null);
    };
  }, [ screenSize, autoPlay, currentSlideIndex, selectedItem, isUserClickedNextButton, isUserClickedPrevButton]);

  return (
    <div className="Slider-flex-container">
      <div className="slider-customer-brands-insights">
        <div className="next-prev-button-section">
          <img
            className="icon-prev"
            src={IconNext}
            onClick={() => {
              playSlideReverse();
            }}
          />
        </div>
        <div className="slider-section">
          <Swiper
            // centeredSlides={true}
            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            loop={true}
            autoplay={autoPlay}
            key={"rtl-swiper"}
            slidesPerView={slidePreviewCount}
            onSlideChange={(slide: any) => {
              setCurrentSlideIndex(slide?.realIndex);
            }}
            onReachEnd={() => {
              console.log("Slide reached end");
            }}
          >
            {customerBrandsAndInsights &&
              customerBrandsAndInsights?.length > 0 &&
              customerBrandsAndInsights.map((story: any, index: any) => (
                <SwiperSlide key={story?.id || index}>
                  <div className="story-slide-item-wrapper">
                    <SlideItem
                      story={story}
                      onClcikOfSlideItem={() => {
                        stopSlide();
                        setCurrentSlideIndex(index);
                      }}
                    />
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
        <div className="next-prev-button-section">
          <img
            className="icon-next"
            src={IconNext}
            onClick={() => {
              playSlideForward();
            }}
          />
        </div>
      </div>
      <div>
        <SlideItemDetail
          showDefaultContent={showDefaultContent}
          story={selectedItem}
          showFullViewImage={showFullViewImage}
          onclickImage={() => {
            setShowFullViewImage((pre) => !showFullViewImage);
            if (showFullViewImage) {
              setIsSlideStoped(true);
              stopSlide();
            }
            if (!showFullViewImage) {
              swiperRef?.current?.autoplay?.resume();
            }
          }}
        />
      </div>
    </div>
  );
};