import CategoryBtn from "components/ui/CategoryBtn"
import style from "styles/home.module.scss"

const Category = ({ category, router }) => {
	return (
		<ul className={style.category_box}>
			{category.map((list) => (
				<CategoryBtn list={list} key={list._id} router={router} />
			))}
		</ul>
	)
}

export default Category
