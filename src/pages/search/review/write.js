import { NextSeo } from "next-seo"
import { useCallback, useEffect, useState } from "react"
import PageHeader from "components/layout/PageHeader"
import WithAuth from "components/WithAuth"
import { nextPost } from "lib/utils/api"
import StarButton from "components/review/StarButton"
import style from "styles/review.module.scss"

const TITLE = `리뷰 작성하기 | ${process.env.NEXT_PUBLIC_SLOGAN} | ${process.env.NEXT_PUBLIC_SITE_NAME}`
const DESC = "요양시설의 상담 및 이용 후기를 작성할 수 있습니다."

const starPoint = [
	{ value: 5, name: "five" },
	{ value: 4, name: "four" },
	{ value: 3, name: "three" },
	{ value: 2, name: "two" },
	{ value: 1, name: "one" },
]

const LIMIT = 500
const PLACEHOLDER =
	"아래에 해당하는 후기는 숨김 처리될 수 있어요. \n - 시설과 관련없는 내용의 후기 \n - 욕설, 음란성 정보, 유애한 정보 등 불쾌함을 주는 후기 \n - 비방/비바/차별 발언, 모욕, 명예훼손 등 인격권을 침해하는 후기 \n - 비방적, 악의적 고의로 판단되는 후기 \n - 기타 관련 법령, 이용약관, 운영정책을 위반하는 후기"

const WriteReview = ({ router }) => {
	const { id, name, category } = router.query
	const [text, setText] = useState(PLACEHOLDER)
	const [place, setPlace] = useState(true)
	const [point, setPoint] = useState({
		name: "zero",
		value: 0,
	})

	const getUrl = category => {
		if (category === "13") {
			return "hpt/setHptUserReview"
		} else if (category === "14") {
			return "silver/setSilverUserReview"
		} else {
			return "ltc/setLtcUserReview"
		}
	}

	const URL = getUrl(category)

	const limitText = useCallback(
		text => {
			text.length > LIMIT ? setText(text.slice(0, LIMIT)) : setText(text)
		},
		[text],
	)

	const writeReview = () => {
		const data = {
			review_content: text,
			grade: point.value,
			unique_code: id,
			adminPttnCd_categoryId: category || null,
			url: URL,
		}

		nextPost("review/writeReview", data)
			.then(res => {
				if (res.data === 1) {
					router.replace({
						pathname: "/search/review/[reviewId]",
						query: {
							reviewId: id,
							name,
							category,
						},
					})
				}
			})
			.catch(() => {
				return
			})
	}

	useEffect(() => {
		if (!place) {
			setText("")
		}
	}, [place])

	return (
		<>
			<NextSeo title={TITLE} description={DESC} noindex={true} />

			<WithAuth router={router} high={true}>
				<PageHeader title={name} type={true} review={true} router={router} />
				<div className={style.write_wrap}>
					<div className={style.star_point_wrap}>
						<div className={style.point_wrap}>
							<div className={style.point_box}>
								<ul className={`${style.number_position} ${style[point.name]}`}>
									<li>5</li>
									<li>4</li>
									<li>3</li>
									<li>2</li>
									<li>1</li>
									<li className={style.zero}>-</li>
								</ul>
							</div>
							<div className={style.rating}>
								{point.name === "zero" && <span className="none">별점</span>}
								{point.name === "one" && <span>안 좋았어요</span>}
								{point.name === "two" && <span>별로예요</span>}
								{point.name === "three" && <span>좋았어요</span>}
								{point.name === "four" && <span>너무 좋았어요</span>}
								{point.name === "five" && <span>최고였어요</span>}
							</div>
						</div>

						<div className={style.star_point_box}>
							{starPoint.map(list => (
								<StarButton
									key={list.value}
									value={list.value}
									name={list.name}
									setPoint={setPoint}
								/>
							))}
						</div>
					</div>

					<div className={style.text_wrap}>
						<p className={style.label}>
							후기를 작성해 주세요 ({text.length} / {LIMIT})
						</p>
						<textarea
							className={`${style.textarea} ${place ? style.placeholder : ""}`}
							value={text}
							onChange={e => limitText(e.target.value)}
							onClick={() => setPlace(false)}
						></textarea>
						<button
							className={style.write_btn}
							onClick={writeReview}
							disabled={point.name === "zero" || text.length === 0}
						>
							후기 등록
						</button>
					</div>
				</div>
			</WithAuth>
		</>
	)
}

export default WriteReview
