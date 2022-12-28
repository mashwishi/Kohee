/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async (req: NextApiRequest, res: NextApiResponse) => {

    const { type, data, object } = req.body;

    const getupFollow_api_url = `${process.env.NEXT_PUBLIC_HASURA_REST_API}/follow/create`

    const headers = 
    {
    "Content-Type": "application/json",
    "x-hasura-admin-secret": `${process.env.HASURA_ADMIN_SECRET}`
    };
    try {
    await axios.post(getupFollow_api_url, {
        object: {
            user_id: `${data.user_id}`,
            following_user_id: `${data.following_user_id}`,
            is_follow: data.is_follow
        }
    },{headers: headers})
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