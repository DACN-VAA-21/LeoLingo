import { getCourses, getUserProgress } from "@/db/queies";
import { List } from "./list";

const Courses = async () => {
  // Lấy danh sách tất cả các khóa học.
  const coursesData = getCourses();
  //Lấy thông tin tiến trình của người dùng, bao gồm cả khóa học hiện tại mà họ đang tham gia
  const userProgressData = getUserProgress();

  const [courses, userProgress] = await Promise.all([
    coursesData,
    userProgressData,
  ]);
  return (
    <div className="h-full max-w-[912px] px-3 mx-auto">
      <h1 className="text-2xl font-bold text-neutral-700">Language Courses</h1>
      <List courses={courses} activeCoursesId={userProgress?.activeCourseId} />
    </div>
  );
};

export default Courses;
