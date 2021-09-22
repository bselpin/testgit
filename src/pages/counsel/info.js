import { useEffect, useState } from "react"
import { NextSeo } from "next-seo"
import PageHeader from "components/layout/PageHeader"
// import A from "components/counsel/A"
import B from "components/counsel/B"

const TITLE = `상담글 쓰기 | ${process.env.NEXT_PUBLIC_SITE_NAME}`
const DESC =
	"요양에 관한 모든 궁금증을 또하나의가족에서 상담해보세요. 요양원이나 요양병원에 궁금한 것을 직접 상담하거나, 다양한 답변을 들을 수 있도록 공개상담을 올려보세요."

export default function Info({ router }) {
	const [localType, setLocalType] = useState(null)
	const { name } = router.query

	useEffect(() => {
		if (typeof window !== "undefined") {
			if (localStorage) {
				const localType = localStorage.getItem("type")
				setLocalType(localType)
			}
		}
	}, [])

	return (
		<>
			<NextSeo
				title={TITLE}
				description={DESC}
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

			<PageHeader
				title={name ? `${name}에 상담하기` : "온라인 상담글 안내"}
				router={router}
				noBtn={true}
			/>

			<B {...router.query} />
		</>
	)
}
