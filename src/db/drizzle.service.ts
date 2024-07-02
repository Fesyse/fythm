import { Injectable, OnModuleInit } from "@nestjs/common"

import { drizzle, VercelPgDatabase } from "drizzle-orm/vercel-postgres"

import * as schema from "./schema"
import { sql } from "@vercel/postgres"

@Injectable()
export class DrizzleService implements OnModuleInit {
	private db: VercelPgDatabase<typeof schema>

	async onModuleInit() {
		try {
			const db = drizzle(sql)

			console.log("Database connected successfully")
			return db
		} catch (error) {
			console.error("Failed to connect to the database", error)
			throw error
		}
	}

	getDb() {
		return this.db
	}
}
