import style from "styles/components/list.module.scss"

const Icons = ({ isIcons }) => {
	const { panorama, contents, interview } = isIcons
	return (
		<div>
			{panorama && "a"}
			{contents && "a"}
			{interview && "a"}
		</div>
	)
}

export default Icons
