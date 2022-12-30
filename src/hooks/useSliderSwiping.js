import { useRef, useState } from 'react'

const THRESHOLD = 20

const useSliderSwiping = ({
    hasNextSlide,
    hasPreviousSlide,
    handlePreviousSlide,
    handleNextSlide,
    position,
    setPosition,
    containerRef,
}) => {
    const [isSwiping, setIsSwiping] = useState(false)
    const lastPosition = useRef(position)
    const swipingProps = {
        onPanStart: () => {
            setIsSwiping(true)
            lastPosition.current = position
        },
        onPan: (e, info) => {
            const { delta: { x } } = info
            const xPercentage = (x / containerRef.current.clientWidth) * 100
            if (Math.abs(lastPosition.current - position) <= 50) {
                setPosition(position + xPercentage)
            }
        },
        onPanEnd: (e, info) => {
            const { velocity: { x } } = info
            setTimeout(() => {
                // Disable clicking for a short period to prevent accidentaly clicking links
                setIsSwiping(false)
            }, 200)

            if (x > THRESHOLD && hasPreviousSlide) {
                handlePreviousSlide()
            } else if (x < -THRESHOLD && hasNextSlide) {
                handleNextSlide()
            } else {
                setPosition(lastPosition.current)
            }
        }
    }

    return {
        swipingProps,
        isSwiping,
    }
}

export default useSliderSwiping
