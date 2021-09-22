import { post } from "lib/utils/api"

const signup = async (req, res) => {
	const data = await post("user/join", req.body).then((res) => res.data)
	res.status(200).json(data)
}

export default signup
