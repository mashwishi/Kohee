/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async (req: NextApiRequest, res: NextApiResponse) => {

    const { type, data, object } = req.body;

    const get_api_url = `${process.env.NEXT_PUBLIC_HASURA_REST_API}/user/get/${data.username}`

    const headers = 
    {
    "Content-Type": "application/json",
    "x-hasura-admin-secret": `${process.env.HASURA_ADMIN_SECRET}`
    };

    try {
    await axios.get(get_api_url, {headers: headers})
    .then(response => {
        res.json(
        response.status == 200 ? 
        {
            data:{
                user_id: `${response.data.users[0].id}`,
                first_name: `${response.data.users[0].first_name}`,
                last_name: `${response.data.users[0].last_name}`,
                username: `${response.data.users[0].username}`,
                profile_image_url: `${response.data.users[0].profile_image_url}`,
                updated_at: `${response.data.users[0].updated_at}`,
                created_at: `${response.data.users[0].created_at}`,
                bio: `${response.data.users[0].bio}`,
                banner: `${response.data.users[0].banner}`,
                is_verified: response.data.users[0].is_verified
            },
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