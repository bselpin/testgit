import style from "styles/components/detail.module.scss"

const FacilityList = ({ kor, facility, className }) =>
	facility >> 0 > 0 && (
		<div className={style.facility_box}>
			<p className={`${style.facility_icon} ${style[className]}`}></p>
			<p className={style.label}>
				{kor} <span className={style.number}>{facility}개</span>
			</p>
		</div>
	)

const Facility = ({ facility }) => {
	const {
		batRoom,
		crmnyPrst,
		funcTrnRoomreal,
		medRoomreal,
		ofce,
		pgmRoomreal,
		// prsnRoomreal1,
		// prsnRoomreal2,
		// prsnRoomreal3,
		// prsnRoomreal4,
		spcAcupRoomreal,
		taxPageLong,
		taxRoom,
	} = facility

	return (
		<div className={style.detail_box}>
			<p className={style.title}>시설 상세</p>
			<div className={style.detail_info_box}>
				<div className={style.facility_wrap}>
					<FacilityList
						kor={"특수침실"}
						facility={spcAcupRoomreal}
						className={"spcAcupRoomreal"}
					/>

					<FacilityList kor={"사무실"} facility={ofce} className={"ofce"} />

					<FacilityList
						kor={"의료 및 간호사실"}
						facility={medRoomreal}
						className={"medRoomreal"}
					/>

					<FacilityList
						kor={"작업 및 훈련실"}
						facility={funcTrnRoomreal}
						className={"funcTrnRoomreal"}
					/>

					<FacilityList
						kor={"프로그램실"}
						facility={pgmRoomreal}
						className={"pgmRoomreal"}
					/>

					<FacilityList
						kor={"식당 및 조리실"}
						facility={crmnyPrst}
						className={"crmnyPrst"}
					/>

					<FacilityList
						kor={"화장실"}
						facility={batRoom}
						className={"batRoom"}
					/>

					<FacilityList
						kor={"세면장 및 목욕실"}
						facility={taxPageLong}
						className={"taxPageLong"}
					/>

					<FacilityList
						kor={"세탁장 및 건조장"}
						facility={taxRoom}
						className={"taxRoom"}
					/>
				</div>
			</div>
		</div>
	)
}

export default Facility
