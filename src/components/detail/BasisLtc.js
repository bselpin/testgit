import Stars from "components/list/components/Stars"
import { ltcGradeColor, getColor } from "lib/utils/listCommon"
import style from "styles/components/detail.module.scss"

const Basis = ({
	name,
	address,
	review,
	grade,
	scale,
	expert,
	elders,
	total,
	est,
	category,
	code,
}) => {
	const isDimentia = category === "8" || category === "9" || category === "10"

	return (
		<div className={style.basis}>
			<p className={style.name}>{name}</p>
			<p className={style.address}>{address}</p>
			{review ? (
				<Stars
					review={review}
					code={code}
					category={category}
					name={name}
					detail={true}
				/>
			) : null}

			<div className={style.info_box}>
				{grade && !isDimentia ? (
					<div className={style.box}>
						<p className={style.label}>평가등급</p>
						<p className={style.info} style={{ color: ltcGradeColor(grade) }}>
							{grade.length > 2 ? <span>{grade}</span> : <span>{`${grade} 등급`}</span>}
						</p>
					</div>
				) : null}

				{total !== "0" &&
				category !== "5" &&
				category !== "6" &&
				category !== "7" &&
				category !== "11" ? (
					<div className={style.box}>
						<p className={style.label}>입소 어르신</p>
						<p className={style.info}>
							<span className={style.total}>
								{elders} / {total}
							</span>
							<span> 명</span>
						</p>
						<p className={style.sub} style={{ color: getColor(scale) }}>
							{scale}
						</p>
						{expert ? <p className={style.sub}>전문의 {expert} 명</p> : null}
					</div>
				) : null}
			</div>

			{est ? (
				<div className={style.est}>
					<span>설립</span>
					<span className={style.date}>{est === 0 ? "올해" : `${est}년`}</span>
				</div>
			) : null}
		</div>
	)
}

export default Basis
