import { Button } from "@/components/ui/button";
import Image from "next/image";

export const Footer = () => {
  return (
    <div className="hidden lg:block h-20 w-full border-t-2 border-slate-200 p-2">
      <div className="max-w-screen-lg mx-auto flex items-center justify-between  h-full">
        <Button size="lg" variant="ghost" className="w-full">
          <Image
            src="/vn.svg"
            alt="VietNam"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          Việt Nam
        </Button>

        <Button size="lg" variant="ghost" className="w-full">
          <Image
            src="/fr.svg"
            alt="FR"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          Français
        </Button>
        <Button size="lg" variant="ghost" className="w-full">
          <Image
            src="/cn.svg"
            alt="CN"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          中国人
        </Button>
        <Button size="lg" variant="ghost" className="w-full">
          <Image
            src="/kr.svg"
            alt="FR"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          한국인
        </Button>
        <Button size="lg" variant="ghost" className="w-full">
          <Image
            src="/uk.svg"
            alt="CN"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          English
        </Button>
      </div>
    </div>
  );
};
