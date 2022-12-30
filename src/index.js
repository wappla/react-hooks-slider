import { useRef, useEffect, useState } from 'react'

import useSliderSwiping from './hooks/useSliderSwiping'
import useSliderPosition from './hooks/useSliderPosition'
import useSliderSequence from './hooks/useSliderSequence'

const useSlider = (initialSlideIndex, autoplaySpeed, slidesAreRendered = true) => {
    const [slideCount, setSlideCount] = useState(0)
    const containerRef = useRef(null)
    const slideRefs = useRef([])
    const {
        activeSlide,
        handleNextSlide,
        hasPreviousSlide,
        handleSlideSelect,
        handlePreviousSlide,
        hasNextSlide: hasNextSlideSequence,
    } = useSliderSequence({
        slideCount,
        containerRef,
        autoplaySpeed,
        initialSlideIndex,
    })
    const {
        isAtEnd,
        position,
        animation,
        isDisabled,
        setPosition,
    } = useSliderPosition({
        slideRefs,
        activeSlide,
        containerRef,
    })
    const hasNextSlide = !isAtEnd && hasNextSlideSequence

    const {
        isSwiping,
        swipingProps,
    } = useSliderSwiping({
        position,
        setPosition,
        containerRef,
        hasNextSlide,
        handleNextSlide,
        hasPreviousSlide,
        handlePreviousSlide,
    })

    useEffect(() => {
        if (slidesAreRendered) {
            setSlideCount(slideRefs.current.length)
        }
    }, [slideRefs.current.length, slidesAreRendered])
    return {
        position,
        isSwiping,
        animation,
        slideRefs,
        isDisabled,
        activeSlide,
        containerRef,
        hasNextSlide,
        handleNextSlide,
        hasPreviousSlide,
        handleSlideSelect,
        handlePreviousSlide,
        totalSlides: slideCount,
        swipingProps: isDisabled ? {} : swipingProps,
    }
}

export default useSlider
