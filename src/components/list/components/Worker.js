import style from "styles/components/list.module.scss"

const Worker = ({ worker, scale }) => {
	return (
		<div className={style.detail_box}>
			<p className={style.label}>요양보호사</p>
			<p className={style.info}>{worker} 명</p>
			<p className={style.sub_info}>{scale}</p>
		</div>
	)
}

export default Worker
