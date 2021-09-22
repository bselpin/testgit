export const kakaoInit = () => {
	if (typeof window !== "undefined") {
		if (window.Kakao) {
			const isInit = window.Kakao.isInitialized()
			if (!isInit) {
				Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY)
			}
		}
	}
}

export const setTestType = () => {
	if (typeof window !== "undefined") {
		if (localStorage) {
			if (process.env.NODE_ENV === "production") {
				if (localStorage.getItem("type") === null) {
					const type = Math.round(Math.random())
					localStorage.setItem("type", type)
				}
			} else {
				const type = Math.round(Math.random())
				localStorage.setItem("type", type)
			}
		}
	}
}
