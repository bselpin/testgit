import { useState, useCallback, useEffect } from "react"
import { addCommas, detectArray } from "lib/utils/listCommon"
import Tooltip from "components/ui/Tooltip"
import style from "styles/components/detail.module.scss"
import toolStyle from "styles/components/tooltip.module.scss"

const PriceTooltip = () => {
	return (
		<div className={toolStyle.tooltip_info_wrap}>
			<p className={toolStyle.title}>요양원 입소비용 장기요양등급</p>
			<div className={toolStyle.tooltip_section}>
				<p className={toolStyle.label}>1등급</p>
				<p className={toolStyle.text}>
					심신의 기능상태 장애로 일상생활에서 전적으로 다른 사람의 도움이 필요한 자로서
					장기요양인정 점수가 95점 이상인자 <strong>(월 최대 1,520,700원 지원)</strong>
				</p>
			</div>
			<div className={toolStyle.tooltip_section}>
				<p className={toolStyle.label}>2등급</p>
				<p className={toolStyle.text}>
					심신의 기능상태 장애로 일상생활에서 상당 부분 다른 사람의 도움이 필요한 자로서
					장기요양인정 점수가 75점 이상 95점 미만인 자
					<strong> (월 최대 1,351,700원 지원)</strong>
				</p>
			</div>
			<div className={toolStyle.tooltip_section}>
				<p className={toolStyle.label}>3등급</p>
				<p className={toolStyle.text}>
					심신의 기능상태 장애로 일상생활에서 부분적으로 다른 사람의 도움이 필요한 자로서
					장기요양인정 점수가 60점 이상 75점 미만인 자
					<strong>(월 최대 1,295,400원 지원)</strong>
				</p>
			</div>
			<div className={toolStyle.tooltip_section}>
				<p className={toolStyle.label}>4등급</p>
				<p className={toolStyle.text}>
					심신의 기능상태 장애로 일상생활에서 일정 부분 다른 사람의 도움이 필요한 자로서
					장기요양인정 점수가 51점 이상 60점 미만인 자
					<strong>(월 최대 1,189,800원 지원)</strong>
				</p>
			</div>
			<div className={toolStyle.tooltip_section}>
				<p className={toolStyle.label}>5등급</p>
				<p className={toolStyle.text}>
					치매환자로서(노인장기요양보험법 시행령 제2조에 따른 노인성 질병으로 한정)
					장기요양인정 점수가 45점 이상 51점 미만인 자
					<strong>(월 최대 1,021,300원 지원)</strong>
				</p>
			</div>
		</div>
	)
}

const PriceNurse = ({ payment, nonpayment }) => {
	const { bed, meal } = nonpayment
	const [curPayment, setCurPayment] = useState([])
	const [curNonPayment, setNonCurPayment] = useState(bed[0])

	const addMeal = payment => {
		return payment.map(list => {
			list.meal = detectArray(meal) ? meal[0].nonpayTgtAmt * 3 : 0
			list.total = detectArray(meal) ? list.price + meal[0].nonpayTgtAmt * 3 : list.price
			return list
		})
	}

	const resPayment = addMeal(payment)

	const handlePayment = useCallback(
		resPayment => {
			setCurPayment(resPayment)
		},
		[resPayment],
	)

	const handleNonPayment = useCallback(
		nonpayment => {
			setNonCurPayment(nonpayment)
		},
		[nonpayment],
	)

	useEffect(() => {
		setCurPayment(resPayment[0])
	}, [])

	const PaymentBtn = ({ list, curPayment, handlePayment, payment }) => (
		<p
			className={
				curPayment.id === list.id ? `${style.pay_btn} ${style.active}` : style.pay_btn
			}
			onClick={() => handlePayment(payment[list.id])}
		>
			{list.name}
		</p>
	)

	return (
		<div className={style.detail_box}>
			<div className={style.title}>
				입소 비용
				<Tooltip id={"nurse_price"}>
					<PriceTooltip />
				</Tooltip>
			</div>
			<div className={style.detail_info_box}>
				<p className={style.sub_title}>장기요양등급</p>
				<div className={style.pay_box}>
					<div className={style.pay_flex}>
						{resPayment.map(list => (
							<PaymentBtn
								payment={resPayment}
								handlePayment={handlePayment}
								curPayment={curPayment}
								list={list}
								key={list.id}
							/>
						))}
					</div>
					<div className={style.pay_result_box}>
						<p className={style.pay_result}>
							{detectArray(meal) ? (
								<>
									입소비 <span>{addCommas(curPayment.price)}</span>
									<span className={style.unit}>+</span>식대(3식 기준)
									<span>{addCommas(curPayment.meal)}</span>
									<span className={style.unit}>=</span>
								</>
							) : (
								<span className={style.unit}>(식대정보없음)</span>
							)}
							일<span>{addCommas(curPayment.total >> 0)}</span> 원
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
				<p className={style.sub_title}>월 예상 본인부담금</p>
				<div className={style.pay_result_box}>
					<div className={style.pay_total}>
						<div className={style.total_box}>
							<p className={style.label}>급여 요양비</p>
							<p className={style.amount}>
								{addCommas((curPayment.total >> 0) * 30)}
								<span className={style.unit}>원</span>
							</p>
							<p className={style.info}>{curPayment.name}</p>
						</div>
						<p className={style.sign}>+</p>

						<div className={style.total_box}>
							<p className={style.label}>비급여 병상</p>
							<p className={style.amount}>
								{addCommas(curNonPayment.nonpayTgtAmt * 30)}
								<span className={style.unit}>원</span>
							</p>
							<p className={style.info}>{curNonPayment.name}</p>
						</div>
						<p className={style.sign}>=</p>

						<div className={style.total_box}>
							<p className={style.label}>합계</p>
							<p className={`${style.amount} ${style.total}`}>
								{addCommas(
									(curPayment.total >> 0) * 30 + curNonPayment.nonpayTgtAmt * 30,
								)}
								<span className={style.unit}>원</span>
							</p>
							<p className={style.info}>
								{curPayment.name} + {curNonPayment.name}
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

export default PriceNurse
