import { useState, useEffect } from "react"
import UseTerm from "components/signup/UseTerm"
import PrivateTerm from "components/signup/PrivateTerm"
// import AgreeMarketing from "components/signup/AgreeMarketing"
import style from "styles/signup.module.scss"

export default function TermInfo(props) {
	const [showUse, setShowUse] = useState(false)
	const [showPrivate, setShowPrivate] = useState(false)
	const [scssClass, setScssClass] = useState(`${style.signup_box} ${style.ready}`)

	const { is_marketing, setis_marketing, progress } = props

	useEffect(() => {
		if (progress !== 3) {
			setScssClass(`${style.signup_box} ${style.ready}`)
		} else if (progress === 3) {
			setScssClass(style.signup_box)
		}
	}, [progress])

	return (
		<>
			<div className={scssClass}>
				<div className={style.signup_title}>
					<p>
						<span>약관</span>을<br />
						확인해주세요
					</p>
				</div>
				<div className={style.terms_wrap}>
					<div className={style.term_btn} onClick={() => setShowUse(!showUse)}>
						<p>
							서비스 이용약관 <span>[필수]</span>
						</p>
						<p className={style.show_term}>보기</p>
					</div>
					<div className={style.term_btn} onClick={() => setShowPrivate(!showPrivate)}>
						<p>
							개인정보수집 및 이용 <span>[필수]</span>
						</p>
						<p className={style.show_term}>보기</p>
					</div>
				</div>
				<div className={style.term_btn}>
					<div
						onClick={() => {
							if (is_marketing === 0) {
								setis_marketing(1)
							} else {
								setis_marketing(0)
							}
						}}
						className={style.marketing}
					>
						<p
							className={
								is_marketing ? `${style.indicator} ${style.active}` : style.indicator
							}
						></p>
						<p>
							프로모션 정보 수신에 동의합니다
							<span className={style.option}>[선택]</span>
						</p>
					</div>
					{/* <p className={style.show_term}>보기</p> */}
				</div>
			</div>
			{showUse && <UseTerm toggle={setShowUse} />}
			{showPrivate && <PrivateTerm toggle={setShowPrivate} />}
			{/* {showMarketing && <AgreeMarketing toggle={setShowMarketing} />} */}
		</>
	)
}
