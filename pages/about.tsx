import Soon from "../components/Soon";
import ReactGA from 'react-ga'
import HeadMeta from "../components/HeadMeta";
import { useEffect } from "react";

const About = () => {

  useEffect(() => {
    ReactGA.pageview('About')
  }, [])

    return (
      <>
          <HeadMeta 
          title_ext="About" 
          description="Kohee App > Learn more about Kohee" 
          />

          <Soon />
      </>
    );
  };
  
  export default About;
  