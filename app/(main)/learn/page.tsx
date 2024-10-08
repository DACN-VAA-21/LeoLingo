import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { Header } from "./header";
import { UserProgress } from "@/components/user-progress";

const LearnPage = () => {
  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      {/* Chia ddoi 2 ben */}
      {/* Giao điện bên trái */}
      <StickyWrapper>
        {/* Hiển thị tên khoá và nút back lại */}
        <UserProgress
          activeCourse={{ title: "English", imageSrc: "/us.svg" }}
          hearts={5}
          points={100}
          hasActiveSubscription={false}
        />
      </StickyWrapper>
      {/* Giao diện bên phải */}
      <FeedWrapper>
        {/* Hiển thị cờ khoá học, ponit, heart */}
        <Header title="English" />
      </FeedWrapper>
    </div>
  );
};
export default LearnPage;
