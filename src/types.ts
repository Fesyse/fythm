import { VercelPgDatabase } from "drizzle-orm/vercel-postgres"
import { NodePgDatabase } from "drizzle-orm/node-postgres"
import * as schema from "@/db/schema"

export type Database =
	| VercelPgDatabase<typeof schema>
	| NodePgDatabase<typeof schema>
