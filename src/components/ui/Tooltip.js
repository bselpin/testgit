import { useEffect, useState } from "react"
import ReactTooltip from "react-tooltip"
import style from "styles/components/tooltip.module.scss"

const Tooltip = ({ children, id }) => {
	const [mount, setMount] = useState(false)

	useEffect(() => {
		if (typeof window !== "undefined") {
			setMount(true)
		}
	}, [])

	return (
		<>
			{mount && (
				<>
					<a
						data-tip
						data-for={id}
						className={style.tooltip_icon}
						data-event="click mouseenter"
						data-scroll-hide="false"
						data-event-off="mouseleave"
					></a>
					<ReactTooltip
						id={id}
						place="bottom"
						type="light"
						effect="solid"
						className={style.tooltip_box}
						overridePosition={({ left, top }, currentEvent, currentTarget, node) => {
							const d = document.documentElement
							left = Math.min(d.clientWidth - node.clientWidth, left)
							top = Math.min(d.clientHeight - node.clientHeight, top)
							left = Math.max(10, left)
							top = Math.max(0, top)
							return { top, left }
						}}
					>
						{children}
					</ReactTooltip>
				</>
			)}
		</>
	)
}

export default Tooltip
