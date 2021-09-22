import { useRouter } from "next/router"
import { resetPosAll } from "lib/utils/scroll"
import Link from "next/link"
import style from "styles/components/nav.module.scss"

const navList = [
	{
		id: 0,
		path: "/",
		name: "홈",
		className: "home",
		activePath: "",
	},
	{
		id: 1,
		path: process.env.NEXT_PUBLIC_CASE_TARGET,
		name: "상담사례",
		className: "case",
		activePath: "case",
	},
	{
		id: 2,
		path: process.env.NEXT_PUBLIC_INFO_TARGET,
		name: "요양정보",
		className: "info",
		activePath: "info",
	},
	{
		id: 3,
		path: process.env.NEXT_PUBLIC_MYPAGE_TARGET,
		name: "MY또가",
		className: "mypage",
		activePath: "mypage",
	},
]

const NavBtn = ({ curPath, path, activePath, className, name }) => (
	<li className={style.nav_btn} onClick={resetPosAll}>
		<Link href={path}>
			<a>
				<div
					className={`${style.nav_icon} ${style[className]} ${
						curPath === activePath ? style.active : ""
					}`}
				></div>
				<p className={curPath === activePath ? `${style.active}` : ""}>{name}</p>
			</a>
		</Link>
	</li>
)

export default function Nav({ hidden }) {
	const router = useRouter()
	const { pathname } = router

	const getPathName = () => {
		const [empty, curPath] = pathname.split("/")
		return curPath
	}

	const curPath = getPathName()

	return (
		<>
			<nav className={hidden ? `${style.nav} ${style.hidden}` : style.nav}>
				<div className="outer_wrap nav">
					<ul className={style.nav_box}>
						{navList.map(list => (
							<NavBtn curPath={curPath} {...list} key={list.id} />
						))}
					</ul>
				</div>
			</nav>
		</>
	)
}
