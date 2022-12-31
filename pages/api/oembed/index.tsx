/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async (req: NextApiRequest, res: NextApiResponse) => {

  const { username, profile_image_url } = req.query;

    const json = {
      version: `${Date.now()}`,
      type: 'photo',
      width: 500,
      height: 500,
      title: `${username ? username : `Kohee`}`,
      url: `${
        profile_image_url ? profile_image_url : `https://kohee.app/bean.png`
      }`,
      author_name: `${username}`,
      author_url: `${process.env.NEXT_PUBLIC_HOSTNAME}/${
        username ? username : ''
      }`,
      provider_name: 'kohee',
      provider_url: process.env.NEXT_PUBLIC_HOSTNAME,
    };
  
    const datastring = JSON.stringify(json);

    res.setHeader('Content-Type', 'text/html');
    res.send(datastring);

};