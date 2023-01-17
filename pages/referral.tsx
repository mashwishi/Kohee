import { useEffect, useState } from "react";
import ReactGA from 'react-ga'
import { useClerk } from "@clerk/nextjs";

import HeadMeta from "../components/global/HeadMeta";

const Referral = () => {

  const { openSignIn } = useClerk();

  useEffect(() => {

    ReactGA.pageview('Refferal')

  }, [])

  return (
    <>

      <HeadMeta 
      title_ext="Referral" 
      description="Invite new users, Get more feature!" 
      og_image={''}
      og_url={''}
      />


      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto divide-y grid grid-cols-1">
          <div>
            <div className="flex flex-col text-center w-full">

              <h1 className="text-4xl font-bold title-font mb-4 text-gray-900">Refferal</h1>
              <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Welcome to Kohee&apos;s Referral Program! By inviting your friends to join our platform, you&apos;ll not only be helping them customize their profiles with bonus features, but you&apos;ll also be earning additional features for yourself. The more friends you invite, the more features you&apos;ll unlock. So why wait? Start inviting your friends today and take your profile customization to the next level!
              </p>

              <div className="mt-8 pt-2 mx-auto text-gray-600">
                <button onClick={() => openSignIn()} className="flex items-center px-6 py-3 text-gray-500 bg-gray-100 rounded-md hover:bg-gray-200 hover:text-gray-600">
                Join our Referral Program
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </button>
              </div>

              <img className="mx-auto" src="/referral.jpg" alt="Referral"  width="500px"/>

            </div>
          </div>
        </div>
      </section>
    </>
  );

};
  
  export default Referral;
  