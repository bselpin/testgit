import { useState, useEffect, useRef, useCallback } from "react"
import NProgress from "nprogress"
import { nextGet } from "lib/utils/api"
import LiveResult from "components/search/LiveResult"
import style from "styles/components/search.module.scss"

export default function LiveSearch({ showLive, toggleLive }) {
	const input = useRef()
	const [resultList, setResultList] = useState([])
	const [keyword, setKeyword] = useState("")
	const [state, setState] = useState({
		typing: false,
		typingTimeout: 0,
	})

	const liveUpdate = useCallback(
		e => {
			NProgress.start()
			const value = e.target.value
			setKeyword(value)

			if (state.typingTimeout) {
				clearTimeout(state.typingTimeout)
			}

			setState({
				typingTimeout: setTimeout(async () => {
					if (value !== "") {
						const params = {
							keyword: value.trim(),
						}
						await nextGet("livesearch/livesearch", {
							params,
						})
							.then(res => {
								const { data } = res
								if (data && data.length > 0) {
									setResultList(data)
								} else {
									setResultList([])
								}
							})
							.catch(() => {
								return
							})
					} else if (value === "") {
						setResultList([])
					}
				}, 450),
			})
			NProgress.done()
		},
		[keyword, state],
	)

	useEffect(() => {
		if (showLive) input.current.focus()
		else {
			setKeyword("")
			setResultList([])
		}
	}, [showLive])

	return (
		<div
			className={
				showLive ? `${style.live_search_wrap} ${style.active}` : style.live_search_wrap
			}
		>
			<div className="outer_wrap">
				<div className={style.live_search_box}>
					<div className={style.search_bar}>
						<div className={style.back_btn} onClick={toggleLive}></div>
						<input
							type="text"
							value={keyword}
							ref={input}
							className={style.input}
							onChange={liveUpdate}
							placeholder="시설명을 입력하세요"
						/>
					</div>
					<div className={style.result_box}>
						{resultList.map((list, index) => (
							<LiveResult key={index} list={list} />
						))}
						{resultList.length === 0 && (
							<div className={style.no_live_wrap}>
								<p className={style.text}>검색된 시설이 없습니다</p>
							</div>
						)}
					</div>
				</div>
			</div>
			<div className={style.bg} onClick={toggleLive}></div>
		</div>
	)
}
