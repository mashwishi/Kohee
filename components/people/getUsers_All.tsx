/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { useState, useEffect } from 'react'
import Link from "next/link";

type GetUser_All = {
    username: string;
    profile_image_url: string;
    first_name: string;
    last_name: string;
    bio: string;
    created_at: string;
};

const GetUser_All = (props: GetUser_All) => {

    const [userFullname, setuserFullname] = useState(props.last_name ?  `${props.first_name} ${props.last_name}` : `${props.first_name}`);

    return (
        <>
        <Link href={process.env.NEXT_PUBLIC_HOSTNAME+`/`+props.username}>
            <div className="mx-2 my-2 p-4 lg:w-1/6 md:w-1/3 cursor-pointer rounded-lg bg-gray-200 transition duration-300 ease-in-out transform hover:scale-105 hover:bg-primary hover:shadow-xl">
                <div className="h-full flex flex-col items-center text-center">
                <img alt={props.username} className="flex-shrink-0 rounded-lg h-24 w-24 object-cover object-center mb-4" src={props.profile_image_url} />
                <div className="w-32">
                    <h2 className="title-font font-medium text-lg text-gray-900 truncate block">@{props.username}</h2>
                    <h3 className="text-gray-500 mb-3  truncate block">{userFullname}</h3>
                    <p className="mb-4">{props.bio}</p>
                    {/* <span className="inline-flex">
                    </span> */}
                </div>
                </div>
            </div>
        </Link>
        </>
    );

};

export default GetUser_All;
