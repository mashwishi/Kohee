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

type GetUser_Desktop = {
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

const GetUser_Desktop = (props: GetUser_Desktop) => {

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
            <div className="flex h-screen w-full items-center justify-center mt-24 mb-24">
                {/*shadow-2xl shadow-gray-300 -temp disable */}
                <div className="w-full rounded-t-[15px] rounded-b-[15px] p-12 md:w-8/12 lg:w-6/12 bg-white">

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
                    <div className="grid grid-cols-1 mb-8">
                        <div className="">
                            <img src="/hr.png" alt="" />
                            <div className="flex flex-row justify-between px-4">
                            
                            <div className="p-2 rounded-full">
                                <a onClick={() => setShowShareModal(true)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#E0A82E" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                                        <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z"/>
                                    </svg>
                                </a>
                            </div>

                            <div className="flex flex-row space-x-2">
                                <div className="p-2 rounded-full">
                                    <a onClick={setCopied}>
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
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#E0A82E" className="bi bi-clipboard-fill" viewBox="0 0 16 16">
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
                    </div>

                    {/*Avatar, Name, Username, Bio, Stats, Badge, Button*/}
                    <div className="grid gap-6 grid-cols-12">
                        <div className="grid-cols-1 lg:col-span-3 ">
                            {/*Avatar*/}
                            <div className="mx-auto flex h-[90px] w-[90px] items-center justify-center rounded-full bg-white p-4 ">
                                <div>
                                    <div className="avatar online">
                                        <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                            <img src={props.data_profile_image_url ? props.data_profile_image_url : `/fallback_avatar.jpg`} alt={`avatar-${props.data_username}`} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-span-1 lg:col-span-9">
                            <div className="text-center lg:text-left">
                            <h2 className="text-2xl font-bold text-zinc-700">
                                {userFullname}
                            </h2>
                            <p className="mt-2 font-semibold text-zinc-700">
                            <Link href={`${process.env.NEXT_PUBLIC_HOSTNAME}/${props.username}`}>{`@${props.data_username}`}</Link>
                            {props.data_username == 'mashwishi' ? <div className="badge ml-1 text-[#4f2c15] badge-primary">Founder</div> : null }
                            </p>

                            <p className="mt-4 text-zinc-500">
                                {props.data_bio !== 'null' &&  props.data_bio !== null ? props.data_bio : null} 
                            </p>
                            </div>

                            {/*User Badge - Sample only*/}
                            {/* User Badge - Temporary set all to mashwishi for preview */}
                            {props.username.toLowerCase() == 'mashwishi' ? 
                            <div className="flex flex-row items-center mt-4">
                                <div className=" hover:text-primary tooltip hover:tooltip-open tooltip-admin" data-tip="Admin">
                                <img className="mr-1" src="/badge/others/admin.png" alt="admin-badge" width={22} height={26}/>
                                </div>
                                <div className=" hover:text-primary tooltip hover:tooltip-open tooltip-mod" data-tip="Moderator">
                                    <img className="mr-1" src="/badge/others/moderator.png" alt="mod-badge" width={22} height={26}/>
                                </div>
                                <div className=" hover:text-primary tooltip hover:tooltip-open tooltip-vip" data-tip="VIP">
                                    <img className="mr-1" src="/badge/others/vip.png" alt="vip-badge" width={22} height={26}/>
                                </div>
                                <div className=" hover:text-primary tooltip hover:tooltip-open tooltip-partner" data-tip="Partner">
                                    <img className="mr-1" src="/badge/others/partner.png" alt="partner-badge" width={22} height={26}/>
                                </div>
                                <div className=" hover:text-primary tooltip hover:tooltip-open tooltip-contributor" data-tip="Contributor">
                                    <img className="mr-1" src="/badge/others/contributor.png" alt="contributor-badge" width={22} height={26}/>
                                </div>
                                <div className=" hover:text-primary tooltip hover:tooltip-open tooltip-sponsor" data-tip="Sponsor">
                                    <img className="mr-1" src="/badge/others/sponsor.png" alt="sponsor-badge" width={22} height={26}/>
                                </div>
                                <div className=" hover:text-primary tooltip hover:tooltip-open tooltip-supporter" data-tip="Supporter">
                                    <img className="mr-1" src="/badge/others/supporter.png" alt="supporter-badge" width={22} height={26}/>
                                </div>
                                <div className=" hover:text-primary tooltip hover:tooltip-open tooltip-business" data-tip="Business">
                                    <img className="mr-1" src="/badge/others/business.png" alt="business-badge" width={22} height={26}/>
                                </div>
                            </div>
                            :
                            <div className="flex flex-row items-center mt-4">
                                <div className=" hover:text-primary tooltip hover:tooltip-open tooltip-empty" data-tip="Empty">
                                    <img className="mr-1" src="/badge/empty.png" alt="empty-badge" width={22} height={26}/>
                                </div>
                            </div>
                            }

                            <div className="mt-6 grid grid-cols-3 gap-6 text-center lg:text-left">
                            <div>
                                <p className="font-bold text-zinc-700">{userFollowers ? userFollowers : 0}</p>
                                <p className="text-sm font-semibold text-zinc-700">Follower
                                {
                                userFollowers ?  
                                userFollowers > 1 ? 
                                    `s` : `` 
                                : ``
                                }
                                </p>
                            </div>

                            <div>
                                <p className="font-bold text-zinc-700">{props.visits ? props.visits : 0}</p>
                                <p className="text-sm font-semibold text-zinc-700">Visit{props.visits > 1 ? `s` : ``}</p>
                            </div>

                            <div>
                                <p className="font-bold text-zinc-700">{props.ratings ? props.ratings : 0}</p>
                                <p className="text-sm font-semibold text-zinc-700">Rating{props.ratings > 1 ? `s` : ``}</p>
                            </div>
                            </div>
                            
                            {/*Edit Profile*/}
                            <div className="mt-6">
                                <SignedIn>
                                {
                                    user?.username?.toString().toLocaleLowerCase() === props.data_username.toLocaleLowerCase() ?
                                        <Link href="/user?tab=links">
                                            <button className="w-[95%] rounded-xl border-2 border-[#4f2c15] bg-[#4f2c15] px-3 py-2 font-semibold text-[#E0A82E] hover:bg-[#E0A82E] hover:text-[#4f2c15]">
                                                Edit Links
                                            </button>
                                        </Link>
                                        :
                                        userIsFollowing ?
                                        <>
                                            <button onClick={() => updateFollow(0)} className="w-[95%] rounded-xl border-2 border-[#4f2c15] bg-[#4f2c15] px-3 py-2 font-semibold text-[#E0A82E] hover:bg-[#E0A82E] hover:text-[#4f2c15]">
                                            Following
                                            </button>
                                        </>
                                        :
                                        <>
                                            <button onClick={() => updateFollow(1)} className="w-[95%] rounded-xl border-2 border-[#4f2c15] bg-[#4f2c15] px-3 py-2 font-semibold text-[#E0A82E] hover:bg-[#E0A82E] hover:text-[#4f2c15]">
                                            Follow
                                            </button>
                                        </>
                                }
                                </SignedIn>
                                <SignedOut>
                                    <button onClick={() => openSignIn()} className="w-[95%] rounded-xl border-2 border-[#4f2c15] bg-[#4f2c15] px-3 py-2 font-semibold text-[#E0A82E] hover:bg-[#E0A82E] hover:text-[#4f2c15]">
                                    Follow
                                    </button>
                                </SignedOut>
                            </div>

                        </div>
                    </div>

                    {/*Welcome Profile*/}
                    <SignedIn>
                        <div className="grid grid-cols-1 ">
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
                                            <Link href="/">
                                                <button className="btn btn-sm btn-secondary">Edit Account</button>
                                            </Link>
                                        </div>
                                    </div>
                                </>
                                : <></>
                            : <></>
                            }
                        </div>
                    </SignedIn>

                    {/*Total Shares*/}
                    <SignedIn>
                        <div className="grid grid-cols-1 ">
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
                        </div>
                    </SignedIn>
                    
                    {/*Signed out banner*/}
                    <div className="grid grid-cols-1 ">
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
                                        <button onClick={() => openSignIn()} className="btn btn-sm btn-primary">Create an Account</button>
                                </div>

                            </div>
                        </SignedOut>
                    </div>

                    {/*User Links*/}
                    <div className="grid grid-cols-1 ">
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

                </div>
            </div>
        </>
    );

};

export default GetUser_Desktop;
