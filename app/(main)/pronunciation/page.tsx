import {
  getCourses,
  getUserProgress,
  getPhonemesByCourseId,
} from "@/db/queies"; // Nhập các hàm truy vấn
import { List } from "./list"; // Component hiển thị danh sách phonemes

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
  const vowels = phonemesData.filter((phoneme) =>
    phoneme.description?.toLowerCase().includes("vowel")
  );
  const consonants = phonemesData.filter((phoneme) =>
    phoneme.description?.toLowerCase().includes("consonant")
  );

  return (
    <div className="relative min-h-screen bg-cover bg-center">
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-50 via-cyan-50 to-white"></div>

      {/* Nội dung chính */}
      <div className="relative z-10 max-w-[960px] mx-auto py-8 px-6 md:px-8 lg:px-10 xl:px-12 rounded-xl shadow-2xl bg-white/80 border border-green-300">
        {/* Tiêu đề */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-green-700 mb-6 drop-shadow-lg">
          🌱 Welcome to Pronunciation Playground! 🎶
        </h1>

        {/* Cartoon hình minh họa */}
        <div className="text-center">
          <img
            src="/cartoon-character.png"
            alt="Cartoon character"
            className="mx-auto w-40 h-40 md:w-48 md:h-48 mb-6 animate-spin-slow"
          />
        </div>

        {/* Danh sách vowels */}
        <section className="my-8 p-6 rounded-xl bg-green-50 shadow-lg border border-green-200">
          <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-4 flex items-center">
            <span className="bg-green-300 text-green-900 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full mr-3 shadow-sm">
              🌸
            </span>
            Vowels
          </h2>
          <List phonemes={vowels} />
        </section>

        {/* Đường gạch ngang sinh động */}
        <hr className="my-6 border-t-4 border-dotted border-cyan-400" />

        {/* Danh sách consonants */}
        <section className="my-8 p-6 rounded-xl bg-blue-50 shadow-lg border border-blue-200">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-800 mb-4 flex items-center">
            <span className="bg-blue-300 text-blue-900 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full mr-3 shadow-sm">
              🌟
            </span>
            Consonants
          </h2>
          <List phonemes={consonants} />
        </section>
      </div>
    </div>
  );
};

export default PronunciationPage;
