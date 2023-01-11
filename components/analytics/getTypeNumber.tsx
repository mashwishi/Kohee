/* eslint-disable @next/next/no-page-custom-font */
import React, { useState, useEffect, useRef } from 'react';

import LoadingText from '../global/LoadingText';

type GetTypeNumber = {
    user_id: string;
    type: string;
    days: number;
};

const GetTypeNumber = (props: GetTypeNumber) => {

    const [data, setData] = useState<any | null>(null);
    const [error, setError] = useState<any | null>(null);
    const [isLoading, setLoading] = useState(true);

    //Anti-double run
    const effectRan = useRef(false)

    const date = new Date();
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
                    type: `${props.type}`,
                    to: date.toISOString(),
                    from: daysAgo.toISOString(),
                } 
            })
        };

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/analytics/getAnalyticsByDateAndType`, fetchData);
            const response_data = await response.json();

            setData(response_data.data)

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
        //
    }
    return () => {
        effectRan.current = true
    }
    
    }, [props.user_id, props.type, props.days]);

    if (isLoading) { return <LoadingText/>; } 
    if (error) { return <p>Error</p>;}

    return (
        <>
            {data.length}
        </>
    );
};

export default GetTypeNumber;
