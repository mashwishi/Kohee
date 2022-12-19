import { useEffect } from "react";
import ReactGA from 'react-ga'
import Soon from "../../../components/Soon";

const Api = () => {

  useEffect(() => {
    ReactGA.pageview('API Docs')
  }, [])


    return (
      <>
          <Soon />
      </>
    );
  };
  
  export default Api;
  