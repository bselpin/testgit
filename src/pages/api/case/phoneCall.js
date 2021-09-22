import { post } from "lib/utils/api"

const phoneCall = async (req, res) => {
	const data = await post("qna/phoneAddQna", req.body).then((res) => res.data)
	res.status(200).json(data)
}

export default phoneCall
