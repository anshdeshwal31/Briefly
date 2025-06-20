import { SignUp } from '@clerk/nextjs'
import BgGradient from '@/components/common/bg-gradient'

export default function Page() {
      return ( 
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12 justify-center items-center flex b">
            
        <BgGradient className='from-rose-500 via-rose-200 to-orange-200'/>
          <SignUp />
        </div>
        )
}