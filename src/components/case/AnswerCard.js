import Link from "next/link"
import parse from "html-react-parser"
import sanitizeHtml from "sanitize-html"
import NameLink from "components/case/NameLink"
import { timeForToday } from "lib/utils/time"
import style from "styles/case.module.scss"

const AnswerCard = ({ answer }) => {
	const {
		createdate,
		contents,
		uniqueValueName,
		uniqueValue,
		adminpttncds_category: category,
		pttnCd,
	} = answer

	console.log(answer, "test")

	const toDetailUrl = category => {
		if (category && category !== "undefined" && category !== "13") {
			if (category !== "14") {
				return `/search/care/${uniqueValue}?category=${category}&pttnCd=${pttnCd}`
			} else {
				return `/search/silver/${uniqueValue}?category=${category}&pttnCd=${pttnCd}`
			}
		} else {
			return `/search/hospital/${uniqueValue}?category=${category}&pttnCd=${pttnCd}`
		}
	}

	const URL = toDetailUrl(category)

	return (
		<div className={style.answer_card}>
			<div className={style.answer_header}>
				<NameLink uniqueValueName={uniqueValueName} URL={URL} />
				{uniqueValueName && uniqueValueName !== "undefined" && (
					<Link href={URL}>
						<a className={style.answer_link}>
							바로
							<br />
							가기
						</a>
					</Link>
				)}

				{/* <span className={style.location_answer}>서울 / 노원구 / 요양병원</span> */}
			</div>

			<div
				className={style.answer_text}
				dangerouslySetInnerHTML={{
					__html: sanitizeHtml(parse(contents), {
						allowedAttributes: {
							a: ["href"],
						},
					}),
				}}
			></div>
			<div className={style.answer_info}>
				<span className={style.time}>{timeForToday(createdate)} 답변</span>
			</div>
		</div>
	)
}

export default AnswerCard
