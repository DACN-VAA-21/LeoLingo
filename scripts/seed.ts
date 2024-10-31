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
    await db.delete(schema.units);
    await db.delete(schema.lessons);
    await db.delete(schema.challenges);
    await db.delete(schema.challengeOptions);
    await db.delete(schema.challengeProgress);

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

    await db.insert(schema.units).values([
      {
        id: 1,
        courseId: 1,
        title: "Unit 1",
        description: "Learn the basics of Spaninh",
        order: 1,
      },
    ]);

    await db
      .insert(schema.lessons)
      .values([{ id: 1, unitId: 1, order: 1, title: "Nous" }]);

    await db.insert(schema.challenges).values([
      {
        id: 1,
        lessonId: 1, //Nouns
        type: "SELECT",
        order: 1,
        question: 'Which one of these is the "man"?',
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        id: 1,
        challengeId: 1,
        imageSrc: "/man.png",
        correct: true,
        text: "con trai",
        audioSrc: "/es_man.mp3",
      },
      {
        id: 2,
        challengeId: 1,
        imageSrc: "/woman.png",
        correct: false,
        text: "con gái",
        audioSrc: "/es_woman.mp3",
      },
      {
        id: 3,
        challengeId: 1,
        imageSrc: "/robot.png",
        correct: false,
        text: "Rô bốt",
        audioSrc: "/es_robot.mp3",
      },
    ]);

    console.log("Seeding finished");
  } catch (error) {
    console.error(error);

    throw new Error("Failed to seed the database");
  }
};
main();
