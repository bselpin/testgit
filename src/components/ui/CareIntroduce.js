import style from "styles/components/careintroduce.module.scss"

export const admission = [
	{
		name: "요양병원",
		className: "hospital",
		text: "꾸준한 진료 및 치료, 재활이 필요하신 분에게 필요해요",
	},
	{
		name: "요양원",
		className: "nursing",
		text: "안정적인 운영 체계로 요양 서비스를 받는 10인 이상의 시설이예요",
	},
	{
		name: "공동생활가정",
		className: "public",
		text:
			"가정집과 같은 주거시설에서 요양 서비스를 제공하는 9인 이하의 시설이예요",
	},
	// {
	// 	name: "실버타운",
	// 	className: "silver",
	// 	text:
	// 		"일상생활이 가능한 어르신이 최상의 서비스를 받으실 수 있는 프리미엄 시설입니다",
	// },
]

export const visit = [
	{
		name: "방문요양",
		className: "visit_nurse",
		text:
			"어르신 가정에 요양보호사가 직접 방문하여 필요한 일상 생활을 지원해요",
	},
	{
		name: "방문목욕",
		className: "visit_bath",
		text: "목욕 시설을 갖춘 차량, 혹은 가정 내에서 목욕을 지원하는 서비스예요",
	},
	{
		name: "방문간호",
		className: "visit_care",
		text:
			"가정에 간호사가 방문하여 간호, 진료보조 서비스를 지원하는 서비스예요",
	},
]

export const protect = [
	{
		name: "주야간보호",
		className: "protect",
		text:
			"주간 또는 야간 일정시간 어르신을 보호하며 신체활동 및 심신기능을 지원하는 서비스예요",
	},
	{
		name: "단기보호",
		className: "short_protect",
		text:
			"하루 24시간, 월 최대 9일 동안 어르신을 보호하며 신체활동 및 심신기능을 지원해 드려요",
	},
]

export const dimentia = [
	{
		name: "치매전담 요양원",
		className: "nursing_dimentia",
		text:
			"일반 요양원 서비스와 더불어 치매 전문 인력이 치매 맞춤 서비스를 제공해 드려요",
	},
	{
		name: "치매전담 공동생활가정",
		className: "public_dimentia",
		text:
			"9인 이하 가정집인 공동생활가정에서 치매 전문 인력이 맞춤 서비스를 제공해 드려요",
	},
	{
		name: "치매전담 주야간보호",
		className: "protect_dimentia",
		text:
			"하루 중 일정 시간동안 치매 전문 요양인력이 치매 어르신에게 알맞는 서비스를 제공해 드려요",
	},
]

export const welfare = [
	{
		name: "복지용구",
		className: "welfare_tool",
		text:
			"신체가 불편한 어르신의 일상생활 편의를 지원하기 위해 복지용구를 대여 및 판매하는 시설",
	},
]

const CareIntroduce = ({ toggleIntro }) => {
	return (
		<div className={style.care_intro_wrap}>
			<div className={style.care_intro_box}>
				<div className={style.close_btn} onClick={toggleIntro}></div>
				<div className={style.intro_box}>
					<p className={style.title}>어르신이 입소하셔야 할 때</p>
					<div className={style.intro_flex}>
						{admission.map((list, index) => (
							<div className={style.introduce} key={index}>
								<div className={`${style.icon} ${style[list.className]}`}></div>
								<div className={style.intro_text}>
									<p className={style.name}>{list.name}</p>
									{list.text}
								</div>
							</div>
						))}
					</div>
				</div>

				<div className={style.intro_box}>
					<p className={style.title}>어르신이 돌봄이나 보호가 필요하실 때</p>
					<div className={style.intro_flex}>
						{protect.map((list, index) => (
							<div className={style.introduce} key={index}>
								<div className={`${style.icon} ${style[list.className]}`}></div>
								<div className={style.intro_text}>
									<p className={style.name}>{list.name}</p>
									{list.text}
								</div>
							</div>
						))}
					</div>
				</div>

				<div className={style.intro_box}>
					<p className={style.title}>
						어르신 댁에서 요양 지원 서비스를 받고 싶으실 때
					</p>
					<div className={style.intro_flex}>
						{visit.map((list, index) => (
							<div className={style.introduce} key={index}>
								<div className={`${style.icon} ${style[list.className]}`}></div>
								<div className={style.intro_text}>
									<p className={style.name}>{list.name}</p>
									{list.text}
								</div>
							</div>
						))}
					</div>
				</div>

				<div className={style.intro_box}>
					<p className={style.title}>
						치매를 앓고 계신 어르신을 모시고 싶을 때
					</p>
					<div className={style.intro_flex}>
						{dimentia.map((list, index) => (
							<div className={style.introduce} key={index}>
								<div className={`${style.icon} ${style[list.className]}`}></div>
								<div className={style.intro_text}>
									<p className={style.name}>{list.name}</p>
									{list.text}
								</div>
							</div>
						))}
					</div>
				</div>

				<div className={`${style.intro_box} ${style.last}`}>
					<p className={style.title}>휠체어, 전동침대, 보행기 등이 필요할 때</p>
					<div className={style.intro_flex}>
						{welfare.map((list, index) => (
							<div className={style.introduce} key={index}>
								<div className={`${style.icon} ${style[list.className]}`}></div>
								<div className={style.intro_text}>
									<p className={style.name}>{list.name}</p>
									{list.text}
								</div>
							</div>
						))}
					</div>
					<div className={style.close} onClick={toggleIntro}>
						닫기
					</div>
				</div>
			</div>
			<div className={style.bg} onClick={toggleIntro}></div>
		</div>
	)
}

export default CareIntroduce
