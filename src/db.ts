import * as pg from "pg";

/**
 * DB pool
 */
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL || "",
  max: parseInt(process.env.DATABASE_MAX || "20", 10),
  ssl: !!process.env.DATABASE_SSL,
});
export {pool};
