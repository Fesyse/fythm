import "@/db/envConfig"
import { defineConfig } from "drizzle-kit"

export default defineConfig({
	schema: "./src/db/schema.ts",
	out: "./src/db/drizzle",
	dialect: "postgresql",
	dbCredentials: {
		url:
			process.env.ENV_MODE === "production"
				? process.env.POSTGRES_URL
				: process.env.DEVELOPMENT_DB_URL
	}
})
