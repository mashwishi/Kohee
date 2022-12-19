import Soon from "../components/Soon";
import ReactGA from 'react-ga'
import HeadMeta from "../components/HeadMeta";
import { useEffect } from "react";

const Pricing = () => {
  
  useEffect(() => {
    ReactGA.pageview('Pricing')
  }, [])


    return (
      <>
          <HeadMeta 
          title_ext="Pricing" 
          description="Kohee App > List of the pricing plan, Get more feature!" 
          />

          <Soon />
      </>
    );
  };
  
  export default Pricing;
  