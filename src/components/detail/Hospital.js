import { useState, useEffect } from "react"
import { NextSeo } from "next-seo"
import { Swiper, SwiperSlide } from "swiper/react"
import { LazyLoadImage } from "react-lazy-load-image-component"
import DetailHeader from "components/layout/DetailHeader"
import ImageContainer from "components/detail/ImageContainer"
import ButtonContainer from "components/detail/ButtonContainer"
import BasisHpt from "components/detail/BasisHpt"
import Bed from "components/detail/Bed"
import Price from "components/detail/Price"
import Subject from "components/detail/Subject"
import Doctor from "components/detail/Doctor"
import Operation from "components/detail/Operation"
import Map from "components/detail/Map"
import CallModal from "components/detail/CallModal"
import Panorama from "components/ui/Panorama"
import { calcYear, formatTime, isMobile } from "lib/utils/listCommon"
import style from "styles/components/detail.module.scss"

const Hospital = ({ data, router }) => {
	const [mobile, setMobile] = useState(true)
	const [curPanorma, setCurPanorama] = useState("")
	const [callModal, setCallModal] = useState(false)
	const { code, category, type, pttnCd } = router.query

	const fromApp = type === "app"

	useEffect(() => {
		if (typeof window !== "undefined") {
			setMobile(isMobile())
		}
	}, [])

	const {
		generalimages,
		hospbasis,
		medicalequip,
		nonpayment,
		payments,
		panoramas,
		reviews,
		spc_medical,
		subjec_night: expert,
		subjec_normal: normal,
		qnaCnt,
	} = data

	const {
		yadmNm: name,
		scale,
		asmGrd,
		sumSickbdCnt,
		drTotCnt,
		sdrCnt,
		addr: address,
		estbDd,
		stdSickbdCnt,
		hghrSickbdCnt,
		XPos,
		YPos,
		dntPerSickbd,
		gdrCnt,
		noTrmtHoli,
		noTrmtSun,
		parkEtc,
		parkQty,
		rcvWeek,
		rcvSat,
		trmtMonStart,
		trmtMonEnd,
		trmtTueStart,
		trmtTueEnd,
		trmtWedStart,
		trmtWedEnd,
		trmtThuStart,
		trmtThuEnd,
		trmtFriStart,
		trmtFriEnd,
		lunchWeek,
		telno,
	} = hospbasis

	//나중에 봐야함
	const operationProps = {
		park: parkQty,
		parkInfo: parkEtc,
		holiday: noTrmtHoli,
		sun: noTrmtSun,
		sat: rcvSat,
		monStart: formatTime(trmtMonStart),
		monEnd: formatTime(trmtMonEnd),
		tueStart: formatTime(trmtTueStart),
		tueEnd: formatTime(trmtTueEnd),
		wedStart: formatTime(trmtWedStart),
		wedEnd: formatTime(trmtWedEnd),
		thuStart: formatTime(trmtThuStart),
		thuEnd: formatTime(trmtThuEnd),
		friStart: formatTime(trmtFriStart),
		friEnd: formatTime(trmtFriEnd),
		lunch: lunchWeek,
		oper: rcvWeek,
	}

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
					"/search/hospital/JDQ4MTg4MSM1MSMkMSMkMCMkOTkkNTgxMzUxIzIxIyQyIyQxIyQwMCQyNjE0ODEjNjEjJDEjJDAjJDgz"
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
					reviewCount={reviews ? reviews.review_count : 0}
					caseCount={qnaCnt}
					category={13}
				/>
			)}

			<div
				className={
					generalimages ? style.detail_main : `${style.detail_main} ${style.no_image}`
				}
			>
				{generalimages ? <ImageContainer image={generalimages} name={name} /> : null}
				<BasisHpt
					review={reviews}
					scale={scale}
					grade={asmGrd}
					total={sumSickbdCnt}
					doctor={drTotCnt}
					expert={sdrCnt}
					name={name}
					address={address}
					est={calcYear(estbDd)}
					code={code}
					category={category}
				/>
			</div>

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
								<LazyLoadImage
									src={list.thumbnail_filepath_cdn}
									alt={name}
									onClick={() => setCurPanorama(panoramas[index].panoramas_filepath_cdn)}
								/>
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			)}

			<div className={style.detail_wrap}>
				<Price payment={payments} nonpayment={nonpayment} />
				{drTotCnt << 0 > 0 ? (
					<Doctor
						expert={expert}
						normalCnt={gdrCnt}
						expertCnt={sdrCnt}
						avg={dntPerSickbd}
						cnt={drTotCnt}
					/>
				) : null}
				{normal.length > 0 && expert.length > 0 ? (
					<Subject
						normal={normal}
						expert={expert}
						equip={medicalequip}
						spc={spc_medical}
					/>
				) : null}
				{stdSickbdCnt ? (
					<Bed normalBed={stdSickbdCnt} priBed={hghrSickbdCnt} sum={sumSickbdCnt} />
				) : null}
				{parkQty || trmtMonStart ? <Operation {...operationProps} /> : null}
				{XPos && YPos ? <Map xpos={XPos} ypos={YPos} name={name} /> : null}
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
		</>
	)
}

export default Hospital
