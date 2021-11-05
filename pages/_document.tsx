import Document, { Html, Head, Main, NextScript } from 'next/document'
import React from "react"


export default class MPADocument extends Document {

	render() {
		return (
			<Html lang="en">

				{/* Meta Tag */}
				<Head>
					{/* <title>MyPonyAsia</title> */}
					<link rel="dns-prefetch" href="//fonts.gstatic.com" />
					<meta name='format-detection' content='telephone=no' />
					<meta name='application-name' content={'MPA Status'} />
					<meta name='apple-mobile-web-app-capable' content='yes' />
					<meta name='apple-mobile-web-app-status-bar-style' content='default' />
					<meta name='apple-mobile-web-app-title' content={'MPA Status'} />
					<meta name='mobile-web-app-capable' content='yes' />
					<meta name='msapplication-config' content='/browserconfig.xml' />
					<meta name='msapplication-tap-highlight' content='no' />
					<link rel="manifest" href="/manifest.json" />
					
					<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
					<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
					<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
					<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#333333" />
					<meta name="msapplication-TileColor" content="#2d89ef" />
					<meta name="msapplication-TileImage" content="/mstile-144x144.png" />
					<meta name="theme-color" content="#333333" />
				{/* End Meta Tag */}
				</Head>

				{/* Body Component */}
				<body className="bg-trueGray-800 text-trueGray-50">

					{/* Align Component */}
					<div className="flex flex-col h-screen justify-between">

						{/* Set Dark Theme */}
						<div className="min-h-screen max-h-full">

							{/* Main Component */}
							<Main />
							{/* End Main Component */}

						</div>
						{/* End Set Dark Theme */}

					</div>
					{/* End Align Component */}

					{/* NextJS Default Script */}
					<NextScript />
					{/* End NextJS Default Script */}

				</body>
				{/* End Body Component */}
			</Html>
		)
	}
}