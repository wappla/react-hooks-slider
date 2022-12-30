import { useEffect, useState } from 'react'
import debounce from 'lodash-es/debounce'
import { roundToX } from '../utils'

const useSliderPosition = ({
    activeSlide,
    slideRefs,
    containerRef,
}) => {
    const [position, setPosition] = useState(null)
    const [isAtEnd, setIsAtEnd] = useState(false)
    const [isDisabled, setIsDisabled] = useState(false)

    const calculatePosition = () => {
        const { current: slides } = slideRefs
        const { current: container } = containerRef
        if (slides.length > 0 && container !== null) {
            const totalWidth = slides.reduce((acc, slide) => {
                const slideWidth = slide?.clientWidth || 0
                return acc + slideWidth
            }, 0)
            const containerWidth = container.clientWidth
            setIsDisabled(totalWidth <= containerWidth)

            if (activeSlide === 0) {
                setPosition(0)
                setIsAtEnd(false)
            } else {
                /**
                 * Calculation below is in pixels. We need to calculate in percentage to keep
                 * resizing clean. When adding swiping functionality we tried to use framer dragging
                 * instead of panning. This gave really buggy results and we needed to use pixel
                 * based position instead of percentage. We switched to panning, but we'll keep the
                 * pixel based calculation if we need it somewhere in the future.
                 */
                // const gap = parseInt(window
                //     .getComputedStyle(slideRefs.current[0], null)
                //     .getPropertyValue('padding-right'), 10)
                // const maxPosition = totalWidth - containerWidth - gap
                // const slidesTillActiveSlide = [...slideRefs.current].splice(0, activeSlide)
                // const newPosition = slidesTillActiveSlide.reduce((acc, slide) => (
                //     acc + slide.offsetWidth
                // ), 0)

                const newPosition = slides.slice(0, activeSlide).reduce((acc, slide) => {
                    const slideWidth = slide?.clientWidth || 0
                    return (
                        roundToX(acc + (slideWidth / containerWidth) * 100, 2)
                    )
                }, 0)

                const maxPosition = roundToX(((totalWidth / containerWidth) - 1) * 100, 2)
                setPosition(-Math.min(newPosition, maxPosition))
                setIsAtEnd(newPosition >= maxPosition)
            }
        }
    }

    const handleResize = debounce(() => {
        calculatePosition()
    }, 200)

    useEffect(() => {
        calculatePosition()
    }, [slideRefs, containerRef, activeSlide])

    useEffect(() => {
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [activeSlide])

    return {
        position,
        setPosition,
        isAtEnd,
        isDisabled,
    }
}

export default useSliderPosition
