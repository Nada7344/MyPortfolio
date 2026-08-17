import { resolve } from 'node:path'
import { config } from 'dotenv'

export const NODE_ENV = process.env.NODE_ENV

const envPath = {
    development: `.env.development`,
}
console.log({ en: envPath[NODE_ENV] });


config({ path: resolve(`./config/${envPath[NODE_ENV]}`) })
  

export const port = process.env.PORT ?? 7000
export const APPLICATION_NAME= process.env.APPLICATION_NAME
export const DB_URI = process.env.DB_URI 
export const EMAIL = process.env.EMAIL 
export const EMAIL_APP_PASSWORD = process.env.EMAIL_APP_PASSWORD
