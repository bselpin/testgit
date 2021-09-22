import { post } from "lib/utils/api"

const resend = async (req, res) => {
	const token = req.cookies[process.env.NEXT_PUBLIC_COOKIE_NAME]
	const data = await post("user/reSendEmail", null, {
		headers: {
			Cookie: `tempCookie=${token}`,
		},
	}).then((res) => {
		return res.data
	})

	res.status(200).json(data)
}

export default resend
