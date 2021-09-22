import { useState } from "react"
import PrivateTerm from "components/signup/PrivateTerm"
import UseTerm from "components/signup/UseTerm"
import style from "styles/components/footer.module.scss"

export default function Footer() {
	const [showUse, setShowUse] = useState(false)
	const [showPrivate, setShowPrivate] = useState(false)

	return (
		<footer className={style.footer}>
			<div className="outer_wrap">
				<div className={style.util_box}>
					<span className={style.util_btn}>
						<a
							href="https://www.hectonproject.com"
							target="_blank"
							rel="noopener noreferrer"
						>
							회사소개
						</a>
					</span>
					<span className={style.util_btn} onClick={setShowPrivate}>
						개인정보처리방침
					</span>
					<span className={style.util_btn} onClick={setShowUse}>
						서비스이용약관
					</span>
					<span className={style.util_btn}>
						<a href="https://biz.ddoga.co.kr" target="_blank" rel="noopener noreferrer">
							또가비즈 바로가기
						</a>
					</span>
				</div>

				<div className={style.company_box}>
					<div className={style.hecton_box}>
						<a
							href="https://www.hectonproject.com"
							target="_blank"
							rel="noopener noreferrer"
						>
							<img src="/logo/logo_c.svg" alt="헥톤프로젝트" />
						</a>

						<div className={style.sns_box}>
							<a
								href={process.env.NEXT_PUBLIC_KAKAO_CH}
								target="_blank"
								rel="noreferrer noopener"
								className={`${style.link_icon} ${style.kakao}`}
							></a>
							<a
								href={process.env.NEXT_PUBLIC_NAVER_BLOG}
								target="_blank"
								rel="noreferrer noopener"
								className={`${style.link_icon} ${style.naver}`}
							></a>
							<a
								href={process.env.NEXT_PUBLIC_INSTA}
								target="_blank"
								rel="noreferrer noopener"
								className={`${style.link_icon} ${style.insta}`}
							></a>
							<a
								href={process.env.NEXT_PUBLIC_FACEBOOK}
								target="_blank"
								rel="noreferrer noopener"
								className={`${style.link_icon} ${style.facebook}`}
							></a>
						</div>
					</div>

					<div className={style.info}>
						<p>
							07335, 서울특별시 영등포구 여의대로 108 (여의도동, 파크원) 타워2 31층
							헥톤프로젝트
						</p>
						<p>Copyright © HectonProject Co.,ltd All rights reserved.</p>
						<p>고객센터 : ddoga@hectonproject.com</p>
					</div>
				</div>

				<div className={style.family_box}>
					<p className={style.label}>헥톤프로젝트 가족사</p>
					<div className={style.logo_box}>
						<a
							href="https://www.gchealthcare.com/"
							target="_blank"
							rel="noreferrer noopener"
							className={`${style.logo} ${style.gch}`}
						></a>
						<a
							href="https://www.greencrosswb.com/"
							target="_blank"
							rel="noreferrer noopener"
							className={`${style.logo} ${style.gcw}`}
						></a>
						<a
							href="https://www.ubcare.co.kr/"
							target="_blank"
							rel="noreferrer noopener"
							className={`${style.logo} ${style.ub}`}
						></a>
						<a
							href="https://bbros.co.kr/"
							target="_blank"
							rel="noreferrer noopener"
							className={`${style.logo} ${style.bbros}`}
						></a>
					</div>
				</div>
			</div>
			{showUse && <UseTerm toggle={setShowUse} />}
			{showPrivate && <PrivateTerm toggle={setShowPrivate} />}
		</footer>
	)
}
