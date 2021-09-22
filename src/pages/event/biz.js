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
		title: "이벤트 | 또가비즈 OPEN 이벤트",
		description:
			"또가비즈 오픈 기념 경품 100% 증정 이벤트 사전 안내, 또가비즈 시설 인증 신청하시면 총 200만원의 경품 증정!",
		url: `${process.env.NEXT_PUBLIC_BASE_URL}${router.asPath}`,
		img: `${process.env.NEXT_PUBLIC_BASE_URL}/event/biz_event.jpg`,
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

			<DetailHeader
				name={"또가비즈 OPEN 이벤트"}
				meta={meta}
				router={router}
				share={share}
			/>

			<div className={style.event_wrap}>
				<div className={style.event_img_box}>
					<img src="/event/biz_event_new.jpg" alt="또가비즈 OPEN 이벤트" />
					<a
						href="https://biz.ddoga.co.kr"
						target="_blank"
						rel="noopener noreferrer"
						className={style.link}
					>
						또가비즈 바로가기
						<span className={style.arrow}>{">"}</span>
					</a>
				</div>
			</div>
		</>
	)
}

export default EventPage
