
import {neon} from "@neondatabase/serverless"

export const getDbConnection = async () => {
    try {
        const sql = await neon(process.env.DATABASE_URL as string)
        console.log("connected to db successfully")
        console.log({sql})
        return sql
    } catch (error) {
        throw new Error("couldn't connect to the database")
    }
}