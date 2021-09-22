import Link from "next/link"
import SwiperCore, { Autoplay } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import LoginBtn from "components/ui/LoginBtn"
import LoginType from "components/ui/LoginType"
import useLogin from "lib/hooks/useLogin"
import style from "styles/components/header.module.scss"

SwiperCore.use([Autoplay])

export default function Header({ scroll }) {
	const { login, user, auth } = useLogin()

	return (
		<header className={scroll ? style.header : `${style.header} ${style.active}`}>
			<Swiper
				className={style.header_swiper}
				slidesPerView={1}
				loop={true}
				speed={600}
				autoplay={{ delay: 5500, disableOnInteraction: true }}
			>
				<SwiperSlide>
					<Link href="/event/energy">
						<a className={`${style.award_wrap} ${style.lan}`}>
							<div className="outer_wrap flex sb aic">
								<div className="flex aic">
									<div className={style.event_box}>
										<p className={style.info_label}>당신의 든든한 활력, 또하나의가족</p>
										<p className={style.text}>
											요양상담 남기고 <span>활기력</span> 선물 받기!
										</p>
									</div>
								</div>

								<div className={style.event_icon}></div>
							</div>
						</a>
					</Link>
				</SwiperSlide>

				<SwiperSlide>
					<Link href="/event/biz">
						<a className={`${style.award_wrap} ${style.event}`}>
							<div className="outer_wrap flex sb aic">
								<div className="flex aic">
									<div className={style.event_box}>
										<p className={style.info}>요양시설 전용 서비스</p>
										<p className={style.text}>
											<span>또가비즈</span>
											<span className={style.gsans}>OPEN</span>
										</p>
									</div>
									<div className={`${style.event_box} ${style.slash}`}>
										<p className={style.info}>100% 당첨 이벤트</p>
										<p className={style.text}>
											<span className={style.eng}>Coming Soon!</span>
										</p>
									</div>
								</div>

								<div className={style.event_icon}></div>
							</div>
						</a>
					</Link>
				</SwiperSlide>

				{/* <SwiperSlide className={style.award_wrap}>
					<a
						href="http://belovedbrand.chosunpedia.com/sp.php?p=41"
						target="_blank"
						rel="noopener noreferrer"
					>
						<div className="outer_wrap flex jcc aic">
							<div className={style.award_icon}></div>
							<p className={style.award_text}>
								2021년 한국의 가장 사랑받는 브랜드 대상 수상!
							</p>
						</div>
					</a>
				</SwiperSlide> */}
			</Swiper>

			<div className="outer_wrap biz">
				<div className="flex end">
					<Link href="/">
						<a className={style.logo}></a>
					</Link>
					{!login ? <LoginBtn /> : <LoginType user={user} auth={auth} />}
				</div>
			</div>
		</header>
	)
}
