import { cache } from "react";
import db from "@/db/drizzle";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { challenges, courses, units, userProgress } from "@/db/schema";

//truy van chứa tiến trình của người dùng cùng với khóa học mà họ đang tham gia.
export const getUserProgress = cache(async () => {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const data = await db.query.userProgress.findFirst({
    where: eq(userProgress.userId, userId),
    with: {
      activeCourse: true,
    },
  });
  return data;
});

export const getUnits = cache(async () => {
  const userProgress = await getUserProgress();

  if (!userProgress?.activeCourseId) {
    return [];
  }

  const data = await db.query.units.findMany({
    where: eq(units.courseId, userProgress.activeCourseId),
    with: {
      lessons: {
        with: {
          challenges: {
            with: { challengeProgress: true },
          },
        },
      },
    },
  });

  const normalizedData = data.map((unit) => {
    const lessonsWithCompletedStatus = unit.lessons.map((lesson) => {
      const allCompletedChallenges = lesson.challenges.every((challenge) => {
        return (
          challenge.challengeProgress &&
          challenge.challengeProgress.length > 0 &&
          challenge.challengeProgress.every((progress) => progress.completed)
        );
      });
      return { ...lesson, completed: allCompletedChallenges };
    });
    return { ...unit, lessons: lessonsWithCompletedStatus };
  });
  return normalizedData;
});

//truy van khoa hoc
export const getCourses = cache(async () => {
  const data = await db.query.courses.findMany();
  return data;
});

// lấy thông tin về khóa học dựa trên ID của khóa học
export const getCourseById = cache(async (courseId: number) => {
  const data = await db.query.courses.findFirst({
    where: eq(courses.id, courseId),
    //TODO: Dien don vi bai hoc sau
  });
  return data;
});
