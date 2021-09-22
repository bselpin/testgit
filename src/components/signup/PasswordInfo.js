import { useState, useEffect } from "react"
import style from "styles/signup.module.scss"

const SECOND = "second"

export default function PasswordInfo(props) {
	const [passCheck, setPassCheck] = useState("")
	const [passwordType, setPasswordType] = useState("password")
	const [scssClass, setScssClass] = useState(`${style.signup_box} ${style.ready}`)
	const validator = /^.{6,}$/

	const { progress, password, setPassword, handleEnable, handleInput } = props

	const togglePassword = () => {
		if (passwordType === "password") setPasswordType("text")
		else setPasswordType("password")
	}

	const handleKeyDown = e => {
		if (e.key === " ") e.preventDefault()
	}

	useEffect(() => {
		if (password.length > 0 && passCheck.length > 0) {
			if (validator.test(password)) {
				if (password === passCheck) handleEnable(true, SECOND)
				else handleEnable(false, SECOND)
			} else handleEnable(false, SECOND)
		}
	}, [password, passCheck])

	useEffect(() => {
		if (progress === 0) setScssClass(`${style.signup_box} ${style.ready}`)
		else if (progress === 1) setScssClass(style.signup_box)
		else if (progress === 2 || progress === 3)
			setScssClass(`${style.signup_box} ${style.done}`)
	}, [progress])

	return (
		<div className={scssClass}>
			<div className={style.signup_title}>
				<p>
					<span>비밀번호</span>를<br />
					<span>2회 입력</span>해주세요
				</p>
			</div>

			<div className={style.password_box}>
				<span className={style.show_password} onClick={togglePassword}>
					{passwordType === "text" ? "숨김" : "비밀번호 보기"}
				</span>
				<input
					type={passwordType}
					onChange={e => handleInput(e, setPassword)}
					onKeyDown={e => handleKeyDown(e)}
					value={password}
					className={style.pass_input}
					placeholder="비밀번호 6자 이상"
				/>
				<input
					type={passwordType}
					value={passCheck}
					onChange={e => handleInput(e, setPassCheck)}
					onKeyDown={e => handleKeyDown(e)}
					className={`${style.pass_input} ${style.check}`}
					placeholder="비밀번호 재확인"
				/>
				{passCheck.length > 0 && password !== passCheck && (
					<p className={style.pass_error}>비밀번호가 서로 맞지 않습니다</p>
				)}
			</div>
		</div>
	)
}
