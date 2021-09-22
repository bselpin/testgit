import { useState, useCallback, useEffect } from "react"
import { NextSeo } from "next-seo"
// import Link from "next/link"
// import { useCookies } from "react-cookie"
// import { option } from "lib/utils/cookie"
import Header from "components/layout/Header"
import Footer from "components/layout/Footer"
import Nav from "components/layout/Nav"
import Category from "components/ui/Category"
import CounselBtn from "components/ui/CounselBtn"
import CareIntroduce from "components/ui/CareIntroduce"
import { fetcher } from "lib/utils/api"
import useScroll from "lib/hooks/useScroll"
import style from "styles/home.module.scss"

const TITLE = `요양상담이 필요한 순간 | ${process.env.NEXT_PUBLIC_SITE_NAME}`
const DESC =
	"요양정보(노인장기요양보험,노인장기요양등급) 조회, 요양시설(요양원,주간보호센터,방문요양) 찾기, 요양관련 상담사례 제공, 전국 요양시설 무료 온라인 상담 및 전화 상담"

export default function Home({ data, router }) {
	const scroll = useScroll()
	const [showIntro, setShowIntro] = useState(false)
	const toggleIntro = useCallback(() => setShowIntro(!showIntro), [showIntro])
	const { arr_ltc_adminpttncds_categorys: category } = data
	// const [showPopup, setShowPopup] = useState(false)

	// const [cookie, setCookie] = useCookies(["_e_e"])

	// const neverPopup = () => {
	// 	setCookie("_e_e", true, option)
	// 	setShowPopup(false)
	// }

	// useEffect(() => {
	// 	if (typeof window !== "undefined") {
	// 		const eventCookie = cookie._e_e

	// 		if (eventCookie !== "true") {
	// 			setTimeout(() => {
	// 				setShowPopup(true)
	// 			}, 300)
	// 		}
	// 	}
	// }, [cookie])

	return (
		<>
			<NextSeo
				title={TITLE}
				description={DESC}
				canonical={process.env.NEXT_PUBLIC_BASE_URL}
				openGraph={{
					url: process.env.NEXT_PUBLIC_BASE_URL,
					title: TITLE,
					description: DESC,
					images: [
						{
							url: process.env.NEXT_PUBLIC_DEFAULT_IMG,
						},
					],
				}}
			/>

			<Header scroll={scroll} />

			<div className="home_wrap">
				<div className="inner_wrap">
					<div className={style.search_wrap}>
						<div className={style.praise}>
							<strong className={style.strong}>요양상담</strong>이 필요한 순간
						</div>
						<div className={style.category_info}>
							<p className={style.question} onClick={toggleIntro}>
								어떤 요양시설을 찾아야 되나요 ❔
							</p>
							<div className={style.main_character} onClick={toggleIntro}></div>
						</div>
					</div>

					<Category category={category} router={router} />

					<CounselBtn />
				</div>

				{showIntro ? <CareIntroduce toggleIntro={toggleIntro} /> : null}

				<Footer />

				<Nav />
			</div>

			{/* <div
				className={showPopup ? `${style.event_popup} ${style.active}` : style.event_popup}
			>
				<div className="outer_wrap">
					<div className={style.event_wrap}>
						<div className={style.event_box}>
							<div className={style.util}>
								<span onClick={() => neverPopup()}>오늘 하루 보지 않기</span>
								<span
									className={style.close_btn}
									onClick={() => setShowPopup(false)}
								></span>
							</div>
							<div className={style.event_link}>
								<div className={style.moon}></div>
								<h2 className={style.title}>
									<p className={style.yellow}>
										<strong>요양시설 상담</strong> 및 <br />
										<strong>고객센터 휴무 안내</strong>
									</p>
								</h2>
								<div className={style.info_box}>
									<span className={style.event_label}>추석연휴</span>
									<span className={style.date}>
										<strong>9월 17일</strong>(토) ~ <strong>9월 22일</strong>(수)
									</span>
								</div>
								<div className={style.info_box}>
									<span className={style.event_label}>정상운영</span>
									<span className={style.date}>
										<strong>9월 23일</strong>(목)
									</span>
								</div>
								<p className={style.link}>
									추석연휴 내 문의사항은 카카오톡 채널 <br />{" "}
									<strong>@또하나의가족</strong>에 남겨주시면 순차적으로 답변드리겠습니다
								</p>
							</div>
						</div>
					</div>
				</div>
			</div> */}
		</>
	)
}

export async function getServerSideProps() {
	const redirection = {
		redirect: {
			permanent: true,
			destination: "/_error?code=main",
		},
		props: {},
	}

	try {
		const data = await fetcher("/")

		if (data) {
			return { props: { data } }
		} else {
			return redirection
		}
	} catch (error) {
		console.error(error)
		return redirection
	}
}
