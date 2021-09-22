import Link from "next/link"
import style from "styles/components/header.module.scss"

const HeaderUtil = ({ category, name, code, reviewCount, caseCount }) => {
	return (
		<div className={style.header_util}>
			<Link href={`/search/review/${code}?category=${category}&name=${name}`}>
				<a className={style.util_btn}>
					후기 <span className={style.cnt}>{reviewCount}</span>
				</a>
			</Link>

			<Link href={`/search/case/${code}?category=${category}&name=${name}`}>
				<a className={style.util_btn}>
					상담사례 <span className={style.cnt}>{caseCount}</span>
				</a>
			</Link>
		</div>
	)
}

export default HeaderUtil
