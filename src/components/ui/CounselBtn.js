import Link from "next/link"
import CountUp from "react-countup"
import style from "styles/home.module.scss"

const COUNT = 42923

const CounselBtn = () => {
	return (
		<div className={style.counsel_btn_wrap}>
			<div className="outer_wrap">
				<div className={style.counsel_info}>
					전국
					<span className={style.count}>
						<CountUp start={0} end={COUNT} separator="," delay={0.2} duration={1.8} />
					</span>
					개 요양시설과 상담을 시작하세요
				</div>
				<Link href={`/counsel/info?type=4&code=`}>
					<a className={style.counsel_btn}>무료 온라인 상담하기</a>
				</Link>
			</div>
		</div>
	)
}

export default CounselBtn
