import { useState, useEffect } from "react"
import style from "styles/signup.module.scss"

const THIRD = "third"

export default function UserInfo({
	progress,
	name,
	setName,
	setBirthday,
	gender,
	setGender,
	handleEnable,
	handleInput,
	enable,
}) {
	const [scssClass, setScssClass] = useState(`${style.signup_box} ${style.ready}`)
	const [year, setYear] = useState("")
	const [month, setMonth] = useState("01")
	const [day, setDay] = useState("")

	const numRegEx = /^[0-9\b]+$/

	const modifyDay = day => {
		if (day.length === 1) return "0" + day
		else return day
	}

	const limitDate = (e, callback) => {
		const { value, maxLength } = e.target
		const val = value.slice(0, maxLength)
		callback(val)
	}

	useEffect(() => {
		if (progress === 0 || progress === 1)
			setScssClass(`${style.signup_box} ${style.ready}`)
		else if (progress === 2) setScssClass(style.signup_box)
		else if (progress === 3) setScssClass(`${style.signup_box} ${style.done}`)
	}, [progress])

	useEffect(() => {
		setBirthday(`${year}-${month}-${modifyDay(day)}`)
	}, [year, month, day])

	useEffect(() => {
		if (name.length > 0 && year.length > 0 && month && day.length > 0 && gender !== null)
			handleEnable(true, THIRD)
		else handleEnable(false, THIRD)
	}, [name, year, month, day, gender])

	return (
		<div className={scssClass}>
			<div className={style.signup_title}>
				<p>
					<span>닉네임</span>, <span>생일</span>, <span>성별</span>을 <br />
					입력해주세요
				</p>
			</div>

			<div className={style.password_box}>
				<input
					type="text"
					value={name}
					onChange={e => handleInput(e, setName)}
					placeholder="이름, 혹은 닉네임"
				/>

				<div className={style.user_box}>
					<div className={style.birth_input_wrap}>
						<input
							type="number"
							className={style.birth_input}
							value={year}
							maxLength="4"
							placeholder="년도"
							onChange={e => {
								let value = e.target.value
								if (value === "" || numRegEx.test(value)) {
									limitDate(e, setYear)
								}
							}}
						/>
						<p className={style.unit}>년</p>
					</div>
					<div className={style.birth_input_wrap}>
						<select
							type="number"
							className={`${style.birth_input} ${style.month}`}
							value={month}
							onChange={e => handleInput(e, setMonth)}
						>
							<option value="01">1월</option>
							<option value="02">2월</option>
							<option value="03">3월</option>
							<option value="04">4월</option>
							<option value="05">5월</option>
							<option value="06">6월</option>
							<option value="07">7월</option>
							<option value="08">8월</option>
							<option value="09">9월</option>
							<option value="10">10월</option>
							<option value="11">11월</option>
							<option value="12">12월</option>
						</select>
					</div>
					<div className={style.birth_input_wrap}>
						<input
							type="number"
							className={`${style.birth_input} ${style.day}`}
							value={day}
							maxLength="2"
							placeholder="일"
							onChange={e => {
								let value = e.target.value
								if (value === "" || numRegEx.test(value)) {
									limitDate(e, setDay)
								}
							}}
						/>
						<p className={style.unit}>일</p>
					</div>
				</div>

				<div className={style.user_box}>
					<p
						className={
							gender === 0 ? `${style.gender_btn} ${style.active_w}` : style.gender_btn
						}
						onClick={() => setGender(0)}
					>
						여성
					</p>
					<p
						className={
							gender === 1 ? `${style.gender_btn} ${style.active}` : style.gender_btn
						}
						onClick={() => setGender(1)}
					>
						남성
					</p>
				</div>
			</div>
		</div>
	)
}
