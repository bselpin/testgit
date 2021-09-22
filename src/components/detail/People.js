import style from "styles/components/detail.module.scss"

const People = ({ pendingFemale, pendingMale, total, nowFemale, nowMale }) => {
	const nowPer = (nowFemale >> 0) + (nowMale >> 0)
	const remain = total - nowFemale - nowMale
	const rScale = Math.round(remain / 2)
	const fScale = Math.round(nowFemale / 2)
	const mScale = Math.round(nowMale / 2)
	const female =
		total > 100
			? Array.apply(null, new Array(fScale >> 0)).map(() => undefined)
			: Array.apply(null, new Array(nowFemale >> 0)).map(() => undefined)
	const male =
		total > 100
			? Array.apply(null, new Array(mScale >> 0)).map(() => undefined)
			: Array.apply(null, new Array(nowMale >> 0)).map(() => undefined)
	let empty
	if (remain > 0) {
		empty =
			total > 100
				? Array.apply(null, new Array(rScale >> 0)).map(() => undefined)
				: Array.apply(null, new Array(remain >> 0)).map(() => undefined)
	} else {
		empty = []
	}

	return (
		<div className={style.detail_box}>
			<p className={style.title}>입소 현황</p>
			<div className={style.detail_info_box}>
				<ul
					className={
						total < 12
							? `${style.people_box} ${style.center}`
							: `${style.people_box} ${style.start}`
					}
				>
					{female.map((list, index) => (
						<li className={style.people_women} key={index}></li>
					))}
					{male.map((list, index) => (
						<li className={style.people_men} key={index}></li>
					))}
					{empty.map((list, index) => (
						<li className={style.people_empty} key={index}></li>
					))}
				</ul>
				<div className={style.max_info}>
					<div className={style.people_amount}>
						<div className={style.total_box}>
							<span>정원</span>
							<span className={style.number}>
								{nowPer} / {total} 명
							</span>
						</div>

						<div className={style.gender_box}>
							<div className={style.gender_info}>
								<span className={`${style.dot} ${style.women}`}>여성</span>
								<span className={style.number}>{nowFemale}명</span>
								{pendingFemale >> 0 > 0 && (
									<p className={style.pending_box}>
										대기{" "}
										<span className={style.pending_number}>
											{pendingFemale}명
										</span>
									</p>
								)}
							</div>
							<div className={style.gender_info}>
								<span className={`${style.dot} ${style.men}`}>남성</span>
								<span className={style.number}>{nowMale}명</span>
								{pendingMale >> 0 > 0 && (
									<p className={style.pending_box}>
										대기{" "}
										<span className={style.pending_number}>
											{pendingMale}명
										</span>
									</p>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default People
