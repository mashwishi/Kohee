import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'

class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <meta charSet="utf-8" />
            
            <meta property="fb:app_id" content="695286688778792" />

            <meta name="application-name" content="Kohee" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="default" />
            <meta name="apple-mobile-web-app-title" content="Kohee" />
            <meta name="description" content="Gather all of the content you produce and share, Put it in one place where it can be easily found." />
            <meta name="format-detection" content="telephone=no" />
            <meta name="mobile-web-app-capable" content="yes" />
            <meta name="theme-color" content="#E0A82E" />

            <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
            <link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon-152x152.png" />
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180x180.png" />
            <link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon-144x144.png" />

            <link rel="manifest" href='/manifest.json' />
            <link rel="icon" type="image/png" href='/favicon.ico' />

            <meta name="theme-color" content="#E0A82E" />

            <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1971863279565387" crossOrigin="anonymous"></script>
            <Head/>
            <body>
                <Main />
                <NextScript />
            </body>
            </Html>
        )
    }
}

export default MyDocument
