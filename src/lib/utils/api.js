import axios from "axios"

const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_PRIVATE_API_URL,
	headers: {
		"Content-Type": "application/json; charset=utf-8",
	},
	withCredentials: true,
})

const nextApi = axios.create({
	baseURL: process.env.NEXT_PUBLIC_NEXT_API_URL,
	headers: {
		"Content-Type": "application/json; charset=utf-8",
	},
	withCredentials: true,
})

export const post = (url, params, config) => {
	return api.post(url, params, config)
}

export const nextPost = (url, params, config) => {
	return nextApi.post(url, params, config)
}

export const get = async (url, params, config) => {
	return api.get(url, params, config)
}

export const nextGet = (url, params, config) => {
	return nextApi.get(url, params, config)
}

export const fetcher = (...args) => get(...args).then((res) => res.data)

axios.interceptors.response.use(
	(config) => config,
	(error) => {
		if (
			error.response.status === 408 ||
			error.response.status === 504 ||
			error.code === "ECONNABORTED"
		) {
			console.error(`A timeout happend on url ${error.config.url}`)
		}
		return Promise.reject(error)
	},
)
