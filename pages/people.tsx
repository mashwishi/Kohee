import Soon from "../components/global/Soon";
import ReactGA from 'react-ga'
import { useEffect, useState } from "react";

import GetUser_All from "../components/people/getUsers_All";
import LoadingPage from "../components/global/LoadingPage";
import Link from "next/link";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

const People = () => {

  const [isLoading, setLoading] = useState(false)
  const [userObj, setUserObj] = useState<any | null>(null);
  const [userObjFiltered, setUserObjFiltered] = useState<any | null>(null);
  const [userCount, setUserCount] = useState(0)
  const [stateSearch, setStateSearch] = useState("")

  useEffect(() => {
    
    setLoading(true)

    ReactGA.pageview('People')

    async function getData() {
      const fetchData = {
          method: 'POST',
          headers: {
          'Content-Type': 'application/json'
          }
      };
      
      try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/user/all`);
          const data = await response.json();

          setUserCount(data?.data?.users.length > 0 ? data.data.users.length : 0) 

          setUserObj(data?.data?.users)
          setUserObjFiltered(data?.data?.users)
  
          setLoading(false)
      } catch (error) {
          console.error(error);
      }
  }
  getData()

  }, [])

  useEffect(() => {

    if (stateSearch.length > 0) {
      setUserObjFiltered(userObj.filter((u: { username: string; }) => u.username.toLowerCase().includes(stateSearch.toLowerCase())));
      setUserCount(userObjFiltered?.length > 0 ? userObjFiltered.length : 0)
    }
    else {
      setUserObjFiltered(userObj)
      setUserCount(userObj?.length > 0 ? userObj.length : 0) 
    }

  }, [userObj, stateSearch])

  if (isLoading) return <LoadingPage/>
  
  if (!userObj) return (
    <>
      <section className="flex items-center h-full sm:p-16 ">
          <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8 space-y-8 text-center sm:max-w-md">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-40 h-40 dark:text-gray-600">
              <path fill="currentColor" d="M256,16C123.452,16,16,123.452,16,256S123.452,496,256,496,496,388.548,496,256,388.548,16,256,16ZM403.078,403.078a207.253,207.253,0,1,1,44.589-66.125A207.332,207.332,0,0,1,403.078,403.078Z"></path>
              <rect width="176" height="32" x="168" y="320" fill="currentColor"></rect>
              <polygon fill="currentColor" points="210.63 228.042 186.588 206.671 207.958 182.63 184.042 161.37 162.671 185.412 138.63 164.042 117.37 187.958 141.412 209.329 120.042 233.37 143.958 254.63 165.329 230.588 189.37 251.958 210.63 228.042"></polygon>
              <polygon fill="currentColor" points="383.958 182.63 360.042 161.37 338.671 185.412 314.63 164.042 293.37 187.958 317.412 209.329 296.042 233.37 319.958 254.63 341.329 230.588 365.37 251.958 386.63 228.042 362.588 206.671 383.958 182.63"></polygon>
            </svg>
            <p className="text-3xl">Failed to Load</p>
            <Link href="/">
              <p className="px-8 py-3 font-semibold rounded cursor-pointer">Back to homepage</p>
            </Link>
          </div>
      </section>
    </>
  )
    return (
      <>

        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-col text-center w-full">
              <h1 className="text-4xl font-medium title-font mb-4 text-gray-900">Discover</h1>
              <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Discover and connect with a diverse community of content creators, businesses, artists, singers, developers, and more. Looking for someone to collaborate with? Or maybe you&apos;re searching for a specific person? Either way, you&apos;re sure to find what you&apos;re looking for here. So come on in and start exploring all that Kohee has to offer!</p>
            
              <div className="mt-8 pt-2 relative mx-auto text-gray-600 md:w-[90%]  lg:w-[60%]">
              <input onChange={e => setStateSearch(e.target.value)} className="border-2 border-gray-300 bg-white h-16 px-5 pr-16 rounded-lg text-lg focus:outline-none w-[100%] hover:border-primary hover:shadow-lg"
                type="text" name="search" placeholder="Looking for someone?" />
              </div>

            </div>

            <div className="">
            
              {
                    userCount > 0 ?
                      <>
                        <Carousel 
                          swipeable={true}
                          draggable={true}
                          responsive={responsive}
                          infinite={true}
                          transitionDuration={500}
                          removeArrowOnDeviceType={["tablet", "mobile"]}
                          //autoPlay={true}
                        >
                          {
                              (userObjFiltered as any[]).map((i) => {
                              return (
                                    <GetUser_All 
                                    key={i.user_id}
                                    username={i.username} 
                                    profile_image_url={i.profile_image_url} 
                                    first_name={i.first_name} 
                                    last_name={i.last_name} 
                                    bio={i.bio} 
                                    created_at={i.created_at}
                                    followers={i.followers.aggregate.count}
                                    shares={i.shares.aggregate.count}
                                    visits={i.visits.aggregate.count}
                                    />
                              )
                            })
                          }
                        </Carousel>
                      </>
                      :
                      <>
                          <section className="flex items-center sm:p-16 ">
                              <div className="container flex flex-col items-center justify-center px-1 mx-auto my-8 space-y-8 text-center sm:max-w-md">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-40 h-40 dark:text-gray-600">
                                  <path fill="currentColor" d="M256,16C123.452,16,16,123.452,16,256S123.452,496,256,496,496,388.548,496,256,388.548,16,256,16ZM403.078,403.078a207.253,207.253,0,1,1,44.589-66.125A207.332,207.332,0,0,1,403.078,403.078Z"></path>
                                  <rect width="176" height="32" x="168" y="320" fill="currentColor"></rect>
                                  <polygon fill="currentColor" points="210.63 228.042 186.588 206.671 207.958 182.63 184.042 161.37 162.671 185.412 138.63 164.042 117.37 187.958 141.412 209.329 120.042 233.37 143.958 254.63 165.329 230.588 189.37 251.958 210.63 228.042"></polygon>
                                  <polygon fill="currentColor" points="383.958 182.63 360.042 161.37 338.671 185.412 314.63 164.042 293.37 187.958 317.412 209.329 296.042 233.37 319.958 254.63 341.329 230.588 365.37 251.958 386.63 228.042 362.588 206.671 383.958 182.63"></polygon>
                                </svg>
                                <p className="text-3xl">User Not Found</p>
                              </div>
                          </section>
                      </>
                      
              }
            </div>


          </div>

        </section>
      </>
    );
  };
  
  export default People;
  