import Soon from "../components/global/Soon";
import ReactGA from 'react-ga'
import HeadMeta from "../components/global/HeadMeta";
import { useEffect } from "react";


const People = () => {

  useEffect(() => {
    ReactGA.pageview('People')
  }, [])


    return (
      <>
          <HeadMeta 
          title_ext="People" 
          description="Kohee App > List of all users in this app, Explore users that are part of kohee." 
          />

          <Soon />
      </>
    );
  };
  
  export default People;
  