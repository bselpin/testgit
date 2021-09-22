import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import { useRouter } from "next/router"
import jwt_decode from "jwt-decode"

const initialUser = {
	auth_level: 0,
	email: "",
	member_id: "",
	name: "",
	register_type: 0,
}

const useLogin = () => {
	const router = useRouter()
	const [login, setLogin] = useState({
		login: false,
		user: initialUser,
		auth: "",
		loading: true,
	})
	const [cookie, setCookie, removeCookie] = useCookies([
		process.env.NEXT_PUBLIC_COOKIE_NAME,
	])

	useEffect(() => {
		const token = cookie[process.env.NEXT_PUBLIC_COOKIE_NAME]
		const isToken =
			token && typeof token !== "undefined" && token !== "undefined" ? true : false
		if (isToken) {
			const decode = jwt_decode(token)
			const {
				data: { user, auth },
			} = decode
			setLogin({
				login: true,
				user,
				auth,
				loading: false,
			})
		} else {
			setLogin({
				login: false,
				user: initialUser,
				auth: "",
				loading: false,
			})
		}
	}, [router])

	useEffect(() => {
		const token = cookie[process.env.NEXT_PUBLIC_COOKIE_NAME]
		if (token === "undefined") {
			removeCookie(process.env.NEXT_PUBLIC_COOKIE_NAME, { path: "/" })
		}
	}, [router, cookie])

	return login
}

export default useLogin
