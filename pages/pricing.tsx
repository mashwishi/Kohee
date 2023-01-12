import Soon from "../components/global/Soon";
import ReactGA from 'react-ga'
import HeadMeta from "../components/global/HeadMeta";
import { useEffect } from "react";

const Pricing = () => {
  
  useEffect(() => {
    ReactGA.pageview('Pricing')
  }, [])


    return (
      <>
          <HeadMeta 
          title_ext="Pricing" 
          description="List of the pricing plan, Get more feature!" 
          og_image={''}
          og_url={''}
          />

          <Soon />
      </>
    );
  };
  
  export default Pricing;
  