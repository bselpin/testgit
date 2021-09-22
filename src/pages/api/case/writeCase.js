import { post } from "lib/utils/api"

const writeCase = async (req, res) => {
	const token = req.cookies[process.env.NEXT_PUBLIC_COOKIE_NAME]
	// const { write, callData } = req.body

	const data = await post("qna/addQna", req.body, {
		headers: {
			Cookie: `tempCookie=${token}`,
		},
	}).then(async res => {
		// let data
		// if (write) {
		// 	data = res.data
		// }

		// if (!write) {
		// 	await post("bizcall/auto_mapp", callData, {
		// 		headers: {
		// 			Cookie: `tempCookie=${token}`,
		// 		},
		// 	}).then((res) => {
		// 		data = res.data
		// 	})
		// }

		return res.data
	})

	res.status(200).json(data)
}

export default writeCase
