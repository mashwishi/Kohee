/* eslint-disable @next/next/no-img-element */
import React, { useRef } from 'react';
import { useState, useEffect } from 'react'
import Link from "next/link";
import Image from "next/image";
import CountUp from 'react-countup';
import useClipboard from "react-use-clipboard";
import LoadingPage from '../global/LoadingPage';
import Social_Icons from "../global/Social_Icons";

import { useClerk,SignedIn, SignedOut, UserButton,useUser } from "@clerk/nextjs";
import { EmailShareButton,FacebookShareButton,LineShareButton,LinkedinShareButton,RedditShareButton,TelegramShareButton,TwitterShareButton,ViberShareButton,VKShareButton,WhatsappShareButton,EmailIcon,FacebookIcon,LineIcon,LinkedinIcon,RedditIcon,TelegramIcon,TwitterIcon,ViberIcon,WhatsappIcon,VKIcon } from "react-share";

type GetUser = {
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
};

const GetUser = (props: GetUser) => {

    const [showShareModal, setShowShareModal] = useState(false);

    const [isCopied, setCopied] = useClipboard(`${process.env.NEXT_PUBLIC_HOSTNAME}/${props.username}`);

    const ShareUrl = `${process.env.NEXT_PUBLIC_HOSTNAME}/${props.username}`

    const { user, isSignedIn } = useUser();
    const { openSignIn } = useClerk();

    const [userLinks, setUserLinks] = useState<any | null>(null);
    const [userLinksCount, setUserLinksCount] = useState(0)
    const [isLoading, setLoading] = useState(true)

    //Following Status
    const [userIsFollowing, setIsFollowing] = useState(false)
    const [userFollowNoData, setUserFollowNoData] = useState(false)

    //Followers
    const [userFollowers, setUserFollowers] = useState(0)
    //Visitors
    const [userVisitors, setUserVisitors] = useState(0)
    //isVisitorSginein
    const [userSignedInID, setUserSignedInID] = useState(isSignedIn ? user?.id : null)

    const [userFullname, setuserFullname] = useState(props.data_last_name !== 'null' &&  props.data_last_name !== null ?  `${props.data_first_name} ${props.data_last_name}` : `${props.data_first_name}`);

    //Anti-double run
    const effectRan = useRef(false)

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
        } catch (error) {
            console.error(error);
        }
    }

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
            const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/analytics/getTotalAnalytics`, fetchData);
            const datax = await response.json();
            setUserVisitors(datax?.data?.analytics?.length)
            setLoading(false)
        } catch (error) {
            console.error(error);
        }
    }

    async function getFollow() {
        setLoading(true)
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

                if(data.data?.follow?.length > 0){
                    setIsFollowing(true)
                    setUserFollowNoData(false)
                    setLoading(false)
                }else{
                    setIsFollowing(false)
                    setUserFollowNoData(true)
                    setLoading(false)
                }
            } catch (error) {
                console.error(error);
            }
        }
    }

    async function generateAnalytic(userSignedInID: any) {
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
            //console.log(data)
        } catch (error) {
            console.error(error);
        }
    }

    async function updateFollow() {
        //if signed in allow follow
        if(isSignedIn){
            setLoading(true)
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
                            is_follow: 1
                        } 
                    })
                };
                
                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/follow/followUser`, createFollowData);
                    const data = await response.json();
                    if(data.status === 200){
                        getFollow()
                        getFollowers()
                    }else{
                        getFollow()
                        getFollowers()
                    }
                } catch (error) {
                    console.error(error);
                }
            }
            //if already have data update and delete data to unfollow
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
                        } 
                    })
                };

                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/follow/upFollowUser`, updateFollowData);
                    const data = await response.json();
                        if(data.status === 200){
                            getFollow()
                            getFollowers()
                        }else{
                            getFollow()
                            getFollowers()
                        }
                } catch (error) {
                    console.error(error);
                }
            }
        }
    }

    useEffect(() => {

    setLoading(true)

    if(effectRan.current === false){

        setUserSignedInID(isSignedIn ? user?.id : null)
        setuserFullname(props.data_last_name !== 'null' &&  props.data_last_name !== null ?  `${props.data_first_name} ${props.data_last_name}` : `${props.data_first_name}`);
        
        getFollow()
        getLinks()
        getFollowers()
        getVisitors()


        //Analytic Visit (Avoid self recording visits when same user logged in)
        if(userSignedInID !== props.data_user_id){
            generateAnalytic(userSignedInID)
        }

    }

    return () => {
        effectRan.current = true
    }

    }, [])

    return (
        <>
            <div className="bg-white block">
                <div className="max-w-2xl mx-auto shadow-xl">
                    
                    <div className="w-full relative">
                        <div className={`w-full bg-gray-200 h-48 rounded-b-3xl`}>

                        {/*User Top Menu*/}
                        <div className="absolute w-full">
                                <div className="flex flex-row justify-between px-4">

                                    {/* User Visitor */}
                                    <div className="flex flex-row space-x-2 mt-4">
                                            <SignedOut>
                                            <div onClick={() => openSignIn()}>
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
                                                    <div className=" hover:text-primary tooltip hover:tooltip-open tooltip-copied" data-tip="Copied">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#37CDBE" className="bi bi-clipboard-check-fill" viewBox="0 0 16 16">
                                                            <path d="M6.5 0A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3Zm3 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3Z"/>
                                                            <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1A2.5 2.5 0 0 1 9.5 5h-3A2.5 2.5 0 0 1 4 2.5v-1Zm6.854 7.354-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708.708Z"/>
                                                        </svg>
                                                    </div>
                                                </>
                                                :
                                                <>
                                                    <div className=" hover:text-primary tooltip hover:tooltip-open tooltip-copy" data-tip="Copy">
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
                            <div className="avatar online">
                                <div className="rounded-full  h-36 w-36  ring ring-white ring-offset-base-100 ring-offset-2 bg-gray-200" >
                                    <img src={props.data_profile_image_url ? props.data_profile_image_url : `/fallback_avatar.jpg`} alt={`avatar-${props.data_username}`} width="100%" />
                                </div>
                            </div>    
                        </div>

                        {/*Follow Function*/}
                        <div className="abosolute flex flex-row justify-end mr-4 px-2 mt-8">
                            <div className="flex flex-row space-x-2">
                            </div>
                            <div className="flex flex-row space-x-2">
                                <div className="h-5 w-20">
                                    <SignedIn>
                                    {
                                        user?.username?.toString().toLocaleLowerCase() === props.data_username.toLocaleLowerCase() ?
                                            <Link href="/user">
                                                <button className="rounded-xl px-3 py-1 font-semibold bg-ghost">
                                                    Settings
                                                </button>
                                            </Link>
                                            :
                                            isLoading ? 
                                            <>
                                                <button className="rounded-xl px-3 py-1 font-semibold bg-gray-500 text-slate-900 cursor-wait" disabled>
                                                Processing
                                                </button>
                                            </>
                                            :
                                                userIsFollowing ?
                                                <>
                                                    <button onClick={() => updateFollow()} className="rounded-xl px-3 py-1 font-semibold bg-primary">
                                                    Following
                                                    </button>
                                                </>
                                                :
                                                <>
                                                    <button onClick={() => updateFollow()} className="rounded-xl px-3 py-1 font-semibold bg-secondary">
                                                    Follow
                                                    </button>
                                                </>
                                    }
                                    </SignedIn>
                                    <SignedOut>
                                        <button onClick={() => openSignIn()} className="rounded-xl px-3 py-1 font-semibold bg-secondary">
                                        Follow
                                        </button>
                                    </SignedOut>
                                </div>
                            </div>
                        </div>

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
                        <div className="mb-1 h-5 w-40">
                            <p className="font-semibold text-zinc-700">
                                <Link href={`${process.env.NEXT_PUBLIC_HOSTNAME}/${props.username}`}>
                                        {`@${props.data_username}`}
                                </Link>
                            </p>
                        </div>

                        {/*FullName*/}
                        <div className="h-5 w-96">{userFullname}</div>

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
                                    {/* User Badge - Temporary set all to mashwishi for preview */}
                                    {props.username.toLowerCase() == 'mashwishi' ? 
                                    <div className="flex flex-row items-center mt-4">
                                    <div className=" hover:text-primary tooltip hover:tooltip-open tooltip-admin" data-tip="Admin">
                                    <img className="mr-1" src="/badge/others/admin.png" alt="admin-badge" width="24px" height="28px"/>
                                    </div>
                                    <div className=" hover:text-primary tooltip hover:tooltip-open tooltip-mod" data-tip="Moderator">
                                    <img className="mr-1" src="/badge/others/moderator.png" alt="mod-badge" width="24px" height="28px"/>
                                    </div>
                                    <div className=" hover:text-primary tooltip hover:tooltip-open tooltip-vip" data-tip="VIP">
                                    <img className="mr-1" src="/badge/others/vip.png" alt="vip-badge" width="24px" height="28px"/>
                                    </div>
                                    <div className=" hover:text-primary tooltip hover:tooltip-open tooltip-partner" data-tip="Partner">
                                    <img className="mr-1" src="/badge/others/partner.png" alt="partner-badge" width="24px" height="28px"/>
                                    </div>
                                    <div className=" hover:text-primary tooltip hover:tooltip-open tooltip-contributor" data-tip="Contributor">
                                    <img className="mr-1" src="/badge/others/contributor.png" alt="contributor-badge" width="24px" height="28px"/>
                                    </div>
                                    <div className=" hover:text-primary tooltip hover:tooltip-open tooltip-sponsor" data-tip="Sponsor">
                                    <img className="mr-1" src="/badge/others/sponsor.png" alt="sponsor-badge" width="24px" height="28px"/>
                                    </div>
                                    <div className=" hover:text-primary tooltip hover:tooltip-open tooltip-supporter" data-tip="Supporter">
                                    <img className="mr-1" src="/badge/others/supporter.png" alt="supporter-badge" width="24px" height="28px"/>
                                    </div>
                                    <div className=" hover:text-primary tooltip hover:tooltip-open tooltip-business" data-tip="Business">
                                    <img className="mr-1" src="/badge/others/business.png" alt="business-badge" width="24px" height="28px"/>
                                    </div>
                                    </div>
                                    :
                                    <div className="flex flex-row items-center mt-4">
                                    <div className=" hover:text-primary tooltip hover:tooltip-open tooltip-empty" data-tip="Empty">
                                    <img className="mr-1" src="/badge/empty.png" alt="empty-badge" width="24px" height="28px"/>
                                    </div>
                                    </div>
                                    }
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
                                <p className="font-bold text-zinc-700">0</p>
                                </div>
                                <div className="mb-1 h-5 w-20">
                                <p className="text-sm font-semibold text-zinc-700">Share</p>
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
                                            <Link href="/dashboard">
                                                <button className="btn btn-sm  btn-secondary">Edit Account</button>
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

export default GetUser;
