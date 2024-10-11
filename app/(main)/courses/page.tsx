import { getCourses } from "@/db/queies";
import { List } from "./list";

const Courses = async () => {
  const courses = await getCourses();
  return (
    <div className="h-full max-w-[912px] px-3 mx-auto">
      <h1 className="text-2xl font-bold text-neutral-700">Language Courses</h1>
      <List courses={courses} activeCoursesId={1} />
    </div>
  );
};

export default Courses;
