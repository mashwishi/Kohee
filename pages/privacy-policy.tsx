import Soon from "../components/Soon";
import ReactGA from 'react-ga'
import HeadMeta from "../components/HeadMeta";
import { useEffect } from "react";

const PrivacyPolicy = () => {

  useEffect(() => {
    ReactGA.pageview('Privacy Policy')
  }, [])

  
    return (
      <>
          <HeadMeta 
          title_ext="Privacy Policy" 
          description="Kohee App > Our Privacy Policy" 
          />

          <Soon />
      </>
    );
  };
  
  export default PrivacyPolicy;
  