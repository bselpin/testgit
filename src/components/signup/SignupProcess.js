import style from "styles/signup.module.scss"

const processes = [
	{ id: 0, num: "01", text: "이메일 입력" },
	{ id: 1, num: "02", text: "비밀번호 설정" },
	{ id: 2, num: "03", text: "개인정보 입력" },
	{ id: 3, num: "04", text: "약관동의" },
]

export default function SignupProcess({ progress }) {
	return (
		<div className={style.process_step}>
			{processes.map((list) => (
				<div
					key={list.id}
					className={
						progress === list.id
							? `${style.process_unit} ${style.active}`
							: style.process_unit
					}
				>
					<p className={style.process_number}>{list.num}</p>
					<p className={style.process_text}>{list.text}</p>
				</div>
			))}
		</div>
	)
}
