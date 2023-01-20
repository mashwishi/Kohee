import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { useClerk } from "@clerk/nextjs";
import useAnalyticsEventTracker from "../global/useAnalyticsEventTracker";
import { useEffect, useState } from "react";
import axios from "axios";
import CountUp from "react-countup";
import NumberFormatter from "../global/NumberFormatter";
import ReactGA from 'react-ga'
import Marquee from "react-fast-marquee";


const Landing: NextPage = () => {

    const { openSignIn } = useClerk();

    const gaEventTracker = useAnalyticsEventTracker('Mobile - Landing');

    ReactGA.pageview('Home')

    const [activeUsers, setActiveUsers] = useState(0);

  return (
    <>
        <section className="px-2 py-32 bg-white md:px-0">
        <div className="container items-center max-w-6xl px-8 mx-auto xl:px-5">
            <div className="flex flex-wrap items-center sm:-mx-3">
            <div className="w-full md:w-1/2 md:px-3">

                {/* <div className="flex justify-center mb-24">
                    <Image className="cursor-pointer mx-auto sm:w-1/4" src="/kohee-fill.webp" alt="kohee" width="235" height="255" priority />
                </div> */}

                <div className="flex justify-center">
                    <div className="flex justify-center content-center relative" >

                        <div className="cursor-pointer animate-bounce">
                            <Image  src="/kohee_cup.webp" alt="kohee" width="300" height="330"  priority/>
                        </div>
                        <div className="cursor-pointer ml-[-55px] mt-[80px] animate-bounce">
                            <Image src="/splash.png" width="25" height="60" alt="kohee" priority/>
                        </div>
                    
                    </div>
                    
                </div>
                
                <div className="w-full pb-6 space-y-6 sm:max-w-md lg:max-w-lg md:space-y-4 lg:space-y-8 xl:space-y-9 sm:pr-5 lg:pr-0 md:pb-0">
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-4xl lg:text-5xl xl:text-5xl">

                    <span className="block text-[#4f2c15] xl:inline">Create</span>
                    <span className="block text-primary xl:inline"> your link profile in minutes!</span>

                </h1>
                <p className="mx-auto text-base text-gray-500 sm:max-w-md lg:text-xl md:max-w-3xl">
                    All of you are welcome in Kohee. Gather all of the content you produce, curate, and share online, no matter where it is dispersed, and reassemble it in one place –your Kohee — where it can be easily found.
                </p>

                <div className="relative flex flex-col sm:flex-row sm:space-x-4">
                    
                    <button onClick={() => {openSignIn(); gaEventTracker('Create Account', 'Create Account');} } className="flex items-center w-full px-6 py-3 mb-3 text-lg text-white bg-[#4f2c15] rounded-md sm:mb-0 hover:bg-[#7A4521] sm:w-auto">
                    Create Account 
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                    </button>

                    <button onClick={() => { window.open('https://ko-fi.com/koheeApp');}} className="flex items-center px-6 py-3 text-gray-500 bg-gray-100 rounded-md hover:bg-gray-200 hover:text-gray-600">
                        <span className="mr-2">
                            {`Support the Project`}   
                        </span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M.11 3.187A.5.5 0 0 1 .5 3h13a.5.5 0 0 1 .488.608l-.22.991a3.001 3.001 0 0 1-1.3 5.854l-.132.59A2.5 2.5 0 0 1 9.896 13H4.104a2.5 2.5 0 0 1-2.44-1.958L.012 3.608a.5.5 0 0 1 .098-.42Zm12.574 6.288a2 2 0 0 0 .866-3.899l-.866 3.9ZM1.124 4l1.516 6.825A1.5 1.5 0 0 0 4.104 12h5.792a1.5 1.5 0 0 0 1.464-1.175L12.877 4H1.123Z"/>
                        </svg>
                    </button>

                </div>
                </div>
            </div>
            </div>
        </div>
        </section>

        <section className="px-4 py-4 mx-auto max-w-7xl pointer-events-none">
            <h1 className="mb-4 text-sm font-bold tracking-wide text-center text-gray-800 uppercase">We&apos;re proud to use these amazing frameworks and services.</h1>
            <Marquee>
                <div className="mr-16">
                <Image src="/logos/vercel.png" width="200" height="120" alt="vercel" priority/>
                </div>
                <div className="mr-16">
                <Image src="/logos/github.png" width="200" height="110" alt="github" priority/>
                </div>
                <div className="mr-16">
                <Image src="/logos/hasura.png" width="200" height="60" alt="hasura" priority/>
                </div>
                <div className="mr-16">
                <Image src="/logos/clerk.png" width="200" height="60" alt="clerk" priority/>
                </div>
                <div className="mr-16">
                <Image src="/logos/daisyui.png" width="200" height="60" alt="daisyui" priority/>
                </div>
                <div className="mr-16">
                <Image src="/logos/tailwind.png" width="300" height="38" alt="tailwind" priority/>
                </div>
                <div className="mr-16">
                <Image src="/logos/hostinger.png" width="200" height="55" alt="hostinger" priority/>
                </div>
                <div className="mr-16">
                <Image src="/logos/clickup.png" width="200" height="50" alt="clickup" priority/>
                </div>
            </Marquee>
        </section>

        {/* Our Team */}
        <section className="text-gray-600 body-font">
            <div className="py-12 bg-gray-50">
                <div className="container mx-auto px-6 md:px-12 xl:px-32">
                    <div className="mb-16 text-center">
                        <h2 className="mb-4 text-center text-2xl text-gray-900 font-bold md:text-4xl">Our Team</h2>
                        <p className="text-gray-600 lg:w-8/12 lg:mx-auto">
                        Here at Kohee, we&apos;re a tight-knit group of individuals who are passionate about what we do. Our team includes a mix of creatives, problem-solvers, and go-getters who work together to make our products and services the best they can be. Whether it&apos;s designing a new product, troubleshooting an issue, or just having a good time, we&apos;re a fun-loving bunch who are always up for a challenge. We&apos;re not the most professional team out there, but we are a team that is dedicated to our work and to providing a positive experience for our customers.
                        </p>
                    </div>
                    <div className="grid gap-12 items-center md:grid-cols-3">
                        <div className="space-y-4 text-center">
                            <img className="w-64 h-64 mx-auto object-cover rounded-xl md:w-40 md:h-40 lg:w-64 lg:h-64" 
                                src="https://i.imgur.com/BYCIC8b.jpg" alt="Michael" loading="lazy" width="640" height="805" />
                            <div>
                                <h4 className="text-2xl">Michael D.</h4>
                                <span className="block text-sm text-gray-500">Front-end Developer</span>
                            </div>
                        </div>
                        <div className="space-y-4 text-center">
                            <img className="w-64 h-64 mx-auto object-cover rounded-xl md:w-48 md:h-64 lg:w-64 lg:h-80" 
                                src="https://i.imgur.com/lZODSsL.jpg" alt="Mathew" loading="lazy" width="1000" height="667" />
                            <div>
                                <h4 className="text-2xl">Mathew Agustin B.</h4>
                                <span className="block text-sm text-gray-500">Founder and Full-Stack Developer</span>
                            </div>
                        </div>
                        <div className="space-y-4 text-center">
                            <img className="w-64 h-64 mx-auto object-cover rounded-xl md:w-40 md:h-40 lg:w-64 lg:h-64" 
                                src="https://i.imgur.com/fDSBk11.png" alt="you" loading="lazy" width="1000" height="667" />
                            <div>
                                <h4 className="text-2xl">You</h4>
                                <span className="block text-sm text-gray-500">Be part of our team!</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* FAQ */}
        <section className="px-4 py-14 mx-auto max-w-7xl">
            <h2 className="mb-4 text-xl font-bold md:text-3xl">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 gap-0 text-gray-600 md:grid-cols-2 md:gap-16">
                <div>
                <h5 className="mt-10 mb-3 font-semibold text-gray-900">What is Kohee?</h5>
                <p>
                Kohee is a tool that helps you keep all your online links in one place. You can use a personalized link to share everything you want, and add it to your social media bios, email signatures, business cards, and anywhere else people might find you.
                </p>
                <h5 className="mt-10 mb-3 font-semibold text-gray-900">What is Kohee used for?</h5>
                <p>
                Kohee is a tool that lets you share multiple links from your social media bios and other online platforms such as email signatures, video descriptions, show notes, live streams, webinars, and even offline using QR codes. It helps connect people to your online identity.
                </p>

                <h5 className="mt-10 mb-3 font-semibold text-gray-900">Why do I need a Kohee?</h5>
                <p>
                Kohee is a tool that helps you share all your links in one place. It makes it easy for your audience to find everything you have to offer, everything you do and everything you care about. You can add it to your social media bios, use it in your email signatures and even display it as a QR code to connect with your offline audience. Kohee is easy to use and accessible to everyone.
                </p>

                <h5 className="mt-10 mb-3 font-semibold text-gray-900">Is Kohee safe to use on all of my social media profiles?</h5>
                <p>
                Kohee is a widely used tool among social media platforms. Many users of Facebook, Instagram, and TikTok have found it useful for their accounts. As a link-in-bio tool, it generates a personalized URL which can be added to social media bios, email signatures, and other online platforms. It condenses multiple links into one, making it easier for your followers, visitors, and customers to find everything the&apos;re looking for in one place. Additionally, it can also be displayed as a QR code to connect with offline audiences, making it a safe and familiar link for audiences to click on.
                </p>

                <h5 className="mt-10 mb-3 font-semibold text-gray-900">Is Kohee free for open-source?</h5>
                <p>Yes. No strings attached. Free forever.</p>

                </div>
                <div>
                <h5 className="mt-10 mb-3 font-semibold text-gray-900">How can I drive more traffic to and through my Kohee?</h5>
                <p>
                By sharing your Kohee link on all your social media platforms, you can ensure that your most important content is easily accessible to all your followers. Additionally, using QR codes can generate online traffic from offline places and drive people to your links. Once visitors land on your Kohee, the analytics provided will help you understand where they&apos;re coming from and what they&apos;re clicking on. This way, you can quickly identify what&apos;s working and what&apos;s not, and make adjustments on the fly with different link placement, prioritized links, subheadings, animation, and other features to direct traffic to your desired locations.
                </p>
                
                <h5 className="mt-10 mb-3 font-semibold text-gray-900">How many links should I have on my Kohee?</h5>
                <p>
                The number of links on your Kohee depends on what you want to achieve. If your goal is to increase clicks and conversions, it&apos;s best to have 3-7 links on your Kohee at one time, as this has been the most effective approach for successful creators. Having too many options for visitors can slow down their decision-making process.
                </p>

                <h5 className="mt-10 mb-3 font-semibold text-gray-900">Do I need a website to use Kohee?</h5>
                <p>
                No, you don&apos;t need a website to use Kohee. Kohee can serve as your personal mini-website where you can share, sell, and grow your brand without the need for time and effort to build and maintain a traditional website. It allows you to quickly create a design that reflects your personality and brand with no previous knowledge or experience required. Even if you already have a website, you can still add it to your Kohee.
                </p>
                
                <h5 className="mt-10 mb-3 font-semibold text-gray-900">Where can I download the Kohee app?</h5>
                <p>
                Our app is currently under development and we are working hard to bring you the best possible experience. We appreciate your patience and can&apos;t wait for you to try it out!
                </p>
                </div>
            </div>
        </section>

        {/* App */}
        <section className="text-gray-600 body-font">
            <div className="container px-5 lg:px-36 py-12 mx-auto flex items-center md:flex-row flex-col">
                <div className="flex flex-col md:pr-10 md:mb-0 mb-6 pr-0 w-full md:w-auto md:text-left text-center">
                <h2 className="text-xs text-primary tracking-widest font-medium title-font mb-1">COMING SOON</h2>
                <h1 className="md:text-3xl text-2xl font-bold title-font text-gray-900">Download Kohee</h1>
                </div>
                <div className="flex md:ml-auto md:mr-0 mx-auto items-center flex-shrink-0 space-x-4">
                <button className="bg-gray-100 inline-flex py-3 px-5 rounded-lg items-center hover:bg-gray-200 focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 512 512">
                    <path d="M99.617 8.057a50.191 50.191 0 00-38.815-6.713l230.932 230.933 74.846-74.846L99.617 8.057zM32.139 20.116c-6.441 8.563-10.148 19.077-10.148 30.199v411.358c0 11.123 3.708 21.636 10.148 30.199l235.877-235.877L32.139 20.116zM464.261 212.087l-67.266-37.637-81.544 81.544 81.548 81.548 67.273-37.64c16.117-9.03 25.738-25.442 25.738-43.908s-9.621-34.877-25.749-43.907zM291.733 279.711L60.815 510.629c3.786.891 7.639 1.371 11.492 1.371a50.275 50.275 0 0027.31-8.07l266.965-149.372-74.849-74.847z"></path>
                    </svg>
                    <span className="ml-4 flex items-start flex-col leading-none">
                    <span className="text-xs text-gray-600 mb-1">GET IT ON</span>
                    <span className="title-font font-medium">Google Play</span>
                    </span>
                </button>
                <button className="bg-gray-100 inline-flex py-3 px-5 rounded-lg items-center hover:bg-gray-200 focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 305 305">
                    <path d="M40.74 112.12c-25.79 44.74-9.4 112.65 19.12 153.82C74.09 286.52 88.5 305 108.24 305c.37 0 .74 0 1.13-.02 9.27-.37 15.97-3.23 22.45-5.99 7.27-3.1 14.8-6.3 26.6-6.3 11.22 0 18.39 3.1 25.31 6.1 6.83 2.95 13.87 6 24.26 5.81 22.23-.41 35.88-20.35 47.92-37.94a168.18 168.18 0 0021-43l.09-.28a2.5 2.5 0 00-1.33-3.06l-.18-.08c-3.92-1.6-38.26-16.84-38.62-58.36-.34-33.74 25.76-51.6 31-54.84l.24-.15a2.5 2.5 0 00.7-3.51c-18-26.37-45.62-30.34-56.73-30.82a50.04 50.04 0 00-4.95-.24c-13.06 0-25.56 4.93-35.61 8.9-6.94 2.73-12.93 5.09-17.06 5.09-4.64 0-10.67-2.4-17.65-5.16-9.33-3.7-19.9-7.9-31.1-7.9l-.79.01c-26.03.38-50.62 15.27-64.18 38.86z"></path>
                    <path d="M212.1 0c-15.76.64-34.67 10.35-45.97 23.58-9.6 11.13-19 29.68-16.52 48.38a2.5 2.5 0 002.29 2.17c1.06.08 2.15.12 3.23.12 15.41 0 32.04-8.52 43.4-22.25 11.94-14.5 17.99-33.1 16.16-49.77A2.52 2.52 0 00212.1 0z"></path>
                    </svg>
                    <span className="ml-4 flex items-start flex-col leading-none">
                    <span className="text-xs text-gray-600 mb-1">Download on the</span>
                    <span className="title-font font-medium">App Store</span>
                    </span>
                </button>
                </div>
            </div>
        </section>

    </>

    
  );
};

export default Landing;






