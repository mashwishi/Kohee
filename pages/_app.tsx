import "../styles/globals.css";
import PopupLink from "../components/nexus/PopupLink";
import App, { AppProps, AppContext } from 'next/app'
import {ClerkLoaded, ClerkProvider, SignedIn, SignedOut} from "@clerk/nextjs";
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
import {useRouter} from "next/router";
import { Analytics } from '@vercel/analytics/react';
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

// GOOGLE ANALYTICS
import ReactGA from 'react-ga';
ReactGA.initialize(process.env.GOOGLE_ANALYTICS_TRACKING_ID ? process.env.GOOGLE_ANALYTICS_TRACKING_ID : '');

const publicPages = [
  "/", 
  "/u/[username]", 
  "/api/user/create",
  "/sign-up",
  "/sign-in",
  "/sample", 
  "/docs/api",
  "/people",
  "/pricing",
  "/terms-and-condtion",
  "/privacy-policy",
  "/about"
];

const DisableNav = [
  "/u/[username]", 
  "/preview/[username]", 
  "/sample", 
];

function MyApp({ Component, pageProps }: AppProps) {

  const router = useRouter();

  return (
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
          <footer>
            <PopupLink
              label="Kohee is open-source and non-profit project, You can support us by donating!"
              repoLink="https://ko-fi.com/koheeapp"
            />
          </footer>
          <Footer/>
        </SignedOut>

      </ClerkLoaded>
    </ClerkProvider>
  );

}

MyApp.getInitialProps = async (appContext: AppContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext)
  //const req = appContext.ctx.req
  //console.log(req)
  return {
    pageProps: {
      ...appProps.pageProps
    },
  }
}

export default MyApp;
