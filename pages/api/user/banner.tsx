/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

import Cookies from "cookies";
import jwt from 'jsonwebtoken';

export default async (req: NextApiRequest, res: NextApiResponse) => {

    const { data } = req.body;

    const banner_api_url = `${process.env.NEXT_PUBLIC_HASURA_REST_API}/user/banner`
    const headers_hasura = 
    {
    "Content-Type": "application/json",
    "x-hasura-admin-secret": `${process.env.HASURA_ADMIN_SECRET}`
    };

    const imgur_api = `https://api.imgur.com/3/upload`
    const headers_imgur = 
    {
    "Authorization": `Client-ID ${process.env.IMGUR_CLIENT_ID}`
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

    const updateImageData = data.banner.image.toString().replace(/^data:(.*,)?/, "");


    try{
        await axios.post('https://api.imgur.com/3/upload', {
            image: updateImageData,
            type: 'base64'
        },{headers: headers_imgur    })
        .then(async response => {
            if(response.status == 200){
                    await axios.put(banner_api_url, {
                        id: `${data.user_id}`,
                        banner: `${response.data.data.link}`,
                    },{headers: headers_hasura})
                    .then(response => {
                        res.json({
                            data:{
                                id: `${response.data.update_users.returning[0].id}`,
                                banner: `${response.data.update_users.returning[0].banner}`,
                            },
                            message: 'Successfully update the banner in data!'
                        });
                    });
            }
        })
    } catch (e) {
        console.log(`Error catch from try`)
        res.status(400).json({ error: (e as Error).message });
    }


};

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '10mb' 
        }
    }
}