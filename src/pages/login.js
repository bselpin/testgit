import { useState, useRef, useEffect, useCallback } from "react"
import { NextSeo } from "next-seo"
import Link from "next/link"
import { getProviders } from "next-auth/client"
import { nextPost } from "lib/utils/api"
import { removeCookie } from "lib/utils/cookie"
import useLocalStorage from "lib/hooks/useLocalStorage"
import { toastCall } from "lib/toastCall"
import { kakaoInit } from "lib/utils/init"
import PageHeader from "components/layout/PageHeader"
import ProviderLogin from "components/signup/ProviderLogin"
import Loading from "components/ui/Loading"
import style from "styles/login.module.scss"

const TITLE = `로그인 | ${process.env.NEXT_PUBLIC_SITE_NAME}`
const DESC =
	"요양정보(노인장기요양보험,노인장기요양등급) 조회, 요양시설(요양원,주간보호센터,방문요양) 찾기, 요양지식 검색"

const EMAIL = "email"
const PASSWORD = "password"

export default function Login({ router, providers }) {
	const [loginInfo, setLoginInfo] = useState({
		email: "",
		password: "",
	})
	const [fail, setFail] = useState(false)
	const [loading, setLoading] = useState(false)
	const [loginType, setLoginType] = useLocalStorage("login_type")
	const loginBtn = useRef(null)

	const handleUpdate = useCallback(
		e => {
			const { name, value } = e.target
			setLoginInfo({
				...loginInfo,
				[name]: value,
			})
		},
		[loginInfo],
	)

	const failLogin = () => setFail(true)

	const resetFail = () => setFail(false)

	const loginSubmit = e => {
		e.preventDefault()
		removeCookie()
		nextPost("sign/signin", loginInfo).then(res => {
			if (res.data !== 0) {
				router.back()
				setLoginType("ddoga")
				toastCall("로그인 하셨습니다", "success")
			} else {
				failLogin()
				window.navigator.vibrate([30, 30, 30])
			}
		})
	}

	useEffect(() => {
		kakaoInit()
	}, [])

	useEffect(() => {
		if (loginBtn.current) {
			loginBtn.current.addEventListener("animationend", resetFail)
		}
	}, [loginBtn])

	return (
		<>
			<NextSeo
				title={TITLE}
				description={DESC}
				canonical={process.env.NEXT_PUBLIC_BASE_URL + router.asPath}
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

			<PageHeader title={"로그인"} router={router} />

			<div className={style.login_wrap}>
				{loginType === "ddoga" && (
					<p className={style.login_type_info}>
						최근에 <strong>이메일</strong>로 로그인하셨어요
					</p>
				)}

				{loginType === "naver" && (
					<p className={style.login_type_info}>
						최근에 <strong>네이버</strong>로 로그인하셨어요
					</p>
				)}

				{loginType === "kakao" && (
					<p className={style.login_type_info}>
						최근에 <strong>카카오</strong>로 로그인하셨어요
					</p>
				)}

				<form onSubmit={loginSubmit} className={style.login_form}>
					<div className={style.input_box}>
						<input
							type={EMAIL}
							name={EMAIL}
							id={EMAIL}
							onChange={handleUpdate}
							className={style.login_input}
							required
						/>
						<label htmlFor={EMAIL} className={style.label}>
							이메일
						</label>
					</div>
					<div className={style.input_box}>
						<input
							type={PASSWORD}
							name={PASSWORD}
							id={PASSWORD}
							onChange={handleUpdate}
							className={style.login_input}
							required
						/>
						<label htmlFor={PASSWORD} className={style.label}>
							비밀번호
						</label>
					</div>

					<div className={style.util_box}>
						<Link href="/auth/findpassword">비밀번호를 잊으셨나요?</Link>
						<Link href="/signup">
							<a className={style.to_sign}>회원가입</a>
						</Link>
					</div>
					<button
						className={!fail ? style.login_btn : `${style.login_btn} ${style.failed}`}
						ref={loginBtn}
					>
						{fail ? "로그인에 실패했습니다" : "로그인"}
					</button>
				</form>

				<div className={style.sns_wrap}>
					<p className={style.sns_info}>
						쉽게 가입하고 <strong>바로 상담</strong>해 보세요
					</p>

					{Object.values(providers).map(provider => (
						<ProviderLogin
							provider={provider}
							key={provider.id}
							setLoading={setLoading}
							setLoginType={setLoginType}
						/>
					))}
					<div className={style.to_biz}>
						<p className={style.info}>요양시설 이신가요?</p>
						<a href="https://biz.ddoga.co.kr" target="_blank" rel="noopener noreferrer">
							또가비즈 바로가기
						</a>
					</div>
				</div>
			</div>

			{loading && <Loading />}
		</>
	)
}

export async function getServerSideProps() {
	const providers = await getProviders()
	return {
		props: { providers },
	}
}
