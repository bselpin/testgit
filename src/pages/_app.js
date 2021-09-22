import { useEffect } from "react"
import Head from "next/head"
import NProgress from "nprogress"
import Router, { useRouter } from "next/router"
import { ToastContainer } from "react-toastify"
import { kakaoInit, setTestType } from "lib/utils/init"
import { Provider } from "next-auth/client"
import Layout from "components/layout/Layout"
import { CookiesProvider } from "react-cookie"
import Maintenance from "./maintenance"
// import wrapper from "lib/store"
import "styles/globals.scss"
import "styles/panorama.scss"
import "styles/nprogress.scss"
import "styles/toast.scss"
import "styles/font.scss"
import "pannellum-react-next-no-video/es/css/pannellum.css"
import "pannellum-react-next-no-video/es/css/style-textInfo.css"
import "swiper/swiper.scss"
import "swiper/components/navigation/navigation.scss"

function App({ Component, pageProps }) {
	const router = useRouter()

	useEffect(() => {
		kakaoInit()
		setTestType()
		Router.events.on("routeChangeStart", () => NProgress.start())
		Router.events.on("routeChangeComplete", () => NProgress.done())
		Router.events.on("routeChangeError", () => NProgress.done())
	}, [])

	// 임시점검
	// useEffect(() => {
	// 	router.replace("/maintenance")
	// }, [])

	return (
		<Provider session={pageProps.session}>
			<CookiesProvider>
				<Head>
					<meta
						name="viewport"
						content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=yes, viewport-fit=cover"
					/>
					{process.env.NEXT_PUBLIC_NO_ROBOTS === "true" && (
						<meta
							name="robots"
							content="noindex, nofollow, noarchive, nosnippet, noodp, notranslate, noimageindex"
						/>
					)}
				</Head>
				{/* <Maintenance /> */}
				<Layout router={router}>
					<Component {...pageProps} router={router} />
					<ToastContainer position="bottom-right" autoClose={3000} />
				</Layout>
			</CookiesProvider>
		</Provider>
	)
}

// export default wrapper.withRedux(App)
export default App
