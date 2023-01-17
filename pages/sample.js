import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import GetUser_Sample from '../components/user/getUser_Sample'
import LoadingPage from '../components/global/LoadingPage'


const Sample = () => {
  
    const router = useRouter()

    const username = 'Mashwishi'

      const [data, setData] = useState(null)
      const [isLoading, setLoading] = useState(false)

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
                    username: `${username.toString().toLowerCase()}`
                }
            })
        };
        
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/user/get`, fetchData);
            const data = await response.json();

            setData(data.data)
  
            setLoading(false)
        } catch (error) {
            console.error(error);
        }
    }
    getData()
    
    }, [])

    if (isLoading) return <LoadingPage/>
    if (!data) return <p>No profile data</p>

  return (
    <>
        <GetUser_Sample 
        is_verified={data.is_verified}
        is_admin={data.is_admin}
        is_mod={data.is_mod}
        is_vip={data.is_vip}
        is_partner={data.is_partner}
        is_contibutor={data.is_contibutor}
        is_sponsor={data.is_sponsor}
        is_supporter={data.is_sponsor}
        is_business={data.is_business}
        followers={4968}
        visits={2458}
        ratings={5} 
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
        
    </>
  );
};
  
export default Sample;