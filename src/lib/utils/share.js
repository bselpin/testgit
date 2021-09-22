import { toastCall } from "lib/toastCall"

export const copyUrl = () => {
	const dummy = document.createElement("input")
	const text = location.href
	document.body.appendChild(dummy)
	dummy.value = text
	dummy.select()
	document.execCommand("copy")
	document.body.removeChild(dummy)
	toastCall("주소가 복사되었습니다", "success")
}

export const kakaoShare = (meta) => {
	const { title, description, img, url } = meta
	window.Kakao.Link.createDefaultButton({
		container: "#kakao_link",
		objectType: "feed",
		content: {
			title,
			description,
			imageUrl: img,
			link: {
				mobileWebUrl: url,
				webUrl: url,
			},
		},
		buttons: [
			{
				title: "웹으로 이동",
				link: {
					mobileWebUrl: url,
					webUrl: url,
				},
			},
		],
	})
}
