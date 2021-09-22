import { useState, useEffect, useRef } from "react"
import ProviderLogin from "components/signup/ProviderLogin"
import style from "styles/signup.module.scss"

const emailProvider = [
	{ id: null, provider: "직접 입력" },
	{ id: 0, provider: "naver.com" },
	{ id: 1, provider: "hanmail.net" },
	{ id: 2, provider: "nate.com" },
	{ id: 3, provider: "gmail.com" },
	{ id: 4, provider: "hotmail.com" },
	{ id: 5, provider: "hanmir.com" },
	{ id: 6, provider: "freechal.com" },
	{ id: 7, provider: "hanafos.com" },
]

const FIRST = "first"

export default function LoginInfo({
	progress,
	setEmail,
	handleEnable,
	handleInput,
	providers,
	enable,
	setLoading,
}) {
	const [emailText, setEmailText] = useState("")
	const [emailFull, setEmailFull] = useState("")
	const [emailSelect, setEmailSelect] = useState("naver.com")
	const [focused, setFocused] = useState(false)
	const full = useRef()
	const validator = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/i
	const alphabet = /^[a-zA-Z0-9]*$/

	const handleFullValue = e => {
		const { value } = e.target
		if (alphabet.test(value)) {
			setEmailText(value)
		}
	}

	useEffect(() => {
		if (emailSelect === "직접 입력") {
			full.current.focus()
			setEmail(emailFull)
			if (emailFull.length === 0) handleEnable(false, FIRST)
		} else {
			if (emailText.length > 0) setEmail(`${emailText}@${emailSelect}`)
			else handleEnable(false, FIRST)
		}
	}, [emailSelect])

	useEffect(() => {
		if (emailSelect !== "직접 입력") {
			if (emailText.length > 1) handleEnable(true, FIRST)
			else handleEnable(false, FIRST)

			setEmail(`${emailText}@${emailSelect}`)
		}
	}, [emailText])

	useEffect(() => {
		if (emailFull.length > 0) {
			if (validator.test(emailFull)) {
				handleEnable(true, FIRST)
				setEmail(emailFull)
			} else {
				handleEnable(false, FIRST)
			}
		} else {
			handleEnable(false, FIRST)
		}
	}, [emailFull])

	return (
		<div
			className={progress === 0 ? style.signup_box : `${style.signup_box} ${style.done}`}
		>
			<div className={style.signup_title}>
				<p>
					사용하실 <span>이메일</span>을
					<br />
					입력해주세요
				</p>
			</div>

			<div
				className={
					emailSelect !== "직접 입력"
						? style.email_box
						: `${style.email_box} ${style.hidden}`
				}
			>
				<input
					type="text"
					onChange={e => handleFullValue(e)}
					value={emailText}
					className={style.email_input}
					placeholder="이메일 주소의 아이디"
					onFocus={() => setFocused(true)}
					onBlur={() => setFocused(false)}
				/>
				<span>@</span>
			</div>

			<input
				className={
					emailSelect === "직접 입력"
						? style.email_full
						: `${style.email_full} ${style.hidden}`
				}
				type="email"
				value={emailFull}
				placeholder="이메일 주소 전체"
				onChange={e => handleInput(e, setEmailFull)}
				ref={full}
				onFocus={() => setFocused(true)}
				onBlur={() => setFocused(false)}
			/>

			<select
				name="provider"
				id="provider"
				onChange={e => handleInput(e, setEmailSelect)}
				value={emailSelect}
				className={style.email_select}
				onFocus={() => setFocused(true)}
				onBlur={() => setFocused(false)}
			>
				{emailProvider.map(list => (
					<option key={list.id} value={list.provider}>
						{list.provider}
					</option>
				))}
			</select>

			<div
				className={
					!focused && !enable.first
						? style.sns_signup_wrap
						: `${style.sns_signup_wrap} ${style.hidden}`
				}
			>
				<p className={style.sns_info}>
					<strong>카카오</strong>와 <strong>네이버</strong>로 바로 시작해보세요
				</p>
				{Object.values(providers).map(provider => (
					<ProviderLogin
						provider={provider}
						key={provider.id}
						isSignup={true}
						setLoading={setLoading}
					/>
				))}
			</div>
		</div>
	)
}
