import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { SidebarItem } from "./sidebar-item";
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";

type Props = {
  className?: string;
};
export const Sidebar = ({ className }: Props) => {
  return (
    <div
      className={cn(
        "flex  h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col",
        className
      )}
    >
      <Link href="/learn">
        <div className="pt-4 pl-1 pb-5 flex items-center">
          <Image src="/logo.png" height={100} width={100} alt="Logo" />
          <h1 className="text-lg font-extrabold text-yellow-400 tracking-wide">
            Foreign Language
          </h1>
        </div>
      </Link>
      <div className="flex flex-col gap-y-8 flex-1 ">
        {/* Code giao dien cho tung item cua thanh sidebar */}
        <SidebarItem label="Learn" href="/learn" iconSrc="/learn.png" />
        <SidebarItem
          label="Leardboard"
          href="/leardboard"
          iconSrc="/board.png"
        />
        <SidebarItem label="Task" href="/quests" iconSrc="/task.png" />
        <SidebarItem label="premium" href="/shop" iconSrc="/pay.png" />
        <SidebarItem label="pronunciation" href="/pronunciation" iconSrc="/pronunciation.png" />
      </div>
      {/* Them muc nut quan ly nguoi dung de dang ky dang nhap */}
      <div className="p-4">
        <ClerkLoading>
          <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
        </ClerkLoading>
        <ClerkLoaded>
          <UserButton afterSwitchSessionUrl="/" signInUrl="/" />
        </ClerkLoaded>
      </div>
    </div>
  );
};
