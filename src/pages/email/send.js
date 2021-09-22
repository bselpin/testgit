import { useEffect } from "react"
import { NextSeo } from "next-seo"
import useLogin from "lib/hooks/useLogin"
import style from "styles/email.module.scss"

const TITLE = `회원 가입을 환영합니다 | ${process.env.NEXT_PUBLIC_SITE_NAME}`
const DESC =
	"또하나의가족이 되신 것을 환영합니다. 가입하신 이메일 계정의 편지함을 확인하고 이메일 인증하기 버튼을 눌러 인증을 완료해 주세요. 이메일 발송에는 최대 5분의 시간이 걸릴 수 있습니다."

export default function Send({ router }) {
	const { user, login, loading } = useLogin()
	const { name, email, auth_level } = user

	useEffect(() => {
		if (!loading) {
			if (!login) {
				router.push("/login")
			}
			// else if (auth_level === 1) {
			// 	router.back()
			// }
		}
	}, [loading])

	if (!loading && login) {
		return (
			<>
				<NextSeo title={TITLE} description={DESC} noindex={true} />

				<div className={style.email_wrap}>
					<div className={style.email_box}>
						<h2 className={style.welcome}>
							<strong>{name}</strong> 님, <br /> <strong>또하나의가족</strong>이 되신 것을
							환영합니다!
						</h2>
						<div className={style.desc}>
							<strong>{email}</strong>로 인증 메일이 발송 되었습니다. <br />
							가입하신 이메일 계정의 받은 편지함을 확인하시고 <br />
							<strong>이메일 인증하기</strong> 버튼을 눌러 인증을 완료해 주세요
							<p className={style.comment}>
								이메일 발송에는 최대 5분의 시간이 걸릴 수 있습니다. <br />
							</p>
							<button className={style.button} onClick={() => router.push("/")}>
								홈으로
							</button>
							{/* <a
								href="https://biz.ddoga.co.kr/certification"
								target="_blank"
								rel="noopener noreferrer"
								className={style.to_biz}
							>
								<div className="flex aic">
									<img src="/logo/logo_biz.svg" alt="logo" className={style.logo_biz} />
									<p className={style.question}>요양시설이신가요?</p>
								</div>
								<p>인증하러가기 {" >"}</p>
							</a> */}
						</div>

						{/* <div className={style.biz_info}>
							시설을 인증하고 하나의 계정으로 또가비즈까지 이용해 보세요 <br />
							또가비즈에 대해 더 자세한 내용이 궁금하신가요?
							<div>
								<a
									href="https://biz.ddoga.co.kr"
									target="_blank"
									rel="noopener noreferrer"
									className={style.biz_link}
								>
									또가비즈 안내 바로가기
								</a>
							</div>
						</div> */}
					</div>
				</div>
			</>
		)
	}

	return <div className={style.email_wrap}></div>
}
