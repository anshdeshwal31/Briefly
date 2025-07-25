'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { LoadingSkeleton } from './loading-skeleton';

interface UploadFormInputProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const UploadFormInput = ({ onSubmit ,ref,isLoading }:{onSubmit:(e: React.FormEvent<HTMLFormElement>) => void,ref:React.Ref<HTMLFormElement>,isLoading:boolean}) => {
  console.log("loading",isLoading)
    return (
      <div className='space-y-6'>
        <form ref={ref} className="flex flex-col gap-6" onSubmit={onSubmit}>
          <div className="flex justify-end items-center gap-1.5">
            <Input
              id="file"
              type="file"
              name="file"
              accept="application/pdf"
              required
              className={cn(isLoading && 'opacity-50 cursor-not-allowed')}
              disabled= {isLoading}
              />
            <Button disabled={isLoading} className={cn(isLoading&&'opacity-50')}>{isLoading?<div className='flex'>
                      <Loader2 className='mr-2 h-4 w-4 animate-spin'/>Processing...
                    </div>:'Upload your PDF'}</Button>
          </div>
        </form>
        {isLoading && <p>Processing</p>}
         {isLoading && <LoadingSkeleton/> }   
      </div>
    );
  }

UploadFormInput.displayName = 'UploadFormInput';

export default UploadFormInput;