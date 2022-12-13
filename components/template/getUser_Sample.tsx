/* eslint-disable @next/next/no-img-element */
import {useClerk, ClerkLoaded, ClerkProvider, SignedIn, SignedOut, UserButton, useUser} from "@clerk/nextjs";
import useClipboard from "react-use-clipboard";
import React from 'react';
import { useState, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import CountUp from 'react-countup';

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
    const ShareUrl = `${process.env.NEXT_PUBLIC_HOSTNAME}/u/mashwishi`

    const [isCopied, setCopied] = useClipboard(`${process.env.NEXT_PUBLIC_HOSTNAME}/u/mashwishi`);

    const [FacebookShares, setFacebookShares] = useState(0);
    const [RedditShares, setRedditShares] = useState(0);
    const [VKShares, setVKShares] = useState(0);

    const { user } = useUser();
    const { openSignIn } = useClerk();

    return (
        <>
            <div className="flex items-center justify-center bg-gray-200 antialiased overflow-hidden">
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
                                        <div className=" hover:text-primary tooltip hover:tooltip-open tooltip-edit" data-tip="Edit">
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
                                            <div className=" hover:text-primary tooltip hover:tooltip-open tooltip-copied" data-tip="Copied">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#37CDBE" className="bi bi-clipboard-check-fill" viewBox="0 0 16 16">
                                                    <path d="M6.5 0A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3Zm3 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3Z"/>
                                                    <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1A2.5 2.5 0 0 1 9.5 5h-3A2.5 2.5 0 0 1 4 2.5v-1Zm6.854 7.354-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708.708Z"/>
                                                </svg>
                                            </div>
                                        </>
                                        :
                                        <>
                                            <div className=" hover:text-primary tooltip hover:tooltip-open tooltip-copy" data-tip="Copy">
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
                            <a >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" className="bi bi-person-circle" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                            <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                            </svg>
                            </a>
                        </div>

                        <div className="flex flex-row space-x-2">

                            <div className="p-2 rounded-full">
                                <div className=" hover:text-primary tooltip hover:tooltip-open tooltip-share" data-tip="Share">
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
                                            <div className=" hover:text-primary tooltip hover:tooltip-open tooltip-copied" data-tip="Copied">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#37CDBE" className="bi bi-clipboard-check-fill" viewBox="0 0 16 16">
                                                    <path d="M6.5 0A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3Zm3 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3Z"/>
                                                    <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1A2.5 2.5 0 0 1 9.5 5h-3A2.5 2.5 0 0 1 4 2.5v-1Zm6.854 7.354-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708.708Z"/>
                                                </svg>
                                            </div>
                                        </>
                                        :
                                        <>
                                            <div className=" hover:text-primary tooltip hover:tooltip-open tooltip-copy" data-tip="Copy">
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
                        <SignedOut>
                            <button  className="rounded-full py-1 px-3 text-[#4f2c15] bg-[#E0A82E] btn-sm font-semibold">
                                    Follow
                            </button>
                        </SignedOut>
                        </div>
                    </div>

                        

                        {/*Profile Username and Main Badge*/}
                        <div className="flex flex-row items-center space-x-1">
                            <p className="font-bold text-xl">
                                <Link href={`${process.env.NEXT_PUBLIC_HOSTNAME}/sample`}>{props.data_username}</Link>
                            </p>
                            {props.data_username == 'mashwishi' ?
                                <div className="badge badge-accent">Founder</div>
                                :
                                null
                            }
                        </div>

                        {/*Profile Full Name*/}
                        <div className="flex flex-row space-x-1 my-2">
                            <p className=" font-semibold text-sm">
                                {props.data_last_name !== "" ? `${props.data_first_name} ${props.data_last_name}` : `${props.data_first_name}`} 
                            </p>
                        </div>

                        {/*Profile Full Name*/}
                        <div className="flex flex-row space-x-1 my-2">
                            <p className=" font-semibold text-xs">
                            {/* User Badge - Temporary set all to mashwishi for preview */}
                             I am the Founder of Clique and Kohee.
                            </p>
                        </div>

                        {/*User Badge - Sample only*/}
                        {/* User Badge - Temporary set all to mashwishi for preview */}
                        {
                        <div className="flex flex-row items-center">
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
                        }

                        <div className="flex flex-row items-center">
                            <div className="grid grid-cols-3 mb-2 mt-2 m-auto justify-center">
                                <div className="flex flex-col items-center mx-4">
                                <p className="font-bold">{props.followers ? props.followers : 0}</p>
                                <p className="text-xxsm">Follower{props.followers > 1 ? `s` : ``}</p>
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
                                <Link href={process.env.NEXT_PUBLIC_HOSTNAME + `/sample`}>
                                    <button className="btn btn-sm btn-primary">Create an Account</button>
                                </Link>
                            </div>

                        </div>
                    </SignedOut>

                    {/*User Links*/}
                    <div>

                        {/*Social Link example again*/}
                        {
                        <>

                            <Link href={process.env.NEXT_PUBLIC_HOSTNAME + `/sample`}>
                            <div className="bg-[#4267B2] mx-4 mt-4 py-2 px-4 rounded-t-[15px] rounded-b-[15px] relative cursor-pointer">
                                <div className="flex flex-row items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" className="bi bi-facebook" viewBox="0 0 16 16">
                                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                                </svg>
                                    <p className="font-bold text-lg text-white ml-2">Facebook Profile</p>
                                </div>
                            </div>
                            </Link>

                            <Link href={process.env.NEXT_PUBLIC_HOSTNAME + `/sample`}>
                            <div className="bg-[#000000] mx-4 mt-4 py-2 px-4 rounded-t-[15px] rounded-b-[15px] relative cursor-pointer">
                                <div className="flex flex-row items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" className="bi bi-facebook" viewBox="0 0 16 16">
                                <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3V0Z"/>
                                </svg>
                                    <p className="font-bold text-lg text-white ml-2">Tiktok</p>
                                </div>
                            </div>
                            </Link>

                            <Link href={process.env.NEXT_PUBLIC_HOSTNAME + `/sample`}>
                            <div className="bg-[#7289da] mx-4 mt-4 py-2 px-4 rounded-t-[15px] rounded-b-[15px] relative cursor-pointer">
                                <div className="flex flex-row items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" className="bi bi-discord" viewBox="0 0 16 16">
                                    <path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z"/>
                                    </svg>
                                    <p className="font-bold text-lg text-white ml-2">Discord Server</p>
                                </div>
                            </div>
                            </Link>

                            <Link href={process.env.NEXT_PUBLIC_HOSTNAME + `/sample`}>
                            <div className="bg-[#4267B2] mx-4 mt-4 py-2 px-4 rounded-t-[15px] rounded-b-[15px] relative cursor-pointer">
                                <div className="flex flex-row items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" className="bi bi-facebook" viewBox="0 0 16 16">
                                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                                </svg>
                                    <p className="font-bold text-lg text-white ml-2">Facebook Page</p>
                                </div>
                            </div>
                            </Link>

                            <Link href={process.env.NEXT_PUBLIC_HOSTNAME + `/sample`}>
                            <div className="bg-[#1DA1F2] mx-4 mt-4 py-2 px-4 rounded-t-[15px] rounded-b-[15px] relative cursor-pointer">
                                <div className="flex flex-row items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" className="bi bi-facebook" viewBox="0 0 16 16">
                                <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                                </svg>
                                    <p className="font-bold text-lg text-white ml-2">Twitter</p>
                                </div>
                            </div>
                            </Link>

                            <Link href={process.env.NEXT_PUBLIC_HOSTNAME + `/sample`}>
                            <div className="bg-gradient-to-r from-[#fdf497] via-[#fd5949] to-[#d6249f] stops-[#285AEB] mx-4 mt-4 py-2 px-4 rounded-t-[15px] rounded-b-[15px] relative cursor-pointer">
                                <div className="flex flex-row items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" className="bi bi-facebook" viewBox="0 0 16 16">
                                <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                                </svg>
                                    <p className="font-bold text-lg text-white ml-2">Instagram</p>
                                </div>
                            </div>
                            </Link>

                            <Link href={process.env.NEXT_PUBLIC_HOSTNAME + `/sample`}>
                            <div className="bg-[#6441a5] mx-4 mt-4 py-2 px-4 rounded-t-[15px] rounded-b-[15px] relative cursor-pointer">
                                <div className="flex flex-row items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" className="bi bi-facebook" viewBox="0 0 16 16">
                                <path d="M3.857 0 1 2.857v10.286h3.429V16l2.857-2.857H9.57L14.714 8V0H3.857zm9.714 7.429-2.285 2.285H9l-2 2v-2H4.429V1.143h9.142v6.286z"/>
                                <path d="M11.857 3.143h-1.143V6.57h1.143V3.143zm-3.143 0H7.571V6.57h1.143V3.143z"/>
                                </svg>
                                    <p className="font-bold text-lg text-white ml-2">Twitch</p>
                                </div>
                            </div>
                            </Link>

                            <Link href={process.env.NEXT_PUBLIC_HOSTNAME + `/sample`}>
                            <div className="bg-[#171515] mx-4 mt-4 py-2 px-4 rounded-t-[15px] rounded-b-[15px] relative cursor-pointer">
                                <div className="flex flex-row items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" className="bi bi-facebook" viewBox="0 0 16 16">
                                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                                </svg>
                                    <p className="font-bold text-lg text-white ml-2">Github</p>
                                </div>
                            </div>
                            </Link>

                        </>
                        }

                    </div>
                    {/*End User Links*/}

                    {/*Rating Signout*/}
                    <SignedOut>
                        <div className="bg-[url('/banner-1.png')] bg-cover bg-[#657EF8] mb-6 mx-4 mt-4 p-5 rounded-t-[15px] rounded-b-[15px] relative">

                        {/*Title*/}
                        <div className="flex flex-row items-center">
                        <p className="font-bold text-xl text-white">Rate this profile</p>
                        </div>

                        {/*More Info*/}
                        <div className="flex flex-row ">
                        <p className="text-sm text-primary">How would you rate {props.data_username}&apos;s profile?</p>
                        </div>

                        <div className="flex flex-row mt-2">
                        {/* User Rate */}
                            <a >
                            <div className="rating">
                                <input type="radio" name="rating-4" className="mask mask-star-2 bg-accent" />
                                <input type="radio" name="rating-4" className="mask mask-star-2 bg-accent" />
                                <input type="radio" name="rating-4" className="mask mask-star-2 bg-accent" />
                                <input type="radio" name="rating-4" className="mask mask-star-2 bg-accent" />
                                <input type="radio" name="rating-4" className="mask mask-star-2 bg-accent" />
                            </div>
                            </a>
                        </div>

                        </div>
                    </SignedOut>
                    
                </div>
            </div>
            </div>
        </>
    );

};

export default GetUser_Mobile;
