import CategoryBtn from "components/ui/CategoryBtn"
import style from "styles/components/search.module.scss"

const Category = ({ showCategory, toggleCategory, categories, router }) => {
	return (
		<div
			className={
				showCategory ? `${style.util_wrap} ${style.active}` : style.util_wrap
			}
		>
			<div className={style.category_box}>
				<h5 className={style.label}>카테고리 선택</h5>
				<div className={style.close_btn} onClick={toggleCategory}></div>
				<ul>
					{categories.map((list) => (
						<CategoryBtn
							list={list}
							toggleCategory={toggleCategory}
							router={router}
							key={list._id}
						/>
					))}
				</ul>
			</div>
			<div className={style.bg} onClick={toggleCategory}></div>
		</div>
	)
}

export default Category
