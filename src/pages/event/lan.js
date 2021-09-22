import { useEffect, useState, useCallback } from "react"
import { NextSeo } from "next-seo"
import DetailHeader from "components/layout/DetailHeader"
import style from "styles/event.module.scss"

const EventPage = ({ router }) => {
	const [showShare, setShowShare] = useState(false)
	const closeShare = useCallback(() => setShowShare(false), [showShare])
	const toggleShare = useCallback(() => setShowShare(!showShare), [showShare])

	const share = {
		showShare,
		toggleShare,
	}

	const meta = {
		title: "이벤트 | 랜선안부 이벤트",
		description:
			"또가 2행시로 사랑하는 분께 안부를 남겨주시면, 풍성한 추석선물과 함께 또하나의가족이 전해드릴께요",
		url: `${process.env.NEXT_PUBLIC_BASE_URL}${router.asPath}`,
		img: `${process.env.NEXT_PUBLIC_BASE_URL}/event/lanline_01.jpg`,
	}

	// useEffect(() => {
	// 	router.replace("/")
	// }, [])

	useEffect(() => {
		if (typeof window !== "undefined") {
			window.addEventListener("click", closeShare)
		}
		return () => window.removeEventListener("click", closeShare)
	}, [])

	return (
		<>
			<NextSeo
				title={meta.title}
				description={meta.description}
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

			<DetailHeader name={"랜선안부 이벤트"} meta={meta} router={router} share={share} />

			<div className={style.event_wrap}>
				<div className={style.event_img_box}>
					<img src="/event/lanline_011.jpg" alt="랜선안부 이벤트" />
					<a
						href="http://naver.me/GSi5wHfe"
						target="_blank"
						rel="noopener noreferrer"
						className={`${style.link} ${style.lan}`}
					>
						<span>랜선 안부</span> 이벤트 참여하기
						<span className={style.arrow}>{">"}</span>
					</a>
				</div>
				<div className={style.event_img_box}>
					<img src="/event/lanline_02.jpg" alt="랜선안부 이벤트" />
				</div>
			</div>
		</>
	)
}

export default EventPage
