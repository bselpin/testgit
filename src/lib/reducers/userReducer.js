const userInitial = {
	user: null,
	login: false,
}

export const user = (user = userInitial, action) => {
	switch (action.type) {
		case "LOGIN":
			return { user: { ...action.user }, login: action.login }
		case "LOGOUT":
			return { user: null, login: false }
		case "DETAIL":
			return { user: { ...action.user }, login: true }
		default:
			return user
	}
}
