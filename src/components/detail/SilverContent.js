import style from "styles/components/detail.module.scss"
import parse from "html-react-parser"

const SilverContent = ({ title, content, intro }) => (
	<div
		className={`${style.detail_box} ${style.silver_style} ${intro && style.silver_intro}`}
	>
		<p className={style.title}>{title}</p>
		<div className={style.detail_info_box}>
			<div
				className={style.detail_text}
				dangerouslySetInnerHTML={{
					__html: parse(content),
				}}
			></div>
		</div>
	</div>
)

export default SilverContent
