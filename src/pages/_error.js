import Head from "next/head"
import Header from "components/layout/Header"
import Nav from "components/layout/Nav"
import { useRouter } from "next/router"
import style from "styles/404.module.scss"

const CustomError = ({ statusCode }) => {
	const router = useRouter()

	return (
		<>
			<Head>
				<title>{statusCode} - 문제가 발생했습니다</title>
				<meta name="title" content={`${statusCode} - 문제가 발생했습니다`} />
			</Head>

			<Header />
			<div className={style.wrap}>
				<p className={style.text}>
					죄송합니다! <br />
					문제가 발생했어요!
				</p>
				<p className={style.info}>
					예상하지 못한 문제가 발생했습니다. <br />
					동일한 문제가 계속 발생할 경우 관리센터에 문의해 주세요. <br /> 사용에 불편을
					드려 대단히 죄송합니다.
				</p>
				<a className={style.home} onClick={() => router.back()}>
					뒤로 가기
				</a>
			</div>
			<Nav />
		</>
	)
}

Error.getInitialProps = ({ res, err }) => {
	const statusCode = res ? res.statusCode : err ? err.statusCode : 404
	console.error(err.config || err)
	return { statusCode }
}

export default CustomError
