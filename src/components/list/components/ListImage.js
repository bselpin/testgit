import { LazyLoadImage } from "react-lazy-load-image-component"
import style from "styles/components/list.module.scss"

const ListImage = ({ mainImg, name }) => {
	const noImg = "/img/no_search.jpg"

	return (
		<div className={style.image_box}>
			<div className={style.card_image}>
				<LazyLoadImage
					className={style.image}
					alt={name}
					src={mainImg ? mainImg : noImg}
				/>
			</div>
		</div>
	)
}

export default ListImage
