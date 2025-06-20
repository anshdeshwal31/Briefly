'use client';

import { FileText } from 'lucide-react';
import { NavLink } from '@/components/common/nav-link';
import { useState } from 'react';
import {Button} from '@/components/ui/button';

const Header = () => {
    const [isLoggedIn,setIsLoggedIn] = useState<boolean>(false);
    
  return (
    <nav className='flex justify-between container items-center py-4 lg:px-8 px-4 mx-auto'>
        <div className="">
            <NavLink href="/" className='flex hover:cursor-pointer items-center '>
                <FileText className='w-5 h-5 lg:w-8 lg:h-8 text-gray-900 hover:rotate-15 transition duration-500'/>
                <span className='font-extrabold text-gray-900 lg:text-xl'>Sommaire</span>
            </NavLink>
        </div>
        
        <div className=" flex justify-center items-center lg:gap-12 gap-4">
            <NavLink href="/#pricing">pricing</NavLink>
            {isLoggedIn && <NavLink href="/dashboard">Your Summaries</NavLink>}
        </div>

        <div className="flex justify-end items-center">
            {isLoggedIn ?
                (
                <div>
                    <NavLink href="/upload">Upload a PDF</NavLink>
                    <div className="">Pro</div>
                    <Button>User</Button>
                </div> ) : 
                (
                <div className="">
                    <NavLink href="/sign-in">Sign In</NavLink>
                </div>
                ) }
        </div>
    </nav>
  )
}

export default Header
