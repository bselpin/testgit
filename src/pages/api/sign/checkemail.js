import { get } from "lib/utils/api"

const checkEmail = async (req, res) => {
	const data = await get("user/emailCheck", { params: req.query }).then(
		(res) => res.data,
	)
	res.status(200).json(data)
}

export default checkEmail
