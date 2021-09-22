import { useState, useEffect } from "react"
import Link from "next/link"
import style from "styles/counseltel.module.scss"

export default function TelB({ code, telno, name, category }) {
	const [mount, setMount] = useState(false)
	const [agree, setAgree] = useState(false)

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
						방문없이 안전하게 <br />
						<strong className={style.green}>전화 상담하기</strong>
					</div>
					<div className={style.bg}></div>
					<p className={style.text}>요양시설과 1:1로 빠른 상담 받아보세요!</p>
				</div>
				<div className={style.info_section}>
					<div className={style.info_box}>
						<div className={`${style.icon} ${style.first}`}></div>
						<p className={style.info_text}>
							개인전화번호
							<br />
							<span className={style.green}>노출안심</span>
						</p>
					</div>
					<div className={style.info_box}>
						<div className={`${style.icon} ${style.second}`}></div>
						<p className={style.info_text}>
							상담 연결 <br />
							<span>사전 안내</span>
						</p>
					</div>
					<div className={style.info_box}>
						<div className={`${style.icon} ${style.third}`}></div>
						<p className={style.info_text}>
							상담 후에는 <br />
							<span className={style.blue}>후기 등록</span>
						</p>
					</div>
				</div>
			</div>
			<div className={`${style.detail_section} ${style.last}`}>
				<p className={style.detail_title}>
					안내사항 <span>(꼭 확인하세요!)</span>
				</p>
				<p className={style.detail_text}>
					요양시설에서 전화를 받으면, &quot;또하나의가족에서 연결하는 상담전화
					입니다.&quot; 라는 사전 안내를 제공합니다.
				</p>
				<p className={style.detail_text}>
					부모님 요양상담이 필요한 다수의 보호자에게 도움이 되는 후기를
					남겨주세요
				</p>
				<p className={style.tel_info_b}>
					※ 개인전화번호가 노출되지 않는 전화상담을 원하신다면 아래의 항목을
					체크해 주세요. <br /> 단, 이런 경우 사전 안내가 진행되지 않으니
					“또하나의가족에서 연결하는 상담전화”라고 미리 말씀해 주세요.
				</p>
			</div>
			<div>
				<div
					className={
						mount ? `${style.button_fixed} ${style.active}` : style.button_fixed
					}
				>
					<div className="outer_wrap no_padding">
						<div className={style.button_wrap}>
							<div
								onClick={() => {
									if (agree === false) {
										setAgree(true)
									} else {
										setAgree(false)
									}
								}}
								className={style.agree_box}
							>
								<p
									className={
										agree
											? `${style.indicator} ${style.active}`
											: style.indicator
									}
								></p>
								<p>발신자번호표시 제한으로 전화 상담</p>
							</div>
							<Link
								href={`/counsel/call?code=${code}&telno=${telno}&agree=${agree.toString()}&name=${name}&category=${category}`}
								replace
							>
								<a className={style.counsel_btn}>
									안내사항 확인하고 전화 상담 {"  >"}
								</a>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
