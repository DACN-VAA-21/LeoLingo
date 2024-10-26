import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { Header } from "./header";
import { UserProgress } from "@/components/user-progress";
import { getUserProgress } from "@/db/queies";
import { redirect } from "next/navigation";

const LearnPage = async () => {
  const userProgressData = getUserProgress();

  const [userProgress] = await Promise.all([userProgressData]);

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }
  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      {/* Chia ddoi 2 ben */}
      {/* Giao điện bên trái */}
      <StickyWrapper>
        {/* Hiển thị tên khoá và nút back lại */}
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={false}
        />
      </StickyWrapper>
      {/* Giao diện bên phải */}
      <FeedWrapper>
        {/* Hiển thị cờ khoá học, ponit, heart */}
        <Header title={userProgress.activeCourse.title} />
      </FeedWrapper>
    </div>
  );
};
export default LearnPage;
