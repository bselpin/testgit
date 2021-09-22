import style from "styles/components/detail.module.scss"

const Doctor = ({ normalCnt, expert, avg, cnt }) => {
	return (
		<div className={style.detail_box}>
			<p className={style.title}>의료진</p>
			<div className={style.detail_info_box}>
				<div className={style.worker_wrap}>
					<div className={style.worker_box}>
						<p className={style.name}>의사</p>
						<div className={`${style.worker_icon} ${style.doctor}`}></div>
						<p className={style.label}>
							{cnt} <span>명</span>
						</p>
					</div>
					<div className={style.expert_box}>
						{expert.map((list, index) => (
							<div key={index} className={style.expert_list}>
								{list.dgsbjtCdNm} 전문의 <span>{list.dgsbjtPrSdrCnt}명</span>
							</div>
						))}
						{normalCnt > 0 && (
							<div className={style.expert_list}>
								일반의 <span>{normalCnt}명</span>
							</div>
						)}
					</div>
				</div>

				<div className={style.avg_doctor}>
					<p className={style.avg}>
						<span>의사 1인당</span> <br /> 평균 담당 환자수
						<span className={style.avg_num}>{avg}명</span>
					</p>
				</div>
			</div>
		</div>
	)
}

export default Doctor
