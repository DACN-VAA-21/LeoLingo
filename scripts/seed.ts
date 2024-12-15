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
    await db.delete(schema.userSubscription);

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
        description: "Learn the basics of English",
        order: 1,
      },
    ]);

    await db.insert(schema.lessons).values([
      { id: 1, unitId: 1, order: 1, title: "Nous" },
      { id: 2, unitId: 1, order: 2, title: "Verb" },
      { id: 3, unitId: 1, order: 3, title: "Adverb" },
      { id: 4, unitId: 1, order: 4, title: "Adjective" },
    ]);

    await db.insert(schema.challenges).values([
      {
        id: 1,
        lessonId: 1, //Nouns
        type: "SELECT",
        order: 1,
        question: 'Which one of these is the "man"?',
      },
      {
        id: 2,
        lessonId: 1, //Nouns
        type: "ASSIST",
        order: 2,
        question: '"The man?"',
      },
      {
        id: 3,
        lessonId: 1, //Nouns
        type: "SELECT",
        order: 3,
        question: 'Which one of these is the "robot"?',
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 1,
        imageSrc: "/man.png",
        correct: true,
        text: "con trai",
        audioSrc: "/es_man.mp3",
      },
      {
        challengeId: 1,
        imageSrc: "/woman.png",
        correct: false,
        text: "con gái",
        audioSrc: "/es_woman.mp3",
      },
      {
        challengeId: 1,
        imageSrc: "/robot.png",
        correct: false,
        text: "Rô bốt",
        audioSrc: "/es_robot.mp3",
      },
    ]);
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 2,
        correct: true,
        text: "con trai",
        audioSrc: "/es_man.mp3",
      },
      {
        challengeId: 2,
        correct: false,
        text: "con gái",
        audioSrc: "/es_woman.mp3",
      },
      {
        challengeId: 2,
        correct: false,
        text: "Rô bốt",
        audioSrc: "/es_robot.mp3",
      },
    ]);
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 3,
        imageSrc: "/man.png",
        correct: false,
        text: "con trai",
        audioSrc: "/es_man.mp3",
      },
      {
        challengeId: 3,
        imageSrc: "/woman.png",
        correct: false,
        text: "con gái",
        audioSrc: "/es_woman.mp3",
      },
      {
        challengeId: 3,
        imageSrc: "/robot.png",
        correct: true,
        text: "Rô bốt",
        audioSrc: "/es_robot.mp3",
      },
    ]);

    await db.insert(schema.challenges).values([
      {
        id: 4,
        lessonId: 2, //Verb
        type: "SELECT",
        order: 1,
        question: 'Which one of these is the "man"?',
      },
      {
        id: 5,
        lessonId: 2, //Verb
        type: "ASSIST",
        order: 2,
        question: '"The man?"',
      },
      {
        id: 6,
        lessonId: 2, //Verb
        type: "SELECT",
        order: 3,
        question: 'Which one of these is the "robot"?',
      },
    ]);

    console.log("Seeding finished");
  } catch (error) {
    console.error(error);

    throw new Error("Failed to seed the database");
  }
};
main();
