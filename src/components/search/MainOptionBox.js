import style from "styles/components/search.module.scss"

const MainOptionBox = ({ mainOption, setCurMainOption, curMainOption }) => {
	return (
		<div className={style.option_box}>
			{mainOption.map(option => {
				return (
					<p
						className={
							curMainOption.id === option.id
								? `${style.main_option} ${style.active}`
								: style.main_option
						}
						onClick={() => {
							setCurMainOption(option)
						}}
						key={option.id}
					>
						{option.name}
					</p>
				)
			})}
		</div>
	)
}

export default MainOptionBox
