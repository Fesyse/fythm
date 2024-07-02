import "@/db/envConfig"
import { defineConfig } from "drizzle-kit"

export default defineConfig({
	schema: "./src/db/schema.ts",
	out: "./src/db/drizzle",
	dialect: "postgresql",
	dbCredentials: {
		url: process.env.POSTGRES_URL!
	}
})