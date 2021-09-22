import Stars from "components/list/components/Stars"
import { getColor, gradeColor } from "lib/utils/listCommon"
import style from "styles/components/detail.module.scss"

const Basis = ({
	name,
	address,
	review,
	grade,
	scale,
	total,
	expert,
	doctor,
	est,
	category,
	code,
}) => {
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
				{grade ? (
					<div className={style.box}>
						<p className={style.label}>평가등급</p>
						<p className={style.info} style={{ color: gradeColor(grade) }}>
							{grade.length > 2 ? <span>{grade}</span> : <span>{`${grade} 등급`}</span>}
						</p>
					</div>
				) : null}

				{scale ? (
					<div className={style.box}>
						<p className={style.label}>의사수</p>
						<p className={style.info}>
							<span>{doctor} 명</span>
						</p>
						{expert ? <p className={style.sub}>전문의 {expert} 명</p> : null}
					</div>
				) : null}

				{doctor ? (
					<div className={style.box}>
						<p className={style.label}>병상수</p>
						<p className={style.info}>
							<span>{total} 개</span>
						</p>
						<p className={style.sub} style={{ color: getColor(scale) }}>
							{scale}
						</p>
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
