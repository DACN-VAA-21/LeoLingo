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

    await db.insert(schema.courses).values([
      {
        id: 1,
        title: "English",
        imageSrc: "/uk.svg",
      },
      {
        id: 2,
        title: "中国人",
        imageSrc: "/cn.svg",
      },
      {
        id: 3,
        title: "Tiếng Việt",
        imageSrc: "/vn.svg",
      },
      {
        id: 4,
        title: "Français",
        imageSrc: "/fr.svg",
      },
      {
        id: 5,
        title: "한국인",
        imageSrc: "/kr.svg",
      },
    ]);

    console.log("Seeding finished");
  } catch (error) {
    console.error(error);

    throw new Error("Failed to seed the database");
  }
};
main();
