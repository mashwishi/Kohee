/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import LoadingPage from '../components/global/LoadingPage';
import GetUser from '../components/user/getUser';
import NavBar from '../components/global/NavBar';
import { browserName, deviceDetect, deviceType} from 'react-device-detect';
import Link from 'next/link';
import ReactGA from 'react-ga'

const Username = ({ user_data, location }) => {
  
    const router = useRouter()

    const { username } = router.query

    const [udata, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)

    //Type: mobile = Mobile | browser = Desktop
    const [userDeviceTypeuserDeviceOS, setUserDeviceTypesetUserDeviceOS] = useState(deviceType === `browser` ? `Desktop` : deviceType == `mobile` ? `Mobile` : `Unknown`)
    
    //OS and Version
    const [userDetect, setUserDetect] = useState(deviceDetect)
    const [userDeviceOS, setUserDeviceOS] = useState(userDetect.isBrowser ? `${userDetect.osName + ' ' + userDetect.osVersion}` : userDetect.isMobile ? `${userDetect.os + ' ' + userDetect.osVersion}` : `Unknown`)
    
    //Browser Name
    const [userBrowser, setUserBrowser] = useState(browserName)

    //Anti-double run
    const effectRan = useRef(false)

    useEffect(() => {
      if(effectRan.current === false){

        setData(user_data.data)
        if (udata?.user_id) {
          setLoading(false)
        }
      }
    }, [])

    if (isLoading) return <LoadingPage/>
    
    if (!udata) return (
      <>
        <NavBar/>
        <section className="flex items-center h-full sm:p-16 ">
            <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8 space-y-8 text-center sm:max-w-md">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-40 h-40 dark:text-gray-600">
                <path fill="currentColor" d="M256,16C123.452,16,16,123.452,16,256S123.452,496,256,496,496,388.548,496,256,388.548,16,256,16ZM403.078,403.078a207.253,207.253,0,1,1,44.589-66.125A207.332,207.332,0,0,1,403.078,403.078Z"></path>
                <rect width="176" height="32" x="168" y="320" fill="currentColor"></rect>
                <polygon fill="currentColor" points="210.63 228.042 186.588 206.671 207.958 182.63 184.042 161.37 162.671 185.412 138.63 164.042 117.37 187.958 141.412 209.329 120.042 233.37 143.958 254.63 165.329 230.588 189.37 251.958 210.63 228.042"></polygon>
                <polygon fill="currentColor" points="383.958 182.63 360.042 161.37 338.671 185.412 314.63 164.042 293.37 187.958 317.412 209.329 296.042 233.37 319.958 254.63 341.329 230.588 365.37 251.958 386.63 228.042 362.588 206.671 383.958 182.63"></polygon>
              </svg>
              <p className="text-3xl">404 Not Found</p>
              <Link href="/">
                <p className="px-8 py-3 font-semibold rounded cursor-pointer">Back to homepage</p>
              </Link>
            </div>
        </section>
      </>
    )

  return (
    <>
        {effectRan.current = true}
        <GetUser
        is_verified={udata.is_verified}
        data_username={udata.username}
        data_banner={udata.banner}
        data_bio={udata.bio}
        data_user_id={udata.user_id}
        data_updated_at={udata.updated_at}
        data_profile_image_url={udata.profile_image_url}
        data_last_name={udata.last_name}
        data_id={udata.id}
        data_first_name={udata.first_name}
        data_created_at={udata.created_at}
        username={username}
        userBrowser={userBrowser}
        userDeviceOS={userDeviceOS}
        userDeviceTypeuserDeviceOS={userDeviceTypeuserDeviceOS}
        userCountryLoc={location.country}
        userCountryCode={location.country_code}
        userLocLong={location.longitude}
        userLocLat={location.latitude }
        userContinentLoc={location.continent}
        userContinentCode={location.continent_code}
        />

    </>
  );
};

export async function getServerSideProps(context) {

  const { username } = context.query

  async function fetchData() {
    const fetchData = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            data:{
                username: `${username.toString().toLocaleLowerCase()}`
            }
        })
    };
    try {
        //Update for 2.0
        //api/rest/user/getData/ > body = user_id
        const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/user/get`, fetchData);
        const datax = await response.json();
        return datax
    } catch (error) {
        console.error(error);
    }
  }

  async function fetchLoc() {
    const fetchData = {
        method: 'GET',
    };
    const geo_api = process.env.GEOAPIFY_URL + process.env.GEOAPIFY_KEY
    try {
        const response = await fetch(geo_api, fetchData);
        const datax = await response.json();
        return datax
    } catch (error) {
        console.error(error);
    }
  }

  const data = await fetchData();
  if(data.data.user_id){
    ReactGA.pageview('/' + data.user_id)
  }

  const loc_response = await fetchLoc();
  const loc = {
    continent: loc_response.continent.name,
    continent_code: loc_response.continent.code,
    country: loc_response.country.name,
    country_code: loc_response.country.iso_code,
    latitude:  loc_response.location.latitude,
    longitude: loc_response.location.longitude
  }

  return {
    props: {
      user_data: data,
      location: loc
    },
  };

}

  
export default Username;