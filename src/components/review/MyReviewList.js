import Link from "next/link"
import { timeForToday } from "lib/utils/time"
import style from "styles/review.module.scss"

const MyReviewList = ({ review }) => {
	const {
		createdate,
		grade,
		yAdmNm,
		ykiho,
		review_content,
		adminNm,
		adminPttnCd_categoryId: category,
		longTermAdminSym: code,
	} = review

	const checkType = () => {
		if (ykiho) return true
		if (code) return false
	}

	const type = checkType()

	const linkUrl = () => {
		if (ykiho) return `/search/hospital/${ykiho}?category=13`
		if (code) return `/search/care/${code}?category=${category}`
	}

	return (
		<Link href={linkUrl()}>
			<a className={style.review_list}>
				<div className={style.review_header}>
					<p className={style.user_name}>{type ? yAdmNm : adminNm}</p>
					<p className={style.star}></p>
					<p className={style.point}>{grade}</p>
					<p className={style.time}>{timeForToday(createdate)}</p>
				</div>
				<div className={style.review_text}>{review_content}</div>
			</a>
		</Link>
	)
}

export default MyReviewList
