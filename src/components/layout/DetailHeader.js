import { useEffect, useState } from "react"
import Share from "components/ui/Share"
import HeaderUtil from "components/ui/HeaderUtil"
import style from "styles/components/header.module.scss"

const INFO_TARGET = process.env.NEXT_PUBLIC_INFO_TARGET
const CASE_TARGET = process.env.NEXT_PUBLIC_CASE_TARGET
const SEARCH_TARGET = process.env.NEXT_PUBLIC_SEARCH_TARGET

const DetailHeader = ({
	name,
	code,
	share,
	category,
	reviewCount = 0,
	caseCount = 0,
	meta,
	router,
}) => {
	const [isBack, setIsBack] = useState(true)

	const getPushUrl = path => {
		if (path === "info") return INFO_TARGET
		else if (path === "case") return CASE_TARGET
		else if (path === "search") return SEARCH_TARGET
		else return "/"
	}

	const path = router.pathname.split("/")
	const pushUrl = getPushUrl(path[1])

	useEffect(() => {
		if (typeof window !== "undefined") {
			if (window.history.length < 3) {
				setIsBack(false)
			} else {
				setIsBack(true)
			}
		}
	}, [])

	const detailHeaderProps = {
		code,
		name,
		category,
		reviewCount,
		caseCount,
	}

	const shareProps = {
		meta,
		share,
	}

	return (
		<div className={style.page_header}>
			<div className="outer_wrap">
				<div
					className={style.back_btn}
					onClick={() => {
						if (isBack) {
							router.back()
						} else {
							router.push(pushUrl)
						}
					}}
				></div>
				<div className={style.name}>{name}</div>
				{code && <HeaderUtil {...detailHeaderProps} />}
				{share && <Share {...shareProps} />}
			</div>
		</div>
	)
}

export default DetailHeader
