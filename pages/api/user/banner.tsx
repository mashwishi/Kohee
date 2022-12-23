/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async (req: NextApiRequest, res: NextApiResponse) => {

    const { data } = req.body;

    const update_api_url = `${process.env.NEXT_PUBLIC_HASURA_REST_API}/user/update`

    const headers = 
    {
    "Content-Type": "application/json",
    "x-hasura-admin-secret": `${process.env.HASURA_ADMIN_SECRET}`
    };

    try {
    await axios.put(update_api_url, {
        id: `${data.user_id}`,
        first_name: `${data.first_name}`,
        last_name: `${data.last_name}`,
        username: `${data.username}`,
        profile_image_url: `${data.profile_image_url}`,
        updated_at: `${data.updated_at}`,
        created_at: `${data.created_at}`,
        bio: `${data.bio}`,
        banner: `${data.banner}`,
    },{headers: headers})
    .then(response => {
        res.json(
        response.status == 200 ? 
        {
            data:{
                id: `${response.data.update_users.returning[0].id}`,
                updated_at: `${response.data.update_users.returning[0].updated_at}`,
                banner: `${response.data.update_users.returning[0].banner}`,
            },
            message: 'Successfully update the banner in data!'
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