import Stars from "components/list/components/Stars"
import style from "styles/components/detail.module.scss"

const Basis = ({ name, address, review, scale, est, category, code, kindCd }) => {
	const silverKind = kindCd => {
		switch (kindCd) {
			case 1:
				return "전원형"
			case 2:
				return "근교형"
			case 3:
				return "도심형"
		}
	}

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
				<div className={style.box}>
					<p className={style.label}>규모</p>
					<p className={style.info}>
						<span>{scale}</span>
					</p>
				</div>
				<div className={style.box}>
					<p className={style.label}>타입</p>
					<p className={style.info}>
						<span>{silverKind(kindCd)}</span>
					</p>
				</div>
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
