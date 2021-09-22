import { useEffect, useState } from "react"
import { NextSeo } from "next-seo"
import PageHeader from "components/layout/PageHeader"
import TelA from "components/counsel/TelA"
import TelB from "components/counsel/TelB"

const TITLE = `전화상담 | ${process.env.NEXT_PUBLIC_SITE_NAME}`
const DESC =
	"또하나의가족에서는 발신자 번호 표시 제한으로 전화 상담이 가능합니다. 개인전화번호가 노출되지 않으니 안심하고 상담을 진행하세요"

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
			{localType !== null && (
				<div>
					{localType >> 0 === 0 ? <TelA {...router.query} /> : <TelB {...router.query} />}
				</div>
			)}
		</>
	)
}
