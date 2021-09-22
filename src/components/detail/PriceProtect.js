import { useState, useCallback, useEffect } from "react"
import { addCommas, detectArray } from "lib/utils/listCommon"
import style from "styles/components/detail.module.scss"

const PriceProtect = ({ payment, nonpayment }) => {
	const { bed, meal } = nonpayment

	const addMeal = payment => {
		return payment.map(list => {
			list.meal = detectArray(meal) ? meal[0].nonpayTgtAmt * 3 : 0
			list.total = detectArray(meal) ? list.price + meal[0].nonpayTgtAmt : list.price
			return list
		})
	}

	const resPayment = addMeal(payment)
	const [curPayment, setCurPayment] = useState([])
	const [curNonPayment, setNonCurPayment] = useState(bed[0])
	const [times, setTimes] = useState([])
	const [curTime, setCurTime] = useState({})
	const [selectTime, setSelectTime] = useState(2)
	const [timeLabel, setTimeLabel] = useState("")
	const [price, setPrice] = useState("")

	const handlePayment = useCallback(
		list => {
			setCurPayment(list)
			setTimes(list.time)
			setCurTime(list.time[selectTime])
		},
		[curPayment, times, curTime],
	)

	const handleTime = useCallback(
		id => {
			setSelectTime(id)
			setCurTime(times[id])
			setTimeLabel(times[id].name)
		},
		[selectTime, curTime, timeLabel],
	)

	const handleNonPayment = useCallback(
		nonpayment => {
			setNonCurPayment(nonpayment)
		},
		[nonpayment],
	)

	useEffect(() => {
		setCurPayment(resPayment[2])
		setTimes(resPayment[selectTime].time)
		setCurTime(resPayment[selectTime].time[selectTime])
	}, [])

	useEffect(() => {
		setTimeLabel(curTime.name)
	}, [times])

	const PaymentBtn = ({ list, current, handleState }) => {
		return (
			<p
				className={
					current.id === list.id ? `${style.pay_btn} ${style.active}` : style.pay_btn
				}
				onClick={() => handleState(list)}
			>
				{list.name}
			</p>
		)
	}

	const TimeBtn = ({ list, current, handleState }) => {
		return (
			<p
				className={
					current.id === list.id ? `${style.pay_btn} ${style.active}` : style.pay_btn
				}
				onClick={() => handleState(list.id)}
			>
				{list.name}
			</p>
		)
	}

	useEffect(() => {
		setPrice(curTime.price >> 0)
	}, [curTime])

	return (
		<div className={style.detail_box}>
			<p className={style.title}>주야간보호 비용</p>
			<div className={style.detail_info_box}>
				<p className={style.sub_title}>장기요양등급</p>
				<div className={style.pay_box}>
					<div className={style.pay_flex}>
						{resPayment.map(list => (
							<PaymentBtn
								state={resPayment}
								current={curPayment}
								handleState={handlePayment}
								list={list}
								key={list.id}
							/>
						))}
					</div>
				</div>

				<p className={`${style.sub_title} ${style.mt}`}>서비스 시간</p>
				<div className={style.pay_box}>
					<div className={style.pay_flex}>
						{times.map(list => (
							<TimeBtn
								state={times}
								current={curTime}
								handleState={handleTime}
								list={list}
								key={list.id}
							/>
						))}
					</div>

					<div className={style.pay_result_box}>
						<p className={style.pay_result}>
							{detectArray(meal) ? (
								<>
									입소비 <span>{addCommas(price)}</span>
									<span className={style.unit}>+</span>식대(3식 기준)
									<span>{addCommas(curPayment.meal)}</span>
									<span className={style.unit}>=</span>
								</>
							) : (
								<span className={style.unit}>(식대정보없음)</span>
							)}
							일<span>{addCommas(price + (curPayment.meal >> 0))}</span> 원
						</p>
					</div>
					<p className={style.snack}>※ 간식비 별도</p>
				</div>
			</div>

			<div className={`${style.detail_info_box} ${style.mt}`}>
				<p className={style.sub_title}>비급여 병상</p>
				<div className={style.pay_box}>
					<div className={style.pay_flex}>
						{bed.map((list, index) => (
							<p
								className={
									curNonPayment.nonpayTgtAmt === list.nonpayTgtAmt
										? `${style.pay_btn} ${style.active}`
										: style.pay_btn
								}
								onClick={() => handleNonPayment(bed[index])}
								key={index}
							>
								{list.name}
							</p>
						))}
					</div>
				</div>
			</div>

			<div className={`${style.detail_info_box} ${style.mt}`}>
				<p className={style.sub_title}>
					월 예상 본인부담금 <span>*주 5일 기준</span>
				</p>
				<div className={style.pay_result_box}>
					<div className={style.pay_total}>
						<div className={style.total_box}>
							<p className={style.label}>급여 요양비</p>
							<p className={style.amount}>
								{addCommas(price + (curPayment.meal >> 0) * 22)}
								<span className={style.unit}>원</span>
							</p>
							<p className={style.info}>
								{curPayment.name}({timeLabel})
							</p>
						</div>
						<p className={style.sign}>+</p>
						<div className={style.total_box}>
							<p className={style.label}>비급여 병상</p>
							<p className={style.amount}>
								{addCommas(curNonPayment.nonpayTgtAmt * 22)}
								<span className={style.unit}>원</span>
							</p>
							<p className={style.info}>{curNonPayment.name}</p>
						</div>
						<p className={style.sign}>=</p>
						<div className={style.total_box}>
							<p className={style.label}>합계</p>
							<p className={`${style.amount} ${style.total}`}>
								{addCommas(
									price + (curPayment.meal >> 0) * 22 + curNonPayment.nonpayTgtAmt * 22,
								)}
								<span className={style.unit}>원</span>
							</p>
							<p className={style.info}>
								{curPayment.name}({timeLabel}) + {curNonPayment.name}
							</p>
						</div>
					</div>
				</div>
			</div>
			<p className={style.price_comment}>
				예상 본인부담금은 실제 금액과 차이가 있을 수 있으니 <br />
				반드시 시설과 상담해보세요
			</p>
		</div>
	)
}

export default PriceProtect
