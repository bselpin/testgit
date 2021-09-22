import Hospital from "components/detail/Hospital"
import { fetcher } from "lib/utils/api"

const HospitalDetail = ({ data, router }) => <Hospital data={data} router={router} />

export async function getServerSideProps({ query }) {
	const { code, category, pttnCd } = query

	try {
		const data = await fetcher(
			`/hpt/detail/${code}?categoryId=${category}&pttnCd=${pttnCd}`,
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
				destination: `/_error?code=${code}&catecory=${category}`,
			},
			props: {},
		}
	}
}

export default HospitalDetail
