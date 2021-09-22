import { useState } from "react"
import Link from "next/link"
import style from "styles/components/detail.module.scss"

const CallModal = ({ setCallModal, code, name, telno, category }) => {
	const [agree, setAgree] = useState(false)

	return (
		<div className={style.call_modal}>
			<div className={style.modal_box}>
				<div
					className={style.close_btn}
					onClick={() => setCallModal(false)}
				></div>

				<div className={style.modal_header}>
					<p className={style.title}>
						<strong>{name}</strong>에 전화 상담 하시겠어요?
					</p>
				</div>

				<div className={style.btn_box}>
					<p className={style.info}>
						&quot;또하나의가족에서 보고 연락드렸어요&quot; 라고 말씀하신 후 상담
						진행 부탁드립니다😊
					</p>
					<div onClick={() => setAgree(!agree)} className={style.agree_box}>
						<p
							className={
								agree ? `${style.indicator} ${style.active}` : style.indicator
							}
						></p>
						<p>발신자번호표시 제한으로 상담</p>
					</div>
					<Link
						href={`/counsel/call?code=${code}&telno=${telno}&agree=${agree.toString()}&name=${name}&category=${category}`}
					>
						<a className={style.call_btn}>
							<div className={style.icon}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="26"
									height="26"
									viewBox="0 0 65 50"
									xmlSpace="preserve"
									className={style.call}
								>
									<path
										d="M56.8,44l-6.6-6.6c-1.3-1.3-3.3-1.5-4.9-0.5l-0.7,0.5l0,0L40.4,40c-2.1,1.4-4.9,1.1-6.7-0.6l-6.6-6.1l-6.1-6.6
	c-1.7-1.8-2-4.6-0.6-6.7l2.8-4.4l0,0l0.3-0.5c1-1.5,0.8-3.6-0.5-4.9l-6.6-6.6c-1.4-1.4-3.6-1.5-5.2-0.3l0,0l0,0L5,8.2
	c-2,1.6-2.8,4.2-2.2,6.6C5.4,24.5,11.2,33,19.4,41c8,8.2,16.4,14,26.2,16.6c2.4,0.7,5-0.2,6.6-2.2l4.8-6.1l0,0l0,0
	C58.3,47.7,58.2,45.4,56.8,44z"
									/>
								</svg>
							</div>
							전화 상담
						</a>
					</Link>
				</div>
			</div>
			<div className={style.modal_bg} onClick={() => setCallModal(false)}></div>
		</div>
	)
}

export default CallModal
