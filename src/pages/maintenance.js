import { NextSeo } from "next-seo"
import style from "styles/maintenance.module.scss"

const TITLE = `점검중입니다 | ${process.env.NEXT_PUBLIC_SLOGAN} | ${process.env.NEXT_PUBLIC_SITE_NAME}`
const DESC = "또하나의가족 서비스 점검중입니다."

const Maintenance = () => {
	return (
		<>
			<NextSeo title={TITLE} description={DESC} />

			<div className={style.main_wrap}>
				<div>
					<img className={style.icon} src="/img/maintenance.png" alt="icon" />
					<p className={style.title}>
						현재 <span>서비스</span> 점검중입니다
					</p>

					<div className={style.text}>
						<p>안녕하세요 또하나의가족입니다.</p>
						<p>
							서비스 업데이트를 위해 부득이 임시 점검을 실시합니다. <br />
							점검 중에는 서비스를 일시적으로 이용하실 수 없으니 양해를 부탁 드립니다.{" "}
						</p>
					</div>

					<div className={style.time_box}>
						<p>
							<span>점검일시 : </span> <span>2021년 09월 10일 15:30 ~</span>
						</p>
					</div>

					<div className={style.text}>
						<p>
							빠른 시간 내에 점검을 끝낼 수 있도록 최선을 다하겠습니다.
							<br />
							서비스 이용에 불편을 드려 대단히 죄송합니다.
						</p>
						<p className={style.bold}>또하나의가족 운영팀 드림</p>
					</div>
				</div>
			</div>
		</>
	)
}

export default Maintenance
