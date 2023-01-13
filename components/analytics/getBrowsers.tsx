/* eslint-disable @next/next/no-page-custom-font */
import React, { useState, useEffect, useRef } from 'react';

import LoadingText from '../global/LoadingText';

type GetBrowsers = {
    user_id: string;
    days: number;
};


const GetBrowsers = (props: GetBrowsers) => {

    const [error, setError] = useState<any | null>(null);
    const [isLoading, setLoading] = useState(true);

    const [processedData, setProcessedData] = useState<any | null>(null);

    //Anti-double run
    const effectRan = useRef(false)

    //Get day today
    const date = new Date();
    //This can be 1, 7, 30
    const daysAgo = new Date(date.getTime() - (props.days*24*60*60*1000));

    async function fetchData() {
        const fetchData = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({   
                data:{
                    user_id: `${props.user_id}`,
                    to: date.toISOString(),
                    from: daysAgo.toISOString(),
                } 
            })
        };

        try {

            const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/analytics/getAnalyticsByDateNoType`, fetchData);
            const response_data = await response.json();
            
            //Select the nested array/object inside the response
            const analytics = await response_data.data.users[0].analytics;

            //Count the same value in browser Column of analytics
            const browsers_counts = await analytics.reduce((counts: { [x: string]: any; }, item: { browser: string | number; }) => {
                counts[item.browser] = (counts[item.browser] || 0) + 1;
                return counts;
            }, {})

            const newBrowserFormat = Object.entries(browsers_counts).map(([name, count]) => ({ name, count }));

            setProcessedData(newBrowserFormat)

            //After process turn off the loading
            setLoading(false)

        } catch (error) {
            setError(error)
            console.error(error)
        }
    }

    useEffect(() => {
        setLoading(true)
        fetchData();
        if(effectRan.current === false){
            
        }
        return () => {
            effectRan.current = true
        }
    }, [props.user_id, props.days]);

    if (isLoading) { return (<LoadingText/>);} 
    if (error) { 
        <>
            <div className="flex items-center justify-center h-full px-4 py-24 text-gray-400 text-3xl font-semibold bg-gray-100 border-2 border-gray-200 border-dashed rounded-md">
                Error
            </div>
        </>
    }

    return (
        <>
            {
                processedData?.length > 0 ?
                <>
                    {
                        (processedData as any[]).map((i) => {
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
        </>
    );
};

export default GetBrowsers;
