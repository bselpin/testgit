import { useEffect, useState, useCallback } from "react"
import { NextSeo } from "next-seo"
import Link from "next/link"
import { nextPost } from "lib/utils/api"
import WithAuth from "components/WithAuth"
import PageHeader from "components/layout/PageHeader"
import Button from "components/ui/Button"
import style from "styles/counsel.module.scss"

const TITLE_LIMIT = 50
const TEXT_LIMIT = 1000
const PLACEHOLDER =
	"1. 장기요양등급 여부 :\n2. 기초생활수급자/감경 대상 여부 :\n3. 질병명 :\n4. 신체 및 인지 상태 : \n5. 성별/나이/지역 : \n6. 상담 내용 : "

const Write = ({ router }) => {
	const { code, name, category, telno, pttnCd } = router.query
	const [hide, setHide] = useState(false)
	const [form, setForm] = useState({
		subject: "",
		contents: "",
	})
	const [counselType, setCounselType] = useState(null)

	const TITLE = `상담글 쓰기 | ${process.env.NEXT_PUBLIC_SITE_NAME}`
	const DESC =
		"요양에 관한 모든 궁금증을 또하나의가족에서 상담해보세요. 요양원이나 요양병원에 궁금한 것을 직접 상담하거나, 다양한 답변을 들을 수 있도록 공개상담을 올려보세요"

	const isCare = category !== "13" && category !== "14"

	const limitText = useCallback(
		e => {
			let limit
			const { value, name } = e.target
			if (name === "subject") {
				limit = TITLE_LIMIT
			} else if (name === "contents") {
				limit = TEXT_LIMIT
			}

			value.length > limit
				? setForm({
						...form,
						[name]: value.slice(0, limit),
				  })
				: setForm({ ...form, [name]: value })
		},
		[form],
	)

	const submitForm = () => {
		const data = {
			...form,
			counselType,
			uniqueValue: code || null,
			uniqueValueName: name || null,
			categoryTypeMain: code ? 1 : 2,
			categoryTypeSub: 1,
			adminpttncds_category: category,
			write: true,
			pttnCd,
		}

		if (form.subject.length === 0 || form.contents.length === 0) {
			alert("제목과 내용을 작성하셔야 합니다")
		} else {
			nextPost("case/writeCase", data)
				.then(res => {
					router.replace(`/case/${res.data._id}`)
				})
				.catch(() => {
					alert(
						"상담글 작성에 문제가 발생했습니다. 문제가 지속적으로 발생할 경우 또가에 문의해 주세요",
					)
					router.back()
				})
		}
	}

	useEffect(() => {
		if (typeof window !== "undefined") {
			if (localStorage) {
				const localType = localStorage.getItem("type")
				setCounselType(localType)
			}
		}
	}, [])

	useEffect(() => {
		// 시설 지정 상담일 경우 PLACEHOLDER를 밸류로 가짐
		if (isCare) {
			setForm({
				subject: "",
				contents: PLACEHOLDER,
			})
		}
	}, [])

	useEffect(() => {
		if (form.subject.length === 0 || form.contents.length === 0) {
			setHide(false)
		} else {
			setHide(true)
		}
	}, [form])

	const buttonProps = {
		label: "상담글 보내기",
		func: submitForm,
		hide,
	}

	return (
		<>
			<NextSeo
				title={TITLE}
				description={DESC}
				openGraph={{
					url: process.env.NEXT_PUBLIC_BASE_URL + router.asPath,
					title: TITLE,
					description: DESC,
					images: [
						{
							url: process.env.NEXT_PUBLIC_DEFAULT_IMG,
						},
					],
				}}
			/>
			<WithAuth router={router} high={true}>
				<PageHeader title="상담글 쓰기" type={true} router={router} />

				<div className={style.write_wrap}>
					<input
						name="subject"
						type="text"
						value={form.subject}
						onChange={limitText}
						className={style.input}
						placeholder="제목을 입력해 주세요 (최대 50자)"
					/>

					{isCare && (
						<p className={style.info}>
							아래 사항을 기입해주시면 정확한 안내가 가능합니다.
						</p>
					)}

					{category === "13" && (
						<>
							<p className={style.info}>
								<span className={style.info_span}>
									- 환자 상태(나이, 성별, 기저귀 착용 여부, 타 병원 이용 여부 등)를 정확히
									입력해 주세요
								</span>
							</p>
							<p className={style.info}>
								<span className={style.info_span}>
									- 비용 문의시에는 전화상담을 진행해 주세요{" "}
								</span>
								<Link
									href={`/counsel/tel?code=${code}&name=${name}&telno=${telno}&category=${category}`}
								>
									<a className={style.call_link}>전화 상담하기 {" >"}</a>
								</Link>
							</p>
						</>
					)}

					<textarea
						name="contents"
						value={form.contents}
						onChange={limitText}
						className={style.textarea}
						placeholder="상담 내용을 입력해 주세요 (최대 1000자)"
					></textarea>

					<div className={style.button_wrap}>
						<div className="outer_wrap">
							<div className="inner_wrap">
								<Button {...buttonProps} />
							</div>
						</div>
					</div>
				</div>
			</WithAuth>
		</>
	)
}

export default Write
