import LoginBtn from "components/ui/LoginBtn"
import useLogin from "lib/hooks/useLogin"
import style from "styles/components/header.module.scss"

const PageHeader = ({ title, type, review, router, noBtn, logout }) => {
	const { pathname } = router
	const { login } = useLogin()

	return (
		<div className={style.page_header}>
			<div className="outer_wrap">
				<div
					className={type ? style.close_btn : style.back_btn}
					onClick={() => router.back()}
				></div>

				<div className={type ? `${style.title} ${style.no_left}` : style.title}>
					{title}
					{review && <span>은 어떤 곳이었나요?</span>}
				</div>

				{!login && pathname !== "/login" && !type && !noBtn ? (
					<LoginBtn />
				) : null}

				{logout && (
					<p className={style.logout} onClick={logout}>
						로그아웃
					</p>
				)}
			</div>
		</div>
	)
}

export default PageHeader
