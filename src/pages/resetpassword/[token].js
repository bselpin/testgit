import { useState, useEffect } from "react"
import { NextSeo } from "next-seo"
import { nextPost } from "lib/utils/api"
import { toastCall } from "lib/toastCall"
import style from "styles/signup.module.scss"

const TITLE = `비밀번호 변경 | ${process.env.NEXT_PUBLIC_SITE_NAME}`
const DESC = "비밀번호를 새로 입력하고 비밀번호를 변경할 수 있습니다."

const ResetPassword = ({ router }) => {
	const [password, setPassword] = useState("")
	const [passwordCheck, setPasswordCheck] = useState("")
	const [passwordType, setPasswordType] = useState("password")
	const [done, setDone] = useState(false)

	const { token } = router.query

	const passValidator = /^.{6,}$/

	const togglePassword = () => {
		if (passwordType === "password") setPasswordType("text")
		else setPasswordType("password")
	}

	const handleKeyDown = e => {
		if (e.key === " ") e.preventDefault()
	}

	const submitPassword = () => {
		const data = {
			password,
			token,
		}

		nextPost("sign/resetpassword", data).then(res => {
			toastCall("비밀번호가 변경되었습니다.", "success")
			router.push("/")
		})
	}

	const checkToken = () => {
		const data = {
			token,
		}

		nextPost("sign/checkpasstoken", data).then(res => {
			if (res.data === 0) router.push("/")
		})
	}

	useEffect(() => {
		if (router.isReady) {
			checkToken()
		}
	}, [router])

	useEffect(() => {
		if (password === passwordCheck && passValidator.test(password)) {
			setDone(true)
		} else {
			setDone(false)
		}
	}, [password, passwordCheck])

	return (
		<>
			<NextSeo title={TITLE} description={DESC} noindex={true} />

			<div className={style.signup_wrap}>
				<div className={style.signup_box}>
					<div className={style.signup_title}>
						<p className={style.head}>비밀번호를 재설정해 주세요</p>
						<p>
							<span>새로운 비밀번호</span>를<br />
							<span>2회 입력</span>해주세요 <br />
						</p>
					</div>

					<div className={style.password_box}>
						<span className={style.show_password} onClick={togglePassword}>
							{passwordType === "text" ? "숨김" : "비밀번호 보기"}
						</span>
						<input
							type={passwordType}
							onChange={e => setPassword(e.target.value)}
							onKeyDown={e => handleKeyDown(e)}
							value={password}
							className={style.pass_input}
							placeholder="비밀번호 6자 이상"
						/>
						<input
							type={passwordType}
							value={passwordCheck}
							onChange={e => setPasswordCheck(e.target.value)}
							onKeyDown={e => handleKeyDown(e)}
							className={`${style.pass_input} ${style.check}`}
							placeholder="비밀번호 재확인"
						/>

						{}
						<p className={style.pass_error}>
							{passwordCheck.length > 0 &&
								password !== passwordCheck &&
								"비밀번호가 서로 맞지 않습니다"}
						</p>
					</div>
					<button className={style.submit_btn} disabled={!done} onClick={submitPassword}>
						비밀번호 변경
					</button>
				</div>
			</div>

			{/* <div className="main-wrap find-pass-wrap">
				<div className="find-pass-box">
					<div className="find-pass-header">
						<h3>비밀번호를 재설정해 주세요</h3>
						<p className="info">
							비밀번호를 다시 설정하시면 새로운 비밀번호로 로그인하실 수 있습니다
						</p>
					</div>
					<div className="input-div">
						<label htmlFor="password">비밀번호</label>
						<div className="password-wrap">
							<div className="input-wrap">
								<input
									type="password"
									id="password"
									value={pass}
									onChange={e => setPass(e.target.value)}
									onKeyDown={e => handleKeyDown(e)}
									placeholder="비밀번호를 입력해 주세요 (6자 이상)"
									className={errPass ? "error" : ""}
									spellCheck="false"
									autoComplete="false"
								/>
								{pass.length > 0 && errPass && (
									<p className="remover" onClick={() => setPass("")}></p>
								)}
								{errPass ? (
									<p className="error-msg">6자 이상을 입력해 주세요</p>
								) : (
									<p className="error-msg"></p>
								)}
							</div>
						</div>
					</div>

					<div className="input-div pass">
						<label htmlFor="passcheck">비밀번호 확인</label>
						<div className="password-wrap">
							<div className="input-wrap">
								<input
									type="password"
									id="passcheck"
									value={passCheck}
									onChange={e => setPassCheck(e.target.value)}
									onKeyDown={e => handleKeyDown(e)}
									placeholder={
										pass.length === 0
											? "비밀번호를 먼저 입력하세요"
											: "비밀번호를 다시 한번 입력해 주세요"
									}
									className={errPassCheck ? "error" : ""}
									spellCheck="false"
									autoComplete="false"
									disabled={pass.length === 0 ? true : false}
								/>
								{passCheck.length > 0 && errPassCheck && (
									<p className="remover" onClick={() => setPassCheck("")}></p>
								)}
								{errPassCheck ? (
									<p className="error-msg">비밀번호가 서로 맞지 않습니다</p>
								) : (
									<p className="error-msg"></p>
								)}
							</div>
						</div>
					</div>
				</div>
			</div> */}
		</>
	)
}

export default ResetPassword
