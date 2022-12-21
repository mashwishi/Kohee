import type { NextPage } from "next";

import { useClerk, SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";

import Link from "next/link";

import ReactGA from 'react-ga'

import { SocialIcon } from 'react-social-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faCopy, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'

const SetLinks: NextPage = () => {
  
  const { user } = useUser();
  const { openSignIn } = useClerk();

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
               
               <div className="cl-titled-card-list blur-sm pointer-events-none">

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

                  <section className="text-gray-600 body-font">
                     <div className="container px-5 py-5 mx-auto">
                        <div className="flex flex-wrap -m-2">

                           {/* {Sample} */}
                           <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
                              <div className="flex rounded-lg h-full bg-gray-100 p-4 flex-col border-2 border-gray-200 border-opacity-50">
                                 <div className="flex items-center mb-3">

                                    <div className="w-5 h-5 mr-2 inline-flex items-center justify-center">
                                       <SocialIcon url="https://facebook.com/mashwishi" />
                                    </div>

                                    <span className="text-gray-900 text-lg title-font font-bold mr-2 cursor-pointer">
                                       Facebook
                                    </span>
                                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-gray-500 hover:text-primary cursor-pointer mr-2" />
                                    <FontAwesomeIcon icon={faCopy} className="text-gray-500 hover:text-accent cursor-pointer mr-2" />
                                    <FontAwesomeIcon icon={faTrash} className="text-gray-500 hover:text-red-600 cursor-pointer" />
                                 </div>
                                 <div className="flex-grow">
                                    <div className="inline-block w-[200px] cursor-pointer">
                                       <span className="truncate block">
                                          Visit my Facebook Page
                                       </span>
                                    </div>
                                 </div>
                                 <div className="flex-grow">
                                    <div className="inline-block w-[200px] badge badge-primary cursor-pointer">
                                       <span className="truncate block">
                                          https://facebook.com/Mashwishi
                                       </span>
                                    </div>
                                 </div>
                              </div>
                           </div>

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
