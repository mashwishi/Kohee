/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async (req: NextApiRequest, res: NextApiResponse) => {

    const { type, data, object } = req.body;

    const getFollowing_api_url = `${process.env.NEXT_PUBLIC_HASURA_REST_API}/following/get`

    const headers = 
    {
    "Content-Type": "application/json",
    "x-hasura-admin-secret": `${process.env.HASURA_ADMIN_SECRET}`
    };

    try {
    await axios.get(getFollowing_api_url,  { data: { user_id: `${data.user_id}` }, headers: headers }) 
    .then(response => {
        res.json(
        response.status == 200 ? 
        {
            data: response.data,
            message: 'Successfully got the data!'
        } : 
        {
            message: 'Failed, Something went wrong!'
        }
        );
    });
    } catch (e) {
        res.status(400).json({ error: (e as Error).message });
    }

};