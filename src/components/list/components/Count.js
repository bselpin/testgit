import style from "styles/components/list.module.scss"

const Count = ({ count, total, isPending, pendings }) => {
	return (
		<div className={`${style.detail_box} ${style.large}`}>
			<p className={style.label}>입소 어르신</p>
			<p className={isPending ? `${style.info} ${style.color}` : style.info}>
				{count} / {total} 명
			</p>
			{pendings > 0 && <p className={style.sub_info}>입소대기 {pendings} 명</p>}
		</div>
	)
}

export default Count
