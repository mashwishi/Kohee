import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import LoadingPage from  "../../components/LoadingPage"
import { BrowserView, MobileView, CustomView } from 'react-device-detect';

import GetUser_Mobile from '../../components/template/getUser_Mobile'
import GetUser_Desktop from '../../components/template/getUser_Desktop'
import GetUser_CustomView from '../../components/template/getUser_Desktop'


import NotMobile from '../../components/NotMobile'

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
          setLoading(false)
      })
    }, [])

    if (isLoading) return <LoadingPage/>
    if (!data) return <p>No profile data</p>

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