/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

import Cookies from "cookies";

export default async (req: NextApiRequest, res: NextApiResponse) => {

    const { data } = req.body;

    const createAnalytics_api_url = `${process.env.NEXT_PUBLIC_HASURA_REST_API}/analytics/create`

    const headers = 
    {
    "Content-Type": "application/json",
    "x-hasura-admin-secret": `${process.env.HASURA_ADMIN_SECRET}`
    };

    const cookies = new Cookies(req, res);
    const clientUAT = cookies.get('__client_uat') || '';
    if (!clientUAT) {
        //If Session does not exists
        res.status(403).json({ error: 'Forbidden' });
        return;
    }
    

    try {
    await axios.post(createAnalytics_api_url, {
        object: {
            user_id: data.user_id, 
            visitor_id: data.visitor_id ? data.visitor_id  : null, 
            type: data.type, 
            os: data.os, 
            device: data.device, 
            country: data.country, 
            browser: data.browser, 
            country_code: data.country_code, 
            latitude: data.latitude, 
            longitude: data.longitude, 
        }
    },{headers: headers})
    .then(response => {
        res.json(
        response.status == 200 ? 
        {
            status: 200,
            data: response.data,
            message: 'Successfully created the data!'
        } : 
        {
            status: 0,
            message: 'Failed, Something went wrong!'
        }
        );
    });
    } catch (e) {
        console.log((e as Error).message)
        res.status(400).json({ error: (e as Error).message });
    }

};