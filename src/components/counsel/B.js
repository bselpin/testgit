import { useState, useEffect } from "react"
import Link from "next/link"
import style from "styles/counsel.module.scss"

export default function B({ code, name, category, telno, pttnCd }) {
	const [mount, setMount] = useState(false)

	useEffect(() => {
		if (typeof window !== "undefined") {
			setTimeout(() => {
				setMount(true)
			}, 500)
		}
	}, [])

	return (
		<div className={style.counsel_wrap_other}>
			<div className={style.section}>
				<div className={style.main}>
					<div className={style.title}>
						전화 상담 어렵다면, <br />
						<strong>온라인 상담하기</strong>
					</div>
					<div className={style.bg}></div>
					<p className={style.text}>
						온라인 상담글을 작성하고 <br />
						<span>요양시설의 답변을 하루만에 받아보세요!</span>
					</p>
				</div>
				<div className={style.info_section}>
					<div className={style.info_box}>
						<div className={`${style.icon} ${style.first}`}></div>
						<p className={style.info_text}>
							실명, <br />
							개인정보는 <br /> <span className={style.red}>NO</span>
						</p>
					</div>
					<div className={style.info_box}>
						<div className={`${style.icon} ${style.second}`}></div>
						<p className={style.info_text}>
							답변시간은 <br />
							<span className={style.blue}>
								24시간 <br />
								이내
							</span>
						</p>
					</div>
					<div className={style.info_box}>
						<div className={`${style.icon} ${style.third}`}></div>
						<p className={style.info_text}>
							답변 <br />
							알림은 <br />
							<span className={style.black}>이메일로</span>
						</p>
					</div>
				</div>
			</div>
			<div className={`${style.detail_section} ${style.last}`}>
				<p className={style.detail_title}>
					안내사항 <span>(꼭 확인하세요!)</span>
				</p>
				<p className={style.detail_text}>
					개인정보는 작성하지 마세요.
					<span>(실명, 상호, 주민번호, 전화번호 등)</span>
				</p>
				<p className={style.detail_text}>
					온라인 상담은 24시간 이내에 답변을 드립니다.
					<span>[월, 화, 수, 목, 금 09:00 - 18:00]</span>
				</p>
				<p className={style.detail_text}>
					답변 알림은 이메일로 제공되며 MY또가에서 확인하실 수 있습니다.
				</p>
			</div>
			<div>
				<div
					className={mount ? `${style.button_fixed} ${style.active}` : style.button_fixed}
				>
					<div className="outer_wrap no_padding">
						<div className={style.button_wrap}>
							<Link
								href={`/counsel/write?code=${code}&name=${name}&category=${category}&telno=${telno}&pttnCd=${pttnCd}`}
								replace
							>
								<a className={style.counsel_btn}>상담글 쓰기 {"  >"}</a>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
