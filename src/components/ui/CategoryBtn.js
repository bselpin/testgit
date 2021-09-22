import { memo, useState, useEffect, useCallback } from "react"
import Link from "next/link"
import style from "styles/home.module.scss"
import searchStyle from "styles/components/search.module.scss"
import { resetPos } from "lib/utils/scroll"
import { removeSessionStorage } from "lib/utils/session"

const FILTER = "filter"

const CategoryBtn = ({ list, toggleCategory, router }) => {
	const { pathname } = router
	const { siDoCd, siGunGuCd, sort } = router.query
	const [localSiDoCd, setSiDocd] = useState("A")
	const [localSiGunGuCd, steSiGunGuCd] = useState("A0")
	const [visit, setVisit] = useState(false)
	const { _id, class_name, adminPttnCd_categoryName } = list

	const topToPage = useCallback(() => window.scrollTo(0, 1))

	useEffect(() => {
		if (typeof window !== "undefined") {
			if (localStorage) {
				const userLocation = localStorage.getItem("userLocation")
				const visit = localStorage.getItem("visit")
				if (userLocation) {
					const location = JSON.parse(userLocation)
					setSiDocd(location.sido)
					steSiGunGuCd(location.sigungu)
				}

				if (visit) {
					setVisit(true)
				}
			}
		}
	}, [])

	const getSearchUrl = () => {
		return `/search/list?siDoCd=${siDoCd}&siGunGuCd=${siGunGuCd}&sort=${sort}&nPageNum=1&categoryId=${_id}`
	}

	const getHomeUrl = () => {
		if (visit)
			return `/search/list?siDoCd=${localSiDoCd}&siGunGuCd=${localSiGunGuCd}&sort=access&nPageNum=1&categoryId=${_id}`
		else
			return `/search/list?siDoCd=A&siGunGuCd=A0&sort=access&nPageNum=1&categoryId=${_id}`
	}

	if (pathname === "/") {
		return (
			<li className={style.category_list} onClick={() => resetPos("search")}>
				<Link href={getHomeUrl()}>
					<a onClick={() => removeSessionStorage(FILTER)}>
						<div className={`${style.icon} ${style[class_name]}`}></div>
						<p className={style.icon_label}>{adminPttnCd_categoryName}</p>
						{_id === "14" && <p className={style.new}>New</p>}
					</a>
				</Link>
			</li>
		)
	}

	if (pathname === "/search/list")
		return (
			<li
				className={searchStyle.category_list}
				key={_id}
				onClick={() => resetPos("search")}
			>
				<Link href={getSearchUrl()}>
					<a
						onClick={() => {
							toggleCategory()
							topToPage()
							removeSessionStorage(FILTER)
						}}
					>
						<div className={`${searchStyle.icon} ${searchStyle[class_name]}`}></div>
						<p className={searchStyle.icon_label}>{adminPttnCd_categoryName}</p>
						{_id === "14" && <p className={searchStyle.new}>New</p>}
					</a>
				</Link>
			</li>
		)
}

export default memo(CategoryBtn)
