import NextAuth from "next-auth"
import Providers from "next-auth/providers"

const options = {
	providers: [
		Providers.Kakao({
			clientId: process.env.KAKAO_CLIENT_ID,
			clientSecret: process.env.KAKAO_CLIENT_SECRET,
		}),
		{
			id: "naver",
			name: "Naver",
			type: "oauth",
			version: "2.0",
			params: {
				grant_type: "authorization_code",
			},
			accessTokenUrl: "https://nid.naver.com/oauth2.0/token",
			authorizationUrl:
				"https://nid.naver.com/oauth2.0/authorize?response_type=code",
			profileUrl: "https://openapi.naver.com/v1/nid/me",

			profile(profile) {
				const { response } = profile
				return {
					id: response.id,
					name: response.name,
					email: response.email,
				}
			},
			clientId: process.env.NAVER_CLIENT_ID,
			clientSecret: process.env.NAVER_CLIENT_SECRET,
		},
	],
	callbacks: {
		redirect: async (url, baseUrl) => {
			return url.startsWith(baseUrl) ? url : baseUrl
		},
		jwt: async (token, profile, account) => {
			if (account) {
				token = Object.assign(token, account)
			}
			return Promise.resolve(token)
		},
		session: async (session, token) => {
			session.accessToken = token.accessToken
			session.provider = token.provider
			return Promise.resolve(session)
		},
	},
	session: {
		jwt: true,
		maxAge: 24 * 60 * 60,
	},
	pages: {
		signin: "/login",
		signout: "/",
		error: "/login",
	},
}

const NextAuthApi = (req, res) => NextAuth(req, res, options)

export default NextAuthApi
