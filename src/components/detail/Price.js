import { useState, useCallback } from "react"
import { addCommas } from "lib/utils/listCommon"
import style from "styles/components/detail.module.scss"

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

const Price = ({ payment, nonpayment }) => {
	const [curPayment, setCurPayment] = useState(payment[2])
	const [curNonPayment, setNonCurPayment] = useState(nonpayment[0])

	const handlePayment = useCallback(
		payment => {
			setCurPayment(payment)
		},
		[payment],
	)

	const handleNonPayment = useCallback(
		nonpayment => {
			setNonCurPayment(nonpayment)
		},
		[nonpayment],
	)

	return (
		<div className={style.detail_box}>
			<p className={style.title}>입원 비용</p>
			<div className={style.detail_info_box}>
				<p className={style.sub_title}>입원 환자군</p>
				<div className={style.pay_box}>
					<div className={style.pay_flex}>
						{payment.map(list => (
							<PaymentBtn
								payment={payment}
								handlePayment={handlePayment}
								curPayment={curPayment}
								list={list}
								key={list.id}
							/>
						))}
					</div>
					<div className={style.pay_result_box}>
						<p className={style.pay_result}>
							입원비 <span>{addCommas(curPayment.price)}</span>
							<span className={style.unit}>+</span>식대(3식 기준)
							<span>{addCommas(curPayment.meal)}</span>
							<span className={style.unit}>=</span>일
							<span>{addCommas(curPayment.total)}</span> 원
						</p>
					</div>
				</div>
			</div>

			<div className={`${style.detail_info_box} ${style.mt}`}>
				<p className={style.sub_title}>비급여 병상</p>
				<div className={style.pay_box}>
					<div className={style.pay_flex}>
						{nonpayment.map((list, index) => (
							<p
								className={
									curNonPayment.curAmt === list.curAmt
										? `${style.pay_btn} ${style.active}`
										: style.pay_btn
								}
								onClick={() => handleNonPayment(nonpayment[index])}
								key={index}
							>
								{list.npayKorNm}
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
							<p className={style.label}>급여 병원비</p>
							<p className={style.amount}>
								{addCommas(curPayment.total * 30)}
								<span className={style.unit}>원</span>
							</p>
							<p className={style.info}>{curPayment.name}</p>
						</div>
						<p className={style.sign}>+</p>
						<div className={style.total_box}>
							<p className={style.label}>비급여 병상</p>
							<p className={style.amount}>
								{addCommas(curNonPayment.curAmt * 30)}
								<span className={style.unit}>원</span>
							</p>
							<p className={style.info}>{curNonPayment.npayKorNm}</p>
						</div>
						<p className={style.sign}>=</p>
						<div className={style.total_box}>
							<p className={style.label}>합계</p>
							<p className={`${style.amount} ${style.total}`}>
								{addCommas(curPayment.total * 30 + curNonPayment.curAmt * 30)}
								<span className={style.unit}>원</span>
							</p>
							<p className={style.info}>
								{curPayment.name} + {curNonPayment.npayKorNm}
							</p>
						</div>
					</div>
				</div>
			</div>
			<p className={style.price_comment}>
				예상 본인부담금은 실제 금액과 차이가 있을 수 있으니 <br />
				반드시 병원과 상담해보세요
			</p>
		</div>
	)
}

export default Price
