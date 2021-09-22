import SwiperCore, { Navigation, Autoplay } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import { LazyLoadImage } from "react-lazy-load-image-component"
import style from "styles/components/search.module.scss"

SwiperCore.use([Navigation, Autoplay])

const ImageContainer = ({ image, name }) => {
	const checkImg = image => (image.length === 1 ? true : false)

	const flag = checkImg(image)

	return (
		<div className={style.image_swiper_wrap}>
			<Swiper
				slidesPerView={1}
				loop={!flag}
				navigation
				autoplay={{ delay: 4500, disableOnInteraction: true }}
				speed={500}
			>
				{image.map((img, index) => (
					<SwiperSlide key={index}>
						<LazyLoadImage src={img} alt={name} />
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	)
}

export default ImageContainer
