import { getCourses, getUserProgress, getPhonemesByCourseId } from "@/db/queies"; // Nhập các hàm truy vấn
import { List } from "./list"; // Component hiển thị danh sách phonemes
import { Button } from "@/components/ui/button";
import { useState } from "react";

const PronunciationPage = async () => {
  // Lấy danh sách các khóa học
  const coursesData = getCourses();
  // Lấy thông tin tiến trình của người dùng (bao gồm khóa học hiện tại)
  const userProgressData = getUserProgress();

  // Dùng Promise.all để lấy dữ liệu đồng thời
  const [courses, userProgress] = await Promise.all([
    coursesData,
    userProgressData,
  ]);

  // Lấy danh sách phonemes theo courseId của khóa học hiện tại
  const phonemesData = userProgress?.activeCourseId
    ? await getPhonemesByCourseId(userProgress.activeCourseId) // Chắc chắn rằng đây là hàm async
    : []; // Nếu không có activeCourseId thì trả về mảng trống

  // Tách phonemes thành hai danh sách: vowel và consonant
  const vowels = phonemesData.filter((phoneme) => phoneme.description?.toLowerCase().includes("vowel"));
  const consonants = phonemesData.filter((phoneme) => phoneme.description?.toLowerCase().includes("consonant"));

  return (
    <div className="h-full max-w-[912px] px-4 mx-auto bg-gradient-to-t from-green-100 to-blue-50 rounded-xl shadow-xl">
      {/* Tiêu đề */}
      <h1 className="text-4xl font-bold text-center text-yellow-400 my-6">
        Let's learn pronunciation with Leolingo!
      </h1>

      {/* Đường gạch ngang giữa tiêu đề và danh sách vowel */}
      <hr className="my-6 border-t-2 border-gray-300" />

      {/* Danh sách vowel */}
      <section className="my-6">
        <h2 className="text-2xl font-semibold text-black mb-4">Vowels</h2>
        <List phonemes={vowels} /> {/* Hiển thị danh sách vowel phonemes */}
      </section>

      {/* Đường gạch ngang giữa vowel và consonant */}
      <hr className="my-6 border-t-2 border-gray-300" />

      {/* Danh sách consonant */}
      <section>
        <h2 className="text-2xl font-semibold text-black mb-4">Consonants</h2>
        <List phonemes={consonants} /> {/* Hiển thị danh sách consonant phonemes */}
      </section>
    </div>
  );
};

export default PronunciationPage;
