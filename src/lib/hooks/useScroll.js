import { useEffect, useState } from "react"

const useScroll = ({ initialDirection = true, thresholdPixels = 25 } = {}) => {
	const [scrollDir, setScrollDir] = useState(initialDirection)

	useEffect(() => {
		if (typeof window !== "undefined") {
			const threshold = thresholdPixels || 0
			let lastScrollY = window.pageYOffset
			let ticking = false

			const updateScrollDir = () => {
				const scrollY = window.pageYOffset

				if (Math.abs(scrollY - lastScrollY) < threshold) {
					ticking = false
					return
				}

				setScrollDir(scrollY > lastScrollY ? false : true)
				lastScrollY = scrollY > 0 ? scrollY : 0
				ticking = false
			}

			const onScroll = () => {
				if (!ticking) {
					window.requestAnimationFrame(updateScrollDir)
					ticking = true
				}
			}

			window.addEventListener("scroll", onScroll)

			return () => window.removeEventListener("scroll", onScroll)
		}
	}, [initialDirection, thresholdPixels])

	return scrollDir
}

export default useScroll
