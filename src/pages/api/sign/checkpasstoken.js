import { post } from "lib/utils/api"

const checkPassToken = async (req, res) => {
	const data = await post("auth/passwordTokenCheck", req.body).then((res) => {
		return res.data
	})

	res.status(200).json(data)
}

export default checkPassToken
