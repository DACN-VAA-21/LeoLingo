import { cache } from "react";
import db from "@/db/drizzle";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import {
  challengeProgress,
  challenges,
  courses,
  lessons,
  units,
  userProgress,
  userSubscription,
  phonemes,
  sentences,
} from "@/db/schema";

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
  const { userId } = await auth();
  if (!userId || !userProgress?.activeCourseId) {
    return [];
  }

  const data = await db.query.units.findMany({
    orderBy: (units, { asc }) => [asc(units.order)],

    where: eq(units.courseId, userProgress.activeCourseId),
    with: {
      lessons: {
        orderBy: (lessons, { asc }) => [asc(lessons.order)],
        with: {
          challenges: {
            orderBy: (challenges, { asc }) => [asc(challenges.order)],

            with: {
              challengeProgress: {
                where: eq(challengeProgress.userId, userId),
              },
            },
          },
        },
      },
    },
  });

  const normalizedData = data.map((unit) => {
    const lessonsWithCompletedStatus = unit.lessons.map((lesson) => {
      if (lesson.challenges.length === 0) {
        return { ...lesson, completed: false };
      }
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
    with: {
      units: {
        orderBy: (units, { asc }) => [asc(units.order)],
        with: {
          lessons: {
            orderBy: (lessons, { asc }) => [asc(lessons.order)],
          },
        },
      },
    },
  });
  return data;
});

//lấy khóa học đang học của người dùng, tìm bài học đầu tiên chưa hoàn thành trong khóa học đó, và trả về bài học này cùng với ID của nó.
export const getCourseProgress = cache(async () => {
  const { userId } = await auth();
  const userProgress = await getUserProgress();

  if (!userId || !userProgress?.activeCourseId) {
    return null;
  }

  const unitsInActivateCourse = await db.query.units.findMany({
    orderBy: (units, { asc }) => [asc(units.order)],
    with: {
      lessons: {
        orderBy: (lessons, { asc }) => [asc(lessons.order)],
        with: {
          unit: true,
          challenges: {
            with: {
              challengeProgress: {
                where: eq(challengeProgress.userId, userId),
              },
            },
          },
        },
      },
    },
  });
  const firstUncompletedLesson = unitsInActivateCourse
    .flatMap((unit) => unit.lessons)
    .find((lesson) => {
      return lesson.challenges.some((challenge) => {
        return (
          !challenge.challengeProgress ||
          challenge.challengeProgress.length === 0 ||
          challenge.challengeProgress.some(
            (progress) => progress.completed === false
          )
        );
      });
    });
  return {
    activeLesson: firstUncompletedLesson,
    activeLessonId: firstUncompletedLesson?.id,
  };
});

//dùng để lấy thông tin về một bài học cụ thể (lesson) cho người dùng đã đăng nhập. Hàm cũng xác định trạng thái hoàn thành của các thử thách trong bài học đó
export const getLesson = cache(async (id?: number) => {
  const { userId } = await auth();
  if (!userId) return null;
  const courseProgress = await getCourseProgress();

  const lessonId = id || courseProgress?.activeLessonId;

  if (!lessonId) {
    return null;
  }

  const data = await db.query.lessons.findFirst({
    where: eq(lessons.id, lessonId),
    with: {
      challenges: {
        orderBy: (challenges, { asc }) => [asc(challenges.order)],
        with: {
          challengeOptions: true,
          challengeProgress: {
            where: eq(challengeProgress?.userId, userId),
          },
        },
      },
    },
  });
  if (!data || !data.challenges) {
    return null;
  }

  const normalizedChanllenges = data.challenges.map((challenge) => {
    const completed =
      challenge.challengeProgress &&
      challenge.challengeProgress.length > 0 &&
      challenge.challengeProgress.every((progress) => progress.completed);

    return { ...challenge, completed };
  });
  return { ...data, challenges: normalizedChanllenges };
});
//dùng để tính phần trăm hoàn thành của bài học hiện tại của người dùng dựa trên số lượng thử thách đã hoàn thành trong bài học đó.
export const getLessonPercentage = cache(async () => {
  const courseProgress = await getCourseProgress();

  if (!courseProgress?.activeLessonId) {
    return 0;
  }

  const lesson = await getLesson(courseProgress.activeLessonId);
  if (!lesson) {
    return 0;
  }

  const completedChallenges = lesson.challenges.filter(
    (challenge) => challenge.completed
  );
  const percentage = Math.round(
    (completedChallenges.length / lesson.challenges.length) * 100
  );

  return percentage;
});

const DAY_IN_MS = 86_400_000;
export const getUserSubscription = cache(async () => {
  const { userId } = await auth();
  if (!userId) return null;
  const data = await db.query.userSubscription.findFirst({
    where: eq(userSubscription.userId, userId),
  });
  if (!data) return null;
  const isActive =
    data.stripePriceId &&
    data.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now();

  return {
    ...data,
    isActive: !!isActive,
  };
});

//truy van ve top nguoi dung
export const getTopTenUsers = cache(async () => {
  const { userId } = await auth();
  if (!userId) {
    return [];
  }
  const data = await db.query.userProgress.findMany({
    orderBy: (userProgress, { desc }) => [desc(userProgress.points)],
    limit: 10,
    columns: {
      userId: true,
      userName: true,
      userImageSrc: true,
      points: true,
    },
  });
  return data;
});

//======================================== Merge code
// Truy vấn lấy danh sách phiên âm (phonemes) cho khoá học cụ thể
export const getPhonemesByCourseId = cache(async (courseId: number) => {
  const data = await db.query.phonemes.findMany({
    where: eq(phonemes.course_id, courseId),
    columns: {
      id: true,
      description: true,
      course_id: true,
      symbol: true,
      audio_url: true,
      example_word: true, // Bao gồm cột example_word
    },
  });
  return data;
});

//Truy vấn tiến trình người dùng để lấy thông tin tiến trình dựa trên userId (đổi tên hàm)
export const getUserProgressByUserId = cache(async (userId: string) => {
  const data = await db.query.userProgress.findFirst({
    where: eq(userProgress.userId,userId),
  });
  return data;
});

// Truy vấn danh sách nguyên âm
export const getVowels = async () => {
  const data = await db.query.phonemes.findMany({
    where: eq(phonemes.description, "vowel"),
  });
  return data;
};

// Truy vấn danh sách phụ âm
export const getConsonants = async () => {
  const data = await db.query.phonemes.findMany({
    where: eq(phonemes.description, "consonant"),
  });
  return data;
};


//===================
export const getPhonemeById = cache(async (id: number) => {
  const data = await db.query.phonemes.findFirst({
    where: eq(phonemes.id, id), // Tìm theo ID của phoneme
    columns: {
      id: true,
      symbol: true,
      description: true,
      audio_url: true,
      example_word: true,
    },
  });
  return data;
});


export const getPhonemeWithWordById = cache(async (id: number) => {
  const data = await db.query.phonemes.findFirst({
    where: eq(phonemes.id, id),
    with: {
      vocabularies: true, // Join với bảng vocabulary
    },
    columns: {
      id: true,
      description: true,
      audio_url: true,
      example_word: true,
    },
  });

  if (data) {
    return {
      id: data.id,
      word: data.vocabularies[0]?.word || "No word available", 
      description: data.description,
      audio_url: data.audio_url,
      example_word: data.example_word,
    };
  }

  return null; 
});

//======================= Sentences =========================
//===========================================================
export const getSentencesByPhonemeId = async (phonemeId: number) => {
  const data = await db.query.sentences.findMany({
    where: eq(sentences.phoneme_id, phonemeId),
    columns: {
      id: true,
      sentence: true,
      sentence_symbol: true,
    },
  });

  return data.length > 0 ? data : [];
};