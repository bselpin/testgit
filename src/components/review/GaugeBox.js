import style from "styles/review.module.scss"

const GaugeBox = ({ per, index }) => (
	<div className={style.gauge_box}>
		<p className={style.percent}>{per}%</p>
		<div className={style.gauge_bg}>
			<div className={style.gauge} style={{ height: `${per}%` }}></div>
		</div>
		<p className={style.gauge_point}>{index + 1}점</p>
	</div>
)

export default GaugeBox
