import { useState, useEffect } from "react"
import Link from "next/link"
import style from "styles/components/search.module.scss"

const LiveResult = ({ list }) => {
	const [target, setTarget] = useState(null)
	const [visible, setVisible] = useState(false)
	const {
		adminNm = null,
		yadmNm = null,
		address,
		addr,
		longTermAdminSym = null,
		ykiho = null,
		categoryName = null,
		categoryCd,
		_id,
	} = list

	const categoryType = () => {
		if (categoryName) {
			return categoryName
		} else if (yadmNm) {
			return "요양병원"
		} else {
			return "실버타운"
		}
	}

	const liveUrl = () => {
		if (categoryName) {
			return `/search/care/${longTermAdminSym}?category=${categoryCd}`
		} else if (yadmNm) {
			return `/search/hospital/${ykiho}?category=13`
		} else {
			return `/search/silver/${_id}?category=14`
		}
	}

	const onIntersect = ([entry]) => {
		if (entry.isIntersecting) {
			setVisible(true)
		} else {
			setVisible(false)
		}
	}

	useEffect(() => {
		let observer
		if (target) {
			observer = new IntersectionObserver(onIntersect, { threshold: 0.1 })
			observer.observe(target)
		}
		return () => observer && observer.disconnect()
	}, [target])

	return (
		<Link href={liveUrl()}>
			<a
				className={visible ? style.result_list : `${style.result_list} ${style.hidden}`}
				ref={setTarget}
			>
				{visible && (
					<>
						<p className={style.name}>
							{adminNm || yadmNm} <span className={style.type}>{categoryType()}</span>
						</p>
						<p className={style.address}>{address || addr}</p>
					</>
				)}
			</a>
		</Link>
	)
}

export default LiveResult
