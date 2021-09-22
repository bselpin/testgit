import { useEffect } from "react"
import Link from "next/link"
import { NextSeo } from "next-seo"
import Nav from "components/layout/Nav"
import style from "styles/email.module.scss"
import useLogin from "lib/hooks/useLogin"
import { nextPost } from "lib/utils/api"

const TITLE = `이메일 인증이 완료되었습니다 | ${process.env.NEXT_PUBLIC_SITE_NAME}`
const DESC =
	"이메일 인증이 완료되었습니다. 이제부터 또가의 모든 서비스를 사용하실 수 있습니다"

export default function Done() {
	const { login, loading } = useLogin()

	useEffect(() => {
		if (!loading) {
			if (login) {
				nextPost("sign/tokenRefresh", null)
			}
		}
	}, [loading])

	return (
		<>
			<NextSeo title={TITLE} description={DESC} noindex={true} />

			<div className={style.email_wrap}>
				<div className={style.email_box}>
					<div className={`${style.email_icon} ${style.clap}`}></div>
					<h4 className={style.title}>이메일 인증을 완료하셨습니다!</h4>
					<div className={style.text}>
						이제부터 또가의 모든 서비스를 사용하실 수 있습니다😊
					</div>
					{login ? (
						<Link href="/">
							<a className={style.to_main}>메인으로</a>
						</Link>
					) : (
						<Link href="/login">
							<a className={style.to_main}>로그인하기</a>
						</Link>
					)}
				</div>
			</div>
			<Nav />
		</>
	)
}
