import { signIn } from "next-auth/client"
import style from "styles/login.module.scss"

const ProviderLogin = ({ provider, isSignup, setLoading, setLoginType }) => {
	const redirectURL = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/ddoga`

	return (
		<a
			className={`${style.sns_login} ${style[provider.id]}`}
			onClick={() => {
				setLoading(true)
				setLoginType(provider.id)
				signIn(provider.id, {
					callbackUrl: redirectURL,
				})
			}}
		>
			<div className={style.text}>
				<strong>
					<p className={style.logo}></p>
					{provider.id === "kakao" ? "카카오" : "네이버"}
				</strong>
				{isSignup ? "로 간편 가입" : "로 로그인"}
			</div>
		</a>
	)
}

export default ProviderLogin
