/* eslint-disable @next/next/no-page-custom-font */
import React, { useState, useEffect, useRef } from 'react';
import LoadingGraph from '../global/LoadingGraph';
import { Chart, registerables } from 'chart.js';
import { Chart as ReactChartJs } from 'react-chartjs-2';

type GetDevicePieGraph = {
    user_id: string;
    days: number;
};

Chart.register(...registerables);

const GetDevicePieGraph = (props: GetDevicePieGraph) => {

    const [error, setError] = useState<any | null>(null);
    const [isLoading, setLoading] = useState(true);

    const [processedChartData, setProcessedChartData] = useState<any | null>(null);

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

            //Count the same value in Device Column of analytics
            const device_counts = await analytics.reduce((counts: { [x: string]: any; }, item: { device: string | number; }) => {
                counts[item.device] = (counts[item.device] || 0) + 1;
                return counts;
            }, {})

            const object_count = Array(Object.keys(device_counts).length)?.length;
            const colors = ['#E4BF07', '#E0A82E', '#F9D72F', '#BA881C', '#F87272', '#36D399', '#3ABFF8'];
            const reducedColors = colors.slice(0, object_count);

            const processedData = {
                labels: Object.keys(device_counts).map(key => key === "null" ? "Unknown" : key),
                datasets: [
                    {
                        data: Object.values(device_counts),
                        backgroundColor: reducedColors,
                        hoverBackgroundColor: Array(Object.keys(device_counts).length).fill('#18182F')
                    },
                ]
            };

            setProcessedChartData(processedData)

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

    if (isLoading) { return <LoadingGraph/>; } 
    if (error) { 
        <>
            <div className="flex items-center justify-center h-full px-4 py-24 text-gray-400 text-3xl font-semibold bg-gray-100 border-2 border-gray-200 border-dashed rounded-md">
                Error
            </div>
        </>
    }

    return (
        <>
            <div className="flex items-center justify-center h-full px-4 py-24 text-gray-400 text-3xl font-semibold bg-gray-100 border-2 border-gray-200 border-dashed rounded-md">
                {
                    processedChartData.datasets[0].data.length > 0 ?
                    <ReactChartJs type="pie" data={processedChartData} />
                    :
                    <>
                        No Aavaialble Data
                    </>
                }
            </div>
        </>
    );
};

export default GetDevicePieGraph;
