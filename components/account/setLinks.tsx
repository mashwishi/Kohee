import type { NextPage } from "next";
import { useClerk, SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { HexColorPicker } from "react-colorful";
import ReactGA from 'react-ga'
import { SocialIcon } from 'react-social-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faCopy, faArrowUpRightFromSquare, faPencil, faPaintBrush, faCube, faSortAlphaAsc, faSortAlphaUp, faCubes } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from "react";
import LoadingPage from "../global/LoadingPage";

interface OptionsURLType {
   value: string;
   label: string;
   color_button: string;
   color_text: string;
} 

const optionsURLType: OptionsURLType[] = [
   
   { value: 'custom', label: 'Custom', color_text: '#FFFFFF', color_button: '#010101'  },
   { value: 'facebook', label: 'Facebook', color_text: '#FFFFFF', color_button: '#1877f2' },
   { value: 'tiktok', label: 'Tiktok', color_text: '#FFFFFF', color_button: '#ee1d52'  },
   { value: 'twitter', label: 'Twitter', color_text: '#FFFFFF', color_button: '#1da1f2'  },
   { value: 'instagram', label: 'Instagram', color_text: '#FFFFFF', color_button: '#c32aa3'  },
   { value: 'linkedin', label: 'LinkedIn', color_text: '#FFFFFF', color_button: '#0a66c2'  },
   { value: 'google', label: 'Google', color_text: '#000000', color_button: '#ffffff' },
   { value: 'gmail', label: 'Gmail', color_text: '#000000', color_button: '#ffffff' },
   { value: 'youtube', label: 'YouTube', color_text: '#ffffff', color_button: '#ff0000' },
   { value: 'reddit', label: 'Reddit', color_text: '#ffffff', color_button: '#ff4500' },
   { value: 'wikipedia', label: 'Wikipedia', color_text: '#ffffff', color_button: '#000000' },
   { value: 'quora', label: 'Quora', color_text: '#ffffff', color_button: '#a020f0' },
   { value: 'twitch', label: 'Twitch', color_text: '#ffffff', color_button: '#6441a5' },
   { value: 'messenger', label: 'Messenger', color_text: '#ffffff', color_button: '#0084ff' },
   { value: 'snapchat', label: 'Snapchat', color_text: '#ffffff', color_button: '#fffc00' },
   { value: 'github', label: 'Github', color_text: '#ffffff', color_button: '#000000' },

];

const SetLinks: NextPage = () => {

   const { user } = useUser();
   const { openSignIn } = useClerk();

   const [userLinks, setUserLinks] = useState<any | null>(null);
   const [userLinksCount, setUserLinksCount] = useState(0)

   const [isLoading, setLoading] = useState(false)
   const [isErrorLinks, setisErrorLinks] = useState('')
   const [userID, setUserID] = useState(user?.id);

   const [editLinkType, setEditLinkType] = useState('')
   const [editLinkURL, setEditLinkURL] = useState('')
   const [editLinkColorTxt, setEditLinkColorTxt] = useState('')
   const [editLinkColorBtn, setEditLinkColorBtn] = useState('')
   const [editLinkBtnTxt, setEditLinkBtnTxt] = useState('')

   const [addLinkType, setAddLinkType] = useState('custom')
   const [addLinkURL, setAddLinkURL] = useState('https://')
   const [addLinkColorTxt, setAddLinkColorTxt] = useState('#E0A82E')
   const [addLinkColorBtn, setAddLinkColorBtn] = useState('#50402F')
   const [addLinkBtnTxt, setAddLinkBtnTxt] = useState('Custom')

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
            setUserLinksCount(data?.data?.length > 0 ? data?.data?.length : 0) 
            
            setLoading(false)
         } catch (error) {
            console.error(error);
            return (
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
                     <Link href="/user?tab=links">
                        <p className="px-8 py-3 font-semibold rounded cursor-pointer">Reload the page</p>
                     </Link>
                     </div>
               </section>
               </>
            )
         }
      }
      getLinks()

   }, [])
   

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
         setUserLinksCount(data?.data?.length > 0 ? data?.data?.length : 0) 
         
         setLoading(false)
      } catch (error) {
         console.error(error);
      }
   }

   async function deleteLink(id: Number){
      const deleteData = {
         method: 'POST',
         headers: {
         'Content-Type': 'application/json'
         },
         body: JSON.stringify({   
            data:{
               id: id
            } 
         })
      };
      
      try {
         const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/links/deleteUserLinks`, deleteData);
         const data = await response.json();
         setLoading(true)
         getLinks()
      } catch (error) {
         console.error(error);
      }
   }

   async function updateLinkState(item: any){
      setEditLinkType(item.type)
      setEditLinkURL(item.url)
      setEditLinkColorTxt(item.color_text)
      setEditLinkColorBtn(item.color_button)
      setEditLinkBtnTxt(item.button_text)
   }

   const handleChangeType = (event: any) => {
      setEditLinkType(event.target.value);

      const selectedOption: OptionsURLType | undefined = optionsURLType.find(
         (option) => option.value === event.target.value
      );

      setEditLinkColorBtn(selectedOption ? selectedOption.color_button : editLinkColorBtn);
      setEditLinkColorTxt(selectedOption ? selectedOption.color_text : editLinkColorTxt);
   };

   async function editLink(id: Number){

      const updateData = {
         method: 'POST',
         headers: {
         'Content-Type': 'application/json'
         },
         body: JSON.stringify({   
            data:{
               id: id,
               type: `${editLinkType}`, 
               url: `${editLinkURL}`, 
               color_text: `${editLinkColorTxt}`, 
               color_button: `${editLinkColorBtn}`, 
               button_text: `${editLinkBtnTxt}`, 
            } 
         })
      };
      
      try {
         const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/links/updateUserLinks`, updateData);
         const data = await response.json();
         if(data.status == 200){
            setLoading(true)
            getLinks()
         }
      } catch (error) {
         setLoading(false)
         console.error(error);
      }

   }

   const handleChangeTypeAdd = (event: any) => {
      setAddLinkType(event.target.value);

      const selectedOption: OptionsURLType | undefined = optionsURLType.find(
         (option) => option.value === event.target.value
      );

      setAddLinkColorBtn(selectedOption ? selectedOption.color_button : editLinkColorBtn);
      setAddLinkColorTxt(selectedOption ? selectedOption.color_text : editLinkColorTxt);
   };

   async function addLink(){

      const createData = {
         method: 'POST',
         headers: {
         'Content-Type': 'application/json'
         },
         body: JSON.stringify({   
            data:{
               user_id: `${userID}`,
               type: `${addLinkType ? addLinkType : `custom`}`, 
               url: `${addLinkURL}`, 
               color_text: `${addLinkColorTxt}`, 
               color_button: `${addLinkColorBtn}`, 
               button_text: `${addLinkBtnTxt}`, 
            } 
         })
      };
      
      try {
         const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/links/createUserLinks`, createData);
         const data = await response.json();
         if(data.status == 200){
            setLoading(true)

            // Reset Add State
            setAddLinkType('')
            setAddLinkURL('')
            setAddLinkColorTxt('')
            setAddLinkColorBtn('')
            setAddLinkBtnTxt('')

            getLinks()
         }
      } catch (error) {
         setLoading(false)
         console.error(error);
      }

   }

   return (
   <>
   {isLoading ? 
      <LoadingPage/> 
      : 
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
                     {/* Plan - Soon*/}
                     Beta Plan
                  </p>
               </div>
               
               <div className="cl-titled-card-list">
                  {/* blur-sm pointer-events-none */}
                  <div className="">
                     <div className="cl-list-item __4tNYcHC73xJXr7YywZ nGJOZlJ9gb4ASegImg_K itNPetTY1ZxpPvqQd7f7">

                        <div className="cFuYkQ8hdBQ158UpPA1B">Created Links [{userLinksCount > 0 ? userLinksCount : 0}/15]</div>


                        {userLinksCount < 15 ? 
                        <>
                           <label htmlFor={`add-link`} className="fTrTEjXVH5ZHoKLtM71A ILJP2tCf5pYz_kx44vee hover:bg-slate-200 hover:text-lg hover:font-bold cursor-pointer">
                                 <div className="ml-4 a2LJgbfYNyoAmqPkvfgf">Create a new</div>
                                 <div className="bUZAFR0kCaFsfdcBwlDU">
                                    <svg width="1.25em" height="1.25em" viewBox="0 0 20 20" stroke="currentColor" fill="none" xmlns="http://www.w3.org/2000/svg" className="W6YTparn1VxL3wpqdkh7">
                                       <path d="M3.333 10h13.332M11.666 5l5 5-5 5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                 </div>
                           </label>
                           {/* Start Add Modal */}
                              <input type="checkbox" id={`add-link`} className="modal-toggle" />
                              <div className="modal modal-bottom sm:modal-middle">
                                 <div className="modal-box">
                                    <h3 className="font-bold text-lg"><strong>Creating:</strong> {addLinkBtnTxt}</h3>
                                    <p className="py-4">

                                       {/* Preview Sample */}
                                       <a target="_blank" rel="noreferrer" href={addLinkURL} className="btn w-[100%]" style={{ color: addLinkColorTxt, backgroundColor: addLinkColorBtn }} >
                                          {addLinkBtnTxt}
                                       </a>

                                       {/* Color Text */}
                                       <div className="mt-2">
                                          <div className="__4tNYcHC73xJXr7YywZ  ">
                                             <div className="cFuYkQ8hdBQ158UpPA1B">Color Text</div>
                                                <div className="flex mt-2">
                                                   <div className="flex-initial w-80">
                                                      <div className="relative w-[100%]">
                                                               <input
                                                               className="hXjh5Waxs3XN6zW5pfXs w-[100%] py-2 rounded-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue"
                                                               placeholder='Hexcolor Code'
                                                               autoComplete="off" 
                                                               required 
                                                               minLength={7} 
                                                               maxLength={7} 
                                                               type="text" 
                                                               value={addLinkColorTxt}
                                                               onChange={(e) => setAddLinkColorTxt(e.target.value)}
                                                               />
                                                      </div>
                                                   </div>
                                                </div>
                                          </div>
                                       </div>
                                       {/* End Color Text */}

                                       {/* Color Button */}
                                       <div className="mt-2">
                                          <div className="__4tNYcHC73xJXr7YywZ  ">
                                             <div className="cFuYkQ8hdBQ158UpPA1B">Color Button</div>
                                                <div className="flex mt-2">
                                                   <div className="flex-initial w-80">
                                                      <div className="relative w-[100%]">
                                                               <input
                                                               className="hXjh5Waxs3XN6zW5pfXs w-[100%] py-2 rounded-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue"
                                                               placeholder='Hexcolor Code'
                                                               autoComplete="off" 
                                                               required 
                                                               minLength={7} 
                                                               maxLength={7} 
                                                               type="text" 
                                                               value={addLinkColorBtn}
                                                               onChange={(e) => setAddLinkColorBtn(e.target.value)}
                                                               />
                                                      </div>
                                                   </div>
                                                </div>
                                          </div>
                                       </div>
                                       {/* End Color Button */}

                                       {/* Button Text */}
                                       <div className="mt-4">
                                          <div className="__4tNYcHC73xJXr7YywZ  ">
                                             <div className="cFuYkQ8hdBQ158UpPA1B">Button Text</div>
                                             <div className="flex mt-2">
                                                   <div className="flex-initial w-80">
                                                      <div className="relative w-[100%]">
                                                      <input
                                                               className="hXjh5Waxs3XN6zW5pfXs w-[100%] py-2 rounded-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue"
                                                               placeholder='Button Text'
                                                               autoComplete="off" 
                                                               required 
                                                               minLength={1} 
                                                               maxLength={30} 
                                                               type="text" 
                                                               value={addLinkBtnTxt}
                                                               onChange={(e) => setAddLinkBtnTxt(e.target.value)}
                                                      />
                                                      </div>
                                                   </div>
                                                </div>
                                          </div>
                                       </div>
                                       {/* End Button Text */}

                                       {/* Button URL */}
                                       <div className="mt-4">
                                          <div className="__4tNYcHC73xJXr7YywZ  ">
                                             <div className="cFuYkQ8hdBQ158UpPA1B">Button URL</div>
                                             <div className="flex mt-2">
                                                   <div className="flex-initial w-80">
                                                      <div className="relative w-[100%]">
                                                      <input
                                                               className="hXjh5Waxs3XN6zW5pfXs w-[100%] py-2 rounded-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue"
                                                               placeholder='https://yourwebsite.com/'
                                                               autoComplete="off" 
                                                               required 
                                                               minLength={5} 
                                                               maxLength={255} 
                                                               type="text" 
                                                               value={addLinkURL}
                                                               onChange={(e) => setAddLinkURL(e.target.value)}
                                                      />
                                                      </div>
                                                   </div>
                                                </div>
                                          </div>
                                       </div>
                                       {/* End Button URL */}

                                       {/* Link Type */}
                                       <div className="mt-4">
                                          <div className="__4tNYcHC73xJXr7YywZ  ">
                                             <div className="cFuYkQ8hdBQ158UpPA1B">Link Type</div>
                                             <div className="flex mt-2">
                                                   <div className="flex-initial w-80">
                                                      <div className="relative w-[100%]">

                                                      <select value={editLinkType} onChange={handleChangeTypeAdd}
                                                      //onChange={(e) => setEditLinkType(e.target.value)}
                                                      className="hXjh5Waxs3XN6zW5pfXs w-[100%] py-2 rounded-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue"
                                                      >
                                                         {optionsURLType.map((option) => (
                                                            <option key={option.value} value={option.value}>{option.label}</option>
                                                         ))}
                                                      </select>

                                                      </div>
                                                   </div>
                                                </div>
                                          </div>
                                       </div>
                                       {/* End Link Type */}

                                    </p>
                                    <div className="modal-action">
                                       {
                                       addLinkURL && addLinkColorTxt && addLinkColorBtn && addLinkBtnTxt ?
                                       <>
                                          <label htmlFor={`add-link`} className="btn btn-primary" onClick={() => addLink()}>Create</label>
                                       </>
                                       :
                                       <>
                                          <label className="btn bg-slate-600 text-slate-200 cursor-no-drop">Create</label>
                                       </>
                                       }
                                       <label htmlFor={`add-link`} className="btn btn-secondary">Cancel</label>
                                    </div>
                                 </div>
                              </div>
                           {/* End Add Modal */}
                        </>
                        :
                        <>
                           <div className="fTrTEjXVH5ZHoKLtM71A ILJP2tCf5pYz_kx44vee hover:bg-slate-200 hover:text-lg hover:font-bold cursor-no-drop">
                                    <div className="ml-4 a2LJgbfYNyoAmqPkvfgf">You&apos;ve already reached the limit</div>
                                    <div className="bUZAFR0kCaFsfdcBwlDU">
                                       <svg width="1.25em" height="1.25em" viewBox="0 0 20 20" stroke="currentColor" fill="none" xmlns="http://www.w3.org/2000/svg" className="W6YTparn1VxL3wpqdkh7">
                                          <path d="M3.333 10h13.332M11.666 5l5 5-5 5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                       </svg>
                                    </div>
                           </div>
                        </>
                        }

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

                                             {/* Start Edit Modal */}
                                             <label htmlFor={`edit-`+i.id} onClick={() => updateLinkState(i)}>
                                                <FontAwesomeIcon icon={faPencil} className="text-gray-500 hover:text-blue-300 cursor-pointer mr-2" />
                                             </label>
                                                <input type="checkbox" id={`edit-`+i.id} className="modal-toggle" />
                                             <div className="modal modal-bottom sm:modal-middle">
                                                <div className="modal-box">
                                                   <h3 className="font-bold text-lg"><strong>Editing:</strong> {i.button_text}</h3>
                                                   <p className="py-4">

                                                      {/* Preview Sample */}
                                                      <a target="_blank" rel="noreferrer" href={i.url} className="btn w-[100%]" style={{ color: editLinkColorTxt, backgroundColor: editLinkColorBtn }} >
                                                         {editLinkBtnTxt}
                                                      </a>

                                                      {/* Color Text */}
                                                      <div className="mt-2">
                                                         <div className="__4tNYcHC73xJXr7YywZ  ">
                                                            <div className="cFuYkQ8hdBQ158UpPA1B">Color Text</div>
                                                               <div className="flex mt-2">
                                                                  <div className="flex-initial w-80">
                                                                     <div className="relative w-[100%]">
                                                                              <input
                                                                              className="hXjh5Waxs3XN6zW5pfXs w-[100%] py-2 rounded-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue"
                                                                              placeholder={editLinkColorTxt}
                                                                              id="color_text_input" 
                                                                              name="color_text_input"  
                                                                              autoComplete="off" 
                                                                              required 
                                                                              minLength={7} 
                                                                              maxLength={7} 
                                                                              type="text" 
                                                                              value={editLinkColorTxt}
                                                                              onChange={(e) => setEditLinkColorTxt(e.target.value)}
                                                                              />
                                                                     </div>
                                                                  </div>
                                                               </div>
                                                         </div>
                                                      </div>
                                                      {/* End Color Text */}

                                                      {/* Color Button */}
                                                      <div className="mt-2">
                                                         <div className="__4tNYcHC73xJXr7YywZ  ">
                                                            <div className="cFuYkQ8hdBQ158UpPA1B">Color Button</div>
                                                               <div className="flex mt-2">
                                                                  <div className="flex-initial w-80">
                                                                     <div className="relative w-[100%]">
                                                                              <input
                                                                              className="hXjh5Waxs3XN6zW5pfXs w-[100%] py-2 rounded-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue"
                                                                              placeholder={editLinkColorBtn}
                                                                              id="color_button_input" 
                                                                              name="color_button_input"  
                                                                              autoComplete="off" 
                                                                              required 
                                                                              minLength={7} 
                                                                              maxLength={7} 
                                                                              type="text" 
                                                                              value={editLinkColorBtn}
                                                                              onChange={(e) => setEditLinkColorBtn(e.target.value)}
                                                                              />
                                                                     </div>
                                                                  </div>
                                                               </div>
                                                         </div>
                                                      </div>
                                                      {/* End Color Button */}

                                                      {/* Button Text */}
                                                      <div className="mt-4">
                                                         <div className="__4tNYcHC73xJXr7YywZ  ">
                                                            <div className="cFuYkQ8hdBQ158UpPA1B">Button Text</div>
                                                            <div className="flex mt-2">
                                                                  <div className="flex-initial w-80">
                                                                     <div className="relative w-[100%]">
                                                                     <input
                                                                              className="hXjh5Waxs3XN6zW5pfXs w-[100%] py-2 rounded-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue"
                                                                              placeholder={editLinkBtnTxt}
                                                                              id="color_button_input" 
                                                                              name="color_button_input"  
                                                                              autoComplete="off" 
                                                                              required 
                                                                              minLength={1} 
                                                                              maxLength={15} 
                                                                              type="text" 
                                                                              value={editLinkBtnTxt}
                                                                              onChange={(e) => setEditLinkBtnTxt(e.target.value)}
                                                                     />
                                                                     </div>
                                                                  </div>
                                                               </div>
                                                         </div>
                                                      </div>
                                                      {/* End Button Text */}

                                                      {/* Button URL */}
                                                      <div className="mt-4">
                                                         <div className="__4tNYcHC73xJXr7YywZ  ">
                                                            <div className="cFuYkQ8hdBQ158UpPA1B">Button URL</div>
                                                            <div className="flex mt-2">
                                                                  <div className="flex-initial w-80">
                                                                     <div className="relative w-[100%]">
                                                                     <input
                                                                              className="hXjh5Waxs3XN6zW5pfXs w-[100%] py-2 rounded-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue"
                                                                              placeholder={editLinkURL}
                                                                              id="color_button_input" 
                                                                              name="color_button_input"  
                                                                              autoComplete="off" 
                                                                              required 
                                                                              minLength={5} 
                                                                              maxLength={255} 
                                                                              type="text" 
                                                                              value={editLinkURL}
                                                                              onChange={(e) => setEditLinkURL(e.target.value)}
                                                                     />
                                                                     </div>
                                                                  </div>
                                                               </div>
                                                         </div>
                                                      </div>
                                                      {/* End Button URL */}

                                                      {/* Link Type */}
                                                      <div className="mt-4">
                                                         <div className="__4tNYcHC73xJXr7YywZ  ">
                                                            <div className="cFuYkQ8hdBQ158UpPA1B">Link Type</div>
                                                            <div className="flex mt-2">
                                                                  <div className="flex-initial w-80">
                                                                     <div className="relative w-[100%]">

                                                                     <select value={editLinkType} onChange={handleChangeType}
                                                                     //onChange={(e) => setEditLinkType(e.target.value)}
                                                                     className="hXjh5Waxs3XN6zW5pfXs w-[100%] py-2 rounded-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue"
                                                                     >
                                                                        {optionsURLType.map((option) => (
                                                                           <option key={option.value} value={option.value}>{option.label}</option>
                                                                        ))}
                                                                     </select>

                                                                     </div>
                                                                  </div>
                                                               </div>
                                                         </div>
                                                      </div>
                                                      {/* End Link Type */}

                                                   </p>
                                                   <div className="modal-action">
                                                   {
                                                   editLinkURL && editLinkColorTxt && editLinkColorBtn && editLinkBtnTxt ?
                                                   <>
                                                      <label htmlFor={`edit-`+i.id} className="btn btn-primary" onClick={() => editLink(i.id)}>Save</label>
                                                   </>
                                                   :
                                                   <>
                                                      <label className="btn bg-slate-600 text-slate-200 cursor-no-drop">Save</label>
                                                   </>
                                                   }
                                                      <label htmlFor={`edit-`+i.id} className="btn btn-secondary">Cancel</label>
                                                   </div>
                                                </div>
                                             </div>
                                             {/* End Edit Modal */}

                                             {/* Start Delete Modal */}
                                             <label htmlFor={`delete-`+i.id}>
                                                <FontAwesomeIcon icon={faTrash} className="text-gray-500 hover:text-red-600 cursor-pointer" />
                                             </label>
                                                <input type="checkbox" id={`delete-`+i.id} className="modal-toggle" />
                                             <div className="modal modal-bottom sm:modal-middle">
                                                <div className="modal-box">
                                                   <h3 className="font-bold text-lg">Delete Confirmation</h3>
                                                   <p className="py-4">Are you sure you want to delete <strong>{i.button_text}</strong> from your links?</p>
                                                   <div className="modal-action">
                                                      <label htmlFor={`delete-`+i.id} className="btn btn-primary" onClick={() => deleteLink(i.id)}>Yes</label>
                                                      <label htmlFor={`delete-`+i.id} className="btn btn-secondary">No</label>
                                                   </div>
                                                </div>
                                             </div>
                                             {/* End Delete Modal */}

                                             </div>
                                             <div className="flex-grow">
                                                <div className="inline-block w-[200px] cursor-pointer">
                                                   <span className="truncate block">
                                                   {i.button_text}
                                                   </span>
                                             </div>
                                             </div>
                                             <div className="flex-grow">
                                             
                                             <div className="inline-block w-[100%] badge badge-primary cursor-pointer">
                                                <div className="group flex relative">
                                                   <span className="truncate block">
                                                   {i.url}
                                                   </span>
                                                   <span className="group-hover:opacity-100 transition-opacity bg-gray-800 px-1 text-sm text-gray-100 rounded-md absolute left-1/2 
                                                   -translate-x-1/2 translate-y-full opacity-0 m-4 mx-auto">{i.url}
                                                   </span>
                                                </div>
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
   }
   </>
   );
};

export default SetLinks;
