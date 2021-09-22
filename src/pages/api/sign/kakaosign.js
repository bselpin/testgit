import { serialize } from "cookie"
import { post } from "lib/utils/api"
import { option } from "lib/utils/cookie"

const kakaoSign = async (req, res) => {
	const data = await post("auth/kakaoCallback", req.body).then((res) => {
		return res.data
	})

	res.setHeader(
		"Set-Cookie",
		serialize(process.env.NEXT_PUBLIC_COOKIE_NAME, String(data.token), option),
	)

	res.status(200).json(data)
}

export default kakaoSign
