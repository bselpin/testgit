import { useState, useEffect } from "react"
import { NextSeo } from "next-seo"
import { Swiper, SwiperSlide } from "swiper/react"
import DetailHeader from "components/layout/DetailHeader"
import ImageContainer from "components/detail/ImageContainer"
import PriceNurse from "components/detail/PriceNurse"
import PriceShort from "components/detail/PriceShort"
import PriceProtect from "components/detail/PriceProtect"
import PriceVisit from "components/detail/PriceVisit"
import People from "components/detail/People"
import Grade from "components/detail/Grade"
import Worker from "components/detail/Worker"
import Facility from "components/detail/Facility"
import Program from "components/detail/Program"
import OperationLtc from "components/detail/OperationLtc"
import BasisLtc from "components/detail/BasisLtc"
import ButtonContainer from "components/detail/ButtonContainer"
import CallModal from "components/detail/CallModal"
import Panorama from "components/ui/Panorama"
import Map from "components/detail/Map"
import { calcYear, isMobile } from "lib/utils/listCommon"
import style from "styles/components/detail.module.scss"

const TYPE = 1

const Ltc = ({ data, router }) => {
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
		ltc_insttseachlists,
		panoramas,
		reviews,
		wlfaretools,
		interviews,
		contents,
		conventions,
		nonpayment,
		common_ltc_protect_prices,
		qnaCnt,
	} = data

	console.log(data)

	const {
		adminNm: name,
		assessGrade: grade,
		payments,
		programs,
		maNowPer: nowMale,
		maRsvPer: pendingMale,
		fmNowPer: nowFemale,
		fmRsvPer: pendingFemale,
		scale,
		sum_maNow_fmNow: elders,
		telno,
		totPer: total,
		roadRunner: address,
		roadRunnerForKako: addressKakao,
		stpRptDt,
		envSafe,
		envSafePt,
		insttOper,
		insttOperPt,
		payProvdProc,
		payProvdProcPt,
		payProvdResult,
		payProvdResultPt,
		rightDuty,
		rightDutyPt,
		nur,
		nurArticle,
		chargeDoc,
		sum_recuProt_1_recuProt_2: recu,
		batRoom,
		crmnyPrst,
		funcTrnRoomreal,
		medRoomreal,
		ofce,
		pgmRoomreal,
		spcAcupRoomreal,
		taxPageLong,
		taxRoom,
		rsltRegYear,
	} = ltc_insttseachlists

	const facilityObj = {
		batRoom,
		crmnyPrst,
		funcTrnRoomreal,
		medRoomreal,
		ofce,
		pgmRoomreal,
		spcAcupRoomreal,
		taxPageLong,
		taxRoom,
	}

	const isProgram = programs.every(list => list.length !== 0)

	const isFacility = Object.values(facilityObj).every(x => x === null || x === "0")

	const deleteGae = level => (level ? level.replace("개", "") >> 0 : null)

	const isVisit = category === "5" || category === "6" || category === "7"

	const gradeGroup = [
		{
			name: "시설 운영",
			point: insttOperPt,
			grade: deleteGae(insttOper),
			single: true,
		},
		{
			name: "환경 및 안전",
			point: envSafePt,
			grade: deleteGae(envSafe),
			single: true,
		},
		{
			name: "어르신 인권보장",
			point: rightDutyPt,
			grade: deleteGae(rightDuty),
			single: false,
		},
		{
			name: "서비스 제공과정",
			point: payProvdProcPt,
			grade: deleteGae(payProvdProc),
			single: false,
		},
		{
			name: "서비스 제공결과",
			point: payProvdResultPt,
			grade: deleteGae(payProvdResult),
			single: false,
		},
	]

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
					process.env.NEXT_PUBLIC_BASE_URL + "/search/care/11165000098?category=1"
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

			<div
				className={
					generalimages ? style.detail_main : `${style.detail_main} ${style.no_image}`
				}
			>
				{generalimages ? <ImageContainer image={generalimages} name={name} /> : null}

				<BasisLtc
					review={reviews}
					scale={scale}
					grade={grade}
					total={total}
					name={name}
					elders={elders}
					address={address}
					est={calcYear(stpRptDt)}
					code={code}
					category={category}
				/>

				{panoramas && panoramas.length > 0 && (
					<div className={style.panorama_box}>
						<div className={style.title_box}>
							<p className={style.icon}></p>
							<p className={style.title}>360파노라마로 시설을 방문해보세요</p>
						</div>
						<Panorama img={curPanorma} id={"test"} mobile={mobile} />
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
					{grade !== "신설기관" ? (
						<Grade grade={grade} gradeGroup={gradeGroup} year={rsltRegYear} />
					) : null}

					{/* 요양원, 공동생활 */}
					{category === "1" || category === "2" ? (
						<PriceNurse payment={payments} nonpayment={nonpayment} />
					) : null}

					{/* 주야간보호 */}
					{category === "3" ? (
						<PriceProtect payment={common_ltc_protect_prices} nonpayment={nonpayment} />
					) : null}
					{/* 단기보호 */}
					{category === "4" ? (
						<PriceShort payment={payments} nonpayment={nonpayment} />
					) : null}

					{/* 방문시설 */}
					{isVisit ? <PriceVisit payment={payments} category={category} /> : null}
					{total >> 0 !== 0 && category !== "11" ? (
						!isVisit ? (
							<People
								total={total}
								pendingFemale={pendingFemale}
								pendingMale={pendingMale}
								nowFemale={nowFemale}
								nowMale={nowMale}
							/>
						) : null
					) : null}
					{recu || nur || nurArticle || chargeDoc ? (
						category !== "11" ? (
							<Worker worker={ltc_insttseachlists} isVisit={isVisit} />
						) : null
					) : null}
					{!isFacility && category !== "11" ? (
						<Facility facility={ltc_insttseachlists} />
					) : null}
					{isProgram && category !== "11" ? <Program program={programs} /> : null}
					{/* <OperationLtc /> */}
					{address ? (
						<Map xpos={null} ypos={null} name={name} address={addressKakao} />
					) : null}
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
					type={TYPE}
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

export default Ltc
