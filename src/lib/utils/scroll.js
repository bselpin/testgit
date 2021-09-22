export const savePos = type => {
	sessionStorage.setItem(`${type}_scroll`, window.scrollY)
}

export const resetPos = type => {
	sessionStorage.removeItem(`${type}_scroll`)
}

export const resetPosAll = () => {
	sessionStorage.removeItem("case_scroll")
	sessionStorage.removeItem("info_scroll")
	sessionStorage.removeItem("search_scroll")
}

export const restoreScroll = type => {
	if (typeof window !== "undefined") {
		if (sessionStorage) {
			window.history.scrollRestoration = "manual"
			const pos = sessionStorage.getItem(`${type}_scroll`)
			window.scrollTo(0, pos >> 0)
		}
	}
}
