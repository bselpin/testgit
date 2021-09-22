import { useEffect, useState } from "react"
import Link from "next/link"
import { resetPos } from "lib/utils/scroll"
import FlexControl from "components/layout/FlexControl"
import style from "styles/components/header.module.scss"

const SearchHeader = ({
	toggleLive,
	toggleLocation,
	toggleCategory,
	toggleFilter,
	scroll,
	categoryName,
	router,
	condition,
	categoryId,
	isFilter,
	isFlex,
}) => {
	const [yPos, setYpos] = useState(0)
	const queries = Object.values(router.query)
	const toTheTop = () => {
		window.scrollTo(0, yPos + 1)
	}
	const includeQuery = (queries, query) => queries.includes(query)

	const isSilver = categoryId => categoryId === "14"

	const query = [
		{
			name: "인기순",
			pathname: router.pathname,
			query: "access",
			className: "access",
		},
		{
			name: "상담 많은 순",
			pathname: router.pathname,
			query: "consulting",
			className: "consulting",
		},
		{
			name: "후기 많은 순",
			pathname: router.pathname,
			query: "review",
			className: "review",
		},
	]

	useEffect(() => {
		if (typeof window !== "undefined") setYpos(window.scrollY)
	}, [])

	return (
		<div className={`${style.page_header} ${style.search}`}>
			<div className="outer_wrap">
				<div className={style.search_header_wrap}>
					<div
						className={style.back_btn}
						onClick={() => {
							router.push("/")
							resetPos("search")
						}}
					></div>
					<div className={style.search_header_box}>
						<div className={style.input} onClick={toggleLive}>
							<p className={`${style.keyword} ${style.placeholder}`}>
								시설명을 검색하세요
							</p>
						</div>
					</div>
				</div>
			</div>

			<div
				className={
					scroll ? style.search_util_wrap : `${style.search_util_wrap} ${style.up}`
				}
			>
				<div className="outer_wrap">
					<div className={style.search_util}>
						<p
							className={
								categoryId !== "14"
									? style.search_status
									: `${style.search_status} ${style.full}`
							}
							onClick={toggleCategory}
						>
							{categoryName}
						</p>

						{categoryId !== "14" && (
							<p className={style.search_status} onClick={toggleLocation}>
								{condition ? condition.siDoName : "서울"}
								<span className={style.divider}>{">"}</span>
								{condition ? condition.siGunGuName.trim() : "전체"}
							</p>
						)}

						{categoryId !== "14" && (
							<p
								className={isFilter ? `${style.filter} ${style.active}` : style.filter}
								onClick={toggleFilter}
							>
								<span
									className={
										isFilter ? `${style.filter_icon} ${style.active}` : style.filter_icon
									}
								></span>
								옵션
							</p>
						)}
					</div>
					<div className={style.search_order}>
						{query.map((query, index) => (
							<Link
								href={{
									pathname: query.pathname,
									query: {
										...router.query,
										sort: query.query,
										nPageNum: 1,
									},
								}}
								key={index}
							>
								<a
									className={
										includeQuery(queries, query.className)
											? `${style.order_link} ${style.active}`
											: style.order_link
									}
									onClick={() => {
										toTheTop()
									}}
								>
									{query.name}
								</a>
							</Link>
						))}
						<FlexControl {...isFlex} search={true} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default SearchHeader
