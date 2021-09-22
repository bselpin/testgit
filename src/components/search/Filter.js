import { useEffect, useState, useCallback } from "react"
import Link from "next/link"
import MainOptionBox from "components/search/MainOptionBox"
import SubOptionBox from "components/search/SubOptionBox"
import filterLtc from "lib/utils/filterLtc.json"
import filterHpt from "lib/utils/filterHpt.json"
import filterLiving from "lib/utils/filterLiving.json"
import filterWelfare from "lib/utils/filterWelfare.json"
import { setSessionStorage, getSessionStorage } from "lib/utils/session"
import usePrevious from "lib/hooks/usePrevious"
import style from "styles/components/search.module.scss"

const FILTER = "filter"

const initialQueries = {
	scaleFilter: [],
	gradeFilter: [],
	subjectFilter: [],
	programFilter: [],
}

const Filter = ({ showFilter, toggleFilter, router }) => {
	const isHospital = categoryId => {
		return categoryId === "13"
	}

	const isNoScale = categoryId => {
		return (
			categoryId === "2" ||
			categoryId === "5" ||
			categoryId === "6" ||
			categoryId === "7" ||
			categoryId === "10"
		)
	}

	const { categoryId } = router.query
	const [targets, setTargets] = useState([])
	const [queries, setQueries] = useState(initialQueries)
	const [mainOption, setMainOption] = useState(filterHpt)
	const [curMainOption, setCurMainOption] = useState(filterHpt[0])
	const [subOption, setSubOption] = useState(filterHpt[0].subOption)
	const [curType, setCurType] = useState(isHospital(categoryId))
	const prevType = usePrevious(curType)

	const isQuery = (target, value) => target.some(target => target.value === value)

	const insertQuery = (target, option) => {
		const isValue = isQuery(target, option.value)

		if (isValue) {
			return target.filter(target => {
				return target.value !== option.value
			})
		} else {
			return [...target, option]
		}
	}

	const modifyTarget = useCallback(
		option => {
			const isTarget = targets.some(target => target.id === option.id)
			if (isTarget) {
				setTargets(targets.filter(target => target.id !== option.id))
			} else {
				setTargets([...targets, option])
			}
		},
		[targets],
	)

	const joinQuery = targets => {
		const query = targets.map(list => encodeURIComponent(list.value))
		return query.join()
	}

	const resetFilter = () => {
		setTargets([])
		setQueries(initialQueries)
	}

	useEffect(() => {
		if (typeof window !== "undefined") {
			if (sessionStorage) {
				const existQuery = getSessionStorage(FILTER)
				if (existQuery) {
					const { scaleFilter, gradeFilter, subjectFilter, programFilter } = existQuery
					setTargets([...scaleFilter, ...gradeFilter, ...subjectFilter, ...programFilter])
					setQueries(existQuery)
				}
			}
		}
	}, [])

	useEffect(() => {
		if (isHospital(categoryId)) {
			setMainOption(filterHpt)
		} else if (isNoScale(categoryId)) {
			setMainOption(filterLiving)
		} else if (categoryId === "11") {
			setMainOption(filterWelfare)
		} else {
			setMainOption(filterLtc)
		}
	}, [router])

	useEffect(() => {
		setCurMainOption(mainOption[0])
	}, [mainOption])

	useEffect(() => {
		if (curMainOption) setSubOption(curMainOption.subOption)
	}, [curMainOption])

	useEffect(() => {
		setCurType(isHospital(categoryId))
	}, [categoryId])

	useEffect(() => {
		if (typeof prevType !== "undefined") {
			if (curType !== prevType) {
				resetFilter()
			}
		}
	}, [curType])

	return (
		<div
			className={showFilter ? `${style.filter_wrap} ${style.active}` : style.filter_wrap}
		>
			<div className={style.filter_box}>
				<h5 className={style.label}>검색 옵션</h5>

				<div className={style.close_btn} onClick={toggleFilter}></div>

				<div className={style.filter_options}>
					<div className={style.filter_list_bar}>
						{targets.map(list => (
							<span
								className={style.filter_target}
								onClick={() => {
									modifyTarget(list)
									setQueries({
										...queries,
										[list.query]: insertQuery(queries[list.query], list),
									})
								}}
								key={list.id}
							>
								{list.name} <span className={style.close_btn}></span>
							</span>
						))}
					</div>

					<div className={style.filter_flex}>
						<MainOptionBox
							mainOption={mainOption}
							setCurMainOption={setCurMainOption}
							curMainOption={curMainOption}
						/>

						<SubOptionBox
							queries={queries}
							setQueries={setQueries}
							subOption={subOption}
							modifyTarget={modifyTarget}
							insertQuery={insertQuery}
							isQuery={isQuery}
						/>
					</div>
				</div>
			</div>

			<div
				className={
					showFilter ? `${style.filter_btns} ${style.active}` : style.filter_btns
				}
			>
				<button className={`${style.reset} ${style.filter_btn}`} onClick={resetFilter}>
					초기화
				</button>

				<Link
					href={{
						pathname: router.pathname,
						query: {
							...router.query,
							scaleFilter: joinQuery(queries.scaleFilter),
							gradeFilter: joinQuery(queries.gradeFilter),
							subjectFilter: joinQuery(queries.subjectFilter),
							programFilter: joinQuery(queries.programFilter),
						},
					}}
				>
					<a
						className={`${style.search} ${style.filter_btn}`}
						onClick={() => {
							toggleFilter()
							setSessionStorage(FILTER, queries)
						}}
					>
						검색하기
					</a>
				</Link>
			</div>

			<div className={style.bg} onClick={toggleFilter}></div>
		</div>
	)
}

export default Filter
