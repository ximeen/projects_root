import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { env } from "@shared/utils/env";
import * as schema from "./schema/index";

const client = postgres(env.DATABASE_URL);
export const db = drizzle(client, { schema });
