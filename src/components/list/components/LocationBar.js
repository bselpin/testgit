import style from "styles/components/list.module.scss"

const LocationBar = ({ count, location }) => {
	const { siDoName, siGunGuName } = location
	return (
		<div className="outer_wrap">
			<div className="inner_wrap">
				<span className={style.location}>{siDoName}</span>
				<span className={style.divider}>{">"}</span>
				<span className={style.location}>{siGunGuName.trim()}</span>
				<span className={style.divider}>{">"}</span>
				<span className={style.location}>{count}</span>
				<span>개의 검색결과</span>
			</div>
		</div>
	)
}

export default LocationBar
