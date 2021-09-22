import style from "styles/components/header.module.scss"

const FlexControl = ({ flex, setLocalBlock, setLocalFlex, search }) => {
	return (
		<div className={search ? `${style.info_type} ${style.search}` : style.info_type}>
			<div className={style.icon_wrap}>
				<div
					className={
						!flex
							? ` ${style.icon} ${style.block} ${style.active} ${search && style.search}`
							: `${style.icon} ${style.block} ${search && style.search}`
					}
					onClick={setLocalBlock}
				></div>
			</div>
			<div className={style.icon_wrap}>
				<div
					className={
						flex
							? `${style.icon} ${style.flex} ${style.active} ${search && style.search}`
							: `${style.icon} ${style.flex} ${search && style.search}`
					}
					onClick={setLocalFlex}
				></div>
			</div>
		</div>
	)
}

export default FlexControl
