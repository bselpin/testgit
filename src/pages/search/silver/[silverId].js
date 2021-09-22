import Silver from "components/detail/Silver"
import { fetcher } from "lib/utils/api"

const SilverDetail = ({ data, router }) => <Silver data={data} router={router} />

export async function getServerSideProps({ query }) {
	const { silverId, category, pttnCd } = query

	try {
		const data = await fetcher(
			`/silver/detail/${silverId}?categoryId=${category}&pttnCd=${pttnCd}`,
			{
				timeout: parseInt(process.env.REQUEST_TIMEOUT),
			},
		)

		return { props: { data } }
	} catch (error) {
		console.error(error.config.url, category)

		return {
			redirect: {
				permanent: true,
				destination: `/_error?code=${silverId}&catecory=${category}`,
			},
			props: {},
		}
	}
}

export default SilverDetail
