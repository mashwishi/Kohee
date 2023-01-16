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
    followers: number;
    visits: number;
    shares: number;
    is_verified: number;
};

const GetUser_All = (props: GetUser_All) => {

    const [userFullname, setuserFullname] = useState(props.last_name !== 'null' &&  props.last_name !== null ?  `${props.first_name} ${props.last_name}` : `${props.first_name}`);

    return (
        <>
            <div className="p-6">
                <div className="rounded bg-white p-4 shadow w-full border">

                    <div className="mt-4 text-center">
                        <div className="inline-flex items-center">
                            <span className="font-bold text-gray-600 mr-1">
                                <Link href={`${process.env.NEXT_PUBLIC_HOSTNAME}/${props.username}`}>
                                            {`@${props.username}`}
                                </Link>
                            </span>
                            {
                            props.is_verified ?
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#E0A82E" className="bi bi-patch-check-fill" viewBox="0 0 16 16">
                                <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z"/>
                            </svg>
                            :
                            <></>
                            }
                        </div>
                        <p className="font-hairline mt-1 text-sm text-gray-600">{userFullname}</p>
                    </div>

                    <div className="mt-4 flex justify-center">
                        {/* sm:h-28 sm:w-28 */}
                        <img className="h-28 w-28 rounded-full bg-gray-100 shadow object-cover" src={props.profile_image_url} alt={props.username} />
                    </div>

                    <div className="mt-6 flex justify-between text-center">
                        <div>
                            <p className="font-bold text-gray-700">{props.followers}</p>
                            <p className="font-hairline mt-2 text-xs text-gray-600">Follower{props.followers > 1 ? `s` : ``}</p>
                        </div>

                        <div>
                            <p className="font-bold text-gray-700">{props.visits}</p>
                            <p className="font-hairline mt-2 text-xs text-gray-600">Visit{props.visits > 1 ? `s` : ``}</p>
                        </div>

                        <div>
                            <p className="font-bold text-gray-700">{props.shares}</p>
                            <p className="font-hairline mt-2 text-xs text-gray-700">Share{props.shares > 1 ? `s` : ``}</p>
                        </div>
                    </div>

                    <div className="mt-6">
                        <Link href={process.env.NEXT_PUBLIC_HOSTNAME+`/`+props.username}>
                            <button className="w-full items-center rounded bg-primary px-4 py-2 text-white shadow-md hover:bg-secondary hover:text-amber-900">Visit</button>
                        </Link>
                    </div>
                    
                </div>
            </div>
        </>
    );

};

export default GetUser_All;
