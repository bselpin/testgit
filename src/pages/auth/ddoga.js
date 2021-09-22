import { useEffect } from "react"
import { NextSeo } from "next-seo"
import { nextPost } from "lib/utils/api"
import { toastCall } from "lib/toastCall"
import style from "styles/sns.module.scss"
import { useSession } from "next-auth/client"

const TITLE = `SNS 로그인 중 | ${process.env.NEXT_PUBLIC_SITE_NAME}`
const DESC = "SNS 로그인 중입니다"

export default function Ddoga({ router }) {
	const [session] = useSession()

	useEffect(() => {
		if (session && typeof session !== "undefined") {
			const data = { token: session.accessToken }
			if (session.provider === "kakao") {
				nextPost("sign/kakaosign", data).then(() => {
					toastCall("카카오로 로그인 하셨습니다", "success")
					router.replace("/")
				})
			} else if (session.provider === "naver") {
				nextPost("sign/naversign", data).then(() => {
					toastCall("네이버로 로그인 하셨습니다", "success")
					router.replace("/")
				})
			}
		}
	}, [session])

	return (
		<>
			<NextSeo title={TITLE} description={DESC} noindex={true} />
			<div className={style.sns_wrap}>
				<div>
					SNS 로그인
					<br />
					중입니다
				</div>
			</div>
		</>
	)
}
