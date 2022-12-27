import {SignedIn, SignedOut, UserProfile, RedirectToSignIn} from "@clerk/nextjs";
import { Tab } from '@headlessui/react'
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import ReactGA from 'react-ga'

import SetLinks from "../../components/account/setLinks";
import SetMore from "../../components/account/setMore";

const UserProfilePage = () => { 

    const router = useRouter();
    
    const { tab } = router.query;
    const [stateActiveTab, setStateActiveTab] = useState(tab)

    ReactGA.pageview('Account')

    useEffect(() => {


    }, [])

    return (
        <>
            <SignedIn>
                <div className='p-4'>
                    <Tab.Group  key={stateActiveTab == 'links' ? 1 : 0} defaultIndex={stateActiveTab == 'links' ? 1 : 0} >
                        <Tab.List className="flex p-1 ">
                            <Tab className={({ selected }) =>`w-full py-2.5 text-lg leading-5 bg-transparent border-0 border-b-1 border-solid ${selected ? 'font-bold border-b-8' : ''}`}>
                            Account
                            </Tab>
                            <Tab className={({ selected }) =>`w-full py-2.5 text-lg leading-5 bg-transparent border-0 border-b-1 border-solid ${selected ? 'font-bold border-b-8' : ''}`}>
                            Links
                            </Tab>
                            <Tab className={({ selected }) =>`w-full py-2.5 text-lg leading-5 bg-transparent border-0 border-b-1 border-solid ${selected ? 'font-bold border-b-8' : ''}`}>
                            Security
                            </Tab>
                        </Tab.List>
                        <Tab.Panels className={`px-1 py-4`}>
                            <Tab.Panel>
                            {
                                <>
                                <UserProfile path="/user" hideNavigation routing="path" only="account" />
                                <SetMore />
                                </>
                            }
                            </Tab.Panel>
                            <Tab.Panel>
                            {
                                <SetLinks/>
                            }
                            </Tab.Panel>
                            <Tab.Panel>
                            {
                                <UserProfile path="/user" hideNavigation routing="path" only="security"/>
                            }
                            </Tab.Panel>
                        </Tab.Panels>
                    </Tab.Group>
                </div>
            </SignedIn>

            <SignedOut>
                <RedirectToSignIn />
            </SignedOut>
        </>
    );
};





export default UserProfilePage;
