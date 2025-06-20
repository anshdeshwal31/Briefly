import {cn} from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

export const NavLink = ({href, children, className}:{href:string , children:ReactNode , className?:string}) => { 
    const pathname = usePathname();
    const isActive = pathname === href ||(pathname != '/' && pathname.startsWith(href));
    return (
        <Link href={href} className={cn('transition-colors duration-300 text-sm text-gray-600 hover:text-rose-500',className , isActive && 'text-rose-500')}>{children}</Link>
        )
 }