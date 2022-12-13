import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import LoadingPage from  "../components/LoadingPage"
import GetUser_Sample from '../components/template/getUser_Sample'


const Sample = () => {
  
    const router = useRouter()

    const { username } = 'Mashwishi'

      const [data, setData] = useState(null)
      const [isLoading, setLoading] = useState(false)

    useEffect(() => {
      setLoading(true)
      fetch(`${process.env.NEXT_PUBLIC_HASURA_REST_API}/user/get/mashwishi`, {
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
        <GetUser_Sample 
        followers={4968}
        visits={2458}
        ratings={5} 
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