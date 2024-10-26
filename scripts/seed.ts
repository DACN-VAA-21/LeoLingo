import "dotenv/config";

import * as schema from "../db/schema";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

const sql = neon(process.env.DATABASE_URL!);
// @ts-ignore
const db = drizzle(sql, { schema });
const main = async () => {
  try {
    console.log("Seedming database");
    await db.delete(schema.courses);
    await db.delete(schema.userProgress);
  } catch (error) {
    console.error(error);

    throw new Error("Failed to seed the database");
  }
};
main();
