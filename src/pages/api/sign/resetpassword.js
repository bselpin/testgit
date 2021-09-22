import { post } from "lib/utils/api"

const resetPassword = async (req, res) => {
	const data = await post("auth/resetPassword", req.body).then(res => {
		return res.data
	})

	res.status(200).json(data)
}

export default resetPassword
