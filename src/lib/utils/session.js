export const setSessionStorage = (name, data) => {
	return sessionStorage.setItem(name, JSON.stringify(data))
}

export const getSessionStorage = name => {
	return JSON.parse(sessionStorage.getItem(name))
}
export const removeSessionStorage = name => {
	return sessionStorage.removeItem(name)
}
