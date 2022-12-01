import {Html, Head, Main, NextScript} from 'next/document'
import theme from "../themes/theme"

export default function Document() {
    return (
        <Html>
            <Head>
                <meta name="theme-color" content={theme.palette.primary.main} />
                <link href='https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css' rel='stylesheet'/>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                />
                {/*<link rel="stylesheet" href="../styles/globals.css" type="text/css" />*/}

            </Head>
            <body>
                <Main/>
                <NextScript/>
            </body>
        </Html>
    )
}
