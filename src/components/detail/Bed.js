import { memo } from "react"
import style from "styles/components/detail.module.scss"

const BedIcon = ({ type }) => (
	<p className={`${style.bed_icon} ${style[type]}`}></p>
)

const Bed = ({ normalBed, priBed, sum }) => {
	return (
		<div className={style.detail_box}>
			<p className={style.title}>병상 정보</p>
			<div className={style.bed_box}>
				<div className={style.bed_list}>
					<BedIcon type="normal" />
					<p className={style.label}>일반병상</p>
					<p className={style.number}>{normalBed}개</p>
				</div>

				{priBed > 0 ? (
					<div className={style.bed_list}>
						<BedIcon type="pri" />
						<p className={style.label}>상급병상</p>
						<p className={style.number}>{priBed}개</p>
					</div>
				) : null}
			</div>

			<div className={style.res_bed}>
				<p className={style.res}>
					총 병상수 <span>{sum}개</span>
				</p>
			</div>
		</div>
	)
}

export default Bed
