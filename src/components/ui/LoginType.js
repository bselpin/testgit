import Link from "next/link"
import style from "styles/components/header.module.scss"

const LoginType = ({ user, auth }) => {
	const { register_type } = user

	const getType = type => {
		switch (type) {
			case 1:
				return "ddoga"
			case 2:
				return "naver"
			case 3:
				return "kakao"
		}
	}

	const iconType = getType(register_type)

	return (
		<>
			{auth === "PROVIDER" && (
				<a
					className={style.biz_link}
					href="https://biz.ddoga.co.kr"
					target="_blank"
					rel="noopener noreferrer"
				>
					또가비즈 바로가기
				</a>
			)}

			<Link href="/mypage/qnaList?nPageNum=1">
				<a className={style.type_box}>
					<div className={`${style.icon} ${style[iconType]}`}></div>
				</a>
			</Link>
		</>
	)
}

export default LoginType
