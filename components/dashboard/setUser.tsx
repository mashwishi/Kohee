import type { NextPage } from "next";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import { Chart, registerables } from 'chart.js';
import { Chart as ReactChartJs } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';

Chart.register(...registerables);


import { useUser } from "@clerk/nextjs";

import Link from "next/link";
import Script from "next/script";

import dynamic from 'next/dynamic';
const Adsense_Dashboard = dynamic(() => import('../google/Adsense_Dashboard'), {ssr: false});

import useAnalyticsEventTracker from "../global/useAnalyticsEventTracker";

import LoadingGraph from "../global/LoadingGraph";
import LoadingText from "../global/LoadingText";

import NumberFormatter from "../global/NumberFormatter";

import ReactGA from 'react-ga'
import moment from "moment";
import useClipboard from "react-use-clipboard";

interface OptionsDays {
    value: number;
    label: string;
} 

const optionsDays: OptionsDays[] = [
    { value: 1, label: 'Today' },
    { value: 7, label: '7 Days ago' },
    { value: 30, label: '30 Days ago' },
];

const country_options = {
    scales: {
      yAxes: [
        {
          type: 'linear',
          position: 'left',
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
};

const SetUser: NextPage = () => {

    const { user } = useUser();

    const gaEventTracker = useAnalyticsEventTracker('Dashboard');
    ReactGA.pageview('Dashboard')

    const [Days, setDate] = useState(1);

    const [error, setError] = useState<any | null>(null);
    const [isLoading, setLoading] = useState(true);

    const [processedDeviceData, setProcessedDeviceData] = useState<any | null>(null);
    const [processedBrowserData, setProcessedBrowserData] = useState<any | null>(null);
    const [processedCountryData, setProcessedCountryData] = useState<any | null>(null);

    const [followData, setFollowData] = useState(0)
    const [unfollowData, setUnFollowData] = useState(0)
    const [followStatus, setfollowStatus] = useState('normal')
    const [followStatusAmount, setfollowStatusAmount] = useState(0)

    const [visitData, setVisitData] = useState(0)
    const [shareData, setShareData] = useState(0)
    const [clickData, setClickData] = useState(0)

    const [topCountry, setTopCountry] = useState('')
    const [topBrowser, setTopBrowser] = useState('')
    const [topDevice, setTopDevice] = useState('')
        
    const [isCopied, setCopied] = useClipboard(`${process.env.NEXT_PUBLIC_HOSTNAME}/${user?.username ? user?.username : ''}`)

    //Anti-double run
    const effectRan = useRef(false)

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }


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

            //Browsers List
            const browsers_counts = await analytics.reduce((counts: { [x: string]: any; }, item: { browser: string | number; }) => {
                counts[item.browser] = (counts[item.browser] || 0) + 1;
                return counts;
            }, {})
            const newBrowserFormat = Object.entries(browsers_counts).map(([name, count]) => ({ name, count }));
            setProcessedBrowserData(newBrowserFormat)
            //End - Browsers List

            //Tops Country
            const countryFrequency = analytics.filter((item: { country: string; }) => item.country !== 'x')
            .map((item: { country: any; }) => item.country)
            .reduce((counts: { [x: string]: any; }, country: string | number) => {
                counts[country] = (counts[country] || 0) + 1;
                return counts;
            }, {});
            const topCountry =  Object.keys(countryFrequency)?.length >  0 ? Object.keys(countryFrequency).reduce((a, b) => countryFrequency[a] > countryFrequency[b] ? a : b) : 'N/A';
            setTopCountry(topCountry);
            //End - Tops Country

            //Tops Device
            const deviceFrequency = analytics.filter((item: { device: string; }) => item.device !== 'x')
            .map((item: { device: any; }) => item.device)
            .reduce((counts: { [x: string]: any; }, device: string | number) => {
                counts[device] = (counts[device] || 0) + 1;
                return counts;
            }, {});
            const topDevice = Object.keys(deviceFrequency)?.length > 0 ?  Object.keys(deviceFrequency).reduce((a, b) => deviceFrequency[a] > deviceFrequency[b] ? a : b) : 'N/A';
            setTopDevice(topDevice);
            //End - Tops Device

            //Tops Browser
            const browserFrequency = analytics.filter((item: { browser: string; }) => item.browser !== 'x')
            .map((item: { browser: any; }) => item.browser)
            .reduce((counts: { [x: string]: any; }, browser: string | number) => {
                counts[browser] = (counts[browser] || 0) + 1;
                return counts;
            }, {});
            const topBrowser = Object.keys(browserFrequency)?.length > 0 ? Object.keys(browserFrequency).reduce((a, b) => browserFrequency[a] > browserFrequency[b] ? a : b) : 'N/A';
            setTopBrowser(topBrowser);
            //End - Tops Browser

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

            //Country Line Graph
            const processedData = analytics.map((item: { created_at: string | number | Date; country: null; }) => {
            return {
                date: moment(item.created_at).format('YYYY-MM-DD'),
                country: item.country === null ? "Unknown" : item.country,
                visits: 1
            }
            });
        
            const groupedData = processedData.reduce((acc: { [x: string]: { [x: string]: any; }; }, curr: { country: string | number; date: string | number; visits: any; }) => {
            acc[curr.country] = acc[curr.country] || {};
            acc[curr.country][curr.date] = (acc[curr.country][curr.date] || 0) + curr.visits;
            return acc;
            }, {});

            const datasets = Object.keys(groupedData).map((country) => {
                return {
                label: country === 'null' ? 'Unknown' : country,
                data: Object.values(groupedData[country]),
                borderColor: getRandomColor(),
                //backgroundColor: getRandomColor(),
                pointRadius: 5,
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                borderWidth: 1,
                }
            });
        
            setProcessedCountryData({
                labels: Object.keys(groupedData)?.length > 0 ? Object.keys(groupedData[Object.keys(groupedData)[0]]).map((label) => label === 'null' ? 'Unknown' : label) : {},
                datasets: datasets,
            });
            //End - Country Line Graph
            
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
                                Profile
                            </a>

                            <Link href="/user?tab=links">
                                <div className="inline-flex px-4 py-3 bg-primary hover:bg-secondary rounded-md ml-1 mb-3">
                                    <svg aria-hidden="true" fill="none" viewBox="0 0 16 16" stroke="currentColor" className="flex-shrink-0 h-5 w-5 -ml-1 mt-0.5 mr-2">
                                        <path d="M8.5 6a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V10a.5.5 0 0 0 1 0V8.5H10a.5.5 0 0 0 0-1H8.5V6z"/>
                                        <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z"/>
                                    </svg>
                                    Links
                                </div>
                            </Link>

                            <div onClick={setCopied} className="inline-flex px-4 py-3 bg-primary hover:bg-secondary rounded-md ml-1 mb-3">
                                {
                                    isCopied ?
                                    <>
                                        <div className="tooltip-primary tooltip hover:tooltip-open tooltip-copied" data-tip="Copied">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#54361D" className="bi bi-clipboard-check-fill" viewBox="0 0 16 16">
                                                <path d="M6.5 0A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3Zm3 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3Z"/>
                                                <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1A2.5 2.5 0 0 1 9.5 5h-3A2.5 2.5 0 0 1 4 2.5v-1Zm6.854 7.354-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708.708Z"/>
                                            </svg>
                                        </div>
                                    </>
                                    :
                                    <>
                                        <div className="tooltip-primary tooltip hover:tooltip-open tooltip-copy" data-tip="Copy">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#1E2933" className="bi bi-clipboard-fill" viewBox="0 0 16 16">
                                                <path  d="M10 1.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-1Zm-5 0A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5v1A1.5 1.5 0 0 1 9.5 4h-3A1.5 1.5 0 0 1 5 2.5v-1Zm-2 0h1v1A2.5 2.5 0 0 0 6.5 5h3A2.5 2.5 0 0 0 12 2.5v-1h1a2 2 0 0 1 2 2V14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3.5a2 2 0 0 1 2-2Z"/>
                                            </svg>
                                        </div>
                                    </>
                                }
                            </div>

                            {/* /user?tab=links */}
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
                        <><span className="block text-2xl font-bold"><NumberFormatter input_number={visitData}/></span></>
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
                        <><span className="block text-2xl font-bold"><NumberFormatter input_number={shareData}/></span></>
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
                        <><span className="block text-2xl font-bold"><NumberFormatter input_number={shareData}/></span></>
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
                            <span className="inline-block text-2xl font-bold mr-1"><NumberFormatter input_number={followData}/></span>
                            <span className={`inline-block text-x font-semibold ${followStatus == 'normal' ? `text-gray-500` : followStatus == 'negative' ? `text-red-500` : followStatus == 'positive' ? `text-green-500` : `text-gray-500`}`}>
                            { followStatusAmount == 0 ? `` : followStatusAmount < 0 ? `(${<NumberFormatter input_number={followStatusAmount}/>} loss)` :  followStatusAmount > 0 ? `(${<NumberFormatter input_number={followStatusAmount}/>} gain)` : `` }
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
                            <div className="flex items-center justify-center h-[400px] w-[100%] px-1 py-4 text-gray-400 text-3xl font-semibold bg-gray-100 border-2 border-gray-200 border-dashed rounded-md">
                            
                            { 
                            isLoading ? <LoadingGraph/> : 
                            <>
                                {
                                    processedCountryData?.labels?.length > 0 ? <Line data={processedCountryData}/> : <> No Aavaialble Data </>
                                }  
                            </>
                            }

                            </div>
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
                    <div className="w-auto max-h-[24rem]">
                        <ul className="">
                            <li className="flex items-center">
                                <div className="flex items-center p-4 bg-white rounded-lg">
                                    <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-yellow-600 bg-yellow-100 rounded-full mr-6">
                                        <svg aria-hidden="true" fill="none" viewBox="0 0 16 16" stroke="currentColor" className="h-6 w-6">
                                            <path d="m10.495 6.92 1.278-.619a.483.483 0 0 0 .126-.782c-.252-.244-.682-.139-.932.107-.23.226-.513.373-.816.53l-.102.054c-.338.178-.264.626.1.736a.476.476 0 0 0 .346-.027ZM7.741 9.808V9.78a.413.413 0 1 1 .783.183l-.22.443a.602.602 0 0 1-.12.167l-.193.185a.36.36 0 1 1-.5-.516l.112-.108a.453.453 0 0 0 .138-.326ZM5.672 12.5l.482.233A.386.386 0 1 0 6.32 12h-.416a.702.702 0 0 1-.419-.139l-.277-.206a.302.302 0 1 0-.298.52l.761.325Z"/>
                                            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0ZM1.612 10.867l.756-1.288a1 1 0 0 1 1.545-.225l1.074 1.005a.986.986 0 0 0 1.36-.011l.038-.037a.882.882 0 0 0 .26-.755c-.075-.548.37-1.033.92-1.099.728-.086 1.587-.324 1.728-.957.086-.386-.114-.83-.361-1.2-.207-.312 0-.8.374-.8.123 0 .24-.055.318-.15l.393-.474c.196-.237.491-.368.797-.403.554-.064 1.407-.277 1.583-.973.098-.391-.192-.634-.484-.88-.254-.212-.51-.426-.515-.741a6.998 6.998 0 0 1 3.425 7.692 1.015 1.015 0 0 0-.087-.063l-.316-.204a1 1 0 0 0-.977-.06l-.169.082a1 1 0 0 1-.741.051l-1.021-.329A1 1 0 0 0 11.205 9h-.165a1 1 0 0 0-.945.674l-.172.499a1 1 0 0 1-.404.514l-.802.518a1 1 0 0 0-.458.84v.455a1 1 0 0 0 1 1h.257a1 1 0 0 1 .542.16l.762.49a.998.998 0 0 0 .283.126 7.001 7.001 0 0 1-9.49-3.409Z"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <span className="block text-2xl font-bold">
                                        { isLoading ? <LoadingText/> : topCountry === 'null' ? 'Unknown' : topCountry}
                                        </span>
                                        <span className="block text-gray-500">Top Country</span>
                                    </div>
                                </div>
                            </li>
                            <li className="flex items-center">
                                <div className="flex items-center p-4 bg-white rounded-lg">
                                    <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-teal-600 bg-teal-100 rounded-full mr-6">
                                        <svg  aria-hidden="true" fill="none" viewBox="0 0 16 16" stroke="currentColor" className="h-6 w-6">
                                            <path d="M11 2a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3h6zM5 1a4 4 0 0 0-4 4v6a4 4 0 0 0 4 4h6a4 4 0 0 0 4-4V5a4 4 0 0 0-4-4H5z"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <span className="block text-2xl font-bold">
                                        { isLoading ? <LoadingText/> : topBrowser === 'null' ? 'Unknown' : topBrowser}
                                        </span>
                                        <span className="block text-gray-500">Top Browser</span>
                                    </div>
                                </div>
                            </li>
                            <li className="flex items-center">
                                <div className="flex items-center p-4 bg-white rounded-lg">
                                    <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600 bg-blue-100 rounded-full mr-6">
                                        { isLoading ?
                                        <>
                                            <svg aria-hidden="true" fill="none" viewBox="0 0 16 16" stroke="currentColor" className="h-6 w-6">
                                                <path d="M5 0a.5.5 0 0 1 .5.5V2h1V.5a.5.5 0 0 1 1 0V2h1V.5a.5.5 0 0 1 1 0V2h1V.5a.5.5 0 0 1 1 0V2A2.5 2.5 0 0 1 14 4.5h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14a2.5 2.5 0 0 1-2.5 2.5v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14A2.5 2.5 0 0 1 2 11.5H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2A2.5 2.5 0 0 1 4.5 2V.5A.5.5 0 0 1 5 0zm-.5 3A1.5 1.5 0 0 0 3 4.5v7A1.5 1.5 0 0 0 4.5 13h7a1.5 1.5 0 0 0 1.5-1.5v-7A1.5 1.5 0 0 0 11.5 3h-7zM5 6.5A1.5 1.5 0 0 1 6.5 5h3A1.5 1.5 0 0 1 11 6.5v3A1.5 1.5 0 0 1 9.5 11h-3A1.5 1.5 0 0 1 5 9.5v-3zM6.5 6a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z"/>
                                            </svg>
                                        </>
                                        :
                                            topDevice === 'null' ? 
                                                <>
                                                    <svg aria-hidden="true" fill="none" viewBox="0 0 16 16" stroke="currentColor" className="h-6 w-6">
                                                        <path d="M5 0a.5.5 0 0 1 .5.5V2h1V.5a.5.5 0 0 1 1 0V2h1V.5a.5.5 0 0 1 1 0V2h1V.5a.5.5 0 0 1 1 0V2A2.5 2.5 0 0 1 14 4.5h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14a2.5 2.5 0 0 1-2.5 2.5v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14A2.5 2.5 0 0 1 2 11.5H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2A2.5 2.5 0 0 1 4.5 2V.5A.5.5 0 0 1 5 0zm-.5 3A1.5 1.5 0 0 0 3 4.5v7A1.5 1.5 0 0 0 4.5 13h7a1.5 1.5 0 0 0 1.5-1.5v-7A1.5 1.5 0 0 0 11.5 3h-7zM5 6.5A1.5 1.5 0 0 1 6.5 5h3A1.5 1.5 0 0 1 11 6.5v3A1.5 1.5 0 0 1 9.5 11h-3A1.5 1.5 0 0 1 5 9.5v-3zM6.5 6a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z"/>
                                                    </svg>
                                                </>
                                            :
                                                topDevice === 'Desktop' ? 
                                                    <>
                                                        <svg aria-hidden="true" fill="none" viewBox="0 0 16 16" stroke="currentColor" className="h-6 w-6">
                                                            <path d="M0 4s0-2 2-2h12s2 0 2 2v6s0 2-2 2h-4c0 .667.083 1.167.25 1.5H11a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1h.75c.167-.333.25-.833.25-1.5H2s-2 0-2-2V4zm1.398-.855a.758.758 0 0 0-.254.302A1.46 1.46 0 0 0 1 4.01V10c0 .325.078.502.145.602.07.105.17.188.302.254a1.464 1.464 0 0 0 .538.143L2.01 11H14c.325 0 .502-.078.602-.145a.758.758 0 0 0 .254-.302 1.464 1.464 0 0 0 .143-.538L15 9.99V4c0-.325-.078-.502-.145-.602a.757.757 0 0 0-.302-.254A1.46 1.46 0 0 0 13.99 3H2c-.325 0-.502.078-.602.145z"/>
                                                        </svg>
                                                    </>
                                                    :
                                                        topDevice === 'Mobile' ? 
                                                            <>
                                                                <svg aria-hidden="true" fill="none" viewBox="0 0 16 16" stroke="currentColor" className="h-6 w-6">
                                                                    <path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h6zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H5z"/>
                                                                    <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                                                                </svg>
                                                            </>
                                                            :
                                                            <>
                                                                <svg aria-hidden="true" fill="none" viewBox="0 0 16 16" stroke="currentColor" className="h-6 w-6">
                                                                <path d="M5 0a.5.5 0 0 1 .5.5V2h1V.5a.5.5 0 0 1 1 0V2h1V.5a.5.5 0 0 1 1 0V2h1V.5a.5.5 0 0 1 1 0V2A2.5 2.5 0 0 1 14 4.5h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14a2.5 2.5 0 0 1-2.5 2.5v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14A2.5 2.5 0 0 1 2 11.5H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2A2.5 2.5 0 0 1 4.5 2V.5A.5.5 0 0 1 5 0zm-.5 3A1.5 1.5 0 0 0 3 4.5v7A1.5 1.5 0 0 0 4.5 13h7a1.5 1.5 0 0 0 1.5-1.5v-7A1.5 1.5 0 0 0 11.5 3h-7zM5 6.5A1.5 1.5 0 0 1 6.5 5h3A1.5 1.5 0 0 1 11 6.5v3A1.5 1.5 0 0 1 9.5 11h-3A1.5 1.5 0 0 1 5 9.5v-3zM6.5 6a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z"/>
                                                                </svg>
                                                            </>
                                        }
                                    </div>
                                    <div>
                                        <span className="block text-2xl font-bold">
                                        { isLoading ? <LoadingText/> : topDevice === 'null' ? 'Unknown' : topDevice}
                                        </span>
                                        <span className="block text-gray-500">Top Device</span>
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
                                        (processedBrowserData as any[]).sort((a, b) => b.count - a.count).map((i) => {
                                            return (
                                                <>
                                                    <li className="flex items-center">
                                                        <span className="text-gray-600">{i.name === 'null' ? 'Unknown' : i.name}</span>
                                                        <span className="ml-auto font-semibold"><NumberFormatter input_number={i.count}/></span>
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
                                        <div className="flex items-center justify-center h-full  w-[100%] px-4 py-4 text-gray-400 text-3xl font-semibold bg-gray-100 border-2 border-gray-200 border-dashed rounded-md">
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
