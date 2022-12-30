import { useEffect, useMemo, useState } from 'react'

const useIsInViewport = (ref, options = {}) => {
    const [isIntersecting, setIsIntersecting] = useState(true)

    const observer = useMemo(() => {
        if (typeof window === 'undefined' && typeof document === 'undefined') {
            return null
        }
        return new IntersectionObserver(
            ([entry]) => setIsIntersecting(entry.isIntersecting),
            options,
        )
    }, [])

    useEffect(() => {
        if (!ref || !observer) {
            return null
        }
        observer.observe(ref)
        return () => observer.disconnect()
    }, [ref, observer])

    return isIntersecting
}

export default useIsInViewport
