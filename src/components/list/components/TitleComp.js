import Stars from "components/list/components/Stars"
import style from "styles/components/list.module.scss"

const TitleComp = ({ ltchName, address, review, counselCnt, isPanorama }) => {
	const { reviewCnt } = review

	return (
		<div className={style.title_box}>
			<p className={style.name}>
				{ltchName}{" "}
				{isPanorama ? <span className={style.panorama_label}>360 파노라마</span> : null}
			</p>

			<div className={style.title_info}>
				{address ? <p className={style.address}>{address}</p> : null}
				<div className={style.info_util_box}>
					{reviewCnt ? <Stars review={review} detail={false} /> : null}
					{counselCnt !== 0 ? (
						<span className={style.consult_count}>상담 {counselCnt}</span>
					) : null}
				</div>
			</div>
		</div>
	)
}

export default TitleComp
