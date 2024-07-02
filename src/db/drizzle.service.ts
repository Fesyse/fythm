import { Injectable, OnModuleInit } from "@nestjs/common"

import {
	drizzle as vercelDrizzle,
	VercelPgDatabase
} from "drizzle-orm/vercel-postgres"
import { drizzle as postgresDrizzle } from "drizzle-orm/node-postgres"

import "@/db/envConfig"
import * as schema from "./schema"
import { sql } from "@vercel/postgres"
import { Client } from "pg"
import { Database } from "@/types"

@Injectable()
export class DrizzleService implements OnModuleInit {
	private db: VercelPgDatabase<typeof schema>

	async onModuleInit() {
		try {
			let db: Database
			switch (process.env.ENV_MODE) {
				case "production":
					db = vercelDrizzle(sql, {
						schema
					})
					break
				case "development":
					const client = new Client({
						connectionString: process.env.DEVELOPMENT_DB_URL
					})
					db = postgresDrizzle(client, {
						schema
					})
					break
				default:
					throw new Error("ENV_MODE is not provided in .env file.")
			}
			this.db = db
			console.log("Database connected successfully")
		} catch (error) {
			console.error("Failed to connect to the database", error)
			throw error
		}
	}

	getDb() {
		return this.db
	}
}
