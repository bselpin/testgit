export default function Star({ style, percent }) {
	return (
		<div className={style.star_box}>
			<p
				className={`${style.star_icon} ${style.star_is}`}
				style={{ width: `${percent}%` }}
			></p>
			<p className={`${style.star_icon} ${style.star_gray}`}></p>
		</div>
	)
}
