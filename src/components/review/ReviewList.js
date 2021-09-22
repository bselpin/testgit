import { timeForToday } from "lib/utils/time"
import { toCensoredString } from "lib/utils/listCommon"
import style from "styles/review.module.scss"

const ReviewList = ({ review }) => {
	const { createdate, grade, name, review_content } = review
	return (
		<div className={style.review_list}>
			<div className={style.review_header}>
				<p className={style.user_name}>{toCensoredString(name)}</p>
				<p className={style.star}></p>
				<p className={style.point}>{grade}</p>
				<p className={style.time}>{timeForToday(createdate)}</p>
			</div>
			<div className={style.review_text}>{review_content}</div>
		</div>
	)
}

export default ReviewList
