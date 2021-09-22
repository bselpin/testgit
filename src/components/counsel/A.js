import { useState, useEffect } from "react"
import Link from "next/link"
import style from "styles/counsel.module.scss"

export default function A({ code, name, category, telno }) {
	const [mount, setMount] = useState(false)

	useEffect(() => {
		if (typeof window !== "undefined") {
			setTimeout(() => {
				setMount(true)
			}, 500)
		}
	}, [])

	return (
		<div className={style.counsel_wrap}>
			<div className={style.section}>
				<div className={style.counsel_main}>
					<div className={style.title}>
						온라인 상담글을
						<br />
						작성하고
						<br />
						<span>
							요양시설의 답변을
							<br />
							<strong>하루만에</strong> 받아보세요
						</span>
					</div>
					<div className={style.counsel_bg}></div>
				</div>

				<p className={style.counsel_info}>
					간편한 온라인 상담으로
					<br />
					궁금하신 점 해결하세요!
				</p>
				<div className={style.down_arrow}></div>
			</div>
			<div className={style.section}>
				<div className={style.counsel_detail}>
					<div className={style.detail_title}>
						<p className={style.detail_text}>
							실명, <br />
							개인정보는 <span className={style.red}>NO</span>
						</p>
						<div className={`${style.detail_icon} ${style.first}`}></div>
					</div>
					<p className={style.detail_info}>
						개인정보는 작성하지 마세요 <span>(실명, 상호, 주민번호 등)</span>
					</p>
				</div>
				<div className={style.counsel_detail}>
					<div className={style.detail_title}>
						<p className={style.detail_text}>
							답변 시간은 <br />
							<span className={style.blue}>24시간 이내</span>
						</p>
						<div className={`${style.detail_icon} ${style.second}`}></div>
					</div>
					<p className={style.detail_info}>
						온라인 상담을 24시간 이내에 답변을 드립니다 <br />
						<span>[월, 화, 수, 목, 금 09:00 - 18:00]</span>
					</p>
				</div>
				<div className={`${style.counsel_detail} ${style.last}`}>
					<div className={style.detail_title}>
						<p className={style.detail_text}>
							답변 알림은 <br />
							<span className={style.black}>이메일로</span>
						</p>
						<div className={`${style.detail_icon} ${style.third}`}></div>
					</div>
					<p className={style.detail_info}>
						답변 알림은 이메일로 제공되며 MY또가에서 <br />
						확인하실 수 있습니다
					</p>
				</div>
			</div>
			<div
				className={
					mount ? `${style.button_fixed} ${style.active}` : style.button_fixed
				}
			>
				<div className="outer_wrap no_padding">
					<div className={style.button_wrap}>
						<Link
							href={`/counsel/write?code=${code}&name=${name}&category=${category}&telno=${telno}`}
						>
							<a className={style.counsel_btn}>
								안내사항 확인하고 글 작성하기 {"  >"}
							</a>
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}
