import { useUser, SignedOut, SignedIn } from "@clerk/nextjs";
import React from "react";

import SetUser from "../components/dashboard/setUser";

import Interact_Landing from "../components/home/Interact_Landing";
import Landing from "../components/home/Landing";

import HeadMeta from "../components/global/HeadMeta";



import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';

const Home = () => {

  return (
    <>
          <SignedOut>
            <SignedOutCards />
          </SignedOut>
          <SignedIn>
            <SignedInCards />
          </SignedIn>
    </>
  );
};

const SignedOutCards = () => {
  return (
    <>
      <HeadMeta 
      title_ext="Create a better profile!" 
      description="" 
      og_image={''}
      og_url={''}
      />

        <BrowserView>
          <Interact_Landing />
        </BrowserView>

        <MobileView>
          <Landing/>
        </MobileView>
      
    </>
  );
};

const SignedInCards = () => {

  const { user } = useUser();
  const titleext = user?.username ? user?.username?.toString() : user?.fullName?.toString() || ""

  return (
    <>
      <HeadMeta 
      title_ext={titleext}
      description="" 
      og_image={''}
      og_url={''}
      />
      
      <BrowserView>
        <SetUser />
      </BrowserView>

      <MobileView>
        <SetUser />
      </MobileView>
    </>
  );
};

export default Home;
