import {useEffect, useLayoutEffect, useRef, useState} from 'react';
import arrow from '../assets/arrow.svg';
import { useWindowSize } from '../hooks/useWindowSize';

export default function Carousel({ slides }) {
    const [slideIndex, setSlideIndex] = useState(0);
    const [isScrolling, setIsScrolling] = useState(true);
    const [slideBounds, setSlideBounds] = useState();
    const windowSize = useWindowSize();
  
    const slidesEl = useRef(null);
    const slideEls = useRef(null);
  
    // Go to slide index.
    const goToSlide = (index) => {
      setIsScrolling(false);
      setSlideIndex(index);
    };
  
    // Go to previous  slide.
    const goToPreviousSlide = (index) => {
      const prevIndex = index - 1 >= 0 ? index - 1 : slides.length - 1;
      goToSlide(prevIndex);
    };
  
    // Go to next slide.
    const goToNextSlide = (index) => {
      const nextIndex = index + 1 <= slides.length - 1 ? index + 1 : 0;
      goToSlide(nextIndex);
    };
  
    // Update index when the slidesEl is scrolled.
    const onScroll = () => {
      if (slidesEl.current && slideBounds && isScrolling) {
        const newIndex = Math.round(
            slidesEl.current.scrollLeft / slideBounds.width
        );
        setSlideIndex(newIndex);
      }
    };

    const setScroll = () => {
        console.log('Scrolling: ', !isScrolling);
        setIsScrolling(!isScrolling); 
    };
  
    // When the index changes, scroll the div to the appropriate index.
    useEffect(() => {
      if (slideBounds && slidesEl.current) {
        slidesEl.current.scrollTo({
          top: 0,
          left: slideBounds.width * slideIndex,
          behavior: 'smooth',
        });
        return;
      }
    }, [slideBounds, slidesEl, slideIndex]);
  
    // If window is resized, reset slideBounds.
    useLayoutEffect(() => {
      if (windowSize) {
        setSlideBounds(slideEls.current?.getBoundingClientRect());
        return;
      }
    }, [slideEls, windowSize]);
  
    // Set slideBounds on mount.
    useLayoutEffect(() => {
      setSlideBounds(slideEls.current?.getBoundingClientRect());
      return;
    }, []);

    return (
        <div className="carousel__container">
            <div className="carousel">
                {slides.length > 1 && (
                    <div className="carousel__controls">
                        <div className="carousel__controls__arrows">
                            <div
                            aria-label="Go back"
                            className="carousel__controls__arrows__arrow carousel__controls__arrows__arrow--left"
                            tabIndex="0"
                            onClick={() => goToPreviousSlide(slideIndex)}>
                                <img src={arrow} alt="Previous Arrow" />
                            </div>
                            <div
                            aria-label="Go forward"
                            className="carousel__controls__arrows__arrow carousel__controls__arrows__arrow--right"
                            tabIndex="0"
                            onClick={() => goToNextSlide(slideIndex)}>
                                <img src={arrow} alt="Next Arrow" />
                            </div>
                        </div>
                        <div className="carousel__controls__dots">
                            {slides.map((slide, i) => {
                                const key = `carouselDot-${i}`;
                                const ariaLabel = `slide--${i+1}--${slide.title}`;
                                const dotClass = i === slideIndex ?
                                    'carousel__controls__dots__dot carousel__controls__dots__dot--active' :
                                    'carousel__controls__dots__dot';

                                return (
                                    <div
                                        onClick={() => goToSlide(i)}
                                        aria-label={ariaLabel}
                                        key={key}
                                        className={dotClass}
                                        tabIndex="0">
                                    </div>  
                                )
                            })}
                        </div>
                    </div>
                )}
                <div className="carousel__slides" 
                    ref={slidesEl}
                    onScroll={() => onScroll()}
                    onTransitionEnd={() => setScroll()}>
                    {slides.map((slide, i) => {
                        const key = `carouselImage-${i}`;

                        return (
                            <div className="carousel__slides__slide" ref={slideEls} key={key}>
                                <img src={slide.image} alt={slide.title} />
                            </div>
                        );   
                    })}
                </div>
            </div>
        </div>
    );
}