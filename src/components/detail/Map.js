import { useState, useEffect } from "react"
import style from "styles/components/detail.module.scss"

const Map = ({ xpos, ypos, name, address }) => {
	const [XPOS, setXPOS] = useState(xpos)
	const [YPOS, setYPOS] = useState(ypos)

	const nameTag = (name) =>
		`<div class="marker" style="min-width:200px;text-align:center;padding:10px 15px 12px;font-size: 16px; color: #0055ff; font-weight: 500; height: ${
			name.length > 10 ? "2.75rem" : "100%"
		};">${name}</div>`

	useEffect(() => {
		if (document) {
			const script = document.createElement("script")
			script.async = true
			script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false&libraries=services`
			document.head.appendChild(script)

			if (address) {
				script.onload = () => {
					kakao.maps.load(() => {
						const el = document.getElementById("map")

						const map = new kakao.maps.Map(el, {
							center: new kakao.maps.LatLng(YPOS, XPOS),
							level: 4,
						})

						const geocoder = new kakao.maps.services.Geocoder()

						geocoder.addressSearch(address, (result, status) => {
							if (status === kakao.maps.services.Status.OK) {
								const coords = new kakao.maps.LatLng(result[0].y, result[0].x)
								const marker = new kakao.maps.Marker({
									position: coords,
								})

								setXPOS(coords.La)
								setYPOS(coords.Ma)

								const infowindow = new kakao.maps.InfoWindow({
									content: nameTag(name),
								})

								infowindow.open(map, marker)
								map.setCenter(coords)
								marker.setMap(map)
							}
						})
					})
				}
			}

			if (!address) {
				script.onload = () => {
					kakao.maps.load(() => {
						const el = document.getElementById("map")
						const map = new kakao.maps.Map(el, {
							center: new kakao.maps.LatLng(YPOS, XPOS),
							level: 4,
						})

						const markerPosition = new kakao.maps.LatLng(YPOS, XPOS)
						const marker = new kakao.maps.Marker({
							position: markerPosition,
						})
						const infowindow = new kakao.maps.InfoWindow({
							content: nameTag(name),
						})
						infowindow.open(map, marker)
						marker.setMap(map)
					})
				}
			}
		}
	}, [])

	return (
		<div className={`${style.detail_box} ${style.map_box}`}>
			<p className={style.map_desc}>지도를 누르면 카카오맵으로 연결됩니다</p>
			<a
				href={`https://map.kakao.com/link/to/${name},${YPOS},${XPOS}`}
				target="_blank"
				rel="noopener noreferrer"
				style={{ display: "block" }}
			>
				<div id="map"></div>
			</a>
		</div>
	)
}

export default Map
