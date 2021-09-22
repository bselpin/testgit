import { useEffect, useState, useCallback } from "react"
import { NextSeo } from "next-seo"
import { fetcher } from "lib/utils/api"
import { addCommas } from "lib/utils/listCommon"
import { timeForToday } from "lib/utils/time"
import DetailHeader from "components/layout/DetailHeader"
import Nav from "components/layout/Nav"
import AnswerCard from "components/case/AnswerCard"
import style from "styles/case.module.scss"

const CaseDetail = ({ data, router }) => {
	const [showShare, setShowShare] = useState(false)
	const { type } = router.query
	const closeShare = useCallback(() => setShowShare(false), [showShare])
	const toggleShare = useCallback(() => setShowShare(!showShare), [showShare])

	const { accessCount, answers, contents, subject, createdate } = data

	const share = {
		showShare,
		toggleShare,
	}

	useEffect(() => {
		if (typeof window !== "undefined") {
			window.addEventListener("click", closeShare)
		}
		return () => window.removeEventListener("click", closeShare)
	}, [])

	const meta = {
		title: `${subject} | 또가 상담사례`,
		description: contents,
		canonical: process.env.NEXT_PUBLIC_BASE_URL + "/case/60bdb9a0ca1dac62afcc0d1c",
		url: process.env.NEXT_PUBLIC_BASE_URL + router.asPath,
		img: process.env.NEXT_PUBLIC_BASE_URL + "/img/case.jpg",
	}

	const fromApp = type === "app"

	return (
		<>
			<NextSeo
				title={meta.title}
				description={meta.description}
				canonical={meta.canonical}
				openGraph={{
					url: process.env.NEXT_PUBLIC_BASE_URL + router.asPath,
					title: meta.title,
					description: meta.description,
					images: [
						{
							url: meta.img,
						},
					],
				}}
			/>
			{!fromApp && (
				<DetailHeader name={"상담사례"} share={share} meta={meta} router={router} />
			)}

			<div className={`outer_wrap ${style.detail_wrap} ${fromApp ? style.from_app : ""}`}>
				<div className={style.detail_summary}>
					<p className={style.title}>{subject}</p>
					<p className={style.summary_info}>
						조회수 <span>{addCommas(accessCount)}</span>
						<span className={style.divider}>•</span>
						<span className={style.info}>{timeForToday(createdate)} 상담</span>
					</p>
				</div>
				<div className={style.detail_question}>{contents}</div>
			</div>

			<div className={style.detail_answer}>
				<div className="outer_wrap">
					<p className={style.answer_cnt}>{answers.length}개의 답변이 있습니다</p>
					{answers.map((list, index) => (
						<AnswerCard answer={list} key={index} />
					))}
				</div>
			</div>

			{!fromApp && <Nav />}
		</>
	)
}

export async function getServerSideProps({ query }) {
	const { caseId } = query

	try {
		const data = await fetcher(`/qna/detail/${caseId}`, {
			timeout: parseInt(process.env.REQUEST_TIMEOUT),
		})

		return { props: { data } }
	} catch (error) {
		return {
			redirect: {
				permanent: true,
				destination: `/404?type=case&id=${caseId}`,
			},
			props: {},
		}
	}
}

export default CaseDetail
