import { defineConfig } from "drizzle-kit";

const connectionString = process.env.DATABASE_MIGRATION_URL;
if (!connectionString) {
  throw new Error("DATABASE_MIGRATION_URL is required to run PostgreSQL migrations");
}

export default defineConfig({
  schema: "./drizzle/schema-postgres.ts",
  out: "./drizzle/postgres",
  dialect: "postgresql",
  dbCredentials: {
    url: connectionString,
  },
});
