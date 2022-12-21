import type { NextPage } from "next";
import { useClerk, SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

import ReactGA from 'react-ga'
import { useState } from "react";

const SetMore: NextPage = () => {
  
  const { user } = useUser();
  const { openSignIn } = useClerk();
  
  const [value, setValue] = useState('')

  return (
    <>

    <div className="cl-component cl-user-profile">
        <div className="cl-main">
            <div className="Lt2X2CSXDlA17QZxtmZM VND2hwhJfz9GlH7oDnkd cl-themed-card">
                <div className="Nq0cGRxiCgDlvCMk0zDU">
                    <h1 className="neiTtIc1DzU_PrekjGtm">Bio</h1>
                    <p className="wfQDsKYZn7R6oAZW0nQL">Tell something about you.</p>
                </div>
                <div className="cl-titled-card-list">
                    <div className="cl-list-item __4tNYcHC73xJXr7YywZ nGJOZlJ9gb4ASegImg_K itNPetTY1ZxpPvqQd7f7">
                    <div className="cFuYkQ8hdBQ158UpPA1B">About You (Soon)</div>
                        <div className="fTrTEjXVH5ZHoKLtM71A ILJP2tCf5pYz_kx44vee">

                            <div className="relative w-[75%]">
                                <textarea
                                disabled
                                className="w-[100%] py-2 px-3 rounded-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue"
                                placeholder="Enter some text... "
                                maxLength={200}
                                value={value}
                                onChange={(event) => setValue(event.target.value)}
                                />
                                <div className="absolute bottom-2 right-2 text-xs text-gray-500">
                                {value.length}/200
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    </>
  );
};

export default SetMore;
