import Image from "next/image";
import { MobileSidebar } from "./mobile-sidebar";

export const MobileHeader = () => {
  return (
    <nav className="lg:hidden px-6 h-[60px] flex items-center justify-between bg-gradient-to-r from-pink-500 via-white to-blue-500 border-b fixed top-0 w-full z-50 shadow-md">
      {/* Sidebar được điều khiển bởi MobileSidebar */}
      <MobileSidebar />

      <div className="pt-8 pl-4 pb-7 flex items-center">
        <Image src="/logo.png" height={65} width={65} alt="Logo" />
        <h1 className="text-xl font-extrabold text-yellow-400 tracking-wide">
          Foreign Language
        </h1>
      </div>
    </nav>
  );
};
