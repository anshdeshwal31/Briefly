import {ChatGoogleGenerativeAI} from "@langchain/google-genai"
import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompts"

export const getSummaryFromGemini =async (pdfText:string) => {
    console.log("inside the get summary from gemini function")
    
    try {
        
        console.log("inside the try block")
        const llm = new ChatGoogleGenerativeAI({
            model:"gemini-1.5-flash",
            temperature:0.7
        })
        
        
        const responseFromGemini = await llm.invoke([
            [
                "system", SUMMARY_SYSTEM_PROMPT
            ],
            [
                "human",`Transform this document into an engaging, easy-to-read summary with contextually relevant emojis and proper markdown formatting:\n\n${pdfText}`
            ]
        ])
        
        console.log({responseFromGemini})
        return responseFromGemini.content
    } catch (error) {
        console.log("inside the catch block")
        console.log({error})
        throw new Error("Too many requests sent to gemini . rate limit excedded")
    }
    
}
