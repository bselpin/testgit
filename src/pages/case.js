import { useEffect, useState, useCallback } from "react"
import { NextSeo } from "next-seo"
import { fetcher } from "lib/utils/api"
import { restoreScroll } from "lib/utils/scroll"
import Nav from "components/layout/Nav"
import InfoHeader from "components/layout/InfoHeader"
import CaseList from "components/case/CaseList"
import Pagination from "components/ui/Pagination"
import useScroll from "lib/hooks/useScroll"
import style from "styles/case.module.scss"

const TRENDY = ["노인장기요양보험", "장기요양등급", "요양병원", "요양", "치매"]

const QUERY = [
	{
		name: "최신답변순",
		pathname: "/case",
		query: "qna_answers_updatedate",
		className: "qna_answers_updatedate",
	},
	{
		name: "최신질문순",
		pathname: "/case",
		query: "createdate",
		className: "createdate",
	},
	{
		name: "조회순",
		pathname: "/case",
		query: "accessCount",
		className: "accessCount",
	},
]

const TITLE = `상담사례 | ${process.env.NEXT_PUBLIC_SLOGAN} | ${process.env.NEXT_PUBLIC_SITE_NAME}`
const DESC =
	"요양에 관한 모든 궁금증을 또하나의가족에서 상담해보세요. 요양원이나 요양병원에 궁금한 것을 직접 상담하거나, 다양한 답변을 들을 수 있도록 공개상담을 올려보세요."

export default function Case({ data, router }) {
	const scroll = useScroll()
	const { sort, nPageNum, keyword } = router.query
	const { resultList, objPagingData } = data
	const [focused, setFocused] = useState(false)
	const [searchkeyword, setSerachKeyword] = useState("")

	const handleSubmit = () => {
		router.replace(
			`/case?sort=${sort}&nPageNum=1&keyword=${encodeURI(
				encodeURIComponent(searchkeyword),
				undefined,
			)}`,
		)
	}

	const handleUpdate = useCallback(
		value => {
			setSerachKeyword(value)
		},
		[searchkeyword],
	)

	const submit = {
		searchkeyword,
		handleUpdate,
		handleSubmit,
	}

	useEffect(() => {
		restoreScroll("case")
		if (keyword && keyword.length > 0) {
			setSerachKeyword(decodeURIComponent(keyword))
		} else if (keyword.length === 0) {
			setSerachKeyword("")
		}
	}, [keyword])

	return (
		<>
			<NextSeo
				title={TITLE}
				description={DESC}
				canonical={
					process.env.NEXT_PUBLIC_BASE_URL +
					"?sort=qna_answers_updatedate&nPageNum=1&keyword="
				}
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

			<InfoHeader
				title={"상담사례"}
				placeholder={"상담사례를 검색하세요"}
				focused={focused}
				setFocused={setFocused}
				query={QUERY}
				submit={submit}
				router={router}
				trendy={TRENDY}
				scroll={scroll}
			/>

			<div className={style.case_list_wrap}>
				{resultList.map(list => (
					<CaseList list={list} key={list._id} />
				))}
				{resultList.length === 0 && <div className="no_wrap">검색결과가 없습니다</div>}
				{resultList.length > 0 && (
					<Pagination pagingData={objPagingData} pageNum={nPageNum} router={router} />
				)}
			</div>

			<Nav hidden={focused} />
		</>
	)
}

export async function getServerSideProps({ query }) {
	const redirection = {
		redirect: {
			permanent: true,
			destination: process.env.NEXT_PUBLIC_CASE_TARGET,
		},
		props: {},
	}

	if (Object.keys(query).length < 2 || Object.values(query).includes("undefined")) {
		return redirection
	} else {
		try {
			const { sort, keyword, nPageNum } = query
			const data = await fetcher(
				`/qna/list?sort=${sort}&nPageNum=${nPageNum}&keyword=${keyword}`,
				{
					timeout: parseInt(process.env.REQUEST_TIMEOUT),
				},
			)
			return { props: { data: data } }
		} catch (error) {
			return redirection
		}
	}
}
