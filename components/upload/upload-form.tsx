'use client';

import UploadFormInput from '@/components/upload/upload-form-input';
import { useUploadThing } from '@/utils/uploadthing'; // Assuming this path is correct
import { z } from 'zod';
import {toast} from "sonner"
import { generatePdfSummary, storePdfSummaryAction } from '@/actions/upload-actions'; // Assuming this path is correct
import { useRef, useState } from 'react';
import { getDbConnection } from '@/lib/db';
import { Router } from 'lucide-react';
import { useRouter } from 'next/navigation';

const schema = z.object({
  file: z
    .instanceof(File, { message: 'Invalid file' })
    .refine((file) => file.size <= 20 * 1024 * 1024, 'File size must be less than 20MB')
    .refine((file) => file.type.startsWith('application/pdf'), 'File must be a PDF'),
});

export default function UploadForm() {
  console.log("inside the upload form component ")
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { startUpload} = useUploadThing('pdfUploader', {
    onClientUploadComplete: () => {
      console.log('uploaded successfully!');
    },
    onUploadError: (err) => {
      console.log('error occurred while uploading', err);
      toast("An error occurred while uploading the file. Please try again.", {
        description: err.message,
      })
    },
    onUploadBegin: ({ file }) => {
      console.log('upload has begun for', file );
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("inside the handle sumbit handler")
    try {
      setIsLoading(true);
      console.log('submitted');
      const formData = new FormData(e.currentTarget);
      const file = formData.get('file') as File;
      
    //validating the fields
    const validatedFields = schema.safeParse({ file });

    console.log({validatedFields});

    if (!validatedFields.success) {
      toast("❌ Something went wrong", {
        description: validatedFields?.error?.flatten().fieldErrors.file?.[0] ?? 'Invalid file'
      })
      setIsLoading(false);
      return;
    }
    
    toast("📄 PDF is being uploaded",
        {
            description:"Hang on tight, we are uploading your PDF file✨"
          }
    )
    
    //upload the file to uploadthing
    const resp = await startUpload([file]);
    if (!resp) {
        toast("❌ Something went wrong", {
            description:"Please use a different file or try again later."
          })
          setIsLoading(false)
          return;
    }
    
    toast("📄 PDF is being processed",
      {
        description:"Hang on tight, we are processing your PDF file✨"
      }
    )
    
    
    // TODO:
    // parse the pdf using lang chain
    console.log('upload response', resp);
    console.log("before calling generatePdfSummary")
    const result = await generatePdfSummary(resp)
    console.log("after calling generatePdfSummary")
    console.log('summary', result);
    
    const{data=null,message=null} = result || {}

    
    if(data){
      let storeResult:any;
      toast("Saving the PDF",
        {
          description:"Hang tight , we are saving your summary✨"
        }
      )
      
      if(data.summary){
        // save the summary to the database
        storeResult = await storePdfSummaryAction({summary:data.summary,
          fileUrl:resp[0].serverData.file.url,
          title: data.title,
          fileName:file.name
        })
        console.log({storeResult})
        if(storeResult.success){
          toast("Saved Summary✨",
            {description:"Generated and the saved the summary successfully"}
          )
          
            formRef.current?.reset();
            setIsLoading(false)
            router.push(`/summaries/${storeResult.data.id}`)   
        }
        }
      }
    } catch (error) {
      console.log("error occured",error)
      formRef.current?.reset();
      setIsLoading(false)
    }
    finally{
      setIsLoading(false)
    }
    // summarize the pdf using AI
    // redirect to the [id] summary page
    

  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInput ref={formRef} onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  );
}