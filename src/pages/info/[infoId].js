import { useState, useEffect, useCallback } from "react"
import { NextSeo } from "next-seo"
import parse from "html-react-parser"
import { fetcher } from "lib/utils/api"
import DetailHeader from "components/layout/DetailHeader"
import Nav from "components/layout/Nav"
import style from "styles/info.module.scss"

const InfoDetail = ({ data, router }) => {
	const [showShare, setShowShare] = useState(false)
	const { type } = router.query
	const { resultList, removeTag } = data
	const { thumbnail, subject, content } = resultList
	const closeShare = useCallback(() => setShowShare(false), [showShare])
	const toggleShare = useCallback(() => setShowShare(!showShare), [showShare])

	const share = {
		showShare,
		toggleShare,
	}

	useEffect(() => {
		if (typeof window !== "undefined") {
			window.addEventListener("click", closeShare)
		}
		return () => window.removeEventListener("click", closeShare)
	}, [])

	const meta = {
		title: `${subject} | 또가 요양정보`,
		description: removeTag,
		canonical: process.env.NEXT_PUBLIC_BASE_URL + "/info/60a7450775daaa1bb145e95c",
		url: `${process.env.NEXT_PUBLIC_BASE_URL}${router.asPath}`,
		img: thumbnail.file_path_cdn,
	}

	const fromApp = type === "app"

	return (
		<>
			<NextSeo
				title={meta.title}
				description={removeTag}
				canonical={process.env.NEXT_PUBLIC_BASE_URL + "/info/60a7450775daaa1bb145e95c"}
				openGraph={{
					url: process.env.NEXT_PUBLIC_BASE_URL + router.asPath,
					title: meta.title,
					description: removeTag,
					images: [
						{
							url: process.env.NEXT_PUBLIC_DEFAULT_IMG,
						},
					],
				}}
			/>

			{!fromApp && (
				<DetailHeader name={"요양정보"} share={share} meta={meta} router={router} />
			)}

			<div className={`${style.detail_wrap} ${fromApp ? style.from_app : ""}`}>
				<div
					className={style.detail_text}
					dangerouslySetInnerHTML={{
						__html: parse(content),
					}}
				></div>
			</div>
			{thumbnail && (
				<div
					className={
						fromApp ? `${style.detail_bg_wrap} ${style.from_app}` : style.detail_bg_wrap
					}
				>
					<div
						className={`outer_wrap ${style.outer_wrap}`}
						style={{ backgroundImage: `url('${thumbnail.file_path_cdn}')` }}
					></div>
				</div>
			)}

			{!fromApp && <Nav />}
		</>
	)
}

export async function getServerSideProps({ query }) {
	const { infoId } = query

	try {
		const data = await fetcher(`/guide/getdetail/${infoId}`, {
			timeout: parseInt(process.env.REQUEST_TIMEOUT),
		})

		return { props: { data } }
	} catch (error) {
		return {
			redirect: {
				permanent: true,
				destination: `/404?type=info&id=${infoId}`,
			},
			props: {},
		}
	}
}

export default InfoDetail
