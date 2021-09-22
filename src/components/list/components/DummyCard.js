import { memo } from "react"
import style from "styles/components/list.module.scss"

const DummyCard = () => (
	<div className={style.dummy_card}>
		<div className={style.header_box}>
			<div className={style.header}>
				<div className={style.dummy_scale}></div>
				<div className={style.name}></div>
			</div>
			<div className={style.address}></div>
		</div>
		<div className={style.body}>
			<div className={style.image}></div>
			<div className={style.content_box}>
				<div className={style.content}>
					<div className={style.part}>
						<div className={style.label}></div>
						<div className={style.text}></div>
					</div>
					<div className={style.part}>
						<div className={style.label}></div>
						<div className={style.text}></div>
					</div>
				</div>

				<div className={style.part_full}>
					<div className={style.label}></div>
					<div className={style.text_full}></div>
				</div>
			</div>
		</div>
	</div>
)

export default memo(DummyCard)
