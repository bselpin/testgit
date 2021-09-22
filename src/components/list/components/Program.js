import style from "styles/components/list.module.scss"

const ProgramIcon = ({ className, name }) => (
	<div className={style.subject_list}>
		<p className={`${style.program_icon} ${style[className]}`}></p>
		<p className={style.label}>{name}</p>
	</div>
)

const Program = ({ program }) => {
	return (
		<div className={style.subject_detail}>
			<p className={style.label}>운영 프로그램</p>
			<div className={style.subject_box}>
				{program.map((list, index) => (
					<ProgramIcon
						className={list.className}
						name={list.name}
						key={index}
					/>
				))}
			</div>
		</div>
	)
}

export default Program
