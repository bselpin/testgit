import Document, { Html, Head, Main, NextScript } from "next/document"

class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx)
		return { ...initialProps }
	}

	render() {
		return (
			<Html lang="ko">
				<Head>
					<meta charSet="utf-8" />
					<meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
					<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
					<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
					<link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
					<link rel="icon" type="image/png" sizes="192x192" href="/favicon-192x192.png" />
					<link rel="icon" href="/favicon.ico" />
					<meta name="theme-color" content="#ffffff" />
					<meta name="author" content="헥톤프로젝트" />
					<meta name="application-name" content="또하나의가족" />
					<meta name="apple-mobile-web-app-capable" content="yes" />
					<meta name="apple-mobile-web-app-status-bar-style" content="default" />
					<meta name="apple-mobile-web-app-title" content="또하나의가족" />
					<meta name="mobile-web-app-capable" content="yes" />
					<link rel="apple-touch-icon" href="/static/icons/touch-icon-iphone.png" />
					<link rel="manifest" href="/manifest.json" />
					<link rel="shortcut icon" href="/favicon.ico" />
					<meta property="og:type" content="website" />
					<meta property="og:site_name" content="또하나의가족" />
					<meta property="og:locale" content="ko_KR" />
					<script
						type="application/ld+json"
						dangerouslySetInnerHTML={{
							__html: `
              
              {
                "@context":"http://schema.org",
                "@type":"Organization",
                "url":"https://ddoga.co.kr/",
                "logo":"https://ddoga.co.kr/logo/logo.svg"
              }`,
						}}
					/>
					<script
						type="application/ld+json"
						dangerouslySetInnerHTML={{
							__html: `
              {
                "@context": "http://schema.org",
                "@type": "Person",
                "name": "또하나의가족, 또가",
                "url": "https://ddoga.co.kr/",
                "sameAs": [
                  "https://blog.naver.com/ddogasw",
                  "https://www.instagram.com/ddoga.co.kr/",
                  "https://www.facebook.com/%EB%98%90%ED%95%98%EB%82%98%EC%9D%98%EA%B0%80%EC%A1%B1-106558678364506"
                ]
              }`,
						}}
					/>
					{process.env.NODE_ENV === "production" &&
						process.env.NEXT_PUBLIC_NO_ROBOTS !== "true" && (
							<>
								<meta
									name="google-site-verification"
									content={process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION_ID}
								/>
								<meta
									name="naver-site-verification"
									content={process.env.NEXT_PUBLIC_NAVER_VERIFICATION_ID}
								/>

								{/* Global Site Tag (gtag.js) - Google Analytics */}
								<script
									async
									src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_CODE}`}
								/>
								<script
									type="text/javascript"
									dangerouslySetInnerHTML={{
										__html: `
                  window.dataLayer = window.dataLayer || []; 
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date()); 
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_CODE}');
                  gtag('config', '${process.env.NEXT_PUBLIC_ADS_CODE}');
                  `,
									}}
								/>
								<script
									type="text/javascript"
									dangerouslySetInnerHTML={{
										__html: `
                  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                  new Date().getTime(),event:'gtm.js'});
                  var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
                  j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                  })(window,document,'script','dataLayer','GTM-PW5QS9H');
                  `,
									}}
								/>
								<script async src="//wcs.naver.net/wcslog.js"></script>
								<script
									type="text/javascript"
									dangerouslySetInnerHTML={{
										__html: `
                  if (!wcs_add) var wcs_add = {};
                  wcs_add["wa"] = "${process.env.NEXT_PUBLIC_WCS_CODE}";
                  if (window.wcs) {
                    wcs_do();
                  }
                  `,
									}}
								/>
								<script
									type="text/javascript"
									dangerouslySetInnerHTML={{
										__html: `
                  if (/MSIE \d|Trident.*rv:/.test(navigator.userAgent)) {
                    window.location = "microsoft-edge:" + window.location;

                    setTimeout(function () {
                      window.location = "https://support.microsoft.com/ko-kr/topic/%EC%9D%B4-%EC%9B%B9-%EC%82%AC%EC%9D%B4%ED%8A%B8%EB%8A%94-microsoft-edge%EC%97%90%EC%84%9C-%EB%8D%94-%EC%9E%98-%EC%9E%91%EB%8F%99%ED%95%A9%EB%8B%88%EB%8B%A4-160fa918-d581-4932-9e4e-1075c4713595?ui=ko-kr&rs=ko-kr&ad=kr";;
                    }, 1);
                  }
                  `,
									}}
								/>
							</>
						)}
					<script async src={process.env.NEXT_PUBLIC_KAKAO_SDK}></script>
				</Head>
				<body>
					<Main />
					<NextScript />
					<span itemType="http://schema.org/Organization" aria-hidden="true">
						<link itemProp="url" href="https://ddoga.co.kr" />
						<a itemProp="sameAs" href="https://blog.naver.com/ddogasw"></a>
						<a itemProp="sameAs" href="https://www.instagram.com/ddoga.co.kr/"></a>
						<a
							itemProp="sameAs"
							href="https://www.facebook.com/%EB%98%90%ED%95%98%EB%82%98%EC%9D%98%EA%B0%80%EC%A1%B1-106558678364506"
						></a>
					</span>
				</body>
			</Html>
		)
	}
}

export default MyDocument
