import dynamic from "next/dynamic"

const Pannellum = dynamic(
	() => import("pannellum-react-next-no-video").then(mod => mod.Pannellum),
	{
		ssr: false,
	},
)

export default function Panorama({ img, id, mobile }) {
	return (
		<>
			<Pannellum
				id={id}
				image={img}
				width="100%"
				height={mobile ? "25vh" : "45vh"}
				hfov={130}
				autoLoad
				autoRotate={-4}
				mouseZoom={false}
			/>
		</>
	)
}
