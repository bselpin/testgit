import { useState, useEffect } from "react"
import CallBtn from "components/detail/CallBtn"
import CounselBtn from "components/detail/CounselBtn"
import style from "styles/components/button.module.scss"

export default function ButtonContainer({
	code,
	name,
	telno,
	pttnCd,
	category,
	setCallModal,
}) {
	const [isTel, setIsTel] = useState(true)
	const [mount, setMount] = useState(false)
	const [newTel, setNewTel] = useState("")

	useEffect(() => {
		if (telno && telno.length > 0) {
			setIsTel(true)
			setNewTel(telno.replace(/-/gi, ""))
		} else {
			setIsTel(false)
		}
	}, [telno])

	useEffect(() => {
		setMount(true)
	}, [isTel])

	return (
		<div
			className={
				mount ? `${style.button_container} ${style.mount}` : style.button_container
			}
		>
			<div className="outer_wrap">
				<div className={style.btns_wrap}>
					<CounselBtn
						code={code}
						name={name}
						isTel={isTel}
						telno={newTel}
						pttnCd={pttnCd}
						category={category}
					/>

					{isTel && <CallBtn setCallModal={setCallModal} />}
				</div>
			</div>
		</div>
	)
}
