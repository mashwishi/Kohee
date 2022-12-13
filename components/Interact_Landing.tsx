import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { useClerk } from "@clerk/nextjs";

const Interact_Landing: NextPage = () => {

const { openSignIn } = useClerk();

  return (
    <>

        <section className="px-2 py-32 bg-white md:px-0">
        <div className="container items-center max-w-6xl px-8 mx-auto xl:px-5">
            <div className="flex flex-wrap items-center sm:-mx-3">
            <div className="w-full md:w-1/2 md:px-3">

                <div className="flex justify-center mb-24">
                    <Image className="cursor-pointer mx-auto sm:w-1/4" src="/nexus-fill.png" alt="nexus" width="235" height="255" priority />
                </div>
                
                <div className="w-full pb-6 space-y-6 sm:max-w-md lg:max-w-lg md:space-y-4 lg:space-y-8 xl:space-y-9 sm:pr-5 lg:pr-0 md:pb-0">
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-4xl lg:text-5xl xl:text-5xl">

                    <span className="block text-[#4C2C1D] xl:inline">Create</span>
                    <span className="block text-primary xl:inline"> your link profile in minutes!</span>

                </h1>
                <p className="mx-auto text-base text-gray-500 sm:max-w-md lg:text-xl md:max-w-3xl">
                    All of you are welcome in Nexus. Gather all of the content you produce, curate, and share online, no matter where it is dispersed, and reassemble it in one place –your Nexus — where it can be easily found.
                </p>
                <div className="relative flex flex-col sm:flex-row sm:space-x-4">
                    
                    <button onClick={() => openSignIn()} className="flex items-center w-full px-6 py-3 mb-3 text-lg text-white bg-[#4C2C1D] rounded-md sm:mb-0 hover:bg-indigo-700 sm:w-auto">
                    Get Started 
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                    </button>

                    <Link href="/docs/api">
                        <button className="flex items-center px-6 py-3 text-gray-500 bg-gray-100 rounded-md hover:bg-gray-200 hover:text-gray-600">
                            {`< Developer />`}
                        </button>
                    </Link>

                </div>
                </div>
            </div>
            <div className="w-full md:w-1/2">
                <div className="w-full h-auto flex justify-center">
                    <div className="mockup-phone">
                        <div className="camera"></div> 
                        <div className="display overscroll-x-none">
                            <iframe 
                                className="w-[375px] h-[667px] " 
                                src={process.env.NEXT_PUBLIC_HOSTNAME + `/sample`}
                                title="NEXUS App Mobile View" 
                                scrolling="no"
                            />
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
        </section>
        
    </>
  );
};

export default Interact_Landing;






