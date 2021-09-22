import Cookies from "universal-cookie"

const cookies = new Cookies()

export const removeCookie = () => {
	cookies.remove(process.env.NEXT_PUBLIC_COOKIE_NAME, {
		path: "/",
		domain:
			process.env.NODE_ENV === "production"
				? process.env.NEXT_PUBLIC_COOKIE_DOMAIN
				: undefined,
	})
}

export const option = {
	path: "/",
	sameSite: "lax",
	maxAge: 60 * 60 * 24,
	domain:
		process.env.NODE_ENV === "production"
			? process.env.NEXT_PUBLIC_COOKIE_DOMAIN
			: undefined,
}
