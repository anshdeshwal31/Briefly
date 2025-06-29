'use server';

import { generateSummaryFromOpenAI } from '@/lib/openai'; // Assuming this path is correct
import { fetchAndExtractPdfText } from '@/lib/langchain'; // Assuming this path is correct
import { getSummaryFromGemini } from '@/lib/gemini';
import { getDbConnection } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { formatFileNameAsTitle } from '@/utils/format-utils';
import { revalidatePath } from 'next/cache';

interface pdfSummaryType{userId?:string ,fileUrl: string,summary :string , title : string , fileName : string}

export async function generatePdfSummary(
  uploadResponse: {
    serverData: {
      userId: string;
    };
    userId: string;
    url: string;
    name: string;
  }[]
) {
  console.log("start of the generatePdfSummary function ")
  if (!uploadResponse) {
    return {
      success: false,
      message: 'File upload failed',
      data: null,
    };
  }

  // Destructure the first element of the uploadResponse array
  console.log("uploadResponse inside generatePdfSummary function", uploadResponse)
  
  const {
    serverData: { userId },
    url: pdfUrl, name: fileName ,
  } = uploadResponse[0];
  
  console.log("line break")
  console.log("userId", userId)
  console.log("line break")
  console.log({pdfUrl})
  console.log("line break")
  console.log({fileName})

  if (!pdfUrl) {
    return {
      success: false,
      message: 'File upload failed',
      data: null,
    };
  }

  try {
    const pdfText = await fetchAndExtractPdfText(pdfUrl);
    // Further processing of pdfText would go here (e.g., summarization, saving to DB)
    // For now, let's just return a success message with the text length
    console.log("line break")
    console.log({pdfText})

    let summary:any;
    try {
      summary = await generateSummaryFromOpenAI(pdfText);
      // console.log({summary})

    } catch (error) {
      console.log({error})

      try {
        if(error instanceof Error && error.message=='RATE_LIMIT_EXCEEDED'){
          summary = await getSummaryFromGemini(pdfText)
        }
      } catch (geminiError) {
        console.log("Gemini API failed after OpenAI quota excedded",geminiError)

        throw new Error("Failed to generate summary with available AI providers")
      }
      // call gemini
    }

    if (!summary) {
      console.log("line break")
      console.log({summary})
      return {
        success: false,
        message: 'Failed to generate summary from PDF text. summary is empty',
        data: null,
      };
    }

    console.log({summary})
    const formattedTitle = formatFileNameAsTitle(fileName)
    return {
      success: true,
      message: 'Summary generated successfully! ✨',
      data: { summary ,title:formattedTitle},
    };
  } catch (err) {
    console.error('Error extracting PDF text:', err);
    return {
      success: false,
      message: 'Failed to extract text from PDF',
      data: null,
    };
  }
}

export const savePdfSummary =async ({userId , fileUrl, summary , title , fileName}:pdfSummaryType) => {
  try {
    const sql = await getDbConnection();
    const [savedSummary] = await sql`INSERT INTO pdf_summaries(
    user_id,
    original_file_url,
    summary_text,
    title,
    file_name
    ) VALUES(
      ${userId} , 
      ${fileUrl} ,
      ${summary},
      ${title},
      ${fileName}
     )RETURNING id , summary_text`

     return savedSummary;
     
     return {
      success:true, 
      message:"saved the pdf successfully"
     }
  } catch (error) {
      console.log("error while saving pdf", error)
      throw error
  }
}

export const storePdfSummaryAction = async ({fileUrl , summary  , title , fileName}:pdfSummaryType) => {
  let savedSummary:any;
  try {
    const {userId} =  await auth()
    
    if(!userId){
      return {
        success: false,
        message: "user not found"
      }
    }

    console.log("calling savePdfSummary inside the storePdfSummary");
    savedSummary = await savePdfSummary({
      userId,
      fileUrl,
      summary,
      title ,
      fileName
    })


    console.log({savedSummary})
    if(!savedSummary){
      console.log({savedSummary})
      return {
        success: false,
        message: "failed to save the pdf"
      }
    }

    
  } catch (error) {
    console.log("error while saving pdf : ",error)
    return {
      success:false,
      message: error instanceof Error? error.message:"failed to save the pdf"
      
    }
  }

  console.log("before revalidating the path and after saving the pdf in the db")
  revalidatePath(`/summaries/${savedSummary.id}`)

  console.log("pdf saved successfully")
  return {
    success:true,
    message:"pdf saved successfully",
    data:{
      id:savedSummary.id
    }
  }

}