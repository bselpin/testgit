import { serialize } from "cookie"
import { post } from "lib/utils/api"
import { option } from "lib/utils/cookie"

const signin = async (req, res) => {
	const data = await post("auth/login", req.body).then((response) => {
		if (response.data !== 0) {
			res.setHeader(
				"Set-Cookie",
				serialize(
					process.env.NEXT_PUBLIC_COOKIE_NAME,
					String(response.data.token),
					option,
				),
			)
		}
		return response.data
	})

	res.status(200).json(data)
}

export default signin
