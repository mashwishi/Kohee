/* eslint-disable react/no-unknown-property */
import "../styles/globals.css";
import PopupLink from "../components/nexus/PopupLink";
import App, { AppProps, AppContext } from 'next/app'
import {ClerkLoaded, ClerkProvider, SignedIn, SignedOut} from "@clerk/nextjs";
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
import {useRouter} from "next/router";
import { Analytics } from '@vercel/analytics/react';
import NavBar from "../components/global/NavBar";
import Footer from "../components/global/Footer";
import Script from 'next/script'

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
  "/referral",
  "/terms-and-condition",
  "/privacy-policy",
  "/about",
  "/faq"
];

const DisableNav = [
  "/[username]", 
  "/preview/[username]", 
  "/sample", 
];

interface optionsPagesType {
  id: number;
  title: string;
  description: string;
  image: string;
  slug: string; } 

const optionsPagesType: optionsPagesType[] = [   
  { id: 1, slug: '/sign-up', title: 'Sign Up', description: 'Create an account', image: 'https://i.imgur.com/tw6hBDm.png' },
  { id: 2, slug: '/sign-in', title: 'Sign In', description: 'Login your kohee account', image: 'https://i.imgur.com/tw6hBDm.png' },
  { id: 3, slug: '/docs/api', title: 'API Documentation', description: 'Learn more about kohee api', image: 'https://i.imgur.com/tw6hBDm.png' },
  { id: 4, slug: '/people', title: 'Discover', description: 'List of all users in this app, Explore users that are part of kohee.', image: 'https://i.imgur.com/tw6hBDm.png' },
  { id: 5, slug: '/referral', title: 'Referral', description: 'Invite new users, Get more feature!', image: 'https://i.imgur.com/tw6hBDm.png' },
  { id: 6, slug: '/terms-and-condition', title: 'Terms and Condition', description: 'Our Terms And Condition', image: 'https://i.imgur.com/tw6hBDm.png' },
  { id: 7, slug: '/privacy-policy', title: 'Privacy Policy', description: 'Our Privacy Policy', image: 'https://i.imgur.com/tw6hBDm.png' },
  { id: 8, slug: '/about', title: 'About', description: 'Learn more about Kohee', image: 'https://i.imgur.com/tw6hBDm.png' },
  { id: 9, slug: '/', title: 'Create a better profile!', description: 'Gather all of the content you produce and share, Put it in one place where it can be easily found.', image: 'https://i.imgur.com/tw6hBDm.png' },
];

function MyApp({ Component, pageProps }: AppProps) {

  const router = useRouter();
  const userMeta = pageProps.userMeta ? pageProps.userMeta.data : null

  const filteredOptionsPagesType = optionsPagesType.filter((page) => page.slug === router.pathname);

  return (
    <>
      <Script data-ad-client="ca-pub-1971863279565387" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></Script>
      {
        userMeta ?
          <Head>
            <title>Kohee. {`| ${userMeta.username}`}</title>

            <meta name="description" content={userMeta.bio} />
          
            {/* Facebook Meta Tags */}
            <meta property="og:title" content={`Kohee. | ${userMeta.username}`} />
            <meta property="og:description" content={userMeta.bio} />
            
            <meta property="og:url" content={`${process.env.NEXT_PUBLIC_HOSTNAME}/${userMeta.username}`} />
            <meta property="og:type" content="website"/>

            <meta property="og:image" content={userMeta.profile_image_url} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />

            {/* Twitter Meta Tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta property="twitter:domain" content='kohee.app' />
            <meta property="twitter:url" content={`${process.env.NEXT_PUBLIC_HOSTNAME}/${userMeta.username}`} />
            <meta name="twitter:title" content={`Kohee. | ${userMeta.username}`} />
            <meta name="twitter:description" content={userMeta.bio} />
            <meta name="twitter:image" content={userMeta.profile_image_url} />

            <script async custom-element="amp-ad" src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"></script>
          </Head>
        :
          <Head>
              {filteredOptionsPagesType.map((data) => (
                <>
                  <title>Kohee. {`| ${data.title}`}</title>

                  <meta name="description" content={data.description} />

                  {/* Facebook Meta Tags */}
                  <meta property="og:title" content={`Kohee. | ${data.title}`} />
                  <meta property="og:description" content={data.description} />

                  <meta property="og:url" content={`${process.env.NEXT_PUBLIC_HOSTNAME}${data.slug}`} />
                  <meta property="og:type" content="website"/>

                  <meta property="og:image" content={data.image} />
                  <meta property="og:image:width" content="1200" />
                  <meta property="og:image:height" content="630" />

                  {/* Twitter Meta Tags */}
                  <meta name="twitter:card" content="summary_large_image" />
                  <meta property="twitter:domain" content='kohee.app' />
                  <meta property="twitter:url" content={`${process.env.NEXT_PUBLIC_HOSTNAME}${data.slug}`} />
                  <meta name="twitter:title" content={`Kohee. | ${data.title}`} />
                  <meta name="twitter:description" content={data.description} />
                  <meta name="twitter:image" content={data.image} />

                  <script async custom-element="amp-ad" src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"></script>
                </>
              ))}
          </Head>
      }
      <ClerkProvider {...pageProps}>
        
        <Analytics />

        <ClerkLoaded>

        <div data-theme="bumblebee">

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
          <Footer/>
          
        </div>

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
