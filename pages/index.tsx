import { useUser, SignedOut, SignedIn } from "@clerk/nextjs";
import React from "react";

import SetUser_Desktop from "../components/dashboard/setUser_Desktop";
import SetUser_Mobile from "../components/dashboard/setUser_Mobile";

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
  const titleext = user?.username ? user?.username!.toString() : user?.fullName!.toString() || ""

  return (
    <>
      <HeadMeta 
      title_ext={titleext}
      description="" 
      />
      
        <BrowserView>
          <SetUser_Desktop />
        </BrowserView>

        <MobileView>
          <SetUser_Mobile />
        </MobileView>
    </>
  );
};

export default Home;
