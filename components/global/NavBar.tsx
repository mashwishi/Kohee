
import type { NextPage } from "next";
import { useClerk, SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { SetStateAction, useState } from "react";
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
                        <div className="flex w-full sm:w-auto items-center sm:items-stretch justify-end sm:justify-start">
                            <div className="flex items-center">
                                <Link href='/'>
                                    <Image className="cursor-pointer" src="/text-logo.png" alt="kohee" width="100%" height={20} priority />
                                </Link>
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
                                <Link href='/referral'>
                                    <a className="flex px-5 items-center py-6 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none transition duration-150 ease-in-out">
                                        <span className="mr-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" className="bi bi-people-fill" viewBox="0 0 16 16" strokeWidth="1.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/>
                                            </svg>
                                        </span>
                                        Referral
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
                                    <a href="https://docs.kohee.app" className="flex px-5 items-center py-6 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none transition duration-150 ease-in-out">
                                        <span className="mr-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-code" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" />
                                                <polyline points="7 8 3 12 7 16" />
                                                <polyline points="17 8 21 12 17 16" />
                                                <line x1={14} y1={4} x2={10} y2={20} />
                                            </svg>
                                        </span>
                                        Docs
                                    </a>
                                <Link href='/faq'>
                                    <a className="flex px-5 items-center py-6 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none transition duration-150 ease-in-out">
                                        <span className="mr-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-patch-question" viewBox="0 0 16 16">
                                                <path d="M8.05 9.6c.336 0 .504-.24.554-.627.04-.534.198-.815.847-1.26.673-.475 1.049-1.09 1.049-1.986 0-1.325-.92-2.227-2.262-2.227-1.02 0-1.792.492-2.1 1.29A1.71 1.71 0 0 0 6 5.48c0 .393.203.64.545.64.272 0 .455-.147.564-.51.158-.592.525-.915 1.074-.915.61 0 1.03.446 1.03 1.084 0 .563-.208.885-.822 1.325-.619.433-.926.914-.926 1.64v.111c0 .428.208.745.585.745z"/>
                                                <path d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911l-1.318.016z"/>
                                                <path d="M7.001 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0z"/>
                                            </svg>
                                        </span>
                                        FAQ
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
                        <Link href='/'>
                            <Image  id="logo" className="cursor-pointer" src="/text-logo.png" alt="kohee" width="100%" height={20} priority />
                        </Link>
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
                    <div className="bg-gray-800 opacity-50 w-full h-screen" onClick={() => setShow(!show)} />
                    <div className="w-64 z-40 fixed overflow-y-auto z-40 top-0 bg-white shadow h-full flex-col justify-between xl:hidden pb-4 transition duration-150 ease-in-out">
                        <div className="px-6 h-full">
                            <div className="flex flex-col justify-between h-full w-full">

                                <div>

                                    <div className="mt-6 flex w-full items-center justify-between">
                                        <div className="flex items-center justify-between w-full">
                                            <div className="flex items-center">
                                            <Link href='/'>
                                                <Image className="cursor-pointer" src="/text-logo.png" alt="kohee" width="100%" height={20} priority />
                                            </Link>
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
                                                        <div className="w-6 h-6 md:w-8 md:h-8 text-[#7A4521]">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-grid" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                                <path stroke="none" d="M0 0h24v24H0z" />
                                                                <rect x={4} y={4} width={6} height={6} rx={1} />
                                                                <rect x={14} y={4} width={6} height={6} rx={1} />
                                                                <rect x={4} y={14} width={6} height={6} rx={1} />
                                                                <rect x={14} y={14} width={6} height={6} rx={1} />
                                                            </svg>
                                                        </div>
                                                        <p className="text-[#7A4521] xl:text-base text-base ml-3">Dashboard</p>
                                                    </div>
                                                </li>
                                            </a>
                                        </Link>
                                        </SignedIn>
                                        <Link href='/referral'>
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
                                                            <p className="text-gray-800 xl:text-base md:text-2xl text-base ml-3">Referral</p>
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
                                        <a href='https://docs.kohee.app'>
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
                                                            <p className="text-gray-800 xl:text-base md:text-2xl text-base ml-3">Docs</p>
                                                        </div>
                                                    </div>
                                                </li>
                                            </a>
                                        </a>
                                        <Link href='/faq'>
                                            <a className="cursor-pointer">
                                                <li className="text-gray-800 pt-8">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center">
                                                            <div className="w-6 h-6 md:w-8 md:h-8 text-gray-800">
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-patch-question" viewBox="0 0 16 16">
                                                                    <path d="M8.05 9.6c.336 0 .504-.24.554-.627.04-.534.198-.815.847-1.26.673-.475 1.049-1.09 1.049-1.986 0-1.325-.92-2.227-2.262-2.227-1.02 0-1.792.492-2.1 1.29A1.71 1.71 0 0 0 6 5.48c0 .393.203.64.545.64.272 0 .455-.147.564-.51.158-.592.525-.915 1.074-.915.61 0 1.03.446 1.03 1.084 0 .563-.208.885-.822 1.325-.619.433-.926.914-.926 1.64v.111c0 .428.208.745.585.745z"/>
                                                                    <path d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911l-1.318.016z"/>
                                                                    <path d="M7.001 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0z"/>
                                                                </svg>
                                                            </div>
                                                            <p className="text-gray-800 xl:text-base md:text-2xl text-base ml-3">FAQ</p>
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
                                                    <p className=" text-gray-800 text-base leading-4 ml-2 font-medium">{user?.username ? user?.username?.toString() : user?.fullName?.toString() }</p>
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


