import { getDbConnection } from "./db"

export const getSummaries = async (userId:string|undefined) => {
    const sql = await getDbConnection();
    const summaries = sql`SELECT * FROM pdf_summaries WHERE user_id=${userId} ORDER BY created_at DESC`
    return summaries
}

export const getSummaryById = async (id:string) => {
    try {
        console.log("inside getSummaryById")
        const sql = await getDbConnection();
        const [summary] = await sql`SELECT id, user_id, title,      original_file_url,
                            summary_text, created_at, updated_at,
                            status, file_name, LENGTH(summary_text) - LENGTH(REPLACE
                            (summary_text, ' ', '')) + 1 as word_count from
                            pdf_summaries where id = ${id} ORDER BY
                            created_at DESC;`
        console.log("summary inside getSummaryById")
        console.log({summary})
        return summary;
        
    } catch (error) {
        console.log("error while getting the summary: ",error);
        return null
    }
}