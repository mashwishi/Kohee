/* eslint-disable @next/next/no-img-element */
import {useClerk, ClerkLoaded, ClerkProvider, SignedIn, SignedOut, UserButton, useUser} from "@clerk/nextjs";
import useClipboard from "react-use-clipboard";
import React from 'react';
import { useState, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import CountUp from 'react-countup';
import LoadingPage from '../global/LoadingPage';
import Social_Icons from "../global/Social_Icons";

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

type GetUser_Mobile = {
    data_username: string;
    data_user_id: string;
    data_banner: string;
    data_bio: string;
    data_updated_at: string;
    data_profile_image_url: string;
    data_profile_banner_url: string;
    data_last_name: string;
    data_id: string;
    data_first_name: string;
    data_created_at: string;
    username: string;
    followers: number;
    visits: number;
    ratings: number;
};

const GetUser_Mobile = (props: GetUser_Mobile) => {

    const [showShareModal, setShowShareModal] = useState(false);
    const ShareUrl = `${process.env.NEXT_PUBLIC_HOSTNAME}/${props.username}`

    const [isCopied, setCopied] = useClipboard(`${process.env.NEXT_PUBLIC_HOSTNAME}/${props.username}`);

    const [FacebookShares, setFacebookShares] = useState(0);
    const [RedditShares, setRedditShares] = useState(0);
    const [VKShares, setVKShares] = useState(0);

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
            <div className="flex items-center justify-center bg-gray-200 antialiased">
            <div className="flex flex-col bg-[#FEFFFE] " >
                <div className="flex flex-col relative ">

                    {/*Temporary Share Modal*/}
                    <div className="grid grid-cols-1">
                    {showShareModal ? (
                        <>
                            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                    {/*modal share -  content*/}
                                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                    {/*modal share -  header*/}
                                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
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

                    {/*Menu*/}
                    <SignedIn>
                    <div className="absolute">
                        <img src="/hr.png" alt="" />
                        <div className="flex flex-row justify-between px-4">
                        <div className="p-2 rounded-full">
                            <UserButton userProfileUrl="/user" afterSignOutUrl="/" />
                        </div>

                        <div className="flex flex-row space-x-2">

                            {user?.username ?
                                user?.username.toString().toLocaleLowerCase() === props.data_username.toLocaleLowerCase() ?
                                    <div className="p-2 rounded-full">
                                        <div className="tooltip hover:tooltip-open tooltip-edit" data-tip="Edit">
                                        <Link href="/dashboard">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                                            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                                        </svg>
                                        </Link>
                                        </div>
                                    </div>
                                    :
                                    <></>
                            :
                            <></>
                            }
                            
                            <div className="p-2 rounded-full">

                                <a onClick={setCopied}>
                                    {
                                        isCopied ?
                                        <>
                                            <div className="tooltip hover:tooltip-open tooltip-copied" data-tip="Copied">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#37CDBE" className="bi bi-clipboard-check-fill" viewBox="0 0 16 16">
                                                    <path d="M6.5 0A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3Zm3 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3Z"/>
                                                    <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1A2.5 2.5 0 0 1 9.5 5h-3A2.5 2.5 0 0 1 4 2.5v-1Zm6.854 7.354-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708.708Z"/>
                                                </svg>
                                            </div>
                                        </>
                                        :
                                        <>
                                            <div className="tooltip hover:tooltip-open tooltip-copy" data-tip="Copy">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-clipboard-fill" viewBox="0 0 16 16">
                                                    <path  d="M10 1.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-1Zm-5 0A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5v1A1.5 1.5 0 0 1 9.5 4h-3A1.5 1.5 0 0 1 5 2.5v-1Zm-2 0h1v1A2.5 2.5 0 0 0 6.5 5h3A2.5 2.5 0 0 0 12 2.5v-1h1a2 2 0 0 1 2 2V14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3.5a2 2 0 0 1 2-2Z"/>
                                                </svg>
                                            </div>
                                        </>
                                    }
                                </a>

                            </div>
                        </div>
                        </div>
                    </div>
                    </SignedIn>
                    <SignedOut>
                    <div className="absolute">
                        <img src="/hr.png" alt="" />
                        <div className="flex flex-row justify-between px-4">
                        
                        <div className="p-2 rounded-full">
                            <a onClick={() => openSignIn()}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" className="bi bi-person-circle" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                            <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                            </svg>
                            </a>
                        </div>

                        <div className="flex flex-row space-x-2">

                            <div className="p-2 rounded-full">
                                <div className="tooltip hover:tooltip-open tooltip-share" data-tip="Share">
                                    <a onClick={() => setShowShareModal(true)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                                            <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z"/>
                                        </svg>
                                    </a>
                                </div>
                            </div>

                            <div className="p-2 rounded-full">
                                <a onClick={setCopied}>
                                    {
                                        isCopied ?
                                        <>
                                            <div className="tooltip hover:tooltip-open tooltip-copied" data-tip="Copied">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#37CDBE" className="bi bi-clipboard-check-fill" viewBox="0 0 16 16">
                                                    <path d="M6.5 0A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3Zm3 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3Z"/>
                                                    <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1A2.5 2.5 0 0 1 9.5 5h-3A2.5 2.5 0 0 1 4 2.5v-1Zm6.854 7.354-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708.708Z"/>
                                                </svg>
                                            </div>
                                        </>
                                        :
                                        <>
                                            <div className="tooltip hover:tooltip-open tooltip-copy" data-tip="Copy">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-clipboard-fill" viewBox="0 0 16 16">
                                                    <path  d="M10 1.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-1Zm-5 0A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5v1A1.5 1.5 0 0 1 9.5 4h-3A1.5 1.5 0 0 1 5 2.5v-1Zm-2 0h1v1A2.5 2.5 0 0 0 6.5 5h3A2.5 2.5 0 0 0 12 2.5v-1h1a2 2 0 0 1 2 2V14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3.5a2 2 0 0 1 2-2Z"/>
                                                </svg>
                                            </div>
                                        </>
                                    }
                                </a>
                            </div>
                        </div>

                        </div>
                    </div>
                    </SignedOut>
                    {/*End Menu*/}
                    
                    {/*Banner*/}
                    <img 
                    src={props.data_profile_banner_url ? props.data_profile_banner_url : `/fallback_banner.png`} alt={`banner-${props.data_username}`}  
                    className="object-cover rounded-b-[50px] max-h-30 min-h-30"
                    />
                    
                    {/*Profile Card - shadow-xl */}
                    <div className="mx-4 p-5 -mt-24 rounded-t-[15px] rounded-b-[15px] bg-white relative">

                    <div className="-mt-16 grid grid-cols-2 items-center">
                        {/*Avatar*/}
                        <div>
                            <div className="avatar online">
                                <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                    <img src={props.data_profile_image_url ? props.data_profile_image_url : `/fallback_avatar.jpg`} alt={`avatar-${props.data_username}`} />
                                </div>
                            </div>
                        </div>

                        {/*Edit Profile*/}
                        <div className="mt-12 ml-20">
                        <SignedIn>
                            {
                                user?.username?.toString().toLocaleLowerCase() === props.data_username.toLocaleLowerCase() ?
                                    <>
                                    <Link href="/user?tab=links">
                                        <button className="rounded-full py-1 px-8 text-[#4f2c15] bg-[#E0A82E] btn-sm font-semibold">
                                            Edit
                                        </button>
                                    </Link>
                                    </>
                                    :
                                    userIsFollowing ?
                                        <>
                                            <button onClick={() => updateFollow(0)} className="rounded-full py-1 px-4 text-[#4f2c15] bg-[#E0A82E] btn-sm font-semibold">
                                                Following
                                            </button>
                                        </>
                                        :
                                        <>
                                            <button onClick={() => updateFollow(1)} className="rounded-full py-1 px-6 text-[#4f2c15] bg-[#E0A82E] btn-sm font-semibold">
                                                Follow
                                            </button>
                                        </>
                            }
                        </SignedIn>
                        <SignedOut>
                            <button onClick={() => openSignIn()} className="rounded-full py-1 px-6 text-[#4f2c15] bg-[#E0A82E] btn-sm font-semibold">
                                    Follow
                            </button>
                        </SignedOut>
                        </div>
                    </div>

                        

                        {/*Profile Username and Main Badge*/}
                        <div className="flex flex-row items-center space-x-1">
                            <p className="font-bold text-xl">
                                <Link href={`${process.env.NEXT_PUBLIC_HOSTNAME}/${props.username}`}>
                                    {props.data_username}
                                </Link>
                            </p>
                            {props.data_username == 'mashwishi' ?
                                <div className="badge text-[#4f2c15] badge-primary">Founder</div>
                                :
                                null
                            }
                        </div>

                        {/*Profile Full Name*/}
                        <div className="flex flex-row space-x-1 my-2">
                            <p className=" font-semibold text-sm">
                                {userFullname} 
                            </p>
                        </div>

                        {/*Profile Full Name*/}
                        <div className="flex flex-row space-x-1 my-2">
                            <p className=" font-semibold text-xs">
                                {props.data_bio !== 'null' &&  props.data_bio !== null ? props.data_bio : null}  
                            </p>
                        </div>

                        {/*User Badge - Sample only*/}
                        {/* User Badge - Temporary set all to mashwishi for preview */}
                        {props.username.toLowerCase() == 'mashwishi' ? 
                        <div className="flex flex-row items-center">
                            <div className="tooltip hover:tooltip-open tooltip-admin" data-tip="Admin">
                            <img className="mr-1" src="/badge/others/admin.png" alt="admin-badge" width={22} height={26}/>
                            </div>
                            <div className="tooltip hover:tooltip-open tooltip-mod" data-tip="Moderator">
                                <img className="mr-1" src="/badge/others/moderator.png" alt="mod-badge" width={22} height={26}/>
                            </div>
                            <div className="tooltip hover:tooltip-open tooltip-vip" data-tip="VIP">
                                <img className="mr-1" src="/badge/others/vip.png" alt="vip-badge" width={22} height={26}/>
                            </div>
                            <div className="tooltip hover:tooltip-open tooltip-partner" data-tip="Partner">
                                <img className="mr-1" src="/badge/others/partner.png" alt="partner-badge" width={22} height={26}/>
                            </div>
                            <div className="tooltip hover:tooltip-open tooltip-contributor" data-tip="Contributor">
                                <img className="mr-1" src="/badge/others/contributor.png" alt="contributor-badge" width={22} height={26}/>
                            </div>
                            <div className="tooltip hover:tooltip-open tooltip-sponsor" data-tip="Sponsor">
                                <img className="mr-1" src="/badge/others/sponsor.png" alt="sponsor-badge" width={22} height={26}/>
                            </div>
                            <div className="tooltip hover:tooltip-open tooltip-supporter" data-tip="Supporter">
                                <img className="mr-1" src="/badge/others/supporter.png" alt="supporter-badge" width={22} height={26}/>
                            </div>
                            <div className="tooltip hover:tooltip-open tooltip-business" data-tip="Business">
                                <img className="mr-1" src="/badge/others/business.png" alt="business-badge" width={22} height={26}/>
                            </div>
                        </div>
                        :
                        <div className="flex flex-row items-center">
                            <div className="tooltip hover:tooltip-open tooltip-empty" data-tip="Empty">
                                <img className="mr-1" src="/badge/empty.png" alt="empty-badge" width={22} height={26}/>
                            </div>
                        </div>
                        }

                        <div className="flex flex-row items-center">
                            <div className="grid grid-cols-3 mb-2 mt-2 m-auto justify-center">
                                <div className="flex flex-col items-center mx-4">
                                <p className="font-bold">{userFollowers ? userFollowers : 0}</p>
                                <p className="text-xxsm">Follower                                {
                                userFollowers ?  
                                userFollowers > 1 ? 
                                    `s` : `` 
                                : ``
                                }
                                </p>
                                </div>

                                <div className="flex flex-col items-center mx-4">
                                <p className="font-bold">{props.visits ? props.visits : 0}</p>
                                <p className="text-xxsm">Visit{props.visits > 1 ? `s` : ``}</p>
                                </div>

                                <div className="flex flex-col items-center mx-4">
                                <p className="font-bold">{props.ratings ? props.ratings : 0}</p>
                                <p className="text-xxsm">Rating{props.ratings > 1 ? `s` : ``}</p>
                                </div>
                            </div>
                        </div>
                        
                    </div>

                    {/*Welcome Profile*/}
                    <SignedIn>
                    {user?.username ?
                        user?.username.toString().toLocaleLowerCase() === props.data_username.toLocaleLowerCase() ?
                        <>
                            <div className=" bg-neutral  mx-4 mt-4 p-5 rounded-t-[15px] rounded-b-[15px] relative">
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


                    {/*Total Shares*/}
                    <SignedIn>
                    {user?.username ?
                        user?.username.toString().toLocaleLowerCase() === props.data_username.toLocaleLowerCase() ?
                            <div className="bg-[url('/share-banner.jpg')] bg-[#657EF8]  mx-4 mt-4 p-5 rounded-t-[15px] rounded-b-[15px] relative">
                                <div className="flex-1 px-2">
                                    <h2 className="text-3xl font-extrabold text-white">
                                        <CountUp end={0} />
                                    </h2>
                                    <p className="text-sm text-[#F5CBD7]">Total Shares</p>
                                </div>
                            </div>
                        :
                        <></>
                    :
                    <></>
                    }
                    </SignedIn>

                    {/*Banner Signout*/}
                    <SignedOut>
                        <div className="bg-[url('/banner-4.jpg')] bg-cover bg-[#657EF8]  mx-4 mt-4 p-5 rounded-t-[15px] rounded-b-[15px] relative">

                            {/*Title*/}
                            <div className="flex flex-row items-center">
                                <p className="font-bold text-xl text-white">Become Kohee Creator!</p>
                            </div>

                            {/*More Info*/}
                            <div className="flex flex-row ">
                                <p className="text-sm text-primary">Create your link profile in minutes!</p>
                            </div>

                            <div className="flex flex-row mt-2">
                                <Link href="/">
                                    <button className="btn btn-sm btn-primary">Create an Account</button>
                                </Link>
                            </div>

                        </div>
                    </SignedOut>

                    {/*User Links*/}
                    <div className="mb-24">
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
                                                <div className="mx-4 mt-4 py-2 px-4 rounded-t-[15px] rounded-b-[15px] relative cursor-pointer" style={{ color: i.color_text, backgroundColor: i.color_button }}>
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

export default GetUser_Mobile;
