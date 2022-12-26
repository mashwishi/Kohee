/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async (req: NextApiRequest, res: NextApiResponse) => {

    const { data } = req.body;

    const getUserLinks_api_url = `${process.env.NEXT_PUBLIC_HASURA_REST_API}/link/get`

    const headers = 
    {
    "Content-Type": "application/json",
    "x-hasura-admin-secret": `${process.env.HASURA_ADMIN_SECRET}`
    };

    try {
    await axios.get(getUserLinks_api_url,  { data: { user_id: `${data.user_id}` }, headers: headers }) 
    .then(response => {
        console.log(response.data)
        res.json(
        response.status == 200 ? 
        {
            data: response.data.links,
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