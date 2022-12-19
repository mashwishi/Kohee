import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { useClerk } from "@clerk/nextjs";
import useAnalyticsEventTracker from "./useAnalyticsEventTracker";
import { useEffect, useState } from "react";
import axios from "axios";
import CountUp from "react-countup";
import NumberFormatter from "./NumberFormatter";


const Landing: NextPage = () => {

    const { openSignIn } = useClerk();

    const gaEventTracker = useAnalyticsEventTracker('Mobile - Landing');

    const [activeUsers, setActiveUsers] = useState(0);

  return (
    <>
        <section className="px-2 py-32 bg-white md:px-0">
        <div className="container items-center max-w-6xl px-8 mx-auto xl:px-5">
            <div className="flex flex-wrap items-center sm:-mx-3">
            <div className="w-full md:w-1/2 md:px-3">

                {/* <div className="flex justify-center mb-24">
                    <Image className="cursor-pointer mx-auto sm:w-1/4" src="/kohee-fill.webp" alt="kohee" width="235" height="255" priority />
                </div> */}

                <div className="flex justify-center mb-24">
                    <div className="flex justify-center content-center relative" >

                        <div className="cursor-pointer animate-bounce">
                            <Image  src="/bean.png" alt="kohee" width="350" height="250"  priority/>
                        </div>
                        <div className="cursor-pointer ml-[-80px] mt-[100px] animate-bounce">
                            <Image src="/bean.png" width="150" height="100" alt="kohee" priority/>
                        </div>
                    
                    </div>
                    
                </div>
                
                <div className="w-full pb-6 space-y-6 sm:max-w-md lg:max-w-lg md:space-y-4 lg:space-y-8 xl:space-y-9 sm:pr-5 lg:pr-0 md:pb-0">
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-4xl lg:text-5xl xl:text-5xl">

                    <span className="block text-[#4f2c15] xl:inline">Create</span>
                    <span className="block text-primary xl:inline"> your link profile in minutes!</span>

                </h1>
                <p className="mx-auto text-base text-gray-500 sm:max-w-md lg:text-xl md:max-w-3xl">
                    All of you are welcome in Kohee. Gather all of the content you produce, curate, and share online, no matter where it is dispersed, and reassemble it in one place –your Kohee — where it can be easily found.
                </p>

                <section className="text-gray-600 body-font">
                    <div className="container px-2 py-2">
                        <div className="flex flex-wrap -m-4 text-center justify-center">
                        <div className="p-4 w-1/3 ">
                            <h2 className="title-font font-medium text-2xl  text-gray-900">
                                <NumberFormatter input_number={Math.floor(Math.random() * 10)} />
                            </h2>
                            <p className="leading-relaxed">Live Visitors</p>
                        </div>
                        <div className="p-4 w-1/3 ">
                            <h2 className="title-font font-medium text-2xl text-gray-900">
                                <NumberFormatter input_number={5} />
                            </h2>
                            <p className="leading-relaxed">Total Users</p>
                        </div>
                        <div className="p-4 w-1/3 ">
                            <h2 className="title-font font-medium text-2xl  text-gray-900">
                                <NumberFormatter input_number={8454} />
                            </h2>
                            <p className="leading-relaxed">Total Views</p>
                        </div>
                        </div>
                    </div>
                </section>

                <div className="relative flex flex-col sm:flex-row sm:space-x-4">
                    
                    <button onClick={() => {openSignIn(); gaEventTracker('Get Started', 'Get Started');} } className="flex items-center w-full px-6 py-3 mb-3 text-lg text-white bg-[#4f2c15] rounded-md sm:mb-0 hover:bg-[#7A4521] sm:w-auto">
                    Get Started 
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                    </button>

                    <button onClick={() => { window.open('https://ko-fi.com/koheeApp');}} className="flex items-center px-6 py-3 text-gray-500 bg-gray-100 rounded-md hover:bg-gray-200 hover:text-gray-600">
                        <span className="mr-2">
                            {`Support the Project`}   
                        </span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M.11 3.187A.5.5 0 0 1 .5 3h13a.5.5 0 0 1 .488.608l-.22.991a3.001 3.001 0 0 1-1.3 5.854l-.132.59A2.5 2.5 0 0 1 9.896 13H4.104a2.5 2.5 0 0 1-2.44-1.958L.012 3.608a.5.5 0 0 1 .098-.42Zm12.574 6.288a2 2 0 0 0 .866-3.899l-.866 3.9ZM1.124 4l1.516 6.825A1.5 1.5 0 0 0 4.104 12h5.792a1.5 1.5 0 0 0 1.464-1.175L12.877 4H1.123Z"/>
                        </svg>
                    </button>

                </div>
                </div>
            </div>
            </div>
        </div>
        </section>

    </>

    
  );
};

export default Landing;






