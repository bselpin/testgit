import { useState, useCallback } from "react"
import { NextSeo } from "next-seo"
import { getProviders } from "next-auth/client"
import PageHeader from "components/layout/PageHeader"
import SignupProcess from "components/signup/SignupProcess"
import SignupBtns from "components/signup/SignupBtns"
import LoginInfo from "components/signup/LoginInfo"
import PasswordInfo from "components/signup/PasswordInfo"
import UserInfo from "components/signup/UserInfo"
import TermInfo from "components/signup/TermInfo"
import Loading from "components/ui/Loading"
import style from "styles/signup.module.scss"

const TITLE = `회원가입 | ${process.env.NEXT_PUBLIC_SITE_NAME}`
const DESC = "또하나의가족 회원가입 페이지입니다."

export default function Signup({ router, providers }) {
	const [progress, setProgress] = useState(0)
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [name, setName] = useState("")
	const [birthday, setBirthday] = useState("")
	const [gender, setGender] = useState(null)
	const [is_marketing, setis_marketing] = useState(1)
	const [enable, setEnable] = useState({
		first: false,
		second: false,
		third: false,
	})
	const [loading, setLoading] = useState(false)

	const nextProgress = () => {
		setProgress(progress + 1)
	}

	const prevProgress = () => {
		setProgress(progress - 1)
	}

	const handleEnable = useCallback(
		(toggle, order) => {
			if (toggle) {
				setEnable({
					...enable,
					[order]: true,
				})
			} else {
				setEnable({
					...enable,
					[order]: false,
				})
			}
		},
		[enable],
	)

	const handleInput = useCallback((e, setState) => setState(e.target.value))

	const loginInfo = {
		progress,
		setEmail,
		handleEnable,
		handleInput,
		providers,
		enable,
		setLoading,
	}

	const passwordInfo = {
		progress,
		password,
		setPassword,
		handleEnable,
		handleInput,
	}

	const userInfo = {
		progress,
		name,
		setName,
		birthday,
		setBirthday,
		gender,
		setGender,
		handleEnable,
		handleInput,
		enable,
	}

	const termInfo = {
		is_marketing,
		setis_marketing,
		progress,
	}

	const signupBtnProps = {
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
	}

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

			<PageHeader title={"회원가입"} type={true} router={router} />

			<div className={style.signup_wrap}>
				<SignupProcess progress={progress} />
				<LoginInfo {...loginInfo} />
				<PasswordInfo {...passwordInfo} />
				<UserInfo {...userInfo} />
				<TermInfo {...termInfo} />
			</div>

			<div className={style.signup_btns}>
				<SignupBtns {...signupBtnProps} />
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
