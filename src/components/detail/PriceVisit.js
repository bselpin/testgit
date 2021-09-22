import { useState, useCallback, useEffect } from "react"
import { addCommas } from "lib/utils/listCommon"
import style from "styles/components/detail.module.scss"

const PriceVisit = ({ payment, category }) => {
	const [curPayment, setCurPayment] = useState([])

	const handlePayment = useCallback(
		(payment) => {
			setCurPayment(payment)
		},
		[payment],
	)

	const title = () => {
		if (category === "5") return "방문요양 비용"
		if (category === "6") return "방문목욕 비용"
		if (category === "7") return "방문간호 비용"
	}

	const multiply = () => {
		if (category === "6")
			return addCommas(parseInt((curPayment.price >> 0) * 4.5))
		else return addCommas((curPayment.price >> 0) * 22)
	}

	const order = () => {
		if (category === "7") return 3
		else return 0
	}

	useEffect(() => {
		setCurPayment(payment[order()])
	}, [])

	const PaymentBtn = ({ list, curPayment, handlePayment, payment }) => (
		<p
			className={
				curPayment.id === list.id
					? `${style.pay_btn} ${style.active}`
					: style.pay_btn
			}
			onClick={() => handlePayment(payment[list.id])}
		>
			{list.name}
		</p>
	)

	return (
		<div className={style.detail_box}>
			<p className={style.title}>{title(category)}</p>
			<div className={style.detail_info_box}>
				<p className={style.sub_title}>서비스 이용 시간</p>
				<div className={style.pay_box}>
					<div className={style.pay_flex}>
						{payment.map((list, index) => (
							<PaymentBtn
								payment={payment}
								handlePayment={handlePayment}
								curPayment={curPayment}
								list={list}
								key={index}
							/>
						))}
					</div>
				</div>
			</div>

			<div className={`${style.detail_info_box} `}>
				<p className={style.sub_title}>
					월 예상 본인부담금 <span>*주 {category === "6" ? 1 : 5}일 기준</span>
				</p>
				<div className={style.pay_result_box}>
					<div className={style.pay_total}>
						<div className={style.total_box}>
							<p className={style.label}>
								합계 (주 {category === "6" ? 1 : 5}일)
							</p>
							<p className={style.amount}>
								월 <strong className={style.visit_total}>{multiply()}</strong>
								<span className={style.unit}>원</span>
							</p>
							<p className={style.info}>{curPayment.name}</p>
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

export default PriceVisit
