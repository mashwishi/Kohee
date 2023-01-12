import type { NextPage } from "next";
import { useClerk, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const Header: NextPage = () => {

  const { openSignIn } = useClerk();

  return (
    <>
      <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="relative flex grid items-center grid-cols-2 lg:grid-cols-3">
          <ul className="flex items-center  space-x-8 lg:flex">
            <li>
              <Link href="/">
                <p className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400">Home</p>
              </Link>
            </li>
            <li>
              <Link href="/pricing">
                <p className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400">Pricing</p>
              </Link>
            </li>
            <li>
              <Link href="/people">
                <p className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400">People</p>
              </Link>
            </li>
          </ul>

          <Link href="/">
            <span className="inline-flex items-center lg:mx-auto">
              <Image className="cursor-pointer" src="/text-logo.png" alt="kohee" width="100%" height="20" priority />
            </span>
          </Link>
          <ul className="flex items-center  ml-auto space-x-8 lg:flex">
            <li>
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
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
