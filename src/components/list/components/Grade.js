import style from "styles/components/list.module.scss"

const Grade = ({ color, asmGrd }) => {
	return (
		<div className={`${style.detail_box} ${style.medium}`}>
			<p className={style.label}>평가등급</p>
			<p className={style.info} style={{ color: color }}>
				{asmGrd.length > 2 ? asmGrd : `${asmGrd} 등급`}
			</p>
		</div>
	)
}

export default Grade
