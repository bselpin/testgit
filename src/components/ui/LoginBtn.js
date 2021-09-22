import Link from "next/link"
import style from "styles/components/header.module.scss"

const LoginBtn = () => {
	return (
		<Link href="/login">
			<a className={style.login}>로그인/가입</a>
		</Link>
	)
}

export default LoginBtn
