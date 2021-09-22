import { useState, useEffect, useCallback } from "react"
import { NextSeo } from "next-seo"
import Link from "next/link"
import { fetcher } from "lib/utils/api"
import { restoreScroll } from "lib/utils/scroll"
import { getCategoryName } from "lib/utils/listCommon"
import useScroll from "lib/hooks/useScroll"
import LtchList from "components/list/LtchList"
import LocationBar from "components/list/components/LocationBar"
import LiveSearch from "components/search/LiveSearch"
import Category from "components/search/Category"
import Location from "components/search/Location"
import Filter from "components/search/Filter"
import SearchHeader from "components/layout/SearchHeader"
import style from "styles/components/list.module.scss"

const SEARCH_TYPE = "search_type"
const VISIT = "visit"

export default function List({ data, props, router, categoryName }) {
	const scroll = useScroll()
	const { pathname, query } = router

	const { categoryId, nPageNum, gradeFilter, subjectFilter, scaleFilter, programFilter } =
		query

	const { arr_ltc_adminpttncds_categorys: categories, commonRegionCode: region } = props
	const { resultList, objPagingData, searchCondition } = data

	const [showLive, setShowLive] = useState(false)
	const toggleLive = useCallback(() => setShowLive(!showLive), [showLive])

	const [showCategory, setShowCategory] = useState(false)
	const toggleCategory = useCallback(() => setShowCategory(!showCategory), [showCategory])

	const [showLocation, setShowLocation] = useState(false)
	const toggleLocation = useCallback(() => setShowLocation(!showLocation), [showLocation])

	const [showFilter, setShowFilter] = useState(false)
	const [isFilter, setIsFilter] = useState(false)
	const toggleFilter = useCallback(() => setShowFilter(!showFilter), [showFilter])

	const [flex, setFlex] = useState(true)

	const topToPage = useCallback(() => window.scrollTo(0, 1))

	const setLocalBlock = useCallback(() => {
		localStorage.setItem(SEARCH_TYPE, "0")
		setFlex(false)
	})

	const setLocalFlex = useCallback(() => {
		localStorage.setItem(SEARCH_TYPE, "1")
		setFlex(true)
	})

	const isFlex = {
		flex,
		setLocalFlex,
		setLocalBlock,
	}

	const getIsFilter = filter => {
		if (filter && filter.length > 0) return true
		return false
	}

	useEffect(() => {
		if (typeof window !== "undefined") {
			if (localStorage) {
				const visit = localStorage.getItem(VISIT)
				if (!visit) {
					setShowLocation(true)
					localStorage.setItem(VISIT, true)
				}

				if (localStorage.getItem(SEARCH_TYPE) === null) {
					setLocalFlex()
				} else {
					if (localStorage.getItem(SEARCH_TYPE) === "1") setLocalFlex()
					else setLocalBlock()
				}
			}
		}
		restoreScroll("search")
	}, [])

	useEffect(() => {
		if (
			getIsFilter(gradeFilter) ||
			getIsFilter(subjectFilter) ||
			getIsFilter(scaleFilter) ||
			getIsFilter(programFilter)
		) {
			setIsFilter(true)
		} else {
			setIsFilter(false)
		}
	}, [router])

	const meta = {
		title: `${categoryName} 찾아보기 | ${process.env.NEXT_PUBLIC_SLOGAN}`,
		description: `${
			searchCondition.siDoName
		} ${searchCondition.siGunGuName.trim()}에 있는 ${categoryName}을 찾아보고, 궁금하신 ${categoryName}에 온라인으로 부담없이 상담해 보세요.`,
	}

	return (
		<>
			<NextSeo
				title={meta.title}
				description={meta.description}
				canonical={
					process.env.NEXT_PUBLIC_BASE_URL +
					`/search/list?siDoCd=A&siGunGuCd=A1&sort=access&nPageNum=1&categoryId=1`
				}
				openGraph={{
					url: process.env.NEXT_PUBLIC_BASE_URL + router.asPath,
					title: meta.title,
					description: meta.description,
					images: [
						{
							url: process.env.NEXT_PUBLIC_DEFAULT_IMG,
						},
					],
				}}
			/>

			<SearchHeader
				toggleLive={toggleLive}
				toggleCategory={toggleCategory}
				toggleLocation={toggleLocation}
				toggleFilter={toggleFilter}
				scroll={scroll}
				categoryName={categoryName}
				condition={searchCondition}
				router={router}
				categoryId={categoryId}
				isFilter={isFilter}
				isFlex={isFlex}
			/>

			<div className="outer_wrap search">
				<div
					className={flex ? style.search_list : `${style.search_list} ${style.no_flex}`}
				>
					{resultList.map((list, index) => (
						<LtchList list={list} key={index} flex={flex} />
					))}
				</div>

				{resultList.length === 0 && (
					<div className={style.no_result}>
						<div className={style.no_found}></div>
						<p className={style.text}>검색결과가 없습니다</p>
					</div>
				)}

				<div className={style.pagination}>
					{objPagingData.nPageNum >> 0 !== 1 && resultList.length > 0 && (
						<Link
							href={{
								pathname,
								query: {
									...router.query,
									nPageNum: (nPageNum >> 0) - 1,
								},
							}}
						>
							<a className={`${style.page_btn} ${style.prev}`} onClick={topToPage}>
								<span className={style.arrow}>{"<"}</span> 이전
							</a>
						</Link>
					)}

					{objPagingData.nPageNum >> 0 !== objPagingData.nTotalPageCount &&
						data.resultList.length > 0 && (
							<Link
								href={{
									pathname,
									query: {
										...router.query,
										nPageNum: (nPageNum >> 0) + 1,
									},
								}}
							>
								<a className={`${style.page_btn} ${style.next}`} onClick={topToPage}>
									다음 <span className={style.arrow}>{">"}</span>
								</a>
							</Link>
						)}
				</div>
			</div>

			<LiveSearch showLive={showLive} toggleLive={toggleLive} />

			<Category
				showCategory={showCategory}
				toggleCategory={toggleCategory}
				categories={categories}
				router={router}
				topToPage={topToPage}
			/>

			<Location
				showLocation={showLocation}
				toggleLocation={toggleLocation}
				region={region}
				router={router}
				topToPage={topToPage}
			/>

			<Filter showFilter={showFilter} toggleFilter={toggleFilter} router={router} />

			<div className={style.location_bar}>
				{categoryId !== "14" && (
					<LocationBar
						count={objPagingData.nListTotalCount}
						location={data.searchCondition}
					/>
				)}
			</div>
		</>
	)
}

const makeQueryUrl = query => {
	const {
		siDoCd,
		siGunGuCd,
		categoryId,
		nPageNum = "1",
		sort,
		gradeFilter,
		subjectFilter,
		scaleFilter,
		programFilter,
	} = query

	return `/search/list2?siDoCd=${siDoCd}&siGunGuCd=${siGunGuCd}&sort=${sort}&nPageNum=${nPageNum}&categoryId=${categoryId}${
		gradeFilter ? `&gradeFilter=${gradeFilter}` : ""
	}${subjectFilter ? `&subjectFilter=${subjectFilter}` : ""}${
		scaleFilter ? `&scaleFilter=${scaleFilter}` : ""
	}${programFilter ? `&programFilter=${programFilter}` : ""}`
}

export async function getServerSideProps({ query }) {
	const redirection = {
		redirect: {
			permanent: true,
			destination: process.env.NEXT_PUBLIC_SEARCH_TARGET,
		},
		props: {},
	}

	const { categoryId } = query

	if (Object.keys(query).length < 5 || Object.values(query).includes("undefined")) {
		return redirection
	} else {
		try {
			const data = await fetcher(makeQueryUrl(query), {
				timeout: parseInt(process.env.REQUEST_TIMEOUT),
			})

			const props = await fetcher("/commonRegionCode ", {
				timeout: parseInt(process.env.REQUEST_TIMEOUT),
			})

			const categoryName = getCategoryName(categoryId)

			if (data.objPagingData && props) {
				return { props: { data, props, categoryName } }
			} else {
				return redirection
			}
		} catch (error) {
			return redirection
		}
	}
}
