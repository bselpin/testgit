import { useEffect } from "react"
import Router from "next/router"

const Layout = ({ children, router }) => {
	const { pathname } = router

	useEffect(() => {
		if (process.env.NEXT_PUBLIC_ACTIVE_ANALITICS === "true") {
			const gtagGoogle = () => {
				if (typeof window !== "undefined") {
					const { title } = window.document
					const { href, pathname } = window.location

					window.gtag("config", process.env.NEXT_PUBLIC_GA_CODE, {
						page_title: title,
						page_location: href,
						page_path: pathname,
					})
				}
			}

			const wcsNaver = () => {
				if (typeof window !== "undefined") {
					if (!wcs_add) var wcs_add = {}

					wcs_add["wa"] = `"${process.env.NEXT_PUBLIC_WCS_CODE}"`

					if (window.wcs) {
						wcs_do()
					}
				}
			}

			const analytics = () => {
				gtagGoogle()
				wcsNaver()
			}

			Router.events.on("routeChangeComplete", analytics)

			return () => {
				Router.events.off("routeChangeComplete", analytics)
			}
		}
	}, [])

	if (pathname === "/search/list" || pathname === "/info") {
		return (
			<div
				className={`main_wrap ${pathname === "/search/list" ? "bg" : ""} ${
					pathname === "/info" ? "info" : ""
				}`}
			>
				<div className="outer_wrap">{children}</div>
			</div>
		)
	} else if (pathname === "/case/[caseId]") {
		return <div className="main_wrap">{children}</div>
	} else {
		return (
			<div className="main_wrap">
				<div className="outer_wrap">{children}</div>
			</div>
		)
	}
}

export default Layout
