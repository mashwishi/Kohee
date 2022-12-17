import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import LoadingPage from  "../../components/LoadingPage"
import { BrowserView, MobileView, CustomView } from 'react-device-detect';

import GetUser_Mobile from '../../components/template/getUser_Mobile'
import GetUser_Desktop from '../../components/template/getUser_Desktop'
import GetUser_CustomView from '../../components/template/getUser_Desktop'

import Link from 'next/link';

import ReactGA from 'react-ga'

const Username = () => {
  
    const router = useRouter()
    const { username } = router.query


      const [data, setData] = useState(null)
      const [isLoading, setLoading] = useState(false)

    useEffect(() => {
      setLoading(true)
      fetch(`${process.env.NEXT_PUBLIC_HASURA_REST_API}/user/get/${username.toLowerCase()}`, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        'x-hasura-admin-secret': `${process.env.HASURA_ADMIN_SECRET}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {

          setData(data.users[0])

          ReactGA.pageview('/u/' + data.users[0].user_id)

          setLoading(false)

      })
    }, [])

    if (isLoading) return <LoadingPage/>
    
    if (!data) return (
      <>
        <section className="flex items-center h-full sm:p-16 ">
            <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8 space-y-8 text-center sm:max-w-md">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-40 h-40 dark:text-gray-600">
                <path fill="currentColor" d="M256,16C123.452,16,16,123.452,16,256S123.452,496,256,496,496,388.548,496,256,388.548,16,256,16ZM403.078,403.078a207.253,207.253,0,1,1,44.589-66.125A207.332,207.332,0,0,1,403.078,403.078Z"></path>
                <rect width="176" height="32" x="168" y="320" fill="currentColor"></rect>
                <polygon fill="currentColor" points="210.63 228.042 186.588 206.671 207.958 182.63 184.042 161.37 162.671 185.412 138.63 164.042 117.37 187.958 141.412 209.329 120.042 233.37 143.958 254.63 165.329 230.588 189.37 251.958 210.63 228.042"></polygon>
                <polygon fill="currentColor" points="383.958 182.63 360.042 161.37 338.671 185.412 314.63 164.042 293.37 187.958 317.412 209.329 296.042 233.37 319.958 254.63 341.329 230.588 365.37 251.958 386.63 228.042 362.588 206.671 383.958 182.63"></polygon>
              </svg>
              <p className="text-3xl">Not Found</p>
              <Link href="/">
                <p className="px-8 py-3 font-semibold rounded cursor-pointer">Back to homepage</p>
              </Link>
            </div>
        </section>
      </>
    )

  return (
    <>
      <BrowserView>
        <GetUser_Desktop 
        followers={0}
        visits={0}
        ratings={0} 
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