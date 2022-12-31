import type { NextPage } from "next";
import { useClerk, SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

import ReactGA from 'react-ga'
import { useEffect, useState } from "react";

import axios from "axios";

import LoadingPage from "../global/LoadingPage";

const SetBanner: NextPage = () => {
    
    const { user } = useUser();
    const username = `${user?.username?.toString().toLowerCase()}`;

    const [userData, setUserData] = useState<any | null>(null);
    const [isLoading, setLoading] = useState(false)
    
    const [image, setImage] = useState<any | null>(null);
    const [imageDefault, setImageDefault] = useState<any | null>(null);
    const [editSwtch, setEditSwtch] = useState(false)

    const [isErrorBanner, setisErrorBanner] = useState(false)
    const [isSuccessBanner, setisSuccessBanner] = useState(false)
    const [isuploadingBanner, setisUploadingBanner] = useState(false)

    const [isuploadingRead, setisuploadingRead] = useState(false)

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
                        username: `${username}`
                    }
                })
            };
            
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/user/get`, fetchData);
                const data = await response.json();
                setUserData(data.data)
                setImage(data.data.banner !== 'null' &&  data.data.banner !== null ? data.data.banner : '')
                setImageDefault(data.data.banner !== 'null' &&  data.data.banner !== null ? data.data.banner : '')
                setLoading(false)
            } catch (error) {
                console.error(error);
            }
        }
        getData()

    }, [])

    async function updateBanner() {

        setisSuccessBanner(false)
        setisErrorBanner(false)

        const timestamp = new Date().getTime();

        async function applyBanner() {

            setisUploadingBanner(true)

            const latestBanner = {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    data:{
                        user_id: `${userData.user_id}`,
                        banner: image,
                    }
                })
            };
            
            try {

                const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/user/banner`, latestBanner);
                const data = await response.json();

                if(data.data.banner){
                    setImage(data.data.banner)
                    setisSuccessBanner(true)
                    setisUploadingBanner(false)
                    setisuploadingRead(false)
                    setEditSwtch(false)
                }

            } catch (error) {
                setisErrorBanner(true)
                console.error(error);
            }
        }

        applyBanner()

    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files![0];
    
        // Convert the file to base64
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setisuploadingRead(true)
            setImage({ image: reader.result as string });
        };
    };

    function cancel(){
        setEditSwtch(false)
        setImage(imageDefault)
        setisSuccessBanner(false)
        setisErrorBanner(false)
        setisUploadingBanner(false)
        setisuploadingRead(false)
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
                        <h1 className="neiTtIc1DzU_PrekjGtm">Banner</h1>
                        <p className="wfQDsKYZn7R6oAZW0nQL">Customize your cover photo.&nbsp;
                        {isErrorBanner ? <span className="text-red-600">Something went wrong!</span> : null}
                        {isSuccessBanner ? <span className="text-green-600">Updated!</span> : null}
                        </p>
                    </div>
                    <div className="cl-titled-card-list">
                        <div className="cl-list-item __4tNYcHC73xJXr7YywZ nGJOZlJ9gb4ASegImg_K itNPetTY1ZxpPvqQd7f7">
                        <div className="cFuYkQ8hdBQ158UpPA1B">
                            Image Preview
                        </div>
                            <div className="fTrTEjXVH5ZHoKLtM71A ILJP2tCf5pYz_kx44vee">

                                {
                                    editSwtch ? 
                                    <>
                                        <div className="relative w-[80%]">
                                            <input type="file" accept=".png, .jpg, .jpeg" onChange={handleChange} />
                                        </div>
                                    </>
                                    :
                                    <>
                                        <div className="relative w-[80%]">
                                        <div className="relative">
                                            <span className="text-xs mb-2">
                                                <strong>Tip:</strong> You can click the image to update your banner. {`[Maximum size of 10mb]`}
                                            </span>
                                            <img src={image ? image : `https://kohee.app/fallback_banner.png`} className="cursor-pointer" onClick={() => setEditSwtch(true)}/>
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


                                        {
                                        isuploadingRead ?
                                            isuploadingBanner ? 
                                                <button disabled className="M0_AALdb1DkLxZYDAUsB gEmaqNOpz58XAMof7d7j W9GxDgersfvy1HMB3oAi flex">Uploading..</button>
                                                :
                                                <button onClick={() => updateBanner()} className="M0_AALdb1DkLxZYDAUsB gEmaqNOpz58XAMof7d7j W9GxDgersfvy1HMB3oAi flex">Save</button>
                                        :
                                        null
                                        }
                                        
                                        <button onClick={() => cancel()} type="reset" className="M0_AALdb1DkLxZYDAUsB dAWMfR093TXTQQe0kZFE W9GxDgersfvy1HMB3oAi">Cancel</button>
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

export default SetBanner;
