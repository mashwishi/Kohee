import type { NextPage } from "next";
import { useClerk, SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

import ReactGA from 'react-ga'
import { useEffect, useState } from "react";

import axios from "axios";

import LoadingPage from "../global/LoadingPage";

const SetMore: NextPage = () => {
  
  const { user } = useUser();
  const username = `${user?.username!.toString().toLowerCase()}`;

  const [userData, setUserData] = useState<any | null>(null);
  const [isLoading, setLoading] = useState(false)
  
  const [valueBio, setValueBio] = useState('')
  const [editSwtch, setEditSwtch] = useState(false)

  const [isErrorBio, setisErrorBio] = useState(false)
  const [isSuccessBio, setisSuccessBio] = useState(false)

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
                    //username: `${username}`
                    username: `mashwishi`
                }
            })
        };
        
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/user/get`, fetchData);
            const data = await response.json();
            setUserData(data.data)
            setValueBio(data.data.bio)
            setLoading(false)
        } catch (error) {
            console.error(error);
        }
    }
    getData()

  }, [])

    async function updateBio() {

        setisSuccessBio(false)
        setisErrorBio(false)

        const timestamp = new Date().getTime();

        async function applyBio() {

            const latestBio = {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    data:{
                        user_id: `${userData.user_id}`,
                        username: `${userData.username.toLowerCase().replaceAll(' ', '_')}`,
                        first_name: `${userData.first_name}`,
                        last_name: `${userData.last_name}`,       
                        profile_image_url: `${userData.profile_image_url}`,
                        created_at: `${userData.created_at}`,
                        bio: `${valueBio}`,
                        updated_at: `${timestamp}`,
                        banner: `${userData.banner}`,
                    }
                })
            };
            
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/user/bio`, latestBio);
                const data = await response.json();
                setisSuccessBio(true)
                setEditSwtch(false)
            } catch (error) {
                setisErrorBio(true)
                console.error(error);
            }
        }

        applyBio()

    }

  if (isLoading) return <LoadingPage/>
    
  if (!userData) return (
    <>
      <section className="flex items-center h-full sm:p-16 ">
          <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8 space-y-8 text-center sm:max-w-md">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-40 h-40 dark:text-gray-600">
              <path fill="currentColor" d="M256,16C123.452,16,16,123.452,16,256S123.452,496,256,496,496,388.548,496,256,388.548,16,256,16ZM403.078,403.078a207.253,207.253,0,1,1,44.589-66.125A207.332,207.332,0,0,1,403.078,403.078Z"></path>
              <rect width="176" height="32" x="168" y="320" fill="currentColor"></rect>
              <polygon fill="currentColor" points="210.63 228.042 186.588 206.671 207.958 182.63 184.042 161.37 162.671 185.412 138.63 164.042 117.37 187.958 141.412 209.329 120.042 233.37 143.958 254.63 165.329 230.588 189.37 251.958 210.63 228.042"></polygon>
              <polygon fill="currentColor" points="383.958 182.63 360.042 161.37 338.671 185.412 314.63 164.042 293.37 187.958 317.412 209.329 296.042 233.37 319.958 254.63 341.329 230.588 365.37 251.958 386.63 228.042 362.588 206.671 383.958 182.63"></polygon>
            </svg>
            <p className="text-3xl">Failed to load</p>
            <Link href="/user/profile">
              <p className="px-8 py-3 font-semibold rounded cursor-pointer">Reload the page</p>
            </Link>
          </div>
      </section>
    </>
  )

  return (
    <>

    <div className="cl-component cl-user-profile">
        <div className="cl-main">
            <div className="Lt2X2CSXDlA17QZxtmZM VND2hwhJfz9GlH7oDnkd cl-themed-card">
                <div className="Nq0cGRxiCgDlvCMk0zDU">
                    <h1 className="neiTtIc1DzU_PrekjGtm">Bio</h1>
                    <p className="wfQDsKYZn7R6oAZW0nQL">Tell something about you. 
                    {isErrorBio ? <span className="text-red-600"> Something went wrong!</span> : null}
                    {isSuccessBio ? <span className="text-green-600"> Updated!</span> : null}
                    </p>
                </div>
                <div className="cl-titled-card-list">
                    <div className="cl-list-item __4tNYcHC73xJXr7YywZ nGJOZlJ9gb4ASegImg_K itNPetTY1ZxpPvqQd7f7">
                    <div className="cFuYkQ8hdBQ158UpPA1B">About You</div>
                        <div className="fTrTEjXVH5ZHoKLtM71A ILJP2tCf5pYz_kx44vee">

                            {
                                editSwtch ? 
                                <>
                                    <div className="relative w-[80%]">
                                        <textarea
                                        className="hXjh5Waxs3XN6zW5pfXs w-[100%] py-2 px-3 rounded-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue"
                                        placeholder="Enter some text... "
                                        maxLength={200}
                                        value={valueBio}
                                        onChange={(event) => setValueBio(event.target.value)}
                                        />
                                        <div className="absolute bottom-2 right-2 text-xs text-gray-500">
                                        {valueBio?.length ? valueBio?.length : 0}/200
                                        </div>
                                    </div>
                                </>
                                :
                                <>
                                    <div className="relative w-[80%]">
                                        <textarea
                                        className="cursor-pointer hXjh5Waxs3XN6zW5pfXs w-[100%] py-2 px-3 rounded-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue"
                                        placeholder="Enter some text... "
                                        readOnly
                                        maxLength={200}
                                        value={valueBio}
                                        onClick={() => setEditSwtch(true)}
                                        />
                                        <div className="absolute bottom-2 right-2 text-xs text-gray-500">
                                        {valueBio?.length ? valueBio?.length : 0}/200
                                        </div>
                                    </div>
                                </>
                            }

                        </div>
                    </div>
                    {
                        editSwtch ? 
                        <>
                            <div className="aOhNAD3ctpA_BDBZz4vJ">
                                <fieldset className="Xvy0tOPperBscBEwz2pe cl-form-button-group eXysjP8FVyHVOBs65JrC">
                                    <button onClick={() => updateBio()} className="M0_AALdb1DkLxZYDAUsB gEmaqNOpz58XAMof7d7j W9GxDgersfvy1HMB3oAi flex">Save</button>
                                    <button onClick={() => setEditSwtch(false)} type="reset" className="M0_AALdb1DkLxZYDAUsB dAWMfR093TXTQQe0kZFE W9GxDgersfvy1HMB3oAi">Cancel</button>
                                </fieldset>
                            </div>
                        </>
                        :
                        null
                    }
                </div>
            </div>
        </div>
    </div>

    </>
  );
};

export default SetMore;
