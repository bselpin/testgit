import Link from "next/link"
import style from "styles/components/header.module.scss"

const MyPageQuerySearch = ({ query, router }) => {
	const { keyword } = router.query
	const queries = Object.values(router.query)

	const toTheTop = () => window.scrollTo(0, 0)

	const includeQuery = (queries, query) => queries.includes(query)

	return (
		<div className={style.info_search_order}>
			{query.map((query, index) => (
				<Link
					href={{
						pathname: `${query.pathname}/${query.query}`,
						query: {
							nPageNum: 1,
						},
					}}
					key={index}
					replace
				>
					<a
						className={
							includeQuery(queries, query.className)
								? `${style.order_link} ${style.active}`
								: style.order_link
						}
						onClick={toTheTop}
					>
						{query.name}
					</a>
				</Link>
			))}
		</div>
	)
}

export default MyPageQuerySearch
