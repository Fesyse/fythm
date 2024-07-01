import { Injectable, OnModuleInit } from "@nestjs/common"

import { drizzle, XataHttpDatabase } from "drizzle-orm/xata-http"

import * as schema from "./schema"
import { getXataClient } from "./xata"

@Injectable()
export class DatabaseService implements OnModuleInit {
	private db: XataHttpDatabase<typeof schema>

	async onModuleInit() {
		try {
			const xata = getXataClient()
			this.db = drizzle(xata, {
				schema
			})

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
