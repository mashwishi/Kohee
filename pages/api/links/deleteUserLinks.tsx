/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async (req: NextApiRequest, res: NextApiResponse) => {

    const { data } = req.body;

    const deleteUserLinks_api_url = `${process.env.NEXT_PUBLIC_HASURA_REST_API}/link/delete`

    const headers = 
    {
    "Content-Type": "application/json",
    "x-hasura-admin-secret": `${process.env.HASURA_ADMIN_SECRET}`
    };

    try {
    await axios.delete(deleteUserLinks_api_url,  { data: { id: data.id }, headers: headers }) 
    .then(response => {
        res.json(
        response.status == 200 ? 
        {
            data: response.data,
            message: 'Successfully deleted the data!'
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