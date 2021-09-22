export const REPORT_ON = "REPORT_ON"
export const REPORT_OFF = "REPORT_OFF"

// 신고 활성화
export const callReport = (url, id) => {
	return {
		type: REPORT_ON,
		report: {
			on: true,
			url,
			id,
			del: false,
		},
	}
}

// 신고 비활성화
export const endReport = () => {
	return {
		type: REPORT_OFF,
		report: {
			on: false,
			url: null,
			id: null,
			del: false,
		},
	}
}
