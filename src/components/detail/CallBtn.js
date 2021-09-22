import style from "styles/components/button.module.scss"

const CallBtn = ({ setCallModal }) => {
	return (
		<div
			className={`${style.btn} ${style.call_btn}`}
			onClick={() => setCallModal(true)}
		>
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
		</div>
	)
}

export default CallBtn
