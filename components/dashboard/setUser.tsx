import type { NextPage } from "next";
import React, { useState, useEffect, useRef } from "react";
import { useUser } from "@clerk/nextjs";

import Link from "next/link";

import useAnalyticsEventTracker from "../global/useAnalyticsEventTracker";
import GetTypeNumber from "../analytics/getTypeNumber";
import GetDevicePieGraph from "../analytics/getDevicePieGraph";
import GetFollowerStats from "../analytics/getFollowerStats";

import ReactGA from 'react-ga'
import GoogleAdsense from "next-google-ads";

interface OptionsDays {
    value: number;
    label: string;
} 

const optionsDays: OptionsDays[] = [
    { value: 1, label: 'Today' },
    { value: 7, label: '7 Days ago' },
    { value: 30, label: '30 Days ago' },
];

const SetUser: NextPage = () => {

    const { user } = useUser();
    const gaEventTracker = useAnalyticsEventTracker('Dashboard');
    ReactGA.pageview('Dashboard')

    const [Days, setDate] = useState(0);

    //Anti-double run
    const effectRan = useRef(false)

    useEffect(() => {

        if(effectRan.current === false){
            setDate(1);
        }
    
        return () => {
            effectRan.current = true
        }

    }, [])

    const handleChangeDays = (event: any) => {
        setDate(parseInt(event.target.value));
    };

    return (
        <>
            <div className="flex-grow text-gray-800">
                <main className="p-6 sm:p-10 space-y-6">

                {/* Header and Date Filter */}
                <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
                    <div className="mr-6">
                        <h1 className="text-4xl font-semibold mb-2">Dashboard</h1>
                        <h2 className="text-gray-600 ml-0.5">User&apos;s Stats and Analytics</h2>
                    </div>
                    <div className="flex flex-wrap items-start justify-end -mb-3">

                        <select value={Days} onChange={handleChangeDays} className="inline-flex px-5 py-3 bg-base-100 border border-base-200 rounded-md mb-3">
                        {optionsDays.map((option) => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                        </select>

                            <a 
                            href={`/${user?.username ? user?.username : ''}`} 
                            onClick={() => gaEventTracker('Card Live Preview', 'Card Live Preview')}
                            className="inline-flex px-5 py-3 bg-primary hover:bg-secondary rounded-md ml-6 mb-3">
                                <svg aria-hidden="true" fill="none" viewBox="0 0 16 16" stroke="currentColor" className="flex-shrink-0 h-5 w-5 -ml-1 mt-0.5 mr-2">
                                    <path fillRule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
                                    <path fillRule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
                                </svg>
                                View Profile
                            </a>
                    </div>
                </div>
                
                {/* Stats */}
                <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
                    <div className="flex items-center p-8 bg-white shadow rounded-lg">
                    <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-purple-600 bg-purple-100 rounded-full mr-6">
                        <svg aria-hidden="true" fill="none" viewBox="0 0 16 16" stroke="currentColor" className="h-6 w-6">
                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                        </svg>
                    </div>
                    <div>
                        <span className="block text-2xl font-bold"><GetTypeNumber user_id={user?.id ? user?.id : ''} days={Days} type='visit'/></span>
                        <span className="block text-gray-500">Visits</span>
                    </div>
                    </div>
                    <div className="flex items-center p-8 bg-white shadow rounded-lg">
                    <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-green-600 bg-green-100 rounded-full mr-6">
                        <svg aria-hidden="true" fill="none" viewBox="0 0 16 16" stroke="currentColor" className="h-6 w-6">
                        <path fillRule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
                        <path fillRule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
                        </svg>
                    </div>
                    <div>
                        <span className="block text-2xl font-bold"><GetTypeNumber user_id={user?.id ? user?.id : ''} days={Days} type='share'/></span>
                        <span className="block text-gray-500">Shares</span>
                    </div>
                    </div>
                    <div className="flex items-center p-8 bg-white shadow rounded-lg">
                    <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-red-600 bg-red-100 rounded-full mr-6">
                        <svg  aria-hidden="true" fill="none" viewBox="0 0 16 16" stroke="currentColor" className="h-6 w-6">
                            <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103zM2.25 8.184l3.897 1.67a.5.5 0 0 1 .262.263l1.67 3.897L12.743 3.52 2.25 8.184z"/>
                        </svg>
                    </div>
                    <div>
                        <span className="inline-block text-2xl font-bold"><GetTypeNumber user_id={user?.id ? user?.id : ''} days={Days} type='click'/></span>
                        <span className="block text-gray-500">Clicks</span>
                    </div>
                    </div>
                    <div className="flex items-center p-8 bg-white shadow rounded-lg">
                    <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600 bg-blue-100 rounded-full mr-6">
                        <svg aria-hidden="true" fill="none" viewBox="0 0 16 16" stroke="currentColor" className="h-6 w-6">
                            <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8Zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022ZM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816ZM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"/>
                        </svg>
                    </div>
                    <div>
                        {/* <span className="block text-2xl font-bold"><GetTypeNumber user_id={user?.id ? user?.id : ''} days={Days} type='follow'/></span> */}
                        <GetFollowerStats user_id={user?.id ? user?.id : ''} days={Days} />
                        <span className="block text-gray-500">Followers</span>
                    </div>
                    </div>
                </section>

                {/* Analytics */}
                <section className="grid md:grid-cols-2 xl:grid-cols-4 xl:grid-rows-2 xl:grid-flow-col gap-6">
                    {/* Geo Graph with Ads*/}
                    <div className="flex flex-col md:col-span-2 md:row-span-2 bg-white rounded-lg">
                        <div className="px-6 py-5 font-semibold border-b border-gray-100">Country</div>
                        <div className="p-4 flex-grow">
                            <div className="flex items-center justify-center h-full px-4 py-16 text-gray-400 text-3xl font-semibold bg-gray-100 border-2 border-gray-200 border-dashed rounded-md">Chart (Soon)</div>
                        </div>

                        {/* Ads */}
                        <div className="px-6 font-semibold border-b border-gray-100">Google Ads</div>
                        <div className="p-4 flex-grow">
                            <div className="flex items-center justify-center h-full">      
                            {/* <div className="flex items-center justify-center h-full text-gray-400 text-3xl font-semibold bg-gray-100 border-2 border-gray-200 border-dashed rounded-md">                                         */}
                                <GoogleAdsense client={process.env.NEXT_PUBLIC_GOOGLEADS_CLIENT ? process.env.NEXT_PUBLIC_GOOGLEADS_CLIENT : 'ca-pub-1971863279565387'} slot="4627562024" responsive="true" />
                                <div id="ezoic-pub-ad-placeholder-102"> </div>
                            </div>
                        </div>
                        {/* End - Ads */}
                    </div>
                    {/* End - Geo Graph with Ads */}

                    {/* Top Country and Browser and Visits*/}
                    <div className="row-span-3 bg-white rounded-lg">
                    <div className="flex items-center justify-between px-6 py-5 font-semibold border-b border-gray-100">
                        <span>Additional Info</span>
                    </div>
                    <div className="overflow-y-auto max-h-[24rem]">
                        <ul className="">
                            <li className="flex items-center">
                                <div className="flex items-center p-8 bg-white shadow rounded-lg">
                                    <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-yellow-600 bg-yellow-100 rounded-full mr-6">
                                        <svg aria-hidden="true" fill="none" viewBox="0 0 16 16" stroke="currentColor" className="h-6 w-6">
                                            <path d="m10.495 6.92 1.278-.619a.483.483 0 0 0 .126-.782c-.252-.244-.682-.139-.932.107-.23.226-.513.373-.816.53l-.102.054c-.338.178-.264.626.1.736a.476.476 0 0 0 .346-.027ZM7.741 9.808V9.78a.413.413 0 1 1 .783.183l-.22.443a.602.602 0 0 1-.12.167l-.193.185a.36.36 0 1 1-.5-.516l.112-.108a.453.453 0 0 0 .138-.326ZM5.672 12.5l.482.233A.386.386 0 1 0 6.32 12h-.416a.702.702 0 0 1-.419-.139l-.277-.206a.302.302 0 1 0-.298.52l.761.325Z"/>
                                            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0ZM1.612 10.867l.756-1.288a1 1 0 0 1 1.545-.225l1.074 1.005a.986.986 0 0 0 1.36-.011l.038-.037a.882.882 0 0 0 .26-.755c-.075-.548.37-1.033.92-1.099.728-.086 1.587-.324 1.728-.957.086-.386-.114-.83-.361-1.2-.207-.312 0-.8.374-.8.123 0 .24-.055.318-.15l.393-.474c.196-.237.491-.368.797-.403.554-.064 1.407-.277 1.583-.973.098-.391-.192-.634-.484-.88-.254-.212-.51-.426-.515-.741a6.998 6.998 0 0 1 3.425 7.692 1.015 1.015 0 0 0-.087-.063l-.316-.204a1 1 0 0 0-.977-.06l-.169.082a1 1 0 0 1-.741.051l-1.021-.329A1 1 0 0 0 11.205 9h-.165a1 1 0 0 0-.945.674l-.172.499a1 1 0 0 1-.404.514l-.802.518a1 1 0 0 0-.458.84v.455a1 1 0 0 0 1 1h.257a1 1 0 0 1 .542.16l.762.49a.998.998 0 0 0 .283.126 7.001 7.001 0 0 1-9.49-3.409Z"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <span className="block text-2xl font-bold">-</span>
                                        <span className="block text-gray-500">Top Country</span>
                                    </div>
                                </div>
                            </li>
                            <li className="flex items-center">
                                <div className="flex items-center p-8 bg-white shadow rounded-lg">
                                    <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-teal-600 bg-teal-100 rounded-full mr-6">
                                        <svg  aria-hidden="true" fill="none" viewBox="0 0 16 16" stroke="currentColor" className="h-6 w-6">
                                            <path d="M11 2a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3h6zM5 1a4 4 0 0 0-4 4v6a4 4 0 0 0 4 4h6a4 4 0 0 0 4-4V5a4 4 0 0 0-4-4H5z"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <span className="block text-2xl font-bold">-</span>
                                        <span className="block text-gray-500">Top Browser</span>
                                    </div>
                                </div>
                            </li>
                            <li className="flex items-center">
                                <div className="flex items-center p-8 bg-white shadow rounded-lg">
                                    <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600 bg-blue-100 rounded-full mr-6">
                                        <svg aria-hidden="true" fill="none" viewBox="0 0 16 16" stroke="currentColor" className="h-6 w-6">
                                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <span className="block text-2xl font-bold">-</span>
                                        <span className="block text-gray-500">Signed In / Guests</span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    </div>
                    {/* End - Top Country and Browser and Visits*/}

                    {/* Browsers */}
                    <div className="row-span-3 bg-white rounded-lg">
                    <div className="flex items-center justify-between px-6 py-5 font-semibold border-b border-gray-100">
                        <span>Browsers</span>
                    </div>
                    <div className="overflow-y-auto max-h-[24rem]">
                        <ul className="p-6 space-y-6">
                            <li className="flex items-center">
                                <span className="text-gray-600">Soon</span>
                                <span className="ml-auto font-semibold">0</span>
                            </li>
                        </ul>
                    </div>
                    </div>
                    {/* End - Browsers */}

                    {/* User Devices */}
                    <div className="flex flex-col row-span-3 bg-white rounded-lg">
                        <div className="px-6 py-5 font-semibold border-b border-gray-100">Device</div>
                        <div className="p-4 flex-grow">
                            <GetDevicePieGraph user_id={user?.id ? user?.id : ''} days={Days} />
                        </div>
                    </div>
                    {/* End - User Devices */}
                </section>
                
                {/* <section className="text-right font-semibold text-gray-500"></section> */}

                </main>
            </div>
        </>
    );
};

export default SetUser;
