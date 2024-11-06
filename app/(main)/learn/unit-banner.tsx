"use client";

import { Button } from "@/components/ui/button";
import { NotebookIcon, NotebookText } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";

type Props = {
  title: string;
  description: string;
};

export const UnitBanner = ({ title, description }: Props) => {
  const bannerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      bannerRef.current,
      { y: -10 },
      { y: 10, repeat: -1, yoyo: true, duration: 1, ease: "power1.inOut" }
    );
  }, []);

  return (
    <div
      ref={bannerRef}
      className="w-full rounded-3xl bg-gradient-to-r from-blue-400 to-green-500 p-5 text-white flex items-center justify-between shadow-lg transform transition-all hover:scale-105"
    >
      <div className="space-y-3 animate-pulse">
        <h3 className="text-3xl font-extrabold text-yellow-200 drop-shadow-lg">
          {title}
        </h3>
        <p className="text-xl text-pink-200">{description}</p>
      </div>
      <Link href="/lesson">
        <Button
          size="lg"
          variant="secondary"
          className="hidden xl:flex border-2 border-b-8 active:border-b-4 animate-pulse text-purple-700  shadow-lg transform hover:scale-110"
        >
          <NotebookText className="mr-2 text-2xl text-pink-500" /> Continue
        </Button>
      </Link>
    </div>
  );
};
