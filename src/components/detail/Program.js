import { memo } from "react"
import style from "styles/components/detail.module.scss"

const ProgramList = ({ kor, program, className }) =>
	program.length > 0 && (
		<div className={style.program_box}>
			<div className={style.program_icon_box}>
				<p className={`${style.program_icon} ${style[className]}`}></p>
				<p className={style.label}>{kor}</p>
			</div>
			<ul className={style.program_tag_list}>
				{program.map((list, index) => (
					<li className={style.program_tag} key={index}>
						{list.pgmNm}
					</li>
				))}
			</ul>
		</div>
	)

const Program = ({ program }) => {
	const recognition = program[0]
	const exercise = program[1]
	const other = program[2]

	return (
		<div className={style.detail_box}>
			<p className={style.title}>프로그램</p>
			<div className={style.detail_info_box}>
				<ProgramList
					kor={"인지기능 향상"}
					className={"recognition"}
					program={recognition}
				/>

				<ProgramList
					kor={"운동 보조"}
					className={"exercise"}
					program={exercise}
				/>

				<ProgramList
					kor={"기타 프로그램"}
					className={"other"}
					program={other}
				/>
			</div>
		</div>
	)
}

export default Program
