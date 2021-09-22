import Link from "next/link"
import { savePos } from "lib/utils/scroll"
import style from "styles/info.module.scss"

const InfoCard = ({ list, flex }) => {
	const { _id, subject, sImgUrl } = list

	return (
		<Link href={`/info/${_id}`}>
			<a
				className={flex ? style.info_card : `${style.info_card} ${style.block}`}
				onClick={() => savePos("info")}
			>
				<div className={style.thumb_box}>
					<img src={sImgUrl} alt={subject} className={style.thumb} />
				</div>
			</a>
		</Link>
	)
}

export default InfoCard
