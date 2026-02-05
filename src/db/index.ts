import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
// TODO: Inject context
export function createDbConnection() {
  const dbUrl = process.env.DATABASE_URL ?? "";
  if (!dbUrl) {
    throw new Error("DATABASE_URL is not set");
  }

  const db = drizzle(dbUrl, { schema });
  return db;
}
