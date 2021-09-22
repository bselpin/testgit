import { useEffect, useState } from "react"
import { NextSeo } from "next-seo"
import Cookies from "universal-cookie"
import { fetcher } from "lib/utils/api"
import { calcSum, calcPer } from "lib/utils/listCommon"
import DetailHeader from "components/layout/DetailHeader"
import GaugeBox from "components/review/GaugeBox"
import ReviewList from "components/review/ReviewList"
import Star from "components/ui/Star"
import style from "styles/review.module.scss"
import Link from "next/link"

const getUrl = category => {
	if (category === "13") {
		return "hpt/getHptUserReview"
	} else if (category === "14") {
		return "silver/getSilverUserReview"
	} else {
		return "ltc/getLtcUserReview"
	}
}

const ReviewPage = ({ router, data }) => {
	const { reviewId, name, category } = router.query
	const [summary, setSummary] = useState({
		reivewPoint: "",
		avg: 0,
		eachPer: [0, 0, 0, 0, 0],
		starPer: 0,
	})

	const getReview = () => {
		if (data && data.length > 0) {
			const reivewPoint = data.map(list => list.grade)
			const avg = calcSum(reivewPoint) / data.length
			const cnt = data.length
			const eachPer = [
				calcPer(reivewPoint.filter(grade => grade === 1).length, cnt),
				calcPer(reivewPoint.filter(grade => grade === 2).length, cnt),
				calcPer(reivewPoint.filter(grade => grade === 3).length, cnt),
				calcPer(reivewPoint.filter(grade => grade === 4).length, cnt),
				calcPer(reivewPoint.filter(grade => grade === 5).length, cnt),
			]
			const starPer = calcPer(avg, 5)
			setSummary({ reivewPoint, avg, eachPer, starPer })
		}
	}

	useEffect(() => {
		getReview()
	}, [])

	return (
		<>
			<NextSeo
				title={`${name} 후기 | ${process.env.NEXT_PUBLIC_SLOGAN}`}
				description={`${name} 후기목록 입니다.`}
				openGraph={{
					url: process.env.NEXT_PUBLIC_BASE_URL + router.asPath,
					title: `${name} 후기 | ${process.env.NEXT_PUBLIC_SLOGAN}`,
					description: `${name} 후기목록 입니다.`,
					images: [
						{
							url: process.env.NEXT_PUBLIC_DEFAULT_IMG,
						},
					],
				}}
			/>

			<DetailHeader name={name} router={router} />

			<div className={style.review_wrap}>
				<div className={style.summary_box}>
					<div className={style.star_wrap}>
						<p className={style.point}>
							{data && data.length > 0 ? summary.avg.toFixed(1) : "-"}
						</p>
						<div className={style.star_box}>
							<Star style={style} percent={summary.starPer} />
						</div>
					</div>
					<div className={style.gauge_wrap}>
						{summary.eachPer.map((per, index) => (
							<GaugeBox per={per} index={index} key={index} />
						))}
					</div>
				</div>
				<div className={style.review_list_wrap}>
					{data && data.length > 0 ? (
						data.map((review, index) => <ReviewList review={review} key={index} />)
					) : (
						<div className={style.no_review_box}>
							<p>아직 등록된 후기가 없어요</p>
						</div>
					)}
				</div>
			</div>

			<div className={style.review_write_wrap}>
				<div className="outer_wrap flex jcc aic">
					<p className={style.info}>직접 이용해 보셨나요? 후기를 남겨주세요 😊</p>
					<Link
						href={`/search/review/write?id=${reviewId}&name=${name}&category=${category}`}
						replace
					>
						<a className={style.write_btn}>후기 남기기</a>
					</Link>
				</div>
			</div>
		</>
	)
}

export async function getServerSideProps({ req, query }) {
	const cookies = new Cookies(req.headers.cookie)
	const { reviewId, category } = query
	const URL = getUrl(category)
	const user = cookies.get("U_DA")

	const params = {
		unique_code: reviewId,
		member_id: user && user.member_id.length > 0 ? user.member_id : null,
	}
	const data = await fetcher(URL, { params })

	return { props: { data } }
}

export default ReviewPage
