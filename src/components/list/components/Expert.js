import style from "styles/components/list.module.scss"

const ExpertIcon = ({ className, name }) => (
	<div className={style.subject_list}>
		<p className={`${style.subject_icon} ${style[className]}`}></p>
		<p className={style.label}>{name}</p>
	</div>
)

const Expert = ({ expert }) => {
	return (
		<div className={style.subject_detail}>
			<p className={style.label}>전문과목</p>
			<div className={style.subject_box}>
				{expert.map((list, index) => (
					<ExpertIcon
						className={list.className}
						name={list.dgsbjtCdNm}
						key={list._id}
					/>
				))}
			</div>
		</div>
	)
}

export default Expert
