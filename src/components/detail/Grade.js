import { gradeDetailColor, ltcGradeColor } from "lib/utils/listCommon"
import Tooltip from "components/ui/Tooltip"
import style from "styles/components/detail.module.scss"
import toolStyle from "styles/components/tooltip.module.scss"

const GradeTooltip = () => {
	return (
		<div className={toolStyle.tooltip_info_wrap}>
			<p className={toolStyle.title}>요양시설 분야별 평가등급</p>
			<p className={toolStyle.text}>
				국민건강보험공단으로부터 5개 기준을 통해 적정성 평가 실시, 환산점수를 바탕으로
				A~E등급의 평가등급을 부여합니다.
			</p>
			<div className={toolStyle.tooltip_section}>
				<p className={toolStyle.label}>1. 시설 운영</p>
				<p className={toolStyle.text}>
					기관운영과 종사자 후생복지 및 교육 등이 적합하게 이루어지고 있는지를 평가
				</p>
			</div>
			<div className={toolStyle.tooltip_section}>
				<p className={toolStyle.label}>2. 환경 및 안전</p>
				<p className={toolStyle.text}>
					안전한 시설‧설비, 응급상황 대처 기반, 수급자의 생활환경과 위험도 등을 평가
				</p>
			</div>
			<div className={toolStyle.tooltip_section}>
				<p className={toolStyle.label}>3. 어르신 인권보장</p>
				<p className={toolStyle.text}>
					어르신의 권리를 인지하고 존중하며 윤리적인 기관 운영이 이루어지는지 여부를 평가
				</p>
			</div>
			<div className={toolStyle.tooltip_section}>
				<p className={toolStyle.label}>4. 서비스 제공과정</p>
				<p className={toolStyle.text}>
					기관이나 어르신들의 생활공간에서 장기요양 서비스가 효율적이고 효과적으로
					제공되고 있는가 등을 평가
				</p>
			</div>
			<div className={toolStyle.tooltip_section}>
				<p className={toolStyle.label}>5. 서비스 제공결과</p>
				<p className={toolStyle.text}>어르신의 만족도 및 상태호전여부 등을 평가</p>
			</div>
		</div>
	)
}

const GradeDetail = ({ gradeGroup }) =>
	gradeGroup.map((list, index) => (
		<li className={style.grade_part} key={index}>
			<p
				className={list.single ? `${style.grade_name} ${style.single}` : style.grade_name}
			>
				{list.name}
			</p>
			<p className={style.point} style={{ color: gradeDetailColor(list.grade) }}>
				{list.point}
			</p>
		</li>
	))

const Grade = ({ gradeGroup, grade, year }) => {
	return (
		<div className={style.detail_box}>
			<div className={style.title}>
				시설 등급 정보
				<Tooltip id={"ltc_grade"}>
					<GradeTooltip />
				</Tooltip>
			</div>
			<div className={style.detail_info_box}>
				<div className={style.grade_total}>
					<p className={style.year}>{year}년 건강보험공단 평가</p>
					<p
						className={grade === "A" ? `${style.grade} ${style.best}` : style.grade}
						style={{ color: ltcGradeColor(grade) }}
					>
						{grade.length > 2 ? grade : `${grade} 등급`}
					</p>
				</div>
				<div className={style.grade_detail}>
					<p className={style.label}>분야별 평가 등급</p>
					<ul className={style.grade_list}>
						<GradeDetail gradeGroup={gradeGroup} />
					</ul>
				</div>
			</div>
		</div>
	)
}

export default Grade
