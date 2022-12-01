import '../styles/globals.css'
import type {AppProps} from 'next/app'
import Head from 'next/head'
import {FC, useEffect, useState} from "react";
import {wrapper} from "../store";
import {DevSupport} from "@react-buddy/ide-toolbox";
import {ComponentPreviews, useInitial} from "../dev";
import {CssBaseline, ThemeProvider} from "@mui/material";
import MainTheme from "../themes/theme";
import Loader from "../components/Loader/Loader";
import {useTypeSelector} from "../hooks/useTypeSelector";
import { Router } from 'next/router';



const WrappedApp: FC<AppProps> = ({Component, pageProps}) => {

    // const {} = useTypeSelector(state => state.app_state)

    const [loading, setLoading] = useState(false);
    useEffect(() => {
        Router.events.on('routeChangeStart', () => setLoading(true));
        Router.events.on('routeChangeComplete', () => setLoading(false));
        Router.events.on('routeChangeError', () => setLoading(false));
        return () => {
            Router.events.off('routeChangeStart', () => setLoading(true));
            Router.events.off('routeChangeComplete', () => setLoading(false));
            Router.events.off('routeChangeError', () => setLoading(false));
        };
    }, [Router.events]);

    return (
        <>
            {!loading ? (
                <>
                    <Head>
                        <title>CanadaLaptop</title>
                        <meta name="viewport" content="initial-scale=1, width=device-width" />
                    </Head>
                    <DevSupport ComponentPreviews={ComponentPreviews}
                                useInitialHook={useInitial}
                    >
                        <ThemeProvider theme={MainTheme}>
                            <CssBaseline />
                            <Component {...pageProps} />
                        </ThemeProvider>
                    </DevSupport>
                </>
            ) : (
                <Loader />
            )}
        </>
    );
}

export default wrapper.withRedux(WrappedApp)
