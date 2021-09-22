import { useRef, useEffect } from "react"
import PageHeader from "components/layout/PageHeader"
import FlexControl from "components/layout/FlexControl"
import QuerySearch from "components/ui/QuerySearch"
import Trendy from "components/ui/Trendy"
import style from "styles/components/header.module.scss"

const InfoHeader = ({
	title,
	query,
	submit,
	isFlex,
	placeholder,
	focused,
	setFocused,
	router,
	trendy,
	scroll,
}) => {
	const inputRef = useRef()
	const { handleUpdate, searchkeyword, handleSubmit } = submit

	const focusInput = () => setFocused(!focused)

	useEffect(() => {
		if (focused) inputRef.current.focus()
	}, [focused])

	return (
		<>
			<PageHeader title={title} router={router} />

			<div
				className={
					scroll ? style.info_search_box : `${style.info_search_box} ${style.up}`
				}
			>
				<div className="outer_wrap">
					<div className={style.input} onClick={focusInput}>
						<div className={style.input_text}>
							{searchkeyword.length > 0 ? searchkeyword : placeholder}
							<p className={style.search_icon}></p>
						</div>
					</div>

					<QuerySearch query={query} submit={submit} router={router} />

					<Trendy trendy={trendy} router={router} />

					{isFlex && <FlexControl {...isFlex} />}
				</div>
			</div>

			<div
				className={
					focused ? `${style.info_search_wrap} ${style.active}` : style.info_search_wrap
				}
				onClick={focusInput}
			>
				<div className="outer_wrap">
					<div className={style.input_wrap}>
						<input
							className={style.input}
							type="text"
							placeholder={placeholder}
							onClick={e => e.stopPropagation()}
							value={searchkeyword}
							onChange={e => handleUpdate(e.target.value)}
							onKeyDown={e => {
								if (e.key === "Enter") {
									handleSubmit()
									focusInput()
								}
							}}
							ref={inputRef}
						/>
						<div className={style.submit} onClick={() => handleSubmit()}></div>
					</div>
				</div>
			</div>
		</>
	)
}

export default InfoHeader
