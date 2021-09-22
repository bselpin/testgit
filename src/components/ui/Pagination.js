import { useCallback } from "react"
import Link from "next/link"
import style from "styles/components/pagination.module.scss"

const Pagination = ({ pagingData, pageNum, router }) => {
	const {
		nStartPageIndex,
		nLastPageIndex,
		nPageGroupIndex,
		nTotalPageCount,
		nCntPagePerGroup,
	} = pagingData

	const topToPage = useCallback(() => window.scrollTo(0, 0))

	const MakePage = ({ start, last }) => {
		let pagenationArr = []

		for (let i = start; i <= last; i++) {
			pagenationArr.push(
				<Link
					href={{
						pathname: router.pathname,
						query: { ...router.query, nPageNum: i },
					}}
					key={i}
				>
					<a
						className={
							pageNum >> 0 === i ? `${style.page_btn} ${style.active}` : style.page_btn
						}
						onClick={topToPage}
					>
						{i}
					</a>
				</Link>,
			)
		}
		return pagenationArr
	}

	return (
		<div className={style.pagination_box}>
			<div className={style.pagination}>
				{nPageGroupIndex !== nStartPageIndex && (
					<Link
						href={{
							pathname: router.pathname,
							query: { ...router.query, nPageNum: nStartPageIndex - 1 },
						}}
					>
						<a className={`${style.page_move_btn} ${style.prev}`} onClick={topToPage}>
							{"< "} 이전
						</a>
					</Link>
				)}
				<MakePage start={nStartPageIndex} last={nLastPageIndex} />
				{nLastPageIndex >= 5 && nPageGroupIndex * nCntPagePerGroup < nTotalPageCount && (
					<Link
						href={{
							pathname: router.pathname,
							query: { ...router.query, nPageNum: nLastPageIndex + 1 },
						}}
					>
						<a className={`${style.page_move_btn} ${style.next}`} onClick={topToPage}>
							다음 {" >"}
						</a>
					</Link>
				)}
			</div>
		</div>
	)
}

export default Pagination
