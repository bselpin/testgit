import style from "styles/review.module.scss"

const StarButton = ({ value, name, setPoint }) => (
	<>
		<input type="radio" name="rate" id={`rate-${value}`} />
		<label
			htmlFor={`rate-${value}`}
			className={style.star_point}
			onClick={() => setPoint({ name, value })}
		></label>
	</>
)

export default StarButton
