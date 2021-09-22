import Link from "next/link"
import Star from "components/ui/Star"
import style from "styles/components/list.module.scss"

const Stars = ({ review, detail, name, code, category }) => {
	const { reviewCnt, reviewPer, reviewAvg } = review

	if (detail) {
		return (
			<Link href={`/search/review/${code}?category=${category}&name=${name}`}>
				<a className={style.review_box}>
					<Star style={style} percent={reviewPer} />
					<span className={style.grade}>{reviewAvg}</span>
					{!detail && reviewCnt ? (
						<span className={style.cnt}>({reviewCnt})</span>
					) : (
						<span className={style.cnt_detail}>
							{reviewCnt && reviewCnt}건의 후기가 있어요
						</span>
					)}
				</a>
			</Link>
		)
	}

	return (
		<div className={style.review_box}>
			<Star style={style} percent={reviewPer} />
			<span className={style.grade}>{reviewAvg}</span>
			{!detail && reviewCnt !== 0 ? (
				<span className={style.cnt}>({reviewCnt})</span>
			) : (
				<span className={style.cnt_detail}>
					{reviewCnt && reviewCnt}건의 후기가 있어요
				</span>
			)}
		</div>
	)
}

export default Stars
