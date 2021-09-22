import style from "styles/components/search.module.scss"

const SubOptionBox = ({
	subOption,
	modifyTarget,
	queries,
	setQueries,
	insertQuery,
	isQuery,
}) => {
	return (
		<div className={style.sub_option_box}>
			{subOption.map(option => {
				const { value, query } = option
				const isTarget = isQuery(queries[query], value)

				return (
					<span
						className={
							isTarget ? `${style.sub_option} ${style.active}` : style.sub_option
						}
						onClick={() => {
							setQueries({
								...queries,
								[query]: insertQuery(queries[query], option),
							})
							modifyTarget(option)
						}}
						key={option.id}
					>
						{option.name}
					</span>
				)
			})}
		</div>
	)
}

export default SubOptionBox
