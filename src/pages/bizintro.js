import { NextSeo } from "next-seo"
import { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import Link from "next/link"
import { fetcher } from "lib/utils/api"
import { isMobile } from "lib/utils/listCommon"
import PageHeader from "components/layout/PageHeader"
import Panorama from "components/ui/Panorama"
import style from "styles/bizintro.module.scss"
import pStyle from "styles/components/detail.module.scss"

const TITLE = `무료 파노라마 신청 | ${process.env.NEXT_PUBLIC_SLOGAN} | ${process.env.NEXT_PUBLIC_SITE_NAME}`
const DESC =
	"또하나의가족에서는 요양시설의 360도 파노라마 촬영을 진행하여 홍보를 돕고 있습니다. 신청서를 작성하시면, 파노라마 촬영 기사가 유선으로 직접 연락을 드려 촬영 일정을 협의한 후 촬영을 진행합니다."

export const BizIntro = ({ router, data }) => {
	const [curPanorma, setCurPanorama] = useState("")
	const [mobile, setMobile] = useState(true)
	const { panoramas } = data

	useEffect(() => {
		if (typeof window !== "undefined") {
			setMobile(isMobile())
		}
	}, [])

	useEffect(() => {
		if (panoramas && panoramas.length > 0) {
			setCurPanorama(panoramas[0].panoramas_filepath_cdn)
		}
	}, [panoramas])

	return (
		<>
			<NextSeo
				title={TITLE}
				description={DESC}
				canonical={process.env.NEXT_PUBLIC_BASE_URL + router.asPath}
				openGraph={{
					url: process.env.NEXT_PUBLIC_BASE_URL + router.asPath,
					title: TITLE,
					description: DESC,
					images: [
						{
							url: process.env.NEXT_PUBLIC_DEFAULT_IMG,
						},
					],
				}}
			/>

			<PageHeader title={"무료 파노라마 신청"} router={router} noBtn={true} />

			<div className={style.bizintro_wrap}>
				<div className={style.intro_box}>
					<p className={style.panorama_icon}></p>
					<p className={style.title}>360도 파노라마 촬영 신청 안내</p>
					<p className={style.praise}>
						2021년 12월 31일까지 <strong className={style.free}>무료</strong>
					</p>
					<p className={style.text}>
						또하나의가족에서는 요양시설의 360도 파노라마 촬영을 진행하여 홍보를 돕고
						있습니다
					</p>
				</div>

				<Link href="/search/care/14119001196?category=1">
					<a className={style.name}>
						<span>
							<strong>하랑실버빌리지 </strong>의 파노라마 샘플{" "}
						</span>

						<span className={style.go}>바로가기{" >"}</span>
					</a>
				</Link>

				<div className={style.panorama_wrap}>
					<div className={style.panorama_label}>360도 파노라마 샘플</div>
					{panoramas && panoramas.length > 0 && (
						<div className={pStyle.panorama_box}>
							<Panorama img={curPanorma} id={"test"} mobile={mobile} />
							<Swiper
								slidesPerView={mobile ? 4.5 : 7.5}
								spaceBetween={mobile ? 12 : 18}
								className={pStyle.swiper_box}
							>
								{panoramas.map((list, index) => (
									<SwiperSlide key={index} className={pStyle.slide_box}>
										<img
											src={list.thumbnail_filepath_cdn}
											alt={"하랑실버 빌리지 파노라마"}
											onClick={() =>
												setCurPanorama(panoramas[index].panoramas_filepath_cdn)
											}
										/>
									</SwiperSlide>
								))}
							</Swiper>
						</div>
					)}

					<div className={style.submit_box}>
						<p className={style.info}>
							신청서를 작성하시면, 파노라마 촬영 기사가 유선으로 직접 연락을 드려 촬영
							일정을 협의한 후 촬영을 진행합니다
						</p>
						<a
							href="http://naver.me/F9Qeqrx4"
							target="_blank"
							rel="noopener noreferrer"
							className={style.link}
						>
							신청서 작성하기 {" >"}
						</a>
					</div>
				</div>
			</div>
		</>
	)
}

export async function getServerSideProps() {
	const data = await fetcher(`/ltc/detail/14119001196?category=1`)

	return { props: { data: data } }
}

export default BizIntro
