import { useEffect } from "react"
import { NextSeo } from "next-seo"
import Link from "next/link"
import { fetcher } from "lib/utils/api"
import DetailHeader from "components/layout/DetailHeader"
import CaseList from "components/case/CaseList"
import style from "styles/case.module.scss"
import { restoreScroll } from "lib/utils/scroll"

const CasePage = ({ router, list }) => {
	const { caseId, name, category } = router.query
	const { resultList } = list

	useEffect(() => {
		restoreScroll()
	}, [])

	const meta = {
		title: `${name} 상담사례 | ${process.env.NEXT_PUBLIC_SLOGAN}`,
		description: `${name}에서 제공하는 상담사례 입니다`,
		url: process.env.NEXT_PUBLIC_BASE_URL + router.asPath,
	}

	return (
		<>
			<NextSeo
				title={meta.title}
				description={meta.description}
				openGraph={{
					url: meta.url,
					title: meta.title,
					description: meta.description,
					images: [
						{
							url: process.env.NEXT_PUBLIC_DEFAULT_IMG,
						},
					],
				}}
			/>

			<DetailHeader name={name} meta={meta} router={router} />
			{list && resultList.length > 0 ? (
				<div className={style.case_wrap}>
					{resultList.map((list, index) => (
						<CaseList list={list} key={index} />
					))}
				</div>
			) : (
				<div className={style.no_case_wrap}>
					<p className={style.text}>
						아직 상담사례가 없어요. <br /> <strong>{name}</strong>에 <br /> 상담을 시작해
						보시겠어요?
					</p>
					<Link href={`/counsel/info?code=${caseId}&name=${name}&category=${category}`}>
						<a className={style.case_link}>상담글 쓰기</a>
					</Link>
				</div>
			)}
		</>
	)
}

export async function getServerSideProps(context) {
	const { caseId } = context.query
	const data = await fetcher(`qna/detailQnaList/${caseId}`)

	return { props: { list: data } }
}

export default CasePage
