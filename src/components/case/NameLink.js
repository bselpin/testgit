import Link from "next/link"
import style from "styles/case.module.scss"

const NameLink = ({ uniqueValueName, URL }) => {
	if (uniqueValueName && uniqueValueName !== "undefined") {
		return (
			<Link href={URL}>
				<a className={style.name}>
					{uniqueValueName}
					<span className={style.spans}>님의 답변입니다</span>
				</a>
			</Link>
		)
	} else {
		return (
			<a className={`${style.name} ${style.no_link}`}>
				또가 사회복지사
				<span className={style.spans}>님의 답변입니다</span>
			</a>
		)
	}
}

export default NameLink
