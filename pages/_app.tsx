import "../styles/globals.css";
import PopupLink from "../components/nexus/PopupLink";
import App, { AppProps, AppContext } from 'next/app'
import {ClerkLoaded, ClerkProvider, SignedIn, SignedOut} from "@clerk/nextjs";
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
import {useRouter} from "next/router";
import { Analytics } from '@vercel/analytics/react';
import NavBar from "../components/global/NavBar";
import Footer from "../components/global/Footer";

// GOOGLE ANALYTICS
import ReactGA from 'react-ga';
import HeadMeta from "../components/global/HeadMeta";
import Head from "next/head";
ReactGA.initialize(process.env.GOOGLE_ANALYTICS_TRACKING_ID ? process.env.GOOGLE_ANALYTICS_TRACKING_ID : '');

const publicPages = [
  "/", 
  "/[username]", 
  "/sign-up",
  "/sign-in",
  "/sample", 
  "/docs/api",
  "/people",
  "/pricing",
  "/terms-and-condition",
  "/privacy-policy",
  "/about"
];

const DisableNav = [
  "/[username]", 
  "/preview/[username]", 
  "/sample", 
];

function MyApp({ Component, pageProps }: AppProps) {

  const router = useRouter();

  const userMeta = pageProps.userMeta ? pageProps.userMeta.data : null

  const temp_desc = 'Gather all of the content you produce and share, Put it in one place where it can be easily found.'

  return (
    <>
      {
        userMeta ?
          <Head>
            <title>Kohee. {`| ${userMeta.username}`}</title>

            <meta charSet="utf-8" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />

            <meta name="description" content={userMeta.bio} />
          
            {/* Facebook Meta Tags */}
            <meta property="og:title" content={`Kohee. | ${userMeta.username}`} />
            <meta property="og:description" content={userMeta.bio} />
            
            <meta property="og:url" content={`${process.env.NEXT_PUBLIC_HOSTNAME}/${userMeta.username}`} />
            <meta property="og:type" content="website"/>

            <meta property="og:image" content={userMeta.profile_image_url} />
            <meta property="og:image:width" content="512" />
            <meta property="og:image:height" content="512" />

            <meta property="fb:app_id" content="695286688778792" />


            {/* Twitter Meta Tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta property="twitter:domain" content='kohee.app' />
            <meta property="twitter:url" content={`${process.env.NEXT_PUBLIC_HOSTNAME}/${userMeta.username}`} />
            <meta name="twitter:title" content={`Kohee. | ${userMeta.username}`} />
            <meta name="twitter:description" content={userMeta.bio} />
            <meta name="twitter:image" content={userMeta.profile_image_url} />

            <link rel="icon" type="image/png" href={userMeta.profile_image_url} />
          </Head>
        :
          <Head>
              <meta charSet="utf-8" />
              <meta name="viewport" content="initial-scale=1.0, width=device-width" />

              <meta name="description" content={temp_desc} />
            
              {/* Facebook Meta Tags */}
              <meta property="og:url" content={process.env.NEXT_PUBLIC_HOSTNAME} />
              <meta property="og:type" content="website"/>
              <meta property="og:image" content='https://i.imgur.com/WHshbGu.png' />
              <meta property="og:image:width" content="512" />
              <meta property="og:image:height" content="512" />
              <meta property="fb:app_id" content="695286688778792" />


              {/* Twitter Meta Tags */}
              <meta name="twitter:card" content="summary_large_image" />
              <meta property="twitter:domain" content='kohee.app' />
              <meta property="twitter:url" content={process.env.NEXT_PUBLIC_HOSTNAME} />
              <meta name="twitter:image" content='https://i.imgur.com/WHshbGu.png' />

              <link rel="icon" type="image/png" href="/bean.png" />
          </Head>
      }
      <ClerkProvider {...pageProps}>
        
        <Analytics />

        <ClerkLoaded>

          {DisableNav.includes(router.pathname) ? <></> :
            <>
                <BrowserView>
                  <NavBar />
                </BrowserView>

                <MobileView>
                  <NavBar />
                </MobileView>
            </>
          }

          {publicPages.includes(router.pathname) ? (
            <main>
              <Component {...pageProps} />
            </main>
          ) : (
            <>
              <SignedIn>
                <Component {...pageProps} />
              </SignedIn>
              <SignedOut>
                <div className="protected">
                  <p>You need to be signed in to access this page.</p>
                </div>
              </SignedOut>
            </>
          )}

          {/* footer */}
          <SignedOut>
            {/* <footer>
              <PopupLink
                label="Kohee is open-source and non-profit project, You can support us by donating!"
                repoLink="https://ko-fi.com/koheeapp"
              />
            </footer> */}
            <Footer/>
          </SignedOut>

        </ClerkLoaded>

      </ClerkProvider>
    </>
  );

}

MyApp.getInitialProps = async (appContext: AppContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext)

  //const req = appContext.ctx.req;
  
  const { router } = appContext;
  const { query } = router;
  const username = query.username;

  async function fetchData() {
    if(username !== 'favicon.ico'){
      const fetchData = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            data:{
                username: `${username?.toString().toLocaleLowerCase()}`
            }
        })
    };
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/user/get`, fetchData);
        const datax = await response.json();
        return datax
    } catch (error) {
        console.error(error);
    }
    }
  }

  const userMeta = await fetchData();

  return {
    pageProps: {
      ...appProps.pageProps,
      userMeta
    },
  }
}

export default MyApp;
