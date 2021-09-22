import Link from "next/link"
import { Swiper, SwiperSlide } from "swiper/react"
import { resetPos } from "lib/utils/scroll"
import style from "styles/components/trendy.module.scss"

const Trendy = ({ trendy, router }) => {
	const { pathname, query } = router
	const path = pathname.replace("/", "")

	return (
		<div className={style.trendy_wrap}>
			<p className={style.label}>인기 검색어</p>
			<Swiper slidesPerView={"auto"} spaceBetween={10} className={style.keyword_box}>
				{trendy.map((keyword, index) => (
					<SwiperSlide key={index} className={style.keyword_slide}>
						<Link
							href={{
								pathname,
								query: {
									...query,
									nPageNum: 1,
									keyword: encodeURIComponent(keyword),
								},
							}}
						>
							<a className={style.keyword} onClick={() => resetPos(path)}>
								<span className={style.hash}>#</span>
								{keyword}
							</a>
						</Link>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	)
}

export default Trendy
