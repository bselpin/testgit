import style from "styles/components/list.module.scss"

const CntHpt = ({ totalBed }) => {
	return (
		<div className={style.bed}>
			<span>병상수</span>
			<span className={style.bed_cnt}>{totalBed}</span>
		</div>
	)
}

export default CntHpt
