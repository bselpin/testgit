import Head from "next/head"
import { NextSeo } from "next-seo"
import Calls from "components/counsel/Calls"

const TITLE = `전화상담 | ${process.env.NEXT_PUBLIC_SITE_NAME}`
const DESC =
	"요양정보(노인장기요양보험,노인장기요양등급) 조회, 요양시설(요양원,주간보호센터,방문요양) 찾기, 요양지식 검색"

export default function Call({ router }) {
	return (
		<>
			<NextSeo title={TITLE} description={DESC} />
			<Calls router={router} />
		</>
	)
}
