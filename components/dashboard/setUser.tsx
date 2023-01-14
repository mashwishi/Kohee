import type { NextPage } from "next";
import React, { useState, useEffect, useRef } from "react";
import { Chart, registerables } from 'chart.js';
import { Chart as ReactChartJs } from 'react-chartjs-2';

import { useUser } from "@clerk/nextjs";

import Link from "next/link";
import Script from "next/script";

import dynamic from 'next/dynamic';
const Adsense_Dashboard = dynamic(() => import('../google/Adsense_Dashboard'), {ssr: false});

import useAnalyticsEventTracker from "../global/useAnalyticsEventTracker";

import LoadingGraph from "../global/LoadingGraph";
import LoadingText from "../global/LoadingText";

import ReactGA from 'react-ga'

interface OptionsDays {
    value: number;
    label: string;
} 

const optionsDays: OptionsDays[] = [
    { value: 1, label: 'Today' },
    { value: 7, label: '7 Days ago' },
    { value: 30, label: '30 Days ago' },
];

Chart.register(...registerables);

const SetUser: NextPage = () => {

    const { user } = useUser();
    const gaEventTracker = useAnalyticsEventTracker('Dashboard');
    ReactGA.pageview('Dashboard')

    const [Days, setDate] = useState(1);

    const [error, setError] = useState<any | null>(null);
    const [isLoading, setLoading] = useState(true);

    const [processedDeviceData, setProcessedDeviceData] = useState<any | null>(null);
    const [processedBrowserData, setProcessedBrowserData] = useState<any | null>(null);

    const [followData, setFollowData] = useState(0)
    const [unfollowData, setUnFollowData] = useState(0)
    const [followStatus, setfollowStatus] = useState('normal')
    const [followStatusAmount, setfollowStatusAmount] = useState(0)

    const [visitData, setVisitData] = useState(0)
    const [shareData, setShareData] = useState(0)
    const [clickData, setClickData] = useState(0)

    //Anti-double run
    const effectRan = useRef(false)

    async function fetchData(NumberOfDays: number) {

        //Get day today
        const date = new Date();
        //This can be 1, 7, 30
        const daysAgo = new Date(date.getTime() - (NumberOfDays*24*60*60*1000));

        const fetchData = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({   
                data:{
                    user_id: `${user?.id}`,
                    to: date.toISOString(),
                    from: daysAgo.toISOString(),
                } 
            })
        };

        try {

            setLoading(true)

            const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/analytics/getAnalyticsByDateNoType`, fetchData);
            const response_data = await response.json();
            
            //Entire Selected Analytics
            const analytics = await response_data.data.users[0].analytics;
            
            //Other Stats
            const visitCount = analytics.filter((event: { type: string; }) => event.type === 'visit')?.length || 0;
            setVisitData(visitCount)

            const shareCount = analytics.filter((event: { type: string; }) => event.type === 'share')?.length || 0;
            setShareData(shareCount)
            
            const clickCount = analytics.filter((event: { type: string; }) => event.type === 'click')?.length || 0;
            setClickData(clickCount)
            //End - Other Stats

            //Follow and Unfollows Stats
            const followCount = analytics.filter((event: { type: string; }) => event.type === 'follow')?.length || 0;
            const unfollowCount = analytics.filter((event: { type: string; }) => event.type === 'unfollow')?.length || 0;

            setfollowStatusAmount(followCount - unfollowCount)
            setFollowData(followCount)
            setUnFollowData(unfollowCount)

            if((followCount - unfollowCount) == 0){
                setfollowStatus('normal')
            }
            if((followCount - unfollowCount) < 0){
                setfollowStatus('negative')
            }
            if((followCount - unfollowCount) > 0){
                setfollowStatus('positive')
            }
            //End - Follow and Unfollows Stats

            //Devices Pie Graph
            const device_counts = await analytics.reduce((counts: { [x: string]: any; }, item: { device: string | number; }) => {
                counts[item.device] = (counts[item.device] || 0) + 1;
                return counts;
            }, {})
            const device_object_count = Array(Object.keys(device_counts).length)?.length;
            const device_colors = ['#E4BF07', '#E0A82E', '#F9D72F', '#BA881C', '#F87272', '#36D399', '#3ABFF8'];
            const device_reducedColors = device_colors.slice(0, device_object_count);
            const DeviceData = {
                labels: Object.keys(device_counts).map(key => key === "null" ? "Unknown" : key),
                datasets: [
                    {
                        data: Object.values(device_counts),
                        backgroundColor: device_reducedColors,
                        hoverBackgroundColor: Array(Object.keys(device_counts).length).fill('#18182F')
                    },
                ]
            };
            setProcessedDeviceData(DeviceData)
            //End - Devices Pie Graph

            //Browsers List
            const browsers_counts = await analytics.reduce((counts: { [x: string]: any; }, item: { browser: string | number; }) => {
                counts[item.browser] = (counts[item.browser] || 0) + 1;
                return counts;
            }, {})
            const newBrowserFormat = Object.entries(browsers_counts).map(([name, count]) => ({ name, count }));
            setProcessedBrowserData(newBrowserFormat)
            //End - Browsers List
            
            //After process turn off the loading
            setLoading(false)
        } catch (error) {
            setError(error)
            console.error(error)
        }
    }

    useEffect(() => {
        if(effectRan.current === false){
            fetchData(1);
        }
        return () => {
            effectRan.current = true
        }
    }, [])

    //Change Days
    const handleChangeDays = (event: any) => {
        setDate(parseInt(event.target.value));
        fetchData(parseInt(event.target.value));
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
                        {
                        isLoading ? 
                        <LoadingText/>
                        :
                        <><span className="block text-2xl font-bold">{visitData}</span></>
                        }   
                        <span className="block text-gray-500">Visit{visitData > 1 ? `s` : ``}</span>
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
                        {
                        isLoading ? 
                        <LoadingText/>
                        :
                        <><span className="block text-2xl font-bold">{shareData}</span></>
                        }   
                        <span className="block text-gray-500">Share{shareData > 1 ? `s` : ``}</span>
                    </div>
                    </div>
                    <div className="flex items-center p-8 bg-white shadow rounded-lg">
                    <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-red-600 bg-red-100 rounded-full mr-6">
                        <svg  aria-hidden="true" fill="none" viewBox="0 0 16 16" stroke="currentColor" className="h-6 w-6">
                            <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103zM2.25 8.184l3.897 1.67a.5.5 0 0 1 .262.263l1.67 3.897L12.743 3.52 2.25 8.184z"/>
                        </svg>
                    </div>
                    <div>
                        {
                        isLoading ? 
                        <LoadingText/>
                        :
                        <><span className="block text-2xl font-bold">{shareData}</span></>
                        }   
                        <span className="block text-gray-500">Click{clickData > 1 ? `s` : ``}</span>
                    </div>
                    </div>
                    <div className="flex items-center p-8 bg-white shadow rounded-lg">
                    <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600 bg-blue-100 rounded-full mr-6">
                        <svg aria-hidden="true" fill="none" viewBox="0 0 16 16" stroke="currentColor" className="h-6 w-6">
                            <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8Zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022ZM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816ZM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"/>
                        </svg>
                    </div>
                    <div>

                        {
                        isLoading ? 
                        <LoadingText/>
                        :
                        <>
                            <span className="inline-block text-2xl font-bold mr-1">{followData}</span>
                            <span className={`inline-block text-x font-semibold ${followStatus == 'normal' ? `text-gray-500` : followStatus == 'negative' ? `text-red-500` : followStatus == 'positive' ? `text-green-500` : `text-gray-500`}`}>
                            { followStatusAmount == 0 ? `` : followStatusAmount < 0 ? `(${followStatusAmount} loss)` :  followStatusAmount > 0 ? `(${followStatusAmount} gain)` : `` }
                            </span>
                        </>
                        }
                        <span className="block text-gray-500">Follower{followData > 1 ? `s` : ``}</span>
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

                        {/* Google Ads */}
                        <div className="px-6 font-semibold border-b border-gray-100">Google Ads</div>
                        <div className="p-4 flex-grow max-w-20">
                            <div className="flex items-center justify-center h-full">      
                            <Adsense_Dashboard />
                            </div>
                        </div>
                        {/* End - Google Ads */}
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
                            {
                                isLoading ? 
                                <LoadingText/> : 
                                processedBrowserData?.length > 0 ?
                                <>
                                    {
                                        (processedBrowserData as any[]).map((i) => {
                                            return (
                                                <>
                                                    <li className="flex items-center">
                                                        <span className="text-gray-600">{i.name === 'null' ? 'Unknown' : i.name}</span>
                                                        <span className="ml-auto font-semibold">{i.count}</span>
                                                    </li>
                                                </>
                                            )
                                        })
                                    }
                                </>
                                :
                                <>
                                    <li className="flex items-center">
                                        <span className="text-gray-600">No Available Data</span>
                                    </li>
                                </>
                            }
                        </ul>
                    </div>
                    </div>
                    {/* End - Browsers */}

                    {/* User Devices */}
                    <div className="flex flex-col row-span-3 bg-white rounded-lg">
                        <div className="px-6 py-5 font-semibold border-b border-gray-100">Device</div>
                        <div className="p-4 flex-grow">
                                { isLoading ? <><div className='h-[400px] w-[350px]'><LoadingGraph/></div></> :
                                    <>
                                        <div className="flex items-center justify-center h-full px-4 py-4 text-gray-400 text-3xl font-semibold bg-gray-100 border-2 border-gray-200 border-dashed rounded-md">
                                            {
                                            processedDeviceData.datasets[0].data.length > 0 ?
                                            <ReactChartJs type="pie" data={processedDeviceData} />
                                            :
                                            <>
                                                No Aavaialble Data
                                            </>
                                            }
                                        </div>
                                    </>
                                }
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
