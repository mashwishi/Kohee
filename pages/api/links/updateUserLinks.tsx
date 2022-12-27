/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async (req: NextApiRequest, res: NextApiResponse) => {

    const { data } = req.body;

    const updateUserLinks_api_url = `${process.env.NEXT_PUBLIC_HASURA_REST_API}/link/update`

    const headers = 
    {
    "Content-Type": "application/json",
    "x-hasura-admin-secret": `${process.env.HASURA_ADMIN_SECRET}`
    };

    try {
    await axios.put(updateUserLinks_api_url, {
        id: data.id,
        type: `${data.type}`, 
        url: `${data.url}`, 
        color_text: `${data.color_text}`, 
        color_button: `${data.color_button}`, 
        button_text: `${data.button_text}`, 
    },{headers: headers})
    .then(response => {
        res.json(
        response.status == 200 ? 
        {
            status: 200,
            data: response.data,
            message: 'Successfully updated the data!'
        } : 
        {
            status: 0,
            message: 'Failed, Something went wrong!'
        }
        );
    });
    } catch (e) {
        res.status(400).json({ error: (e as Error).message });
    }

};