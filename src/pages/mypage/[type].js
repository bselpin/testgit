import { NextSeo } from "next-seo"
import { fetcher } from "lib/utils/api"
import PageHeader from "components/layout/PageHeader"
import MyPageQuerySearch from "components/ui/MyPageQuerySearch"
import CaseList from "components/case/CaseList"
import MyReviewList from "components/review/MyReviewList"
import WithAuth from "components/WithAuth"
import Nav from "components/layout/Nav"
import Pagination from "components/ui/Pagination"
import style from "styles/mypage.module.scss"
import { removeCookie } from "lib/utils/cookie"
import { signOut } from "next-auth/client"
import Cookies from "universal-cookie"

const TITLE = `MY또가 | ${process.env.NEXT_PUBLIC_SITE_NAME}`
const DESC = "MY또가에서 나의 상담과 나의 후기를 볼 수 있습니다."

export default function Mypage({ router, data }) {
	const { type, nPageNum } = router.query

	const logout = async () => {
		removeCookie()
		const data = await signOut({
			redirect: false,
			callbackUrl: process.env.NEXT_PUBLIC_BASE_URL,
		})
		router.replace("/")
	}

	const query = [
		{
			name: "나의 상담",
			pathname: "/mypage",
			query: "qnaList",
			className: "qnaList",
		},
		{
			name: "나의 후기",
			pathname: "/mypage",
			query: "reviewList",
			className: "reviewList",
		},
	]

	return (
		<>
			<NextSeo title={TITLE} description={DESC} noindex={true} />

			<WithAuth router={router}>
				<PageHeader title={"MY또가"} router={router} logout={logout} />
				<div className={style.mypage_wrap}>
					<div className="outer_wrap">
						<MyPageQuerySearch query={query} router={router} />
					</div>
				</div>
				<div className={style.mypage_list_wrap}>
					{type === "qnaList" &&
						data.resultList.map((list, index) => <CaseList list={list} key={index} />)}

					{type === "reviewList" &&
						data.resultList.map((review, index) => (
							<MyReviewList review={review} key={index} mypage={true} />
						))}

					{data.resultList.length > 0 && (
						<Pagination
							pagingData={data.objPagingData}
							pageNum={nPageNum}
							router={router}
						/>
					)}

					{data.resultList.length === 0 && (
						<div className="no_wrap">
							{type === "qnaList" ? "상담" : "후기"} 내용이 없습니다
						</div>
					)}
				</div>
				<Nav />
			</WithAuth>
		</>
	)
}

export async function getServerSideProps({ req, query }) {
	const { type, nPageNum } = query
	const cookies = new Cookies(req.headers.cookie)
	const token = cookies.get(process.env.NEXT_PUBLIC_COOKIE_NAME)
	const redirection = {
		redirect: {
			permanent: false,
			destination: "/login",
		},
		props: {},
	}

	if (typeof token !== "undefined" && token.length > 0) {
		try {
			const data = await fetcher(`/mypage/${type}?nPageNum=${nPageNum}`, {
				timeout: parseInt(process.env.REQUEST_TIMEOUT),
				headers: {
					Cookie: `tempCookie=${token}`,
				},
			})
			return { props: { data } }
		} catch (error) {
			return redirection
		}
	} else {
		return redirection
	}
}
