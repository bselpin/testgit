import { memo } from "react"
import style from "styles/components/detail.module.scss"
import { checkInteger } from "lib/utils/listCommon"

const Worker = ({ worker, isVisit }) => {
	const {
		chargeDoc,
		chrgDoc,
		dent,
		nur,
		nurArticle,
		physicalMTret,
		wrkMTret,
		equipLong,
		hdOfce,
		socWel,
		ofceEmp,
		nut,
		cook,
		hygiPrsn,
		mgmtPrsn,
		suppPrsn,
		etcPer,
		nurse,
		docChrPeople,
		doctor,
		support,
		recuChrPeople,
		nurChrPeople,
		sum_recuProt_1_recuProt_2: recu,
	} = worker

	const EtcList = ({ kor, worker }) =>
		worker >> 0 > 0 && (
			<li>
				{kor} <span className={style.number}>{worker}명</span>
			</li>
		)

	return (
		<div className={style.detail_box}>
			<p className={style.title}>인력 정보</p>
			<div className={style.detail_info_box}>
				<div className={`${style.worker_wrap} ${style.care}`}>
					{doctor >> 0 > 0 && (
						<div className={style.worker_flex}>
							<div className={style.worker_box}>
								<p className={style.name}>의사</p>
								<div className={`${style.worker_icon} ${style.doctor}`}></div>
								<p className={style.label}>
									{doctor} <span>명</span>
								</p>
							</div>
							<div className={style.avg_box}>
								<p className={style.avg}>
									담당 어르신 <span>{checkInteger(docChrPeople)}명</span>
								</p>
							</div>
							{chrgDoc > 0 ? (
								<div className={style.worker_detail}>
									<p>전임의 {chrgDoc}명</p>
									{chargeDoc >> 0 > 0 ? <p>계약의 {chargeDoc}명</p> : null}
								</div>
							) : null}
						</div>
					)}

					{nurse >> 0 > 0 && (
						<div className={style.worker_flex}>
							<div className={style.worker_box}>
								<p className={style.name}>간호사</p>
								<div className={`${style.worker_icon} ${style.nurse}`}></div>
								<p className={style.label}>
									{nurse} <span>명</span>
								</p>
							</div>
							<div className={style.avg_box}>
								{!isVisit ? (
									<p className={style.avg}>
										담당 어르신 <span>{checkInteger(nurChrPeople)}명</span>
									</p>
								) : null}
							</div>
							{nurArticle > 0 ? (
								<div className={style.worker_detail}>
									{nur >> 0 > 0 ? <p>간호사 {nur}명</p> : null}
									<p>간호조무사 {nurArticle}명</p>
								</div>
							) : null}
						</div>
					)}

					{recu >> 0 > 0 && (
						<div className={style.worker_flex}>
							<div className={style.worker_box}>
								<p className={style.name}>요양보호사</p>
								<div
									className={`${style.worker_icon} ${style.caregiver}`}
								></div>
								<p className={style.label}>
									{recu} <span>명</span>
								</p>
							</div>
							<div className={style.avg_box}>
								{!isVisit ? (
									<p className={style.avg}>
										담당 어르신 <span>{checkInteger(recuChrPeople)}명</span>
									</p>
								) : null}
							</div>
						</div>
					)}
				</div>

				{support >> 0 !== 0 && (
					<div className={style.etc_worker}>
						<div className={style.etc_title}>
							기타 근무 인력 <span className={style.support}>{support}명</span>
						</div>
						<ul className={style.etc_box}>
							<EtcList kor={"사회복지사"} worker={socWel} />

							<EtcList kor={"치위생사"} worker={dent} />

							<EtcList kor={"물리치료사"} worker={physicalMTret} />

							<EtcList kor={"작업치료사"} worker={wrkMTret} />

							<EtcList kor={"시설장"} worker={equipLong} />

							<EtcList kor={"사무국장"} worker={hdOfce} />

							<EtcList kor={"사무원"} worker={ofceEmp} />

							<EtcList kor={"영양사"} worker={nut} />

							<EtcList kor={"조리원"} worker={cook} />

							<EtcList kor={"위생원"} worker={hygiPrsn} />

							<EtcList kor={"관리인"} worker={mgmtPrsn} />

							<EtcList kor={"보조원"} worker={suppPrsn} />

							<EtcList kor={"기타인력"} worker={etcPer} />
						</ul>
					</div>
				)}
			</div>
		</div>
	)
}

export default Worker
