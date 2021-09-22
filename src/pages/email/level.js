import { NextSeo } from "next-seo"
import Nav from "components/layout/Nav"
import useLogin from "lib/hooks/useLogin"
import { toastCall } from "lib/toastCall"
import { nextPost } from "lib/utils/api"
import style from "styles/email.module.scss"

const TITLE = `이메일 인증을 완료해 주세요 | ${process.env.NEXT_PUBLIC_SITE_NAME}`
const DESC =
	"상담글 쓰기, 후기작성을 사용하시기 위해선 이메일 인증이 필요합니다.	회원 가입시에 발송된 이메일을 확인하고 인증해 주세요"

export default function Level({ router }) {
	const { user, login, loading } = useLogin()
	const { auth_level } = user

	const resend = () =>
		nextPost("sign/resend").then(res => {
			if (res.data === 1) {
				toastCall("이메일이 재발송 되었습니다", "success")
				router.back()
			} else {
				alert(
					"이메일 발송에 문제가 발생했습니다. 같은 증상이 반복된다면 고객센터로 문의해 주세요",
				)
				router.replace("/")
			}
		})

	if (!loading && !login) {
		return router.back()
	}

	return (
		<>
			<NextSeo
				title={TITLE}
				description={DESC}
				openGraph={{
					url: process.env.NEXT_PUBLIC_BASE_URL + router.asPath,
					title: TITLE,
					description: DESC,
					images: [
						{
							url: process.env.NEXT_PUBLIC_DEFAULT_IMG,
						},
					],
				}}
			/>

			<div className={style.email_wrap}>
				<div className={style.email_box}>
					<p className={style.email_icon}></p>
					<p className={style.title}>이메일 인증을 완료해 주세요</p>
					<p className={style.text}>
						<strong>상담글 쓰기, 후기작성</strong>을 사용하시기 위해선 <br />
						이메일 인증이 필요합니다 <br />
						회원 가입시에 발송된 이메일을 확인하고 인증해 주세요
					</p>

					{auth_level !== 1 && (
						<>
							<p className={style.info}>메일이 도착하지 않으셨나요?</p>
							<button className={style.button} onClick={resend}>
								인증 메일 재발송
							</button>
						</>
					)}
				</div>
			</div>
			<Nav />
		</>
	)
}
