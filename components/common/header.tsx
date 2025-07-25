

import { Crown, Divide, FileText } from 'lucide-react';
import { NavLink } from '@/components/common/nav-link';
import {Button} from '@/components/ui/button';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { getDbConnection } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { Badge } from '../ui/badge';
import Link from 'next/link';

const PromptToSubscribe = () => { 
    return ( 
        <Link href={'/#pricing'}>
            <Badge className=' hover:cursor-pointer p-1 font-medium text-sm rounded-4xl bg-gradient-to-l from-amber-200 to-amber-400'>
                <Crown /><span className='text-black'>Buy a Plan </span> 
            </Badge>
        </Link>
    )
 }

const Header =  async () => {
    const {userId} = await auth();
    const sql = await getDbConnection();
    const rows = await sql`SELECT status FROM users WHERE user_id=${userId}`
    const hasActiveSubscription = rows[0]?.status=='active'
    
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
                <NavLink href="/dashboard" className='text-md'>Your Summaries</NavLink>
            </SignedIn>
        </div>

        <div className="flex justify-end items-center ">
            <SignedIn>
                <div className='flex gap-4 pt-2 items-center'>
                    {hasActiveSubscription?<div className='flex gap-3'>
                        <NavLink href="/upload" className=''>Upload a PDF</NavLink>
                        <div className="">Pro</div>
                    </div>:<PromptToSubscribe/>}
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
