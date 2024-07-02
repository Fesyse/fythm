import { VercelPgDatabase } from "drizzle-orm/vercel-postgres"
import * as schema from "@/db/schema"
import { NodePgDatabase } from "drizzle-orm/node-postgres"

export type Database =
	| VercelPgDatabase<typeof schema>
	| NodePgDatabase<typeof schema>
