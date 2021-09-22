import Head from "next/head"
import Header from "components/layout/Header"
import Nav from "components/layout/Nav"
import Link from "next/link"
import style from "styles/404.module.scss"
import { useEffect, useState } from "react"

const TARGET = ["search", "hpt", "ltc", "knowhow", "guide"]

export default function Custom404({ router }) {
	const [mount, setMount] = useState(false)
	const path = router.asPath.split(/[/,?]+/)
	const target = TARGET.indexOf(path[1])

	useEffect(() => {
		if (typeof window !== "undefined") {
			if (target === 0 || target === 1 || target === 2) {
				window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_SEARCH_TARGET}`
			} else if (target === 3) {
				window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_CASE_TARGET}`
			} else if (target === 4) {
				window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_INFO_TARGET}`
			} else {
				setMount(true)
			}
		}
	}, [target])

	return (
		<div>
			<Head>
				<title>존재하지 않는 페이지입니다</title>
				<meta name="title" content="존재하지 않는 페이지입니다" />
			</Head>
			{mount ? (
				<>
					<Header />
					<div className={style.wrap}>
						<p className={style.text}>
							존재하지 않는 페이지에 <br />
							들어오셨어요!
						</p>
						<p className={style.info}>
							생성되지 않았거나 삭제된 페이지입니다. <br />
							계속 같은 증상이 반복된다면 주소창의 주소를 다시 확인해 주세요.
						</p>
						<Link href="/">
							<a className={style.home}>메인으로</a>
						</Link>
					</div>
					<Nav />
				</>
			) : (
				<div></div>
			)}
		</div>
	)
}
