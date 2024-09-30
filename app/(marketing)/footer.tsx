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
          Viet tNam
        </Button>
        <Button size="lg" variant="ghost" className="w-full">
          <Image
            src="/us.svg"
            alt="US"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          United States
        </Button>
        <Button size="lg" variant="ghost" className="w-full">
          <Image
            src="/kr.svg"
            alt="KR"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          Koera South
        </Button>
        <Button size="lg" variant="ghost" className="w-full">
          <Image
            src="/fr.svg"
            alt="FR"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          France
        </Button>
        <Button size="lg" variant="ghost" className="w-full">
          <Image
            src="/cn.svg"
            alt="CN"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          China
        </Button>
      </div>
    </div>
  );
};
