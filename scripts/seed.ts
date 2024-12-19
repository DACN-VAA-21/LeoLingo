import "dotenv/config";
import * as schema from "../db/schema";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

const sql = neon(process.env.DATABASE_URL!);
// @ts-ignore
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Seeding database...");

    // Xóa dữ liệu theo thứ tự bảng con trước, bảng cha sau
    await db.delete(schema.vocabulary);
    await db.delete(schema.phonemes);
    await db.delete(schema.challengeOptions);
    await db.delete(schema.challengeProgress);
    await db.delete(schema.challenges);
    await db.delete(schema.lessons);
    await db.delete(schema.units);
    await db.delete(schema.userProgress);
    await db.delete(schema.userSubscription);
    await db.delete(schema.courses);

    // Thêm dữ liệu vào bảng courses
    await db.insert(schema.courses).values([
      { id: 1, title: "English", imageSrc: "/uk.svg" },
      { id: 2, title: "中文", imageSrc: "/cn.svg" },
      { id: 3, title: "Tiếng Việt", imageSrc: "/vn.svg" },
      { id: 4, title: "Français", imageSrc: "/fr.svg" },
      { id: 5, title: "한국어", imageSrc: "/kr.svg" },
    ]);

    // Thêm dữ liệu vào bảng phonemes
    await db.insert(schema.phonemes).values([
      {
        id: 1,
        description: "Vowel sound",
        course_id: 1,
        symbol: "ə",
        audio_url: "/ə.mp3",
        example_word: "about",
      },
      {
        id: 2,
        description: "Consonant sound",
        course_id: 1,
        symbol: "b",
        audio_url: "/b.mp3",
        example_word: "bat",
      },
    ]);

    // Thêm dữ liệu vào bảng units
    await db
      .insert(schema.units)
      .values([
        {
          id: 1,
          title: "Unit 1",
          description: "Learn the basics of English",
          courseId: 1,
          order: 1,
        },
      ]);

    // Thêm dữ liệu vào bảng lessons
    await db.insert(schema.lessons).values([
      { id: 1, unitId: 1, title: "Lesson 1", order: 1 },
      { id: 2, unitId: 1, title: "Lesson 2", order: 2 },
    ]);

    // Thêm dữ liệu vào bảng challenges
    await db
      .insert(schema.challenges)
      .values([
        {
          id: 1,
          lessonId: 1,
          type: "SELECT",
          question: "Choose the correct answer",
          order: 1,
        },
      ]);

    // Thêm dữ liệu vào bảng challenge_options
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 1,
        text: "Option 1",
        correct: true,
        imageSrc: "/option1.png",
        audioSrc: "/option1.mp3",
      },
      {
        challengeId: 1,
        text: "Option 2",
        correct: false,
        imageSrc: "/option2.png",
        audioSrc: "/option2.mp3",
      },
    ]);

    // Thêm dữ liệu vào bảng vocabulary
    await db.insert(schema.vocabulary).values([
      { id: 1, course_id: 1, word: "apple", phoneme_id: 1 },
      { id: 2, course_id: 1, word: "banana", phoneme_id: 2 },
    ]);

    console.log("Database seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
    throw new Error("Failed to seed the database");
  }
};

main();
