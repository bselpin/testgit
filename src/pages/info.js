import { useEffect, useState, useCallback } from "react"
import { NextSeo } from "next-seo"
import { fetcher } from "lib/utils/api"
import { restoreScroll } from "lib/utils/scroll"
import InfoHeader from "components/layout/InfoHeader"
import InfoCard from "components/info/InfoCard"
import Nav from "components/layout/Nav"
import Pagination from "components/ui/Pagination"
import style from "styles/info.module.scss"
import useScroll from "lib/hooks/useScroll"

const TRENDY = ["요양원", "요양보호사", "치매", "장기요양보험", "방문요양"]

const QUERY = [
	{
		name: "최신순",
		pathname: "/info",
		query: "createdate",
		className: "createdate",
	},
	{
		name: "조회순",
		pathname: "/info",
		query: "accessCount",
		className: "accessCount",
	},
]

const TITLE = `요양정보 | ${process.env.NEXT_PUBLIC_SLOGAN} | ${process.env.NEXT_PUBLIC_SITE_NAME}`
const DESC =
	"요양에 대한 정보를 한데 모아 알기 쉽게 제공해 드립니다. 또가에서 궁금하신 요양정보를 검색해 보세요"

export default function Info({ data, router }) {
	const scroll = useScroll()
	const { sort, nPageNum, keyword } = router.query
	const { resultList, objPagingData } = data
	const [focused, setFocused] = useState(false)
	const [flex, setFlex] = useState(true)
	const [searchkeyword, setSerachKeyword] = useState("")

	const handleSubmit = () => {
		router.replace(
			`/info?sort=${sort}&nPageNum=1&keyword=${encodeURI(
				encodeURIComponent(searchkeyword),
				undefined,
			)}`,
		)
	}

	const handleUpdate = value => {
		setSerachKeyword(value)
	}

	const setLocalBlock = useCallback(() => {
		localStorage.setItem("info_type", "0")
		setFlex(false)
	})

	const setLocalFlex = useCallback(() => {
		localStorage.setItem("info_type", "1")
		setFlex(true)
	})

	const isFlex = {
		flex,
		setLocalFlex,
		setLocalBlock,
	}

	const submit = {
		searchkeyword,
		handleUpdate,
		handleSubmit,
		setSerachKeyword,
	}

	useEffect(() => {
		if (typeof window !== "undefined") {
			if (localStorage) {
				if (localStorage.getItem("info_type") === null) {
					setLocalFlex()
				} else {
					if (localStorage.getItem("info_type") === "1") setLocalFlex()
					else setLocalBlock()
				}
			}
		}
	}, [])

	useEffect(() => {
		restoreScroll("info")
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
					process.env.NEXT_PUBLIC_BASE_URL + "?sort=createdate&nPageNum=1&keyword="
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
				title={"요양정보"}
				isFlex={isFlex}
				placeholder={"요양정보를 검색하세요"}
				focused={focused}
				setFocused={setFocused}
				query={QUERY}
				submit={submit}
				router={router}
				trendy={TRENDY}
				scroll={scroll}
			/>

			<div className={style.info_list_wrap}>
				{resultList.length > 0 &&
					resultList.map(list => <InfoCard list={list} flex={flex} key={list._id} />)}
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
			destination: process.env.NEXT_PUBLIC_INFO_TARGET,
		},
		props: {},
	}

	if (Object.keys(query).length <= 1 || Object.values(query).includes("undefined")) {
		return redirection
	} else {
		try {
			const { sort, keyword, nPageNum } = query
			const data = await fetcher(
				`/guide/getguideInfo/list?sort=${sort}&nPageNum=${nPageNum}&keyword=${keyword}`,
			)
			return { props: { data: data } }
		} catch (error) {
			return redirection
		}
	}
}
