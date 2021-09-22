import style from "styles/components/list.module.scss"

const Bed = ({ bedCnt, scale }) => {
	return (
		<div className={style.detail_box}>
			<p className={style.label}>병상수</p>
			<p className={style.info}>{bedCnt} 개</p>
			<p className={style.sub_info}>{scale}</p>
		</div>
	)
}

export default Bed
