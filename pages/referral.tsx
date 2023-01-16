import Soon from "../components/global/Soon";
import ReactGA from 'react-ga'
import HeadMeta from "../components/global/HeadMeta";
import { useEffect } from "react";

const Referral = () => {
  
  useEffect(() => {
    ReactGA.pageview('Referral')
  }, [])


    return (
      <>
          <HeadMeta 
          title_ext="Referral" 
          description="Invite new users, Get more feature!" 
          og_image={''}
          og_url={''}
          />

          <Soon />
      </>
    );
  };
  
  export default Referral;
  