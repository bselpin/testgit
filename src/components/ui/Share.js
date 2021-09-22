import { useEffect, useRef } from "react"
import { copyUrl, kakaoShare } from "lib/utils/share"
import { kakaoInit } from "lib/utils/init"
import style from "styles/components/header.module.scss"

const Share = ({ share, meta }) => {
	const kakaoBtn = useRef()

	useEffect(() => {
		kakaoInit()
	}, [])

	useEffect(() => {
		if (typeof window !== "undefined") {
			if (window.Kakao) {
				if (kakaoBtn.current && meta) kakaoShare(meta)
			}
		}
	}, [kakaoBtn, meta])

	return (
		<div className={style.share_box}>
			<p
				className={style.share_label}
				onClick={(e) => {
					e.stopPropagation()
					share.toggleShare()
				}}
			>
				공유하기
			</p>
			<div
				className={
					share.showShare
						? `${style.icon_box} ${style.copy_box} ${style.active}`
						: `${style.icon_box} ${style.copy_box}`
				}
				onClick={copyUrl}
			>
				<p className={`${style.icon} ${style.copy}`}></p>
				<p className={style.label}>주소복사</p>
			</div>
			<a
				className={
					share.showShare
						? `${style.icon_box} ${style.kakao_box} ${style.active}`
						: `${style.icon_box} ${style.kakao_box}`
				}
				id="kakao_link"
				ref={kakaoBtn}
			>
				<p className={`${style.icon} ${style.kakao}`}></p>
				<p className={style.label}>카카오톡</p>
			</a>
		</div>
	)
}

export default Share
