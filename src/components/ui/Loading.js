import style from "styles/components/loading.module.scss"

const Loading = () => {
	return (
		<div className={style.loading_wrap}>
			<div className={style.ring}>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	)
}

export default Loading
