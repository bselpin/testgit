import { useEffect, useState, useRef } from "react"
import { nextPost } from "lib/utils/api"
import useLogin from "lib/hooks/useLogin"
import style from "styles/counsel.module.scss"

export default function Calls({ router }) {
	const { login } = useLogin()
	const { code, telno, agree, name, category } = router.query
	const callBtn = useRef()
	const [counselType, setCounselType] = useState(null)
	const [callNo, setCallNo] = useState(null)

	const activeCall = () => {
		callBtn.current.click()
		router.back()
	}

	const submitForm = () => {
		// const callData = {
		// 	uniqueValue: code,
		// 	adminPttnCdCategoryId: category,
		// }

		const URL = login ? "case/writeCase" : "case/phoneCall"

		const data = {
			counselType,
			uniqueValue: code,
			uniqueValueName: name,
			categoryTypeMain: 1,
			categoryTypeSub: 2,
			adminpttncds_category: category,
			// write: false,
			// callData,
		}

		nextPost(URL, data)
			.then(() => {
				if (agree === "true") {
					setCallNo(`%2A23%23${telno}`)
				} else {
					setCallNo(telno)
				}
			})
			.catch(() => {
				alert("전화 상담에 문제가 발생했습니다. 잠시 후 다시 시도해 주세요")
				router.back()
			})
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
		if (router.isReady) {
			if (counselType !== null) submitForm()
		}
	}, [router, counselType])

	// 번호가 지정되면 바로 전화
	useEffect(() => {
		if (callNo !== null) activeCall()
	}, [callNo])

	return (
		<div className={style.call_wrap}>
			<div>
				안심되는
				<br />
				또가상담
			</div>
			<a href={`tel:${callNo}`} ref={callBtn} className={style.call_btn}>
				{telno}
			</a>
		</div>
	)
}
