import { useEffect, useState } from "react"
import { toastCall } from "lib/toastCall"
import useLogin from "lib/hooks/useLogin"

export default function WithAuth({ children, router, high }) {
	const [mount, setMount] = useState(false)
	const { user, login, loading } = useLogin()
	const { auth_level } = user

	useEffect(() => {
		if (!loading) {
			if (login) {
				if (high) {
					if (auth_level === 1) {
						setMount(true)
					} else {
						router.replace("/email/level")
					}
				} else {
					setMount(true)
				}
			} else {
				toastCall("로그인이 필요합니다", "warning")
				router.replace("/login")
			}
		}
	}, [loading])

	return <>{mount ? children : <div></div>}</>
}
