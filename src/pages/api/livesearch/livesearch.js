import { get } from "lib/utils/api"

const liveSearch = async (req, res) => {
	if (req.query.keyword.length > 1) {
		try {
			const data = await get("search/keyword", { params: req.query }).then(
				res => res.data,
			)
			res.status(200).json(data)
		} catch (error) {
			console.error(error)
			res.status(200).json({ data: null })
		}
	} else {
		res.status(200).json({ data: [] })
	}
}

export default liveSearch
