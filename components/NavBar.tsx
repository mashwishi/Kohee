
import type { NextPage } from "next";
import { useClerk, SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const NavBar: NextPage = () => {

  const { openSignIn } = useClerk();
  const [show, setShow] = useState(false);
  const [profile, setProfile] = useState(false);
  const [product, setProduct] = useState(false);
  const [deliverables, setDeliverables] = useState(false);
  const { user } = useUser();

  return (
    <>

        <div className="bg-gray-200 h-full w-full">
            {/* Code block starts */}
            <nav className="bg-white shadow xl:block hidden">
                <div className="mx-auto container px-6 py-2 xl:py-0">
                    <div className="flex items-center justify-between">
                        <div className="inset-y-0 left-0 flex items-center xl:hidden">
                            <div className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-100 focus:outline-none transition duration-150 ease-in-out">
                                <div className="visible xl:hidden">

                                    {/* Start - Menu List - Hidden on XL */}
                                    <ul className="p-2 border-r bg-white absolute rounded left-0 right-0 shadow mt-8 md:mt-8 hidden">
                                        <SignedIn>
                                        <li className="flex xl:hidden cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2 py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none">
                                            <div className="flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-grid" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" />
                                                    <rect x={4} y={4} width={6} height={6} rx={1} />
                                                    <rect x={14} y={4} width={6} height={6} rx={1} />
                                                    <rect x={4} y={14} width={6} height={6} rx={1} />
                                                    <rect x={14} y={14} width={6} height={6} rx={1} />
                                                </svg>
                                                <span className="ml-2 font-bold">Dashboard</span>
                                            </div>
                                        </li>
                                        </SignedIn>
                                        <li className="flex xl:hidden flex-col cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none flex justify-center">
                                            <div className="flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-puzzle" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" />
                                                    <path d="M4 7h3a1 1 0 0 0 1 -1v-1a2 2 0 0 1 4 0v1a1 1 0 0 0 1 1h3a1 1 0 0 1 1 1v3a1 1 0 0 0 1 1h1a2 2 0 0 1 0 4h-1a1 1 0 0 0 -1 1v3a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-1a2 2 0 0 0 -4 0v1a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h1a2 2 0 0 0 0 -4h-1a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1" />
                                                </svg>
                                                <span className="ml-2 font-bold">Products</span>
                                            </div>
                                        </li>
                                        <li className="flex xl:hidden cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-2 hover:text-indigo-700 flex items-center focus:text-indigo-700 focus:outline-none">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-compass" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" />
                                                <polyline points="8 16 10 10 16 8 14 14 8 16" />
                                                <circle cx={12} cy={12} r={9} />
                                            </svg>
                                            <span className="ml-2 font-bold">Performance</span>
                                        </li>
                                        <li className="border-b border-gray-300 flex xl:hidden cursor-pointer text-gray-600 text-sm leading-3 tracking-normal pt-2 pb-4 hover:text-indigo-700 flex items-center focus:text-indigo-700 focus:outline-none">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-code" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" />
                                                <polyline points="7 8 3 12 7 16" />
                                                <polyline points="17 8 21 12 17 16" />
                                                <line x1={14} y1={4} x2={10} y2={20} />
                                            </svg>
                                            <span className="ml-2 font-bold">API Docs</span>
                                        </li>
                                        <li className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2 py-2 hover:text-indigo-700 flex items-center focus:text-indigo-700 focus:outline-none">
                                            <div className="flex items-center">
                                                <div className="w-12 cursor-pointer flex text-sm border-2 border-transparent rounded focus:outline-none focus:border-white transition duration-150 ease-in-out">
                                                    <img className="rounded h-10 w-10 object-cover" src="https://tuk-cdn.s3.amazonaws.com/assets/components/horizontal_navigation/hn_1.png" alt="logo" />
                                                </div>
                                                <p className="text-sm ml-2 cursor-pointer">Jane Doe</p>
                                                <div className="sm:ml-2 text-white relative">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-down cursor-pointer" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z" />
                                                        <polyline points="6 9 12 15 18 9" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none">
                                            <div className="flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-user" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" />
                                                    <circle cx={12} cy={7} r={4} />
                                                    <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                                                </svg>
                                                <span className="ml-2">Profile</span>
                                            </div>
                                        </li>
                                    </ul>

                                    <svg aria-haspopup="true" aria-label="Main Menu" xmlns="http://www.w3.org/2000/svg" className="show-m-menu icon icon-tabler icon-tabler-menu" width={28} height={28} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" />
                                        <line x1={4} y1={8} x2={20} y2={8} />
                                        <line x1={4} y1={16} x2={20} y2={16} />
                                    </svg>
                                    {/* End - Menu List - Hidden on XL */}

                                </div>
                                <div className="hidden close-m-menu text-gray-700" >
                                    <svg aria-label="Close" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" />
                                        <line x1={18} y1={6} x2={6} y2={18} />
                                        <line x1={6} y1={6} x2={18} y2={18} />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="flex w-full sm:w-auto items-center sm:items-stretch justify-end sm:justify-start">
                            <div className="flex items-center">
                                <Image className="cursor-pointer" src="/text-logo.png" alt="nexus" width="100%" height={20} priority />
                            </div>
                        </div>
                        <div className="flex">

                            {/* Start - Menu List - Default */}
                            <div className="hidden xl:flex md:mr-6 xl:mr-16">
                                <SignedIn>
                                <Link href='/'>
                                    <a className="flex px-5 items-center py-6 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none transition duration-150 ease-in-out">
                                        <span className="mr-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-grid" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" />
                                                <rect x={4} y={4} width={6} height={6} rx={1} />
                                                <rect x={14} y={4} width={6} height={6} rx={1} />
                                                <rect x={4} y={14} width={6} height={6} rx={1} />
                                                <rect x={14} y={14} width={6} height={6} rx={1} />
                                            </svg>
                                        </span>
                                        Dashboard
                                    </a>
                                </Link>
                                </SignedIn>
                                <Link href='/pricing'>
                                    <a className="flex px-5 items-center py-6 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none transition duration-150 ease-in-out">
                                        <span className="mr-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-puzzle" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" />
                                                <path d="M4 7h3a1 1 0 0 0 1 -1v-1a2 2 0 0 1 4 0v1a1 1 0 0 0 1 1h3a1 1 0 0 1 1 1v3a1 1 0 0 0 1 1h1a2 2 0 0 1 0 4h-1a1 1 0 0 0 -1 1v3a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-1a2 2 0 0 0 -4 0v1a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h1a2 2 0 0 0 0 -4h-1a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1" />
                                            </svg>
                                        </span>
                                        Pricing
                                    </a>
                                </Link>
                                <Link href='/people'>
                                    <a className="flex px-5 items-center py-6 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none transition duration-150 ease-in-out">
                                        <span className="mr-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-compass" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" />
                                                <polyline points="8 16 10 10 16 8 14 14 8 16" />
                                                <circle cx={12} cy={12} r={9} />
                                            </svg>
                                        </span>
                                        Discover
                                    </a>
                                </Link>
                                <Link href='/docs/api'>
                                    <a className="flex px-5 items-center py-6 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none transition duration-150 ease-in-out">
                                        <span className="mr-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-code" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" />
                                                <polyline points="7 8 3 12 7 16" />
                                                <polyline points="17 8 21 12 17 16" />
                                                <line x1={14} y1={4} x2={10} y2={20} />
                                            </svg>
                                        </span>
                                        API Docs
                                    </a>
                                </Link>
                            </div>
                            {/* End - Menu List - Default */}

                            {/* Start - User Account - Default */}
                            <div className="hidden xl:flex items-center">
                                <SignedIn>
                                    <div className="relative md:mr-6 my-2">
                                        <Link href='/user'>
                                            <button className="focus:outline-none bg-gray-100 border-gray-300 border transition duration-150 ease-in-out hover:bg-gray-300 rounded text-gray-600 px-5 py-2 text-xs">Account</button>
                                        </Link>
                                    </div>
                                </SignedIn>
                                <div className="ml-6 relative">
                                    <div className="flex items-center relative" onClick={() => setProfile(!profile)}>
                                        <div className="cursor-pointer flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-white transition duration-150 ease-in-out">
                                                <button className="btn btn-ghost btn-circle">
                                                    <SignedIn>
                                                        <UserButton userProfileUrl="/user" afterSignOutUrl="/" />
                                                    </SignedIn>
                                                    <SignedOut>
                                                        <a onClick={() => openSignIn()}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#1F2937" viewBox="0 0 16 16">
                                                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
                                                            </svg>
                                                        </a>
                                                    </SignedOut>
                                                </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* End - User Account - Default */}

                        </div>
                    </div>
                </div>
            </nav>
            <nav>
                <div className={`py-4 px-6 w-full flex xl:hidden justify-between items-center bg-white  ${show ? `fixed` : ``}`}>
                    <div className="w-24">
                        <Image  id="logo" className="cursor-pointer" src="/text-logo.png" alt="nexus" width="100%" height={20} priority />

                    </div>
                    <div className="flex items-center">
                        <SignedIn>
                            <Link href='/user'>
                                <div className="relative mr-6 ">
                                    <button className="focus:outline-none bg-gray-100 border-gray-300 border transition duration-150 ease-in-out hover:bg-gray-300 rounded text-gray-600 px-5 py-2 text-xs">Account</button>
                                </div>
                            </Link>
                        </SignedIn>
                        <div id="menu" className="text-gray-800" onClick={() => setShow(!show)}>
                            {show ? (
                                ""
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-menu-2" width={24} height={24} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <line x1={4} y1={6} x2={20} y2={6} />
                                    <line x1={4} y1={12} x2={20} y2={12} />
                                    <line x1={4} y1={18} x2={20} y2={18} />
                                </svg>
                            )}
                        </div>
                    </div>
                </div>
                {/*Mobile responsive sidebar*/}
                <div className={show ? "w-full xl:hidden h-full absolute z-40  transform  translate-x-0 " : "   w-full xl:hidden h-full absolute z-40  transform -translate-x-full"}>
                    <div className="bg-gray-800 opacity-50 w-full h-full" onClick={() => setShow(!show)} />
                    <div className="w-64 z-40 fixed overflow-y-auto z-40 top-0 bg-white shadow h-full flex-col justify-between xl:hidden pb-4 transition duration-150 ease-in-out">
                        <div className="px-6 h-full">
                            <div className="flex flex-col justify-between h-full w-full">

                                <div>

                                    <div className="mt-6 flex w-full items-center justify-between">
                                        <div className="flex items-center justify-between w-full">
                                            <div className="flex items-center">
                                                <Image className="cursor-pointer" src="/text-logo.png" alt="nexus" width="100%" height={20} priority />
                                            </div>
                                            <div id="cross" className="text-gray-800" onClick={() => setShow(!show)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width={24} height={24} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" />
                                                    <line x1={18} y1={6} x2={6} y2={18} />
                                                    <line x1={6} y1={6} x2={18} y2={18} />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    <ul className="f-m-m">
                                        <SignedIn>
                                        <Link href='/'>
                                            <a className="cursor-pointer">
                                                <li className="text-gray-800 pt-10">
                                                    <div className="flex items-center">
                                                        <div className="w-6 h-6 md:w-8 md:h-8 text-indigo-700">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-grid" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                                <path stroke="none" d="M0 0h24v24H0z" />
                                                                <rect x={4} y={4} width={6} height={6} rx={1} />
                                                                <rect x={14} y={4} width={6} height={6} rx={1} />
                                                                <rect x={4} y={14} width={6} height={6} rx={1} />
                                                                <rect x={14} y={14} width={6} height={6} rx={1} />
                                                            </svg>
                                                        </div>
                                                        <p className="text-indigo-700 xl:text-base text-base ml-3">Dashboard</p>
                                                    </div>
                                                </li>
                                            </a>
                                        </Link>
                                        </SignedIn>
                                        <Link href='/pricing'>
                                            <a className="cursor-pointer">
                                                <li className="text-gray-800 pt-8">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center">
                                                            <div className="w-6 h-6 md:w-8 md:h-8 text-gray-800">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-puzzle" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                                    <path stroke="none" d="M0 0h24v24H0z" />
                                                                    <path d="M4 7h3a1 1 0 0 0 1 -1v-1a2 2 0 0 1 4 0v1a1 1 0 0 0 1 1h3a1 1 0 0 1 1 1v3a1 1 0 0 0 1 1h1a2 2 0 0 1 0 4h-1a1 1 0 0 0 -1 1v3a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-1a2 2 0 0 0 -4 0v1a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h1a2 2 0 0 0 0 -4h-1a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1" />
                                                                </svg>
                                                            </div>
                                                            <p className="text-gray-800 xl:text-base md:text-2xl text-base ml-3">Pricing</p>
                                                        </div>
                                                    </div>
                                                </li>
                                            </a>
                                        </Link>
                                        <Link href='/people'>
                                            <a className="cursor-pointer">
                                                <li className="text-gray-800 pt-8">
                                                    <div className="flex items-center">
                                                        <div className="w-6 h-6 md:w-8 md:h-8 text-gray-800">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-compass" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                                <path stroke="none" d="M0 0h24v24H0z" />
                                                                <polyline points="8 16 10 10 16 8 14 14 8 16" />
                                                                <circle cx={12} cy={12} r={9} />
                                                            </svg>
                                                        </div>
                                                        <p className="text-gray-800 xl:text-base md:text-2xl text-base ml-3">Discover</p>
                                                    </div>
                                                </li>
                                            </a>
                                        </Link>
                                        <Link href='/docs/api'>
                                            <a className="cursor-pointer">
                                                <li className="text-gray-800 pt-8 cursor-pointer">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center">
                                                            <div className="w-6 h-6 md:w-8 md:h-8 text-gray-800">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-code" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                                    <path stroke="none" d="M0 0h24v24H0z" />
                                                                    <polyline points="7 8 3 12 7 16" />
                                                                    <polyline points="17 8 21 12 17 16" />
                                                                    <line x1={14} y1={4} x2={10} y2={20} />
                                                                </svg>
                                                            </div>
                                                            <p className="text-gray-800 xl:text-base md:text-2xl text-base ml-3">API Docs</p>
                                                        </div>
                                                    </div>
                                                </li>
                                            </a>
                                        </Link>
                                    </ul>

                                </div>

                                <div className="w-full pt-4">

                                    <div className="flex justify-center mb-4 w-full">
                                        <div className="relative w-full">
                                            <div className="text-gray-500 absolute ml-4 inset-0 m-auto w-4 h-4">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-search" width={16} height={16} viewBox="0 0 24 24" strokeWidth={1} stroke="#A0AEC0" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" />
                                                    <circle cx={10} cy={10} r={7} />
                                                    <line x1={21} y1={21} x2={15} y2={15} />
                                                </svg>
                                            </div>
                                            <input className="bg-gray-100 focus:outline-none rounded w-full text-sm text-gray-500  pl-10 py-2" type="text" placeholder="Search User" />
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-300">
                                        <div className="w-full flex items-center  justify-center pt-2">
                                            <div className="flex items-center justify-center">
                                                <SignedIn>
                                                    <UserButton userProfileUrl="/user" afterSignOutUrl="/" />
                                                    <p className=" text-gray-800 text-base leading-4 ml-2 font-medium">{user?.username ? user?.username!.toString() : user?.fullName!.toString() }</p>
                                                </SignedIn>
                                                <SignedOut>
                                                    <div className="relative mr-6 cursor-pointer">
                                                        <button onClick={() => openSignIn()} className="focus:outline-none bg-gray-100 border-gray-300 border transition duration-150 ease-in-out hover:bg-gray-300 rounded text-gray-600 px-5 py-2 text-xs">Account</button>
                                                    </div>
                                                </SignedOut>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            {/* Code block ends */}

       

        </div>

    </>
  );
};

export default NavBar;


