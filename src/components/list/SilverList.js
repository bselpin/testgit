import Link from "next/link"
import { savePos } from "lib/utils/scroll"
import TitleComp from "components/list/components/TitleComp"
import Establish from "components/list/components/Establish"
import ListImage from "components/list/components/ListImage"
import style from "styles/components/list.module.scss"

const SilverCard = ({ list, router, flex }) => {
	const { categoryId: category } = router.query
	// const [target, setTarget] = useState(null)
	// const [visible, setVisible] = useState(true)

	const silverKind = kindCd => {
		switch (kindCd) {
			case 1:
				return "전원형"
			case 2:
				return "근교형"
			case 3:
				return "도심형"
		}
	}

	const {
		_id,
		adminNm,
		reviews: review = null,
		scale,
		addr: address,
		estbDd,
		generalimages,
		kindCd,
		consulting_count,
		isPanorama,
	} = list

	const mainImg = generalimages || null

	// const onIntersect = ([entry]) => {
	// 	if (entry.isIntersecting) {
	// 		setVisible(true)
	// 	} else {
	// 		setVisible(false)
	// 	}
	// }

	// useEffect(() => {
	// 	let observer
	// 	if (target) {
	// 		observer = new IntersectionObserver(onIntersect, { threshold: 0.4 })
	// 		observer.observe(target)
	// 	}
	// 	return () => observer && observer.disconnect()
	// }, [target])

	return (
		<>
			<Link href={`/search/silver/${_id}?category=${category}`}>
				<a
					className={`${style.search_card} ${!flex && style.no_flex}`}
					onClick={() => savePos("search")}
				>
					<ListImage mainImg={mainImg} name={adminNm} />
					<div className={style.card_header}>
						<TitleComp
							name={adminNm}
							address={address}
							review={review}
							consultingCnt={consulting_count}
							isPanorama={isPanorama}
						/>
						<div className={style.info_box_wrap}>
							<div className={style.info_box}>
								<div className={`${style.detail_box} ${style.large}`}>
									<p className={style.label}>타입</p>
									<p className={style.info}>{silverKind(kindCd)}</p>
								</div>
								<div className={`${style.detail_box} ${style.large}`}>
									<p className={style.label}>규모</p>
									<p className={style.info}>{scale}</p>
								</div>
								{estbDd ? <Establish year={estbDd} /> : null}
							</div>
						</div>
					</div>
				</a>
			</Link>
		</>
	)
}

const SilverList = ({ list, router, flex }) => {
	return (
		<>
			{list.map(list => (
				<SilverCard list={list} key={list._id} router={router} flex={flex} />
			))}
		</>
	)
}

export default SilverList
