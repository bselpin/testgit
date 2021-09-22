import { useState, useEffect } from "react"
import { NextSeo } from "next-seo"
import { toastCall } from "lib/toastCall"
import PageHeader from "components/layout/PageHeader"
import { nextPost } from "lib/utils/api"
import useLogin from "lib/hooks/useLogin"
import Nav from "components/layout/Nav"
import style from "styles/signup.module.scss"

const TITLE = `비밀번호 찾기 | ${process.env.NEXT_PUBLIC_SITE_NAME}`
const DESC = "비밀번호를 새로 입력하고 비밀번호를 변경할 수 있습니다."

const FindPassword = ({ router }) => {
	const { login, loading } = useLogin()
	const [email, setEmail] = useState("")
	const [errEmail, setErrEmail] = useState(false)
	const [emailCheck, setEmailCheck] = useState(false)

	const eMailValidator =
		/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i

	const handleKeyDown = e => {
		if (e.key === " ") {
			e.preventDefault()
		}
	}

	const sendMail = () => {
		const data = {
			email,
		}
		nextPost("sign/sendfindemail", data).then(() => {
			toastCall("이메일이 발송되었습니다.", "success")
			router.push("/")
		})
	}

	useEffect(() => {
		if (!loading) {
			if (login) {
				router.back()
			}
		}
	}, [])

	useEffect(() => {
		if (email.length > 0) {
			if (eMailValidator.test(email)) {
				setErrEmail(false)
			} else {
				setErrEmail(true)
			}
		} else if (email.length === 0) {
			setErrEmail(false)
		}
	}, [email])

	useEffect(() => {
		if (email.length > 0 && eMailValidator.test(email)) {
			setEmailCheck(true)
		}
	}, [email])

	if (!loading) {
		return (
			<>
				<NextSeo title={TITLE} description={DESC} noindex={true} />

				<PageHeader title={"비밀번호 찾기"} router={router} noBtn={true} />

				<div className={style.signup_wrap}>
					<div className={style.signup_box}>
						<div className={style.signup_title}>
							<p>
								<span>이메일 주소를 입력해 주세요</span>
							</p>
							<p className={style.info}>
								입력하신 메일로 인증메일이 발송됩니다. <br />
								메일의 링크를 눌러 비밀번호를 다시 설정해 주세요.
							</p>
						</div>

						<div className={style.password_box}>
							<input
								type="email"
								id="email"
								value={email}
								onChange={e => setEmail(e.target.value)}
								onKeyDown={e => handleKeyDown(e)}
								placeholder="이메일 주소를 입력해 주세요"
								className={errEmail ? "error" : ""}
								spellCheck="false"
								autoComplete="false"
							/>
						</div>

						<button
							className={style.submit_btn}
							disabled={!emailCheck}
							onClick={sendMail}
						>
							인증메일 발송
						</button>
					</div>
				</div>

				<Nav />
			</>
		)
	}

	return <div></div>
}

export default FindPassword
