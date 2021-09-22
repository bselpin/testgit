import { post } from "lib/utils/api"

const writeReview = async (req, res) => {
	const { url } = req.body
	const token = req.cookies[process.env.NEXT_PUBLIC_COOKIE_NAME]
	const data = await post(url, req.body, {
		headers: {
			Cookie: `tempCookie=${token}`,
		},
	}).then((res) => res.data)

	res.status(200).json(data)
}

export default writeReview
