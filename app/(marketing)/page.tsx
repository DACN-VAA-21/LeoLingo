"use client"; // Thêm dòng này vào đầu file

import { Button } from "@/components/ui/button";
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
} from "@clerk/nextjs";
import { Loader } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [textIndex, setTextIndex] = useState(0);
  const texts = [
    "Learn new languages with LeoLingo",
    "Practice and improve your skills",
    "Master any language effortlessly",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 5000); // Đổi text sau mỗi 3 giây
    return () => clearInterval(interval);
  }, [texts.length]);

  return (
    <div className="max-w-[988px] mx-auto flex-1 w-full flex flex-col lg:flex-row items-center justify-center p-4 gap-2">
      <div className="relative w-[240px] h-[240px] lg:w-[424px] lg:h-[424px] mb-8 lg:mb-0">
        <video src="/logo2.mp4" autoPlay loop muted playsInline />
      </div>
      <div className="flex flex-col items-center justify-center gap-y-8">
        <h1 className="text-xl lg:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-blue-500 max-w-[480px] text-center transition-all duration-500  drop-shadow-lg animate-slide-in">
          {texts[textIndex]}
        </h1>
        <div className="flex flex-col items-center gap-y-3 max-h-[320px] m-w-full">
          <ClerkLoading>
            <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
          </ClerkLoading>
          <ClerkLoaded>
            <SignedOut>
              <SignUpButton
                mode="modal"
                signInForceRedirectUrl="/learn"
                signInFallbackRedirectUrl="/learn"
              >
                <Button size="lg" variant="primary" className="w-full">
                  Get Started
                </Button>
              </SignUpButton>
              <SignInButton mode="modal" signUpFallbackRedirectUrl="/learn">
                <Button size="lg" variant="primaryOutline" className="w-full">
                  I already have a account
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <div className="text-center">
                <h1 className="text-4xl font-bold text-blue-800 mb-6">
                  Welcome Back!
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                  You are now signed in. Ready to start learning? Click the
                  button below to begin your journey!
                </p>
                <Link href="/learn">
                  <Button
                    variant="primary"
                    size="lg"
                    className="shadow-lg hover:shadow-xl transition duration-300"
                  >
                    Let&apos;s Start
                  </Button>
                </Link>
              </div>
            </SignedIn>
          </ClerkLoaded>
        </div>
      </div>
    </div>
  );
}
