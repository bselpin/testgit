import Link from "next/link"
import { ltcGradeColor } from "lib/utils/listCommon"
import { savePos } from "lib/utils/scroll"
import TitleComp from "components/list/components/TitleComp"
import Grade from "components/list/components/Grade"
import Worker from "components/list/components/Worker"
import ListImage from "components/list/components/ListImage"
import Count from "components/list/components/Count"
import Establish from "components/list/components/Establish"
import style from "styles/components/list.module.scss"

const LtcCard = ({ list, router, flex }) => {
	const { categoryId: category } = router.query
	// const [target, setTarget] = useState(null)
	// const [visible, setVisible] = useState(true)

	const {
		longTermAdminSym,
		adminNm,
		address,
		reviews: review,
		ltc_general_images,
		assessGrade,
		stpRptDt,
		recuProt,
		sum_maNow_fmNow,
		totPer,
		scale,
		pendings,
		consulting_count,
		isPanorama,
		adminPttnCd,
	} = list

	const grade = assessGrade || null
	const color = ltcGradeColor(grade)

	const mainImg = ltc_general_images || `/img/search_default/${category}.jpg`

	const isPending = totPer && sum_maNow_fmNow && totPer >> 0 > sum_maNow_fmNow >> 0

	// const averagePerson = avg ? +avg.toFixed(1) : null

	// const onIntersect = ([entry]) => {
	// 	if (entry.isIntersecting) {
	// 		setVisible(true)
	// 	} else {
	// 		setVisible(false)
	// 	}
	// }

	// useEffect(() => {
	// 	let observer
	// 	if (target) {
	// 		observer = new IntersectionObserver(onIntersect, { threshold: 0.3 })
	// 		observer.observe(target)
	// 	}
	// 	return () => observer && observer.disconnect()
	// }, [target])

	const isDimentia = category === "8" || category === "9" || category === "10"

	return (
		<>
			<Link
				href={`/search/care/${longTermAdminSym}?category=${category}${
					isDimentia ? `&adminPttnCd=${adminPttnCd}` : ""
				}`}
			>
				<a
					className={`${style.search_card} ${!flex && style.no_flex}`}
					onClick={() => savePos("search")}
				>
					<ListImage mainImg={mainImg} name={adminNm} />
					<div className={style.card_header}>
						<TitleComp
							name={adminNm}
							address={address}
							review={review}
							consultingCnt={consulting_count}
							isPanorama={isPanorama}
						/>
						<div className={style.info_box_wrap}>
							<div className={style.info_box}>
								{grade && !isDimentia ? <Grade color={color} grade={grade} /> : null}
								{recuProt && category !== "11" ? (
									<Worker worker={recuProt} scale={scale} />
								) : null}
								{totPer && sum_maNow_fmNow ? (
									<Count
										count={sum_maNow_fmNow}
										total={totPer}
										isPending={isPending}
										pendings={pendings}
									/>
								) : null}
								{stpRptDt ? <Establish year={stpRptDt} /> : null}
							</div>
						</div>
					</div>
				</a>
			</Link>
		</>
	)
}

const LtcList = ({ list, router, flex }) => {
	return (
		<>
			{list.map(list => (
				<LtcCard list={list} key={list._id} router={router} flex={flex} />
			))}
		</>
	)
}

export default LtcList
