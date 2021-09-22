const FIRST = "#0055ff"
const SECOND = "#088af5"
const THIRD = "#00b85c"
const FOURTH = "#f57200"
const FIFTH = "#e30008"
const NONE = "#b1b1b9"

// 숫자에 콤마 추가
export const addCommas = num =>
	typeof num === "number"
		? num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
		: typeof num === "string" && num.replace(/\B(?=(\d{3})+(?!\d))/g, ",")

// 배열인지 아닌지를 검출
export const detectArray = array =>
	Array.isArray(array) ? (array.length > 0 ? true : false) : false

// 합계 계산 함수
export const calcSum = array => array.map(cnt => cnt >> 0).reduce((a, b) => a + b, 0)

// 시간 포맷 변환
export const formatTime = time => {
	if (time) {
		if (typeof time === "number") {
			let string = time.toString()
			const hour = string.substring(0, 2)
			const minute = string.substring(2, 4)
			return `${hour}:${minute}`
		} else if (typeof time === "string") {
			const hour = time.substring(0, 2)
			const minute = time.substring(2, 4)
			return `${hour}:${minute}`
		}
	} else {
		return null
	}
}

// 글자수 제한
export const textLimit = (text, length = 200) => {
	if (typeof text === "string") {
		if (text.length > length) return `${text.substring(0, length)}...`
		else return text
	}
}

// http 유효성 체크 및 가공
export const getValidUrl = (url = "") => {
	let newUrl = window.decodeURIComponent(url)
	newUrl = newUrl.trim().replace(/\s/g, "")

	if (/^(:\/\/)/.test(newUrl)) return `http${newUrl}`
	else if (!/^(f|ht)tps?:\/\//i.test(newUrl)) return `http://${newUrl}`
	else return newUrl
}

// 정수 검출
export const checkInteger = num => {
	if (Number.isInteger(num)) return num
	else {
		const float = parseFloat(num)
		return +float.toFixed(1)
	}
}

// 퍼센테이지 함수
export const calcPer = (num, per) => Math.round((num / per) * 100)

// 모바일 검출 함수
export const isMobile = () =>
	Math.min(window.screen.width, window.screen.height) < 800 ||
	navigator.userAgent.indexOf("Mobi") > -1

export const gradeDetailColor = grade => {
	switch (grade) {
		case 5:
			return FIRST
		case 4:
			return SECOND
		case 3:
			return THIRD
		case 2:
			return FOURTH
		case 1:
			return FIFTH
		default:
			return NONE
	}
}

export const gradeColor = grade => {
	switch (grade) {
		case "1":
			return FIRST
		case "2":
			return SECOND
		case "3":
			return THIRD
		case "4":
			return FOURTH
		case "5":
			return FIFTH
		default:
			return NONE
	}
}

export const ltcGradeColor = grade => {
	switch (grade) {
		case "A":
			return FIRST
		case "B":
			return SECOND
		case "C":
			return THIRD
		case "D":
			return FOURTH
		case "E":
			return FIFTH
		default:
			return NONE
	}
}

export const getColor = scale => {
	switch (scale) {
		case "소형":
			return "#00b775"
		case "중형":
			return "#1569ff"
		case "대형":
			return "#5300a3"
	}
}

export const getCategoryType = cateId => {
	switch (cateId) {
		case "13":
			return "hospital"
		case "14":
			return "silver"
		default:
			return "care"
	}
}

export const calcYear = date => {
	const eatString = date + ""
	if (eatString.length > 0) {
		const estYear = eatString.substring(0, 4)
		const thisYear = new Date().getFullYear()
		return thisYear - estYear
	}
	return null
}

export const getCategoryName = categoryId => {
	if (categoryId && categoryId !== "undefined") {
		switch (categoryId) {
			case "1":
				return "요양원"
			case "2":
				return "공동생활가정"
			case "3":
				return "주야간보호"
			case "4":
				return "단기보호"
			case "5":
				return "방문요양"
			case "6":
				return "방문목욕"
			case "7":
				return "방문간호"
			case "8":
				return "치매전담 요양원"
			case "9":
				return "치매전담 주야간보호"
			case "10":
				return "치매전담 공동생활가정"
			case "11":
				return "복지용구"
			case "13":
				return "요양병원"
			case "14":
				return "실버타운"
		}
	} else {
		return ""
	}
}

export const toCensoredString = string => {
	if (string.length === 1) {
		return string.replace(/./g, "*")
	} else {
		return string[0] + string.replace(/./g, "*").slice(0, -1)
	}
}
