const reportInit = {
	on: false,
	url: null,
	id: null,
}

export const report = (report = reportInit, action) => {
	switch (action.type) {
		case "REPORT_ON":
			return {
				report: {
					on: true,
					url: action.report.url,
					id: action.report.id,
				},
			}
		case "REPORT_OFF":
			return {
				report: {
					on: false,
					url: null,
					id: null,
				},
			}
		default:
			return report
	}
}
