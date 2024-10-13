import { cache } from "react";
import db from "@/db/drizzle";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { courses, userProgress } from "@/db/schema";

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
