import Soon from "../components/Soon";
import ReactGA from 'react-ga'
import HeadMeta from "../components/HeadMeta";
import { useEffect } from "react";

const TermsAndCondition = () => {

  useEffect(() => {
    ReactGA.pageview('Terms And Condition')
  }, [])

    return (
      <>
          <HeadMeta 
          title_ext="Terms And Condition" 
          description="Kohee App > Our Terms And Condition" 
          />

          <Soon />
      </>
    );
  };
  
  export default TermsAndCondition;
  