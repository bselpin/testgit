import { memo } from "react"
import style from "styles/components/detail.module.scss"

const SubjectIcon = ({ name, className }) => {
	return (
		<div className={style.subject_list}>
			<div className={`${style.subject_icon} ${style[className]}`}></div>
			<p className={style.label}>{name}</p>
		</div>
	)
}

const Subject = ({ normal, expert, equip, spc }) => (
	<div className={style.detail_box}>
		<p className={style.title}>진료 상세</p>
		{normal.length > 0 ? (
			<div className={style.detail_info_box}>
				<p className={style.sub_title}>진료 과목</p>
				<div className={style.subject_box}>
					{normal.map((list, index) => (
						<SubjectIcon
							name={list.dgsbjtCdNm}
							className={list.className}
							key={index}
						/>
					))}
				</div>
			</div>
		) : null}

		{expert.length > 0 ? (
			<div className={`${style.detail_info_box} ${style.mt}`}>
				<p className={style.sub_title}>전문 진료 과목</p>
				<div className={style.subject_box}>
					{expert.map((list, index) => (
						<SubjectIcon
							name={list.dgsbjtCdNm}
							className={list.className}
							key={index}
						/>
					))}
				</div>
			</div>
		) : null}

		{equip.length > 0 ? (
			<div className={`${style.detail_info_box} ${style.mt}`}>
				<p className={style.sub_title}>의료 장비</p>
				<div className={style.subject_box}>
					{equip.map((list, index) => (
						<SubjectIcon
							name={list.oftCdNm}
							className={list.className}
							key={index}
						/>
					))}
				</div>
			</div>
		) : null}

		{spc.length > 0 ? (
			<div className={`${style.detail_info_box} ${style.mt}`}>
				<p className={style.sub_title}>전문 진료 과목</p>
			</div>
		) : null}
	</div>
)

export default Subject
