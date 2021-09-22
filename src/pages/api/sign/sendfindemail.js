import { post } from "lib/utils/api"

const sendFindEmail = async (req, res) => {
	const data = await post("auth/callPasswordResetMail", req.body).then(
		(res) => {
			return res.data
		},
	)

	res.status(200).json(data)
}

export default sendFindEmail
