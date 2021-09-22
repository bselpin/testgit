import { useState, memo, useCallback, useEffect } from "react"
import { addCommas, detectArray } from "lib/utils/listCommon"
import style from "styles/components/detail.module.scss"

const PriceShort = ({ payment, nonpayment }) => {
	const { meal } = nonpayment
	const [curPayment, setCurPayment] = useState([])

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
			<p className={style.title}>단기보호 비용</p>
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

			<p className={style.short_comment}>
				단기보호는 1회 기준 월 9일 이내 이용 가능
				<span>(입소일 포함, 퇴소일 제외)</span>
				<br />
				<strong>연간 4회까지 연장, 총 36일</strong> 까지 이용 가능합니다.
				<br />
			</p>
		</div>
	)
}

export default PriceShort
