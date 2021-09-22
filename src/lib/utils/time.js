export const timeForToday = (timestamp) => {
	const today = new Date()
	const timeValue = new Date(timestamp)

	const betweenTime = Math.floor(
		(today.getTime() - timeValue.getTime()) / 1000 / 60,
	)

	if (betweenTime < 5) return "방금 전"

	if (betweenTime < 60) {
		return `${betweenTime}분 전`
	}

	const betweenTimeHour = Math.floor(betweenTime / 60)

	if (betweenTimeHour < 24) {
		return `${betweenTimeHour}시간 전`
	}

	const betweenTimeDay = Math.floor(betweenTime / 60 / 24)
	const monthly = Math.floor(betweenTimeDay / 30)

	if (betweenTimeDay < 365) {
		if (betweenTimeDay < 30) return `${betweenTimeDay}일 전`
		else return `${monthly}개월 전`
	}

	return `${Math.floor(betweenTimeDay / 365)}년 전`
}
