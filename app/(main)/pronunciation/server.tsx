"use server";  // Đảm bảo là Server Component

import { getCourses, getPhonemesByCourseId, getVowels, getConsonants, getUserProgressByUserId } from "@/db/queies"; 

// Hàm fetchData lấy dữ liệu cho trang
export async function fetchData(userId: string) {
  const coursesData = getCourses();
  const userProgressData = getUserProgressByUserId(userId);

  const [courses, userProgress] = await Promise.all([coursesData, userProgressData]);

  console.log("Courses:", courses); // Debug: kiểm tra courses
  console.log("User Progress:", userProgress); // Debug: kiểm tra user progress

  if (!userProgress?.activeCourseId) {
    console.log("User does not have an active course.");
    return { courses, userProgress, phonemesData: [] };
  }

  const phonemesData = await getPhonemesByCourseId(userProgress.activeCourseId);
  console.log("Phonemes Data:", phonemesData); // Debug: kiểm tra phonemesData

  return { courses, userProgress, phonemesData };
}

// Hàm lấy dữ liệu nguyên âm và phụ âm
export async function fetchPhonemesData() {
  const vowels = await getVowels(); // Kiểm tra xem trả về đúng không
  const consonants = await getConsonants(); // Kiểm tra xem trả về đúng không
  console.log('Vowels:', vowels);  // Debug: kiểm tra vowels
  console.log('Consonants:', consonants);  // Debug: kiểm tra consonants
  return { vowels, consonants };
}
