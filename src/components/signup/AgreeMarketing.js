import style from "styles/components/term.module.scss"

export default function AgreeMarketing({ toggle }) {
	return (
		<div className={style.term_wrap} onClick={() => toggle()}>
			<div className={style.term_box}>
				<h2>또가 프로모션 정보수신 동의</h2>
				<p className="close-btn"></p>
				<div className={style.term_content}>
					또가에서 제공하는 이벤트/혜택 등 다양한 정보를 이메일로 받아보실 수
					있습니다. 일부 서비스의 경우, 개별 서비스에 대해 별도 수신 동의를 받을
					수 있으며, 이때에도 수신 동의에 대해 별도로 안내하고 동의를 받습니다.
				</div>
			</div>
		</div>
	)
}
