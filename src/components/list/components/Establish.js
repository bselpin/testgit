import style from "styles/components/list.module.scss"
import { calcYear } from "lib/utils/listCommon"

const Establish = ({ year }) => {
	const estYear = calcYear(year)
	return (
		<div className={`${style.detail_box} ${style.small}`}>
			<p className={style.label}>설립</p>
			<p className={style.info}>{estYear === 0 ? "올해" : `${estYear} 년`} </p>
		</div>
	)
}

export default Establish
