import type { NextPage } from "next";
import { useClerk, SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import useAnalyticsEventTracker from "../useAnalyticsEventTracker";

import ReactGA from 'react-ga'

const SetUser_Desktop: NextPage = () => {
  const { user } = useUser();

  const { openSignIn } = useClerk();

  const gaEventTracker = useAnalyticsEventTracker('Desktop - Dashboard');

  ReactGA.pageview('Dashboard')

  return (
    <>
    
    <main className="flex-grow block w-full overflow-x-hidden bg-base-100 text-base-content drawer-content">
    <div className="p-4 lg:p-10">
      <div className="grid grid-cols-1 gap-6 lg:p-10 xl:grid-cols-3 lg:bg-base-200 rounded-box">    
        <div className="card shadow-lg compact side bg-base-100">
          <div className="flex-row items-center space-x-4 card-body">
            <div>
              <div className="avatar">
                <div className="rounded-full w-14 h-14 shadow"><img src={user?.profileImageUrl!.toString()} alt={user?.username ? user?.username!.toString() : user?.fullName!.toString() }/></div>
              </div>
            </div>
            <div>
              <h2 className="card-title">{user?.username ? user?.username!.toString() : user?.fullName!.toString() }</h2>
              <p className="text-base-content text-opacity-40">{user?.primaryEmailAddress!.toString()}</p>
            </div>
          </div>
        </div>

        <div className="card shadow-lg compact side bg-base-100">
          <div className="flex-row items-center space-x-4 card-body">
            <div className="flex-1">
              <h2 className="card-title text-primary">~</h2>
              <p className="text-base-content text-opacity-40">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"  className="inline-block w-6 h-6 stroke-current">
                  <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                  <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                </svg>
                &nbsp;
                Total Page views
              </p>
            </div>
            <div className="flex space-x-2 flex-0">
            </div>
          </div>
        </div>


        <div className="card row-span-3 compact ">
          <div className="flex-row items-center space-x-4 card-body  flex justify-center">
            <div>
              <h2 className="card-title ">
                Card Live Preview
                <Link href={`/u/${user?.username ? user?.username : ''}`} onClick={() => gaEventTracker('Card Live Preview', 'Card Live Preview')}>
                  <button className="btn btn-sm btn-square">
                    <svg xmlns="http://www.w3.org/2000/svg"fill="none" viewBox="0 0 16 16" className="inline-block w-6 h-6 stroke-current">
                      <path d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                    </svg>
                  </button>
                </Link>
              </h2>
              <p className="text-base-content text-opacity-40">This is the preview of your latest card.</p>
            </div>
          </div>
          <figure>
          <div className="w-full h-auto flex justify-center">
                    <div className="mockup-phone">
                        <div className="camera"></div> 
                        <div className="display overscroll-x-none">
                            <iframe 
                                className="w-[375px] h-[667px] pointer-events-none" 
                                src={process.env.NEXT_PUBLIC_HOSTNAME + `/preview/${user?.username ? user?.username : ''}`}
                                title="Kohee App Mobile View" 
                            />
                        </div>
                    </div>
                </div>
          </figure>

        </div>

        <div className="card shadow-lg compact side bg-base-100">
          <div className="flex-row items-center space-x-4 card-body">
            <div className="flex-1">
              <h2 className="card-title text-primary">~</h2>
              <p className="text-base-content text-opacity-40">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"  className="inline-block w-6 h-6 stroke-current">
                  <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/>
                </svg>
                &nbsp;Total Followers
              </p>
            </div>
          </div>
        </div>

        <div className="card shadow-lg compact side bg-base-100">
          <div className="flex-row items-center space-x-4 card-body"><label className="flex-0">
              <div><h2 className="my-4 text-4xl font-bold card-title">0.0</h2></div>
            </label>
            <div className="flex-1">
              <div className="rating">
                <input type="radio" name="rating-4" className="mask mask-star-2 bg-green-500" />
                <input type="radio" name="rating-4" className="mask mask-star-2 bg-green-500" checked />
                <input type="radio" name="rating-4" className="mask mask-star-2 bg-green-500" />
                <input type="radio" name="rating-4" className="mask mask-star-2 bg-green-500" />
                <input type="radio" name="rating-4" className="mask mask-star-2 bg-green-500" />
              </div>
              <p className="text-base-content text-opacity-40">User Ratings</p>
            </div>
          </div>
        </div>

        <div className="card col-span-1 row-span-3 shadow-lg xl:col-span-2 bg-base-100">
          <div className="card-body">
            <h2 className="my-4 text-4xl font-bold card-title">Customize your profile card!</h2>
            <p>We are currently working on this area, Sorry!</p>
            <div className="justify-end space-x-2 card-actions"><button className="btn btn-primary">SAVE</button></div>
          </div>
        </div>

        <div className="card col-span-1 row-span-3 shadow-lg xl:col-span-2 bg-base-100">
          <div className="card-body">
            <h2 className="my-4 text-4xl font-bold card-title">Statistics</h2>
            <p>We are currently working on this area, Sorry!</p>
          </div>
        </div>

      </div>
    </div>
    </main>

    </>
  );
};

export default SetUser_Desktop;
