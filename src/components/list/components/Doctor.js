import style from "styles/components/list.module.scss"

const Doctor = ({ drCnt, sdrCnt }) => {
	return (
		<div className={style.detail_box}>
			<p className={style.label}>의사</p>
			<p className={style.info}>{drCnt} 명</p>
			<p className={style.sub_info}>전문의 {sdrCnt} 명</p>
		</div>
	)
}

export default Doctor
