/* eslint-disable @next/next/no-page-custom-font */
import React, { useState, useEffect, useRef } from 'react';

import LoadingText from '../global/LoadingText';

type GetFollowerStats = {
    user_id: string;
    days: number;
};

const GetFollowerStats = (props: GetFollowerStats) => {

    const [followData, setFollowData] = useState(0)
    const [unfollowData, setUnFollowData] = useState(0)

    const [followStatus, setfollowStatus] = useState('normal')
    const [followStatusAmount, setfollowStatusAmount] = useState(0)

    const [error, setError] = useState<any | null>(null);
    const [isLoading, setLoading] = useState(true);

    //Anti-double run
    const effectRan = useRef(false)

    const date = new Date();
    const daysAgo = new Date(date.getTime() - (props.days*24*60*60*1000));

    async function fetchFollowData() {
        const fetchData = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({   
                data:{
                    user_id: `${props.user_id}`,
                    type: `follow`,
                    to: date.toISOString(),
                    from: daysAgo.toISOString(),
                } 
            })
        };

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/analytics/getAnalyticsByDateAndType`, fetchData);
            const response_data = await response.json();
            console.log()
            setFollowData(response_data?.data?.length)
        } catch (error) {
            setError(error)
            console.error(error)
        }
    }

    async function fetchUnFollowData() {
        const fetchData = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({   
                data:{
                    user_id: `${props.user_id}`,
                    type: `unfollow`,
                    to: date.toISOString(),
                    from: daysAgo.toISOString(),
                } 
            })
        };

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/analytics/getAnalyticsByDateAndType`, fetchData);
            const response_data = await response.json();
            setUnFollowData(response_data?.data?.length)
        } catch (error) {
            setError(error)
            console.error(error)
        }
    }

    useEffect(() => {
        
    setLoading(true)

    fetchUnFollowData()
    fetchFollowData()

    if(effectRan.current === false){
    }
    return () => {
        effectRan.current = true
    }
    
    }, [props.user_id, props.days]);

    useEffect(() => {

        if(followData !== undefined && unfollowData !== undefined){

            setfollowStatusAmount(followData - unfollowData)

            if((followData - unfollowData) == 0){
                setfollowStatus('normal')
            }
            if((followData - unfollowData) < 0){
                setfollowStatus('negative')
            }
            if((followData - unfollowData) > 0){
                setfollowStatus('positive')
            }

            setLoading(false)
        }
        
        }, [followData, unfollowData, props.user_id, props.days]);

    if (isLoading) { return <LoadingText/>; } 
    if (error) { return <p>Error</p>;}

    return (
        <>
            <span className="inline-block text-2xl font-bold mr-1">{followData}</span>
            <span className={`inline-block text-x font-semibold ${followStatus == 'normal' ? `text-gray-500` : followStatus == 'negative' ? `text-red-500` : followStatus == 'positive' ? `text-green-500` : `text-gray-500`}`}>
             { followStatusAmount == 0 ? `(${followStatusAmount} none)` : followStatusAmount < 0 ? `(${followStatusAmount} loss)` :  followStatusAmount > 0 ? `(${followStatusAmount} gain)` : `(${followStatusAmount} none)` }
            </span>
        </>
    );
};

export default GetFollowerStats;
