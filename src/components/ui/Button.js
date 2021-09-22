import { memo } from "react"

const Button = ({ label, func, hide }) => {
	const handleEvent = () => {
		if (func) func()
	}

	return (
		<button onClick={handleEvent} disabled={!hide}>
			{label}
		</button>
	)
}

export default memo(Button)
