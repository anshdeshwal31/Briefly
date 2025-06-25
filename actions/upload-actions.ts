'use server';

import { generateSummaryFromOpenAI } from '@/lib/openai'; // Assuming this path is correct
import { fetchAndExtractPdfText } from '@/lib/langchain'; // Assuming this path is correct
import { getSummaryFromGemini } from '@/lib/gemini';

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

    let summary;
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

    return {
      success: true,
      message: 'Summary generated successfully! ✨',
      data: { summary},
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