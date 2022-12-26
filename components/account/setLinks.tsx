import type { NextPage } from "next";

import { useClerk, SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";

import Link from "next/link";

import ReactGA from 'react-ga'

import { SocialIcon } from 'react-social-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faCopy, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from "react";
import LoadingPage from "../global/LoadingPage";

const SetLinks: NextPage = () => {

   const { user } = useUser();
   const { openSignIn } = useClerk();

   const [userLinks, setUserLinks] = useState<any | null>(null);
   const [userLinksCount, setUserLinksCount] = useState(0)

   const [isLoading, setLoading] = useState(false)
   const [isErrorLinks, setisErrorLinks] = useState(false)
   const [userID, setUserID] = useState(user?.id);

   useEffect(() => {

      setLoading(true)

      async function getLinks() {
         const fetchData = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({   
               data:{
                  user_id: `${userID}`
               } 
            })
         };
         
         try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/links/getUserLinks`, fetchData);
            const data = await response.json();
            setUserLinks(data.data)
            console.log(data.data)
            setUserLinksCount(data?.data?.length > 0 ? data?.data?.length : 0) 
            
            setLoading(false)
         } catch (error) {
            console.error(error);
         }
      }
      getLinks()

   }, [])

   
   if (isLoading) return <LoadingPage/>
      
   if (!userLinks) return (
      <>
      <section className="flex items-center h-full sm:p-16 ">
            <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8 space-y-8 text-center sm:max-w-md">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-40 h-40 dark:text-gray-600">
               <path fill="currentColor" d="M256,16C123.452,16,16,123.452,16,256S123.452,496,256,496,496,388.548,496,256,388.548,16,256,16ZM403.078,403.078a207.253,207.253,0,1,1,44.589-66.125A207.332,207.332,0,0,1,403.078,403.078Z"></path>
               <rect width="176" height="32" x="168" y="320" fill="currentColor"></rect>
               <polygon fill="currentColor" points="210.63 228.042 186.588 206.671 207.958 182.63 184.042 161.37 162.671 185.412 138.63 164.042 117.37 187.958 141.412 209.329 120.042 233.37 143.958 254.63 165.329 230.588 189.37 251.958 210.63 228.042"></polygon>
               <polygon fill="currentColor" points="383.958 182.63 360.042 161.37 338.671 185.412 314.63 164.042 293.37 187.958 317.412 209.329 296.042 233.37 319.958 254.63 341.329 230.588 365.37 251.958 386.63 228.042 362.588 206.671 383.958 182.63"></polygon>
            </svg>
            <p className="text-3xl">Failed to load</p>
            <Link href="/user">
               <p className="px-8 py-3 font-semibold rounded cursor-pointer">Reload the page</p>
            </Link>
            </div>
      </section>
      </>
   )


   return (
   <>
      <div className="cl-component cl-user-profile">
         <div className="cl-main">
            <div className="cl-page-heading">
               <div className="cl-text-container">
                  <h2 className="GF6dDfV7buCxrKRHhyRx faCxZDb7pPCqT6vV1xkh cl-title">Links</h2>
                  <p className="cl-subtitle">Manage social and web links related to your account</p>
               </div>
            </div>
            <div className="Lt2X2CSXDlA17QZxtmZM VND2hwhJfz9GlH7oDnkd cl-themed-card">

               <div className="Nq0cGRxiCgDlvCMk0zDU">
                  <h1 className="neiTtIc1DzU_PrekjGtm">Customize your links!</h1>
                  <p className="wfQDsKYZn7R6oAZW0nQL">
                     {/* Free Plan */}
                     Coming Soon
                  </p>
               </div>
               
               <div className="cl-titled-card-list">

                  <div className="blur-sm pointer-events-none">
                     <div className="cl-list-item __4tNYcHC73xJXr7YywZ nGJOZlJ9gb4ASegImg_K itNPetTY1ZxpPvqQd7f7">
                        <div className="cFuYkQ8hdBQ158UpPA1B">Add</div>
                        <div className="fTrTEjXVH5ZHoKLtM71A ILJP2tCf5pYz_kx44vee">
                           <div className="a2LJgbfYNyoAmqPkvfgf">https://</div>
                           <div className="bUZAFR0kCaFsfdcBwlDU">
                              <svg width="1.25em" height="1.25em" viewBox="0 0 20 20" stroke="currentColor" fill="none" xmlns="http://www.w3.org/2000/svg" className="W6YTparn1VxL3wpqdkh7">
                                 <path d="M3.333 10h13.332M11.666 5l5 5-5 5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                              </svg>
                           </div>
                        </div>
                     </div>
                  </div>

                  <section className="text-gray-600 body-font">
                     <div className="container px-5 py-5 mx-auto">
                        <div className="flex flex-wrap -m-2">

                           {
                              userLinksCount > 0 ?
                              <>
                                 {
                                    (userLinks as any[]).map((i) => {
                                    return (
                                       <>
                                          <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
                                             <div className="flex rounded-lg h-full bg-gray-100 p-4 flex-col border-2 border-gray-200 border-opacity-50">
                                             <div className="flex items-center mb-3">

                                             <div className="w-5 h-5 mr-2 inline-flex items-center justify-center">
                                             <SocialIcon url={i.url} />
                                             </div>

                                             <span className="text-gray-900 text-lg title-font font-bold mr-2 cursor-pointer">
                                             {i.type}
                                             </span>
                                             <a href={i.url} target="_blank" rel="noreferrer">
                                                <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-gray-500 hover:text-primary cursor-pointer mr-2" />
                                             </a>
                                             <FontAwesomeIcon icon={faCopy} className="text-gray-500 hover:text-accent cursor-pointer mr-2" />
                                             <FontAwesomeIcon icon={faTrash} className="text-gray-500 hover:text-red-600 cursor-pointer" />
                                             </div>
                                             <div className="flex-grow">
                                             <div className="inline-block w-[200px] cursor-pointer">
                                             <span className="truncate block">
                                             {i.button_text}
                                             </span>
                                             </div>
                                             </div>
                                             <div className="flex-grow">
                                             <div className="inline-block w-[200px] badge badge-primary cursor-pointer">
                                             <span className="truncate block">
                                             {i.url}
                                             </span>
                                             </div>
                                             </div>
                                             </div>
                                          </div>
                                       </>
                                    )
                                    })
                                 }
                              </>
                              :
                              <p>No Links</p>
                           }

                        </div>
                     </div>
                  </section>

               </div>

            </div>
         </div>
      </div>
   </>
   );
};

export default SetLinks;
