const widthBundleAnalyzer = require("@next/bundle-analyzer")({
	enabled: process.env.ANALYZE === "true",
})
const withPWA = require("next-pwa")
const runtimeCaching = require("next-pwa/cache")
const execSync = require("child_process").execSync
const lastCommitCommand = "git rev-parse HEAD"

module.exports = widthBundleAnalyzer(
	withPWA({
		pwa: {
			dest: "public",
			disable: process.env.NODE_ENV === "development",
			mode: "production",
			runtimeCaching,
		},
		poweredByHeader: false,
		compress: true,
		webpack: config => {
			config.resolve.modules.push(__dirname)
			return config
		},
		webpack5: true,
		async generateBuildId() {
			return execSync(lastCommitCommand).toString().trim()
		},
		async headers() {
			return [
				{
					source: "/:all*(svg|jpg|png|woff2|woff|JPG|PNG)",
					locale: false,
					headers: [
						{
							key: "Cache-Control",
							value: "public, max-age=31536000, must-revalidate",
						},
					],
				},
			]
		},
	}),
)
