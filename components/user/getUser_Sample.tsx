/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { useState, useEffect } from 'react'
import Link from "next/link";
import Image from "next/image";
import CountUp from 'react-countup';
import useClipboard from "react-use-clipboard";
import LoadingPage from '../global/LoadingPage';
import Social_Icons from "../global/Social_Icons";

import {
    useClerk, 
    ClerkLoaded, 
    ClerkProvider, 
    SignedIn, 
    SignedOut, 
    UserButton, 
    useUser
} from "@clerk/nextjs";


import {
    //Share Platform
    EmailShareButton,
    FacebookShareButton,
    LineShareButton,
    LinkedinShareButton,
    RedditShareButton,
    TelegramShareButton,
    TwitterShareButton,
    ViberShareButton,
    VKShareButton,
    WhatsappShareButton,
    //Share Icons
    EmailIcon,
    FacebookIcon,
    LineIcon,
    LinkedinIcon,
    RedditIcon,
    TelegramIcon,
    TumblrIcon,
    TwitterIcon,
    ViberIcon,
    WhatsappIcon,
    VKIcon,
    //Share Count
    FacebookShareCount,
    HatenaShareCount,
    OKShareCount,
    PinterestShareCount,
    RedditShareCount,
    TumblrShareCount,
    VKShareCount
} from "react-share";

type GetUser_Sample = {
    data_username: string;
    data_user_id: string;
    data_banner: string;
    data_bio: string;
    data_updated_at: string;
    data_profile_image_url: string;
    data_last_name: string;
    data_id: string;
    data_first_name: string;
    data_created_at: string;
    username: string;
    userBrowser: string;
    userDeviceOS: string;
    userDeviceTypeuserDeviceOS: string;
    userCountryLoc: string;
    userCountryCode: string;
    userLocLong: string;
    userLocLat: string;
    userContinentLoc: string;
    userContinentCode: string;
    is_verified: number;
    is_admin: number;
    is_mod: number;
    is_vip: number;
    is_partner: number;
    is_contibutor: number;
    is_sponsor: number;
    is_supporter: number;
    is_business: number;
};

const GetUser_Sample = (props: GetUser_Sample) => {

    const [showShareModal, setShowShareModal] = useState(false);

    const [isCopied, setCopied] = useClipboard(`${process.env.NEXT_PUBLIC_HOSTNAME}/${props.username}`);

    const ShareUrl = `${process.env.NEXT_PUBLIC_HOSTNAME}/${props.username}`

    const { user, isSignedIn } = useUser();
    const { openSignIn } = useClerk();

    const [userLinks, setUserLinks] = useState<any | null>(null);
    const [userLinksCount, setUserLinksCount] = useState(0)
    const [isLoading, setLoading] = useState(false)

    //Following Status
    const [userIsFollowing, setIsFollowing] = useState(false)
    const [userFollowNoData, setUserFollowNoData] = useState(false)

    //Followers
    const [userFollowers, setUserFollowers] = useState(0)
    //Visitors
    const [userVisitors, setUserVisitors] = useState(0)
    //Shares
    const [userShares, setUserShares] = useState(0)
    const [userFullname, setuserFullname] = useState(props.data_last_name !== 'null' &&  props.data_last_name !== null ?  `${props.data_first_name} ${props.data_last_name}` : `${props.data_first_name}`);

    useEffect(() => {

        setLoading(true)
        

        async function getLinks() {
            const fetchData = {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({   
                    data:{
                    user_id: `${props.data_user_id}`
                    } 
                })
            };
            
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/links/getUserLinks`, fetchData);
                const data = await response.json();
                setUserLinks(data.data)
                setUserLinksCount(data?.data?.length > 0 ? data?.data?.length : 0) 
                setLoading(false)
            } catch (error) {
                console.error(error);
            }
        }
        getLinks()

        async function getFollowers() {
            const fetchData = {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    data:{
                        following_user_id: `${props?.data_user_id}`
                    }
                })
            };
            
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/follow/getFollowers`, fetchData);
                const datax = await response.json();
                setUserFollowers(datax?.data?.follow?.length)
                setLoading(false)
            } catch (error) {
                console.error(error);
            }
        }
        getFollowers()

        async function getVisitors() {
            const fetchData = {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    data:{
                        user_id: `${props?.data_user_id}`
                    }
                })
            };
            
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/analytics/getTotalStats`, fetchData);
                const datax = await response.json();
                setUserVisitors(datax?.data?.visits?.aggregate?.count)
                setUserShares(datax?.data?.shares?.aggregate?.count)
                setLoading(false)
            } catch (error) {
                console.error(error);
            }
        }
        getVisitors()

        async function getFollow() {
            if(isSignedIn){
                const fetchFollowData = {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({   
                        data:{
                            user_id: `${user?.id}`,
                            following_user_id: `${props.data_user_id}`
                        } 
                    })
                };
                
                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/follow/isFollow`, fetchFollowData);
                    const data = await response.json();
                    if(data.data.follow.length > 0){
                        //if the exisiting data is following
                        if(data.data.follow[0].is_follow === 1){
                            setIsFollowing(true)
                            setUserFollowNoData(false)
                        }else{
                            setIsFollowing(false)
                        }
                        setLoading(false)
                    }else{
                        setUserFollowNoData(true)
                        setIsFollowing(false)
                        setLoading(false)
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        }
        getFollow()

        //Analytic Visit
        const userSignedInID = isSignedIn ? user?.id : null;
        async function generateAnalytic() {
            const analyticData = {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    data:{
                        user_id: `${props.data_user_id}`,
                        visitor_id: `${isSignedIn ? user?.id : null }`, 
                        type: `visit`, 
                        os: `${props.userDeviceOS ? props.userDeviceOS : null}`, 
                        device: `${props.userDeviceTypeuserDeviceOS ? props.userDeviceTypeuserDeviceOS : null}`, 
                        country: `${props.userCountryLoc ? props.userCountryLoc : null}`, 
                        browser: `${props.userBrowser ? props.userBrowser : null}`, 
                        country_code: `${props.userCountryCode ? props.userCountryCode : null}`, 
                        latitude: `${props.userLocLong ? props.userLocLong : null}`, 
                        longitude: `${props.userLocLat ? props.userLocLat : null}`, 
                    }
                }) 
            };
            
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/analytics/generateAnalytics`, analyticData);
                const data = await response.json();
            } catch (error) {
                console.error(error);
            }
        }
        if(userSignedInID !== props.data_user_id){
            generateAnalytic() 
        }

        setuserFullname(props.data_last_name !== 'null' &&  props.data_last_name !== null ?  `${props.data_first_name} ${props.data_last_name}` : `${props.data_first_name}`);

    }, [])

    async function updateFollow(status: Number) {
        //if signed in allow follow
        if(isSignedIn){
            //if no data yet create a data with the current status of the follow
            if(userFollowNoData){
                const createFollowData = {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({   
                        data:{
                            user_id: `${user?.id}`,
                            following_user_id: `${props.data_user_id}`,
                            is_follow: status
                        } 
                    })
                };

                
                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/follow/followUser`, createFollowData);
                    const data = await response.json();
                    if(data.data.follow.length > 0){
                        //if the exisiting data is following
                        if(data.data.follow[0].is_follow === 1){
                            setIsFollowing(true)
                        }else{
                            setIsFollowing(false)
                        }
                        setLoading(false)
                    }else{
                        setIsFollowing(false)
                    }
                } catch (error) {
                    console.error(error);
                }
            }
            //if already have data update the data with the current status of the follow
            else{

                const updateFollowData = {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({   
                        data:{
                            user_id: `${user?.id}`,
                            following_user_id: `${props.data_user_id}`,
                            is_follow: status
                        } 
                    })
                };

                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/follow/upFollowUser`, updateFollowData);
                    const data = await response.json();
                        if(data.data.update_follow.returning[0].is_follow === 1){
                            setIsFollowing(true)
                        }else{
                            setIsFollowing(false)
                        }
                } catch (error) {
                    console.error(error);
                }
            }
        }
    }

    return (
        <>
            <div className="bg-white block pointer-events-none overflow-x-hidden">
                <div className="max-w-2xl mx-auto shadow-xl">
                    
                    <div className="w-full relative">
                        <div className={`w-full bg-gray-200 h-48 rounded-b-3xl`}>

                        {/*User Top Menu*/}
                        <div className="absolute w-full">
                                <div className="flex flex-row justify-between px-4">

                                    {/* User Visitor */}
                                    <div className="flex flex-row space-x-2 mt-4">
                                            <SignedOut>
                                            <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" className="bi bi-person-circle" viewBox="0 0 16 16">
                                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                                <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                                            </svg>
                                            </div>
                                            </SignedOut>
                                            <SignedIn>
                                                <div className="rounded-full">
                                                    <UserButton userProfileUrl="/user" afterSignOutUrl="/" />
                                                </div>
                                            </SignedIn>
                                    </div> 

                                    {/* Share and Copy */}
                                    <div className="flex flex-row space-x-2 mt-4">

                                            <div onClick={() => setShowShareModal(true)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                                                    <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z"/>
                                                </svg>
                                            </div>

                                            <div onClick={setCopied}>
                                            {
                                                isCopied ?
                                                <>
                                                    <div className="tooltip-primary tooltip hover:tooltip-open tooltip-copied" data-tip="Copied">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#37CDBE" className="bi bi-clipboard-check-fill" viewBox="0 0 16 16">
                                                            <path d="M6.5 0A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3Zm3 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3Z"/>
                                                            <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1A2.5 2.5 0 0 1 9.5 5h-3A2.5 2.5 0 0 1 4 2.5v-1Zm6.854 7.354-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708.708Z"/>
                                                        </svg>
                                                    </div>
                                                </>
                                                :
                                                <>
                                                    <div className="tooltip-primary tooltip hover:tooltip-open tooltip-copy" data-tip="Copy">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" className="bi bi-clipboard-fill" viewBox="0 0 16 16">
                                                            <path  d="M10 1.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-1Zm-5 0A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5v1A1.5 1.5 0 0 1 9.5 4h-3A1.5 1.5 0 0 1 5 2.5v-1Zm-2 0h1v1A2.5 2.5 0 0 0 6.5 5h3A2.5 2.5 0 0 0 12 2.5v-1h1a2 2 0 0 1 2 2V14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3.5a2 2 0 0 1 2-2Z"/>
                                                        </svg>
                                                    </div>
                                                </>
                                            }
                                        </div>
                                    </div> 
                                                            
                                </div>
                        </div>

                        {/*Banner*/}
                        <img src={props.data_banner ? props.data_banner : `/fallback_banner.png`} alt={`banner-${props.data_username}`} className="object-cover rounded-b-[50px] h-52 w-full"/>

                        </div>
                        {/*Avatar*/}
                        <div className="absolute -mt-20 ml-5">
                            <div className="avatar">
                                <div className="rounded-full  h-36 w-36  ring ring-white ring-offset-base-100 ring-offset-2 bg-gray-200" >
                                    <img src={props.data_profile_image_url ? props.data_profile_image_url : `/fallback_avatar.jpg`} alt={`avatar-${props.data_username}`} width="100%" />
                                </div>
                            </div>    
                        </div>

                        {/* Start - Message, Follow and Dashboard Button */}
                        <div className="abosolute flex flex-row justify-end mr-4 px-2 mt-8">
                            <div className="">
                                    {/* Start Msg Button */}
                                    <label htmlFor={`send-msg`} className="cursor-pointer rounded-full btn-primary btn-circle  btn-outline">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" className="bi bi-chat" viewBox="0 0 16 16">
                                        <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"/>
                                        </svg>
                                    </label>
                                    {/* End Msg Button */}
                            </div>
                            <div className="ml-2">
                                        <span className="cursor-pointer rounded-full btn-primary btn-circle  btn-outline" >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-person-add" viewBox="0 0 16 16">
                                                <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/>
                                                <path d="M8.256 14a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Z"/>
                                            </svg>
                                        </span>
                            </div>
                        </div>
                        {/* End - Message, Follow and Dashboard Button */}
                        
                    </div>

                    {/*Temporary Share Modal*/}
                    <div className="grid grid-cols-1">
                    {showShareModal ? (
                        <>
                            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                    {/*modal share -  content*/}
                                    <div className="border-0  shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                    {/*modal share -  header*/}
                                    <div className="flex items-start justify-between p-8 border-b border-solid border-slate-200 rounded-t">
                                        <h2 className="font-semibold text-xl">Share to other platform</h2>
                                        <a onClick={() => setShowShareModal(false)} className="p-1 ml-auto border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="black" className="bi bi-x" viewBox="0 0 16 16">
                                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                            </svg>
                                        </a>
                                    </div>
                                    {/*modal share - body <FacebookShareCount url={`${ShareUrl}`} />*/}
                                        <div className="relative p-6 flex-auto">
                                                <FacebookShareButton url={`${ShareUrl}`} hashtag={"#hashtag"} className='mr-2'>
                                                    <FacebookIcon size={32} />
                                                </FacebookShareButton>
                                                <TwitterShareButton url={`${ShareUrl}`} hashtags={["kohee", "koheeapp"]} className='mr-2'>
                                                    <TwitterIcon size={32} />
                                                </TwitterShareButton>
                                                <RedditShareButton url={`${ShareUrl}`} className='mr-2'>
                                                    <RedditIcon size={32} />
                                                </RedditShareButton>
                                                <LineShareButton url={`${ShareUrl}`} className='mr-2'>
                                                    <LineIcon size={32} />
                                                </LineShareButton>
                                                <WhatsappShareButton url={`${ShareUrl}`} className='mr-2'>
                                                    <WhatsappIcon size={32} />
                                                </WhatsappShareButton>
                                                <ViberShareButton url={`${ShareUrl}`} className='mr-2'>
                                                    <ViberIcon size={32} />
                                                </ViberShareButton>
                                                <TelegramShareButton url={`${ShareUrl}`} className='mr-2'>
                                                    <TelegramIcon size={32} />
                                                </TelegramShareButton>
                                                <VKShareButton url={`${ShareUrl}`} className='mr-2'>
                                                    <VKIcon size={32} />
                                                </VKShareButton>
                                                <LinkedinShareButton url={`${ShareUrl}`} className='mr-2'>
                                                    <LinkedinIcon size={32} />
                                                </LinkedinShareButton>
                                                <EmailShareButton url={`${ShareUrl}`} className='mr-2'>
                                                    <EmailIcon size={32} />
                                                </EmailShareButton>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="opacity-90 fixed inset-0 z-40 bg-black"></div>
                        </>
                    ) : null
                    }
                    </div>
                    
                    <div className="p-5 pt-8 flex flex-col">

                        {/*Username*/}
                        <div className="mb-1 h-5 w-50">
                            <div className="inline-flex items-center">
                                <span className="font-semibold text-zinc-700 mr-1">
                                    <Link href={`${process.env.NEXT_PUBLIC_HOSTNAME}/${props.username}`}>
                                                {`@${props.data_username}`}
                                    </Link>
                                </span>
                                {
                                props.is_verified ?
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#E0A82E" className="bi bi-patch-check-fill" viewBox="0 0 16 16">
                                    <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z"/>
                                </svg>
                                :
                                <></>
                                }
                            </div>
                        </div>

                        {/*FullName*/}
                        <div className="h-5 inline-block w-[200px]">
                            <span className="font-semibold truncate block">
                                {userFullname}
                            </span>                          
                        </div>

                        {/*Bio*/}
                        <div className="py-2 break-all bbcode">
                            <div className="h-auto w-full">
                                <p className=" font-semibold text-xs">
                                {props.data_bio !== 'null' &&  props.data_bio !== null ? props.data_bio : null} 
                                </p>
                            </div>
                        </div>

                        {/*User Badge*/}
                        <div className="text-sm">
                            <div className="flex flex-row ml-auto items-center">
                                <div className="mb-1">

                                    <div className="flex flex-row items-center mt-4">
                                        {props.is_admin === 1 ? 
                                        <>
                                            <div className="tooltip-primary tooltip hover:tooltip-open tooltip-admin" data-tip="Admin">
                                            <img className="mr-1" src="/badge/others/admin.png" alt="admin-badge" width="24px" height="28px"/>
                                            </div>
                                        </>
                                        :<></>}

                                        {props.is_mod === 1 ? 
                                        <>
                                            <div className="tooltip-primary tooltip hover:tooltip-open tooltip-mod" data-tip="Moderator">
                                            <img className="mr-1" src="/badge/others/moderator.png" alt="mod-badge" width="24px" height="28px"/>
                                            </div>
                                        </>
                                        :<></>}

                                        {props.is_vip === 1 ? 
                                        <>
                                            <div className="tooltip-primary tooltip hover:tooltip-open tooltip-vip" data-tip="VIP">
                                            <img className="mr-1" src="/badge/others/vip.png" alt="vip-badge" width="24px" height="28px"/>
                                            </div>
                                        </>
                                        :<></>}

                                        {props.is_partner === 1 ? 
                                        <>
                                            <div className="tooltip-primary tooltip hover:tooltip-open tooltip-partner" data-tip="Partner">
                                            <img className="mr-1" src="/badge/others/partner.png" alt="partner-badge" width="24px" height="28px"/>
                                            </div>
                                        </>
                                        :<></>}

                                        {props.is_contibutor === 1 ? 
                                        <>
                                            <div className="tooltip-primary tooltip hover:tooltip-open tooltip-contributor" data-tip="Contributor">
                                            <img className="mr-1" src="/badge/others/contributor.png" alt="contributor-badge" width="24px" height="28px"/>
                                            </div>
                                        </>
                                        :<></>}

                                        {props.is_sponsor === 1 ? 
                                        <>
                                            <div className="tooltip-primary tooltip hover:tooltip-open tooltip-sponsor" data-tip="Sponsor">
                                            <img className="mr-1" src="/badge/others/sponsor.png" alt="sponsor-badge" width="24px" height="28px"/>
                                            </div>
                                        </>
                                        :<></>}

                                        {props.is_supporter === 1 ? 
                                        <>
                                            <div className="tooltip-primary tooltip hover:tooltip-open tooltip-supporter" data-tip="Supporter">
                                            <img className="mr-1" src="/badge/others/supporter.png" alt="supporter-badge" width="24px" height="28px"/>
                                            </div>
                                        </>
                                        :<></>}

                                        {props.is_business === 1 ? 
                                        <>
                                            <div className="tooltip-primary tooltip hover:tooltip-open tooltip-business" data-tip="Business">
                                            <img className="mr-1" src="/badge/others/business.png" alt="business-badge" width="24px" height="28px"/>
                                            </div>
                                        </>
                                        :<></>}

                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="pt-8 flex gap-8 text-center justify-center">
                            <div className="flex flex-col">
                                <div className="mb-1 h-5 w-20">
                                <p className="font-bold text-zinc-700">{userFollowers ? userFollowers : 0}</p>
                                </div>
                                <div className="mb-1 h-5 w-20">
                                <p className="text-sm font-semibold text-zinc-700">
                                    Follower{userFollowers ? userFollowers > 1 ?`s`:``:``}
                                </p>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <div className="mb-1 h-5 w-20">
                                <p className="font-bold text-zinc-700">{userVisitors ? userVisitors : 0}</p>
                                </div>
                                <div className="mb-1 h-5 w-20">
                                <p className="text-sm font-semibold text-zinc-700">
                                    Visit{userVisitors ? userVisitors > 1 ? `s`:``:``}
                                </p>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <div className="mb-1 h-5 w-20">
                                <p className="font-bold text-zinc-700">{userShares ? userShares : 0}</p>
                                </div>
                                <div className="mb-1 h-5 w-20">
                                <p className="text-sm font-semibold text-zinc-700">
                                    Share{userShares ? userShares > 1 ? `s`:``:``}
                                </p>
                                </div>
                            </div>
                        </div>

                        {/*kohee Banner*/}
                        <div className="break-all bbcode">
                            {/*Welcome Profile*/}
                            <SignedIn>
                            {user?.username ?
                                user?.username.toString().toLocaleLowerCase() === props.data_username.toLocaleLowerCase() ?
                                <>
                                    <div className=" bg-neutral mt-4 p-5 rounded-t-[15px] rounded-b-[15px] relative">
                                        <div className="flex flex-row items-center">
                                            <p className="font-bold text-xl text-white">Welcome to your Profile!</p>
                                        </div>

                                        <div className="flex flex-row ">
                                            <p className="text-sm text-primary">Keep your visitor updated!</p>
                                        </div>

                                        <div className="flex flex-row mt-2">
                                            <Link href="/user?tab=links">
                                                <button className="btn btn-sm  btn-secondary">Edit Links</button>
                                            </Link>
                                        </div>
                                    </div>
                                </>
                                : <></>
                            : <></>
                            }
                            </SignedIn>
                            {/*Banner Signout*/}
                            <SignedOut>
                                <div className="bg-[url('/banner-4.jpg')] bg-cover bg-[#657EF8]  mt-4 p-5 rounded-t-[15px] rounded-b-[15px] relative">

                                    {/*Title*/}
                                    <div className="flex flex-row items-center">
                                        <p className="font-bold text-xl text-white">Become Kohee Creator!</p>
                                    </div>

                                    {/*More Info*/}
                                    <div className="flex flex-row ">
                                        <p className="text-sm text-primary">Create your link profile in minutes!</p>
                                    </div>

                                    <div className="flex flex-row mt-2">
                                        <button onClick={() => openSignIn()} className="btn btn-sm btn-primary">Create an Account</button>
                                    </div>

                                </div>
                            </SignedOut>
                        </div>
                        {/*End Kohee Banner*/}

                        {/*User Links*/}
                        <div className="py-5 break-all bbcode">
                        {isLoading ? 
                                <>
                                    <LoadingPage/>
                                </>
                                :
                                <>
                                    {userLinksCount > 0 ?
                                    <>
                                    {
                                        (userLinks as any[]).map((i) => {
                                        return (
                                            <>
                                                <a target="_blank" rel="noreferrer" href={i.url}>
                                                    <div className="w-full mt-2 py-2 px-2 rounded-t-[15px] rounded-b-[15px] relative cursor-pointer" style={{ color: i.color_text, backgroundColor: i.color_button }}>
                                                        <div className="flex flex-row items-center">
                                                            <Social_Icons url={i.url} color={i.color_text} type={i.type}/>
                                                        <p className="font-bold text-lg text-white ml-2">{i.button_text}</p>
                                                        </div>
                                                    </div>
                                                </a>
                                            </>
                                            )
                                        })
                                    }
                                    </>
                                    :
                                    <></>
                                    }
                                </>
                                }
    

                        </div>
                        {/*End User Links*/}

                    </div>
                </div>
            </div>
        </>
    );

};

export default GetUser_Sample;
