import type { NextPage } from "next";
import { useClerk, SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import useAnalyticsEventTracker from "../global/useAnalyticsEventTracker";
import ReactGA from 'react-ga'

const SetUser_Mobile: NextPage = () => {
  const { user } = useUser();

  const { openSignIn } = useClerk();

  const gaEventTracker = useAnalyticsEventTracker('Mobile - Dashboard');
  
  ReactGA.pageview('Dashboard')

  return (
    <>

<main className="flex-grow block w-full overflow-x-hidden bg-base-100 text-base-content drawer-content">
    <div className="p-4 lg:p-10">
      <div className="grid grid-cols-1 gap-6 lg:p-10 xl:grid-cols-3 rounded-box">    
        <div className="card shadow-md compact side bg-base-100">
          <div className="flex-row items-center space-x-4 card-body">
            <div>
              <div className="avatar">
                <div className="rounded-full w-14 h-14 shadow"><img src={user?.profileImageUrl?.toString()} alt={user?.username ? user?.username?.toString() : user?.fullName?.toString() }/></div>
              </div>
            </div>
            <div>
              <h2 className="card-title">{user?.username ? user?.username?.toString() : user?.fullName?.toString() }</h2>
              <p className="text-base-content text-opacity-40">{user?.primaryEmailAddress?.toString()}</p>
            </div>
          </div>
        </div>

        <div className="card shadow-md compact side bg-base-100">
          <div className="flex-row items-center space-x-4 card-body">
            <div className="flex-1">
              <h2 className="card-title text-primary">~</h2>
              <p className="text-base-content text-opacity-40">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"  className="inline-block w-6 h-6 stroke-current">
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
                <Link href={`/${user?.username ? user?.username : ''}`} onClick={() => gaEventTracker('Card Live Preview', 'Card Live Preview')}>
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

        <div className="card shadow-md compact side bg-base-100">
          <div className="flex-row items-center space-x-4 card-body">
            <div className="flex-1">
              <h2 className="card-title text-primary">~</h2>
              <p className="text-base-content text-opacity-40">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"  className="inline-block w-6 h-6 stroke-current">
                  <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/>
                </svg>
                &nbsp;Total Followers
              </p>
            </div>
          </div>
        </div>

        <div className="card shadow-md compact side bg-base-100">
          <div className="flex-row items-center space-x-4 card-body">
            <div className="flex-1">
              <h2 className="card-title text-primary">~</h2>
              <p className="text-base-content text-opacity-40">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"  className="inline-block w-6 h-6 stroke-current">
                  <path d="M6.75 1a.75.75 0 0 1 .75.75V8a.5.5 0 0 0 1 0V5.467l.086-.004c.317-.012.637-.008.816.027.134.027.294.096.448.182.077.042.15.147.15.314V8a.5.5 0 0 0 1 0V6.435l.106-.01c.316-.024.584-.01.708.04.118.046.3.207.486.43.081.096.15.19.2.259V8.5a.5.5 0 1 0 1 0v-1h.342a1 1 0 0 1 .995 1.1l-.271 2.715a2.5 2.5 0 0 1-.317.991l-1.395 2.442a.5.5 0 0 1-.434.252H6.118a.5.5 0 0 1-.447-.276l-1.232-2.465-2.512-4.185a.517.517 0 0 1 .809-.631l2.41 2.41A.5.5 0 0 0 6 9.5V1.75A.75.75 0 0 1 6.75 1zM8.5 4.466V1.75a1.75 1.75 0 1 0-3.5 0v6.543L3.443 6.736A1.517 1.517 0 0 0 1.07 8.588l2.491 4.153 1.215 2.43A1.5 1.5 0 0 0 6.118 16h6.302a1.5 1.5 0 0 0 1.302-.756l1.395-2.441a3.5 3.5 0 0 0 .444-1.389l.271-2.715a2 2 0 0 0-1.99-2.199h-.581a5.114 5.114 0 0 0-.195-.248c-.191-.229-.51-.568-.88-.716-.364-.146-.846-.132-1.158-.108l-.132.012a1.26 1.26 0 0 0-.56-.642 2.632 2.632 0 0 0-.738-.288c-.31-.062-.739-.058-1.05-.046l-.048.002zm2.094 2.025z"/>
                </svg>
                &nbsp;Total Clicks
              </p>
            </div>
          </div>
        </div>

        <div className="card col-span-1 row-span-3 shadow-md xl:col-span-2 bg-base-100">
          <div className="card-body">
            <h2 className="my-4 text-4xl font-bold card-title">Engagements</h2>
            <p>We are currently working on this area, Sorry!</p>
          </div>
        </div>

        <div className="card col-span-1 row-span-3 shadow-md xl:col-span-2 bg-base-100">
          <div className="card-body">
            <h2 className="my-4 text-4xl font-bold card-title">Devices and Country</h2>
            <p>We are currently working on this area, Sorry!</p>
          </div>
        </div>

      </div>
    </div>
    </main>

    </>
  );
};

export default SetUser_Mobile;
