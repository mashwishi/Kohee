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

  const userMeta = pageProps.userMeta.data

  return (
    <ClerkProvider {...pageProps}>
      
      <Analytics />

      <ClerkLoaded>

        {
          userMeta.user_id ?
            <HeadMeta title_ext={userMeta.username} description={userMeta.bio} og_image={userMeta.profile_image_url} og_url={`https://kohee.app/${userMeta.username}`} />
          :
            <HeadMeta title_ext={''} description={''} og_image={''} og_url={`https://kohee.app`}/>
        }

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
