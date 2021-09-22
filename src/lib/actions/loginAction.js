import { get } from "utils/api"
import { toastCall } from "toastCall"

export const LOADING = (property) => `${property}/loading`
export const SUCCESS = (property) => `${property}/success`
export const FAILURE = (property) => `${property}/failure`

export const LOGIN = "LOGIN"
export const LOGOUT = "LOGOUT"
export const DETAIL = "DETAIL"

export const setToken = (token) => localStorage.setItem("T", token)

// 로그아웃
export const logoutCall = () => {
	return async (dispatch) => {
		return await get("auth/logout").then((res) => {
			dispatch({
				type: LOGOUT,
				user: null,
				login: false,
			})
			localStorage.removeItem("T")
			toastCall("로그아웃 되었습니다", "success")
		})
	}
}

// 토큰 유효성 체크
export const loginCheck = () => {
	const token = localStorage.getItem("T")
	const config = {
		Authorization: `Bearer ${token}`,
	}
	return async (dispatch) => {
		return await get("auth/loginCheck", config)
			.then((res) => {
				if (res.data === 0) {
					dispatch({
						type: LOGOUT,
						user: null,
						login: false,
					})
				}
			})
			.catch((e) => {
				dispatch({
					type: LOGOUT,
					user: null,
					login: false,
				})
			})
	}
}

// 로그인
export const authLogin = (data) => {
	return (dispatch) => {
		return dispatch({
			type: LOGIN,
			user: { ...data.user },
			login: true,
		})
	}
}

// 토큰 갱신
export const loginRefresh = (data) => {
	return (dispatch) => {
		return dispatch({
			type: LOGIN,
			user: { ...data.user },
			login: true,
		})
	}
}

// 유저 정보 상세 조회
export const userDetail = () => {
	return async (dispatch) => {
		return await get("user/detail").then((res) => {
			dispatch({
				type: LOGIN,
				user: { ...res.data },
				login: true,
			})
		})
	}
}
