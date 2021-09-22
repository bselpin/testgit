import { nextPost, nextGet } from "lib/utils/api"
import Button from "components/ui/Button"
import style from "styles/signup.module.scss"

export default function SignupBtns(props) {
	const {
		nextProgress,
		prevProgress,
		progress,
		enable,
		email,
		password,
		name,
		birthday,
		gender,
		is_marketing,
		router,
	} = props

	const emailCheck = () => {
		const params = { email }
		nextGet("sign/checkemail", { params: params }).then(res => {
			if (res.data === 1) {
				alert("이미 존재하는 이메일입니다")
			} else {
				nextProgress()
			}
		})
	}

	const signupSubmit = () => {
		const data = {
			email,
			password,
			name,
			gender,
			birthday,
			is_marketing,
		}

		const loginData = {
			email,
			password,
		}

		nextPost("sign/signup", data).then(res => {
			if (res.data === 1) {
				submitLogin(loginData)
			} else {
				alert("회원가입에 실패했습니다. 다시 시도해 주세요")
			}
		})
	}

	const submitLogin = loginData => {
		nextPost("sign/signin", loginData).then(res => {
			if (res.data !== 0) {
				router.replace("/email/send")
			}
		})
	}

	const buttonProps = {
		label: "필수 약관에 동의하고 가입합니다",
		func: signupSubmit,
		hide: true,
	}

	return (
		<div className="outer_wrap">
			{progress === 0 && (
				<p
					onClick={emailCheck}
					className={enable.first ? `${style.next_btn} ${style.active}` : style.next_btn}
				>
					{email} <br />로 가입합니다
				</p>
			)}
			{progress === 1 && (
				<p
					onClick={nextProgress}
					className={enable.second ? `${style.next_btn} ${style.active}` : style.next_btn}
				>
					다음
				</p>
			)}
			{progress === 2 && (
				<p
					onClick={nextProgress}
					className={enable.third ? `${style.next_btn} ${style.active}` : style.next_btn}
				>
					다음
				</p>
			)}
			{progress !== 0 && (
				<p
					onClick={prevProgress}
					className={progress === 3 ? `${style.prev_btn} ${style.up}` : style.prev_btn}
				>
					이전
				</p>
			)}

			<div
				className={
					progress === 3
						? `${style.signup_btn_wrap} ${style.active}`
						: style.signup_btn_wrap
				}
			>
				<Button {...buttonProps} />
			</div>
		</div>
	)
}
