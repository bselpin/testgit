import style from "styles/components/detail.module.scss"

const OperDay = ({ name, start, end, last = false, rest = false }) => (
	<div className={last ? `${style.day_box} ${style.last}` : style.day_box}>
		<p className={rest ? `${style.day} ${style.holi}` : style.day}>{name}</p>
		{rest ? (
			<p className={style.time}>{rest}</p>
		) : (
			<p className={style.time}>
				{start}~{end}
			</p>
		)}
	</div>
)

const Satuerday = ({ name, sat }) => (
	<div className={style.day_box}>
		<p className={sat ? style.day : `${style.day} ${style.holi}`}>{name}</p>
		{sat ? (
			<p className={style.time}>{sat}</p>
		) : (
			<p className={style.time}>휴진</p>
		)}
	</div>
)

const Operation = ({
	park,
	parkInfo,
	holiday,
	sun,
	monStart,
	monEnd,
	tueStart,
	tueEnd,
	wedStart,
	wedEnd,
	thuStart,
	thuEnd,
	friStart,
	friEnd,
	lunch,
	oper,
	sat,
}) => {
	return (
		<div className={style.detail_box}>
			<p className={style.title}>운영 정보</p>
			{monStart ? (
				<div className={style.detail_info_box}>
					<p className={style.sub_title}>운영 시간</p>
					<div className={style.operation_wrap}>
						<OperDay name={"월요일"} start={monStart} end={monEnd} />
						<OperDay name={"화요일"} start={tueStart} end={tueEnd} />
						<OperDay name={"수요일"} start={wedStart} end={wedEnd} />
						<OperDay name={"목요일"} start={thuStart} end={thuEnd} />
						<OperDay
							name={"금요일"}
							start={friStart}
							end={friEnd}
							last={!sun}
						/>
						<Satuerday name={"토요일"} sat={sat} />
						<OperDay name={"일요일"} rest={sun} last={true} />
						<OperDay name={"공휴일"} rest={holiday} last={true} />
					</div>
				</div>
			) : null}

			{lunch ? (
				<div className={style.detail_info_box}>
					<p className={style.sub_title}>점심 시간</p>
					<p className={style.info}>{lunch}</p>
				</div>
			) : null}

			{parkInfo ? (
				<div className={style.detail_info_box}>
					<p className={style.sub_title}>주차 정보</p>
					<p className={style.info}>{parkInfo}</p>
				</div>
			) : null}
		</div>
	)
}

export default Operation
