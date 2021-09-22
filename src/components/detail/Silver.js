import { useState, useEffect } from "react"
import { NextSeo } from "next-seo"
import { Swiper, SwiperSlide } from "swiper/react"
import DetailHeader from "components/layout/DetailHeader"
import ImageContainer from "components/detail/ImageContainer"
import BasisSilver from "components/detail/BasisSilver"
import ButtonContainer from "components/detail/ButtonContainer"
import SilverContent from "components/detail/SilverContent"
import Panorama from "components/ui/Panorama"
import Map from "components/detail/Map"
import { calcYear, isMobile } from "lib/utils/listCommon"
import CallModal from "components/detail/CallModal"
import style from "styles/components/detail.module.scss"

const Silver = ({ data, router }) => {
	const [mobile, setMobile] = useState(true)
	const [curPanorma, setCurPanorama] = useState("")
	const [callModal, setCallModal] = useState(false)
	const { category, silverId: code, type, pttnCd } = router.query

	const fromApp = type === "app"

	const { generalimages, silver_totallists, panoramas, reviews, qnaCnt } = data

	const {
		adminNm: name,
		scale,
		telno,
		silver_facility,
		silver_guide,
		silver_introduce,
		silver_work,
		addr: address,
		estbDd: est,
		kindCd,
	} = silver_totallists

	useEffect(() => {
		if (typeof window !== "undefined") {
			setMobile(isMobile())
		}
	}, [])

	useEffect(() => {
		if (panoramas && panoramas.length > 0) {
			setCurPanorama(panoramas[0].panoramas_filepath_cdn)
		}
	}, [data])

	return (
		<>
			<NextSeo
				title={`${name} | ${process.env.NEXT_PUBLIC_SITE_NAME}`}
				description={`${name} | ${address} | ${telno}`}
				canonical={
					process.env.NEXT_PUBLIC_BASE_URL +
					"/search/silver/60b0a9a9f55963832c65ff71?category=14"
				}
				openGraph={{
					url: process.env.NEXT_PUBLIC_BASE_URL + router.asPath,
					title: `${name} | ${process.env.NEXT_PUBLIC_SITE_NAME}`,
					description: `${name} | ${address} | ${telno}`,
					images: [
						{
							url: generalimages ? generalimages[0] : process.env.NEXT_PUBLIC_DEFAULT_IMG,
						},
					],
				}}
			/>

			{!fromApp && (
				<DetailHeader
					name={name}
					router={router}
					code={code}
					category={category}
					reviewCount={reviews ? reviews.review_count : 0}
					caseCount={qnaCnt}
				/>
			)}

			<div className={style.detail_main}>
				{generalimages ? <ImageContainer image={generalimages} name={name} /> : null}

				<BasisSilver
					review={reviews}
					scale={scale}
					name={name}
					address={address}
					est={calcYear(est)}
					kindCd={kindCd}
				/>

				{panoramas && panoramas.length > 0 && (
					<div className={style.panorama_box}>
						<div className={style.title_box}>
							<p className={style.icon}></p>
							<p className={style.title}>360파노라마로 시설을 방문해보세요</p>
						</div>
						<Panorama img={curPanorma} id={name} mobile={mobile} />
						<Swiper
							slidesPerView={mobile ? 4.5 : 7.5}
							spaceBetween={mobile ? 12 : 18}
							className={style.swiper_box}
						>
							{panoramas.map((list, index) => (
								<SwiperSlide key={index} className={style.slide_box}>
									<img
										src={list.thumbnail_filepath_cdn}
										alt={name}
										onClick={() =>
											setCurPanorama(panoramas[index].panoramas_filepath_cdn)
										}
									/>
								</SwiperSlide>
							))}
						</Swiper>
					</div>
				)}

				<div className={style.detail_wrap}>
					{silver_introduce && (
						<SilverContent title={"소개글"} content={silver_introduce} intro={true} />
					)}

					{silver_guide && <SilverContent title={"입주 안내"} content={silver_guide} />}

					{silver_work && <SilverContent title={"인력 현황"} content={silver_work} />}

					{silver_facility && (
						<SilverContent title={"시설 현황"} content={silver_facility} />
					)}

					{/* <OperationLtc /> */}

					{address ? <Map xpos={null} ypos={null} name={name} address={address} /> : null}
				</div>

				{callModal && (
					<CallModal
						code={code}
						name={name}
						telno={telno}
						category={category}
						setCallModal={setCallModal}
					/>
				)}

				<ButtonContainer
					code={code}
					name={name}
					telno={telno}
					pttnCd={pttnCd}
					category={category}
					setCallModal={setCallModal}
				/>
			</div>
		</>
	)
}

export default Silver
