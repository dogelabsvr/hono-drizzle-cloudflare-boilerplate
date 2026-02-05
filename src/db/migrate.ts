// migrate.ts

import { config } from "dotenv";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

// Load environment variables into the file
config({ path: ".dev.vars" });

async function main() {
  try {
    const databaseUrl = process.env.DATABASE_URL;

    if (!databaseUrl) {
      throw new Error("DATABASE_URL environment variable is not set");
    }

    console.log("\nMigrating database...");

    const db = drizzle(postgres(databaseUrl, { ssl: "require", max: 1 }));

    await migrate(db, { migrationsFolder: "src/db/migrations" });

    console.log("Database migration complete!\n");
  } catch (error) {
    console.log("Migration failed:", error);
  }
  process.exit(0);
}

main();
