/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

import Cookies from "cookies";
import jwt from 'jsonwebtoken';

export default async (req: NextApiRequest, res: NextApiResponse) => {

    const { data } = req.body;

    const update_api_url = `${process.env.NEXT_PUBLIC_HASURA_REST_API}/user/bio`

    const headers = 
    {
    "Content-Type": "application/json",
    "x-hasura-admin-secret": `${process.env.HASURA_ADMIN_SECRET}`
    };

    const jwt_key = process.env.CLERK_JWT_KEY;
    const splitPem = jwt_key?.match(/.{1,64}/g);
    const publicKey =
    '-----BEGIN PUBLIC KEY-----\n' +
    splitPem?.join('\n') +
    '\n-----END PUBLIC KEY-----';

    const cookies = new Cookies(req, res);
    const sessToken = cookies.get('__session') || '';
    if (!sessToken) {
        //If Session does not exists
        res.status(401).json({ error: 'Not signed in' });
        return;
    }

    try {
        var decoded = jwt.verify(sessToken, publicKey);
    } catch (error) {
        //If signed JWT is invalid
        res.status(403).json({ error: 'Forbidden' });
        return;
    } 

    //Run here if successfully decoded
    //res.status(200).json({ sessToken: decoded });

    try {
    await axios.put(update_api_url, {
        id: `${data.user_id}`,
        bio: `${data.bio}`,
    },{headers: headers})
    .then(response => {
        res.json(
        response.status == 200 ? 
        {
            data:{
                id: `${response.data.update_users.returning[0].id}`,
                bio: `${response.data.update_users.returning[0].bio}`,
            },
            message: 'Successfully update the bio in data!'
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