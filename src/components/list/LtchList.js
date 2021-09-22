import Link from "next/link"
import { gradeColor, ltcGradeColor, getCategoryType } from "lib/utils/listCommon"
import { savePos } from "lib/utils/scroll"
import TitleComp from "components/list/components/TitleComp"
import Grade from "components/list/components/Grade"
import Bed from "components/list/components/Bed"
import Doctor from "components/list/components/Doctor"
import Worker from "components/list/components/Worker"
import Count from "components/list/components/Count"
import Establish from "components/list/components/Establish"
import ListImage from "components/list/components/ListImage"
import style from "styles/components/list.module.scss"

const LtchList = ({ list, flex }) => {
	const {
		addr,
		asmGrd,
		asmGrdColor,
		ltchName,
		ltchId,
		pttnCd,
		drCnt,
		sdrCnt,
		imgUrl,
		cateId,
		inCnt,
		recuprot,
		silverType,
		totCnt,
		waitCnt,
		reviewAvg,
		reviewCnt,
		reviewPer,
		bedCnt,
		scale,
		estbDate,
		counselCnt,
		isPanorama,
	} = list

	const review = {
		reviewAvg,
		reviewCnt,
		reviewPer,
	}

	const color = asmGrd && cateId === "13" ? gradeColor(asmGrd) : ltcGradeColor(asmGrd)

	const mainImg = imgUrl || `/img/search_default/${cateId}.jpg`

	const isPending = totCnt && inCnt && totCnt > inCnt
	const isDimentia = cateId === "8" || cateId === "9" || cateId === "10"
	const isSilver = cateId === "14"

	const silverKind = silverType => {
		switch (silverType) {
			case 1:
				return "전원형"
			case 2:
				return "근교형"
			case 3:
				return "도심형"
		}
	}

	const pagaName = getCategoryType(cateId)

	return (
		<>
			<Link href={`/search/${pagaName}/${ltchId}?category=${cateId}&pttnCd=${pttnCd}`}>
				<a
					className={`${style.search_card} ${!flex && style.no_flex}`}
					onClick={() => savePos("search")}
				>
					<ListImage mainImg={mainImg} name={ltchName} />
					<div className={style.card_header}>
						<TitleComp
							ltchName={ltchName}
							address={addr}
							review={review}
							counselCnt={counselCnt}
							isPanorama={isPanorama}
							flex={flex}
						/>

						<div className={style.info_box_wrap}>
							<div className={style.info_box}>
								{asmGrd && !isDimentia ? <Grade color={color} asmGrd={asmGrd} /> : null}
								{recuprot && cateId !== "11" ? (
									<Worker worker={recuprot} scale={scale} />
								) : null}
								{drCnt ? <Doctor drCnt={drCnt} sdrCnt={sdrCnt} /> : null}
								{bedCnt !== 0 ? <Bed bedCnt={bedCnt} scale={scale} /> : null}
								{totCnt && inCnt ? (
									<Count
										count={inCnt}
										total={totCnt}
										isPending={isPending}
										pendings={waitCnt}
									/>
								) : null}
								{isSilver && (
									<>
										<div className={`${style.detail_box} ${style.large}`}>
											<p className={style.label}>타입</p>
											<p className={style.info}>{silverKind(silverType)}</p>
										</div>
										<div className={`${style.detail_box} ${style.large}`}>
											<p className={style.label}>규모</p>
											<p className={style.info}>{scale}</p>
										</div>
									</>
								)}
								{estbDate ? <Establish year={estbDate} /> : null}
							</div>
						</div>
					</div>
				</a>
			</Link>
		</>
	)
}

export default LtchList
