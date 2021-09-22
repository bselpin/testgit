import Link from "next/link"
import style from "styles/components/button.module.scss"

const CounselBtn = ({ code, name, isTel, category, telno, pttnCd }) => {
	return (
		<Link
			href={`/counsel/info?code=${code}&name=${name}&category=${category}&telno=${telno}&pttnCd=${pttnCd}`}
		>
			<a
				className={
					isTel
						? `${style.btn} ${style.counsel_btn}`
						: `${style.btn} ${style.counsel_btn} ${style.full}`
				}
			>
				<div className={style.icon}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="26"
						height="26"
						viewBox="0 0 60 50"
						xmlSpace="preserve"
					>
						<g className={style.pen}>
							<path d="M44.6,14.7l1.7-2.1c2.3-2.9,1.8-7.1-1.1-9.4L45.2,3c-2.9-2.3-7.1-1.8-9.4,1.1l-1.7,2.1L44.6,14.7z" />
							<path
								d="M34.4,32.5c0.1,0.5,0.3,1,0.7,1.4c0.9,0.7,2.1,0.6,2.8-0.3L49.6,19c0.7-0.9,0.6-2.2-0.4-2.9c-0.9-0.7-2.1-0.5-2.8,0.4
		l-1.1,1.4l-1.9-1.6l0,0L32.7,7.8L5.6,41.7l10.6,8.5l24.6-30.7l1.9,1.6L34.8,31C34.4,31.4,34.3,31.9,34.4,32.5z"
							/>
							<path d="M14.5,51.7l-10-8c-0.2,0.6-0.2,1-0.2,1L2,55.7c-0.2,0.8,0.6,1.4,1.4,1.1l10.2-4.6C13.5,52.2,14,52,14.5,51.7z" />
						</g>
					</svg>
				</div>
				온라인 상담
			</a>
		</Link>
	)
}

export default CounselBtn
