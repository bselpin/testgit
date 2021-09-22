import Link from "next/link"
import { useRouter } from "next/router"
import { timeForToday } from "lib/utils/time"
import { addCommas, textLimit } from "lib/utils/listCommon"
import sanitizeHtml from "sanitize-html"
import parse from "html-react-parser"
import { savePos } from "lib/utils/scroll"
import style from "styles/case.module.scss"

const CaseAnswer = ({ answer, count, access }) => {
	const router = useRouter()
	const { pathname } = router
	const { createdate, uniqueValueName, removeTag, contents } = answer

	const parsed = () => {
		if (contents) {
			return sanitizeHtml(parse(contents), {
				allowedTags: [""],
			})
		} else {
			return removeTag
		}
	}

	return (
		<div className={style.case_answer_box}>
			<p className={style.title}>
				<span className={style.answer_tag}>답변</span>
				{pathname.includes("search") ? null : (
					<span className={style.name}>
						{uniqueValueName && uniqueValueName !== "undefined"
							? uniqueValueName
							: "또가 사회복지사"}
					</span>
				)}

				{/* <span className={style.location}>서울 / 노원구 / 요양병원</span> */}
			</p>
			<p className={style.answer}>{textLimit(parsed(), 100)}</p>
			<div className={style.question_info}>
				<p className={style.info}>
					조회수 <span className={style.cnt}>{addCommas(access)}</span>
					<span className={style.divider}>•</span>
					<span className={style.info}>{timeForToday(createdate)} 답변</span>
				</p>
				<p className={style.another}>
					{count - 1 > 0 ? (
						<>
							<span className={style.divider}>•</span>
							<span>그 외 답변 {count}개</span>
						</>
					) : null}
				</p>
			</div>
		</div>
	)
}

const CaseQuestion = ({ contents, answer, subject }) => {
	return (
		<div className={style.case_question_box}>
			<p className={style.title}>{textLimit(subject, 50)}</p>
			{!answer || answer.length === 0 ? (
				<p className={style.text}>{textLimit(contents, 120)}</p>
			) : null}
		</div>
	)
}

const CaseList = ({ list }) => {
	const {
		answer,
		contents,
		subject,
		answer_cnt,
		_id,
		createdate,
		accessCount: access,
	} = list

	return (
		<Link href={`/case/${_id}`}>
			<a className={style.case_list} onClick={() => savePos("case")}>
				<CaseQuestion
					subject={subject}
					contents={contents}
					answer={answer}
					createdate={createdate}
				/>
				{!answer || answer.length === 0 ? null : (
					<CaseAnswer answer={answer} count={answer_cnt} access={access} />
				)}
			</a>
		</Link>
	)
}

export default CaseList
