'use client';

import { FileText } from 'lucide-react';
import { NavLink } from '@/components/common/nav-link';
import { useState } from 'react';
import {Button} from '@/components/ui/button';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

const Header = () => {
    
    
  return (
    <nav className='flex justify-between container items-center py-4 lg:px-8 px-4 mx-auto'>
        <div className="">
            <NavLink href="/" className='flex hover:cursor-pointer items-center '>
                <FileText className='w-5 h-5 lg:w-8 lg:h-8 text-gray-900 hover:rotate-15 transition duration-500'/>
                <span className='font-extrabold text-gray-900 lg:text-xl'>Sommaire</span>
            </NavLink>
        </div>
        
        <div className=" flex justify-center items-center  lg:gap-12 gap-4">
            <NavLink href="/#pricing" className='md:text-md lg:text-lg '>pricing</NavLink>
            <SignedIn>
                <NavLink href="/dashboard">Your Summaries</NavLink>
            </SignedIn>
        </div>

        <div className="flex justify-end items-center ">
            <SignedIn>
                <div>
                    <NavLink href="/upload">Upload a PDF</NavLink>
                    <div className="">Pro</div>
                    <UserButton/>
                </div> 
            </SignedIn>

            <SignedOut>
                <div className="">
                    <NavLink href="/sign-in" className='md:text-md lg:text-lg '>Sign In</NavLink>
                </div>
            </SignedOut>
        </div>
    </nav>
  )
}

export default Header
