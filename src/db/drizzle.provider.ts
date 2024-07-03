import { Database } from "@/types"
import { sql as vercelSql } from "@vercel/postgres"
import { drizzle as vercelDrizzle } from "drizzle-orm/vercel-postgres"
import { drizzle as postgresDrizzle } from "drizzle-orm/node-postgres"
import * as schema from "@/db/schema"
import { Client } from "pg"

export const DrizzleAsyncProvider = "drizzleProvider"

export const drizzleProvider = [
	{
		provide: DrizzleAsyncProvider,
		useFactory: async () => {
			let db: Database
			switch (process.env.ENV_MODE) {
				case "production":
					db = vercelDrizzle(vercelSql, {
						schema
					})
					break
				case "development":
					const client = new Client({
						connectionString: process.env.DEVELOPMENT_DB_URL
					})
					await client.connect()
					db = postgresDrizzle(client, {
						schema
					})
					break
				default:
					throw new Error("ENV_MODE is not provided in .env file.")
			}
			return db
		}
	}
]
