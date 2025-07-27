
import {neon} from "@neondatabase/serverless"

export const getDbConnection = async () => {
    
    const databaseUrl = process.env.DATABASE_URL;
    if(!databaseUrl)throw new Error ("couldn't find the database url")
    
    try {

        const sql = await neon(databaseUrl as string)
        console.log("connected to db successfully")
        console.log({sql})
        return sql
    } catch (error) {
        throw new Error("couldn't connect to the database")
    }
}