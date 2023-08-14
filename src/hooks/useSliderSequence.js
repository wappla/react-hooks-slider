import {
    useCallback, useRef, useEffect, useState
} from 'react'

import useIsInViewport from './useIsInViewport'

const useSliderSequence = ({
    slideCount,
    initialSlideIndex = 0,
    autoplaySpeed = 0,
    containerRef,
}) => {
    const [activeSlide, setActiveSlide] = useState(initialSlideIndex)
    const intervalRef = useRef(null)

    const handleSlideSelect = (id) => {
        setActiveSlide(id)
    }

    const handleNextSlide = useCallback(() => {
        if (activeSlide < slideCount - 1) {
            setActiveSlide(activeSlide + 1)
        } else {
            setActiveSlide(0)
        }
    }, [activeSlide, slideCount])

    const handlePreviousSlide = () => {
        if (activeSlide !== 0) {
            setActiveSlide(activeSlide - 1)
        } else {
            setActiveSlide(slideCount - 1)
        }
    }

    const hasPreviousSlide = activeSlide !== 0
    const hasNextSlide = activeSlide !== slideCount - 1

    const stopInterval = () => {
        clearInterval(intervalRef.current)
        intervalRef.current = null
    }
    const startInterval = () => {
        if (!intervalRef.current) {
            intervalRef.current = setInterval(() => {
                handleNextSlide()
            }, autoplaySpeed)
        }
    }

    const isInView = useIsInViewport(containerRef?.current?.parentElement, {
        threshold: 0.6
    })
    useEffect(() => {
        if (autoplaySpeed === 0 || slideCount === 0) {
            return
        }
        if (isInView) {
            startInterval()
        } else {
            stopInterval()
        }
        return stopInterval
    }, [autoplaySpeed, activeSlide, slideCount, isInView])

    return {
        activeSlide,
        handleSlideSelect,
        handleNextSlide,
        handlePreviousSlide,
        hasPreviousSlide,
        hasNextSlide,
    }
}

export default useSliderSequence
