import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { BrowserView, MobileView, CustomView } from 'react-device-detect';

import LoadingPage from '../components/global/LoadingPage';
import GetUser_Mobile from '../components/user/getUser_Mobile';
import GetUser_Desktop from '../components/user/getUser_Desktop';
import NavBar from '../components/global/NavBar';
import HeadMeta from '../components/global/HeadMeta';

import { browserName, deviceDetect, deviceType} from 'react-device-detect';

import Link from 'next/link';
import ReactGA from 'react-ga'



const Username = () => {
  
    const router = useRouter()

    const { username } = router.query

    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)

    //Country API Free
    const [userCountryLoc, setUserCountryLoc] = useState('')

    //Type: mobile = Mobile | browser = Desktop
    const [userDeviceTypeuserDeviceOS, setUserDeviceTypesetUserDeviceOS] = useState(deviceType === `browser` ? `Desktop` : deviceType == `mobile` ? `Mobile` : `Unknown`)

    //OS and Version
    const [userDetect, setUserDetect] = useState(deviceDetect)
    const [userDeviceOS, setUserDeviceOS] = useState(userDetect.isBrowser ? `${userDetect.osName + ' ' + userDetect.osVersion}` : userDetect.isMobile ? `${userDetect.os + ' ' + userDetect.osVersion}` : `Unknown`)
    
    //Browser Name
    const [userBrowser, setUserBrowser] = useState(browserName)

    useEffect(() => {
      setLoading(true)


      async function getData() {
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
            const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/user/get`, fetchData);
            const datax = await response.json();

            setData(datax.data)

            if (data?.user_id) {
              ReactGA.pageview('/' + data.user_id)
              setLoading(false)
            }

            async function fetchCountry() {
              const response = await fetch(process.env.IP_API_URL);
              const data = await response.json();
              setUserCountryLoc(data.country_name);
            }
  
            fetchCountry();
  
            if(userCountryLoc){
  
              //Run Analytics here
              //OS: Android, Windows, iOS, etc.. | Type: Desktop/Mobile | Country | Browser
              //TODO: https://app.clickup.com/t/865bbhg1p
              console.log(  userDeviceOS  + '\n' + userDeviceTypeuserDeviceOS  + '\n' + userCountryLoc + '\n' +  userBrowser )
  
            }

        } catch (error) {
            console.error(error);
        }
      }
      getData()

    }, [userBrowser, userDeviceOS,  userDeviceTypeuserDeviceOS, userCountryLoc])

    if (isLoading) return <LoadingPage/>
    
    if (!data) return (
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

      <HeadMeta 
      title_ext={data.username} 
      description={`Kohee App > ` + data.bio ? data.bio : `Learn more about ${data.username}`}
      og_image={data.profile_image_url}
      og_url={`https://kohee.app/${data.username}`}
      />

      <BrowserView>
        <GetUser_Desktop 
        followers={0}
        visits={0}
        ratings={0} 
        data_banner={data.banner}
        data_bio={data.bio}
        data_profile_banner_url={data.profile_banner_url}
        data_username={data.username}
        data_user_id={data.user_id}
        data_updated_at={data.updated_at}
        data_profile_image_url={data.profile_image_url}
        data_last_name={data.last_name}
        data_id={data.id}
        data_first_name={data.first_name}
        data_created_at={data.created_at}
        username={username}/>
      </BrowserView>

      <MobileView>
        <GetUser_Mobile 
        followers={0}
        visits={0}
        ratings={0} 
        data_profile_banner_url={data.profile_banner_url}
        data_username={data.username}
        data_banner={data.banner}
        data_bio={data.bio}
        data_user_id={data.user_id}
        data_updated_at={data.updated_at}
        data_profile_image_url={data.profile_image_url}
        data_last_name={data.last_name}
        data_id={data.id}
        data_first_name={data.first_name}
        data_created_at={data.created_at}
        username={username}/>
      </MobileView>
    </>
  );
};

  
export default Username;