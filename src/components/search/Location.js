import { useState, useEffect } from "react"
import Link from "next/link"
import { resetPos } from "lib/utils/scroll"
import style from "styles/components/search.module.scss"

const Location = ({ showLocation, toggleLocation, region, router, topToPage }) => {
	const getRegion = (region, siDoCd) => {
		const result = region.filter(list => list.value === siDoCd)
		return result[0].children
	}

	const { siDoCd, siGunGuCd } = router.query

	const [gungu, setGungu] = useState(getRegion(region, siDoCd))
	const [currentSido, setCurrentSido] = useState("A")
	const [currentSiGunGu, setCurrentSiGunGu] = useState(siGunGuCd)

	const getSido = () => {
		const result = region.filter(list => list.value === siDoCd)
		setCurrentSiGunGu(getGunGu(result[0].children))
		return result[0].value
	}

	const getGunGu = gungu => {
		const result = gungu.filter(list => list.value === siGunGuCd)
		return result[0].value
	}

	useEffect(() => {
		setCurrentSido(getSido())
		setGungu(getRegion(region, siDoCd))
	}, [siDoCd])

	const cityProps = {
		region,
		currentSido,
		setGungu,
		setCurrentSido,
	}

	const districtProps = {
		gungu,
		currentSido,
		toggleLocation,
		currentSiGunGu,
		router,
		topToPage,
	}

	const saveUserLocation = (sido, sigungu) => {
		const location = {
			sido,
			sigungu,
		}
		localStorage.setItem("userLocation", JSON.stringify(location))
	}

	const CityBtn = ({ list, currentSido, setGungu, setCurrentSido }) => (
		<p
			className={
				currentSido === list.value ? `${style.sido} ${style.active}` : style.sido
			}
			key={list._id}
			onClick={() => {
				setGungu(list.children)
				setCurrentSido(list.value)
			}}
		>
			{list.siDoName}
		</p>
	)

	const City = ({ region, currentSido, setGungu, setCurrentSido }) => (
		<div className={style.sido_box}>
			{region.map(list => (
				<CityBtn
					list={list}
					currentSido={currentSido}
					setGungu={setGungu}
					setCurrentSido={setCurrentSido}
					key={list._id}
				/>
			))}
		</div>
	)

	const DistrictBtn = ({
		list,
		currentSido,
		toggleLocation,
		currentSiGunGu,
		router,
		topToPage,
	}) => (
		<li
			className={style.gungu_list}
			key={list._id}
			onClick={() => saveUserLocation(currentSido, list.value)}
		>
			<Link
				href={{
					pathname: router.pathname,
					query: {
						...router.query,
						nPageNum: 1,
						siDoCd: currentSido,
						siGunGuCd: list.value,
					},
				}}
			>
				<a
					onClick={() => {
						toggleLocation()
						resetPos()
						topToPage()
						setCurrentSiGunGu(list.value)
					}}
				>
					<p
						className={
							currentSiGunGu === list.value
								? `${style.gungu} ${style.active}`
								: style.gungu
						}
					>
						{list.siGunGuName}
						<span className={style.icon}>{">"}</span>
					</p>
				</a>
			</Link>
		</li>
	)

	const District = ({
		gungu,
		currentSido,
		toggleLocation,
		currentSiGunGu,
		router,
		topToPage,
	}) => (
		<div className={style.gungu_box}>
			<ul>
				{gungu.map(list => (
					<DistrictBtn
						list={list}
						currentSido={currentSido}
						toggleLocation={toggleLocation}
						currentSiGunGu={currentSiGunGu}
						key={list._id}
						router={router}
						topToPage={topToPage}
					/>
				))}
			</ul>
		</div>
	)

	return (
		<div
			className={showLocation ? `${style.util_wrap} ${style.active}` : style.util_wrap}
		>
			<div className={style.category_box}>
				<h5 className={style.label}>지역 선택</h5>
				<div className={style.close_btn} onClick={toggleLocation}></div>
				<div className={style.sido_wrap}>
					<City {...cityProps} />
					<District {...districtProps} />
				</div>
			</div>
			<div className={style.bg} onClick={toggleLocation}></div>
		</div>
	)
}

export default Location
