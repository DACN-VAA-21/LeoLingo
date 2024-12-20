"use client";

import { useExitModal } from "@/store/use-exit-modal";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export const ExitModal = () => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const { isOpen, close } = useExitModal();

  useEffect(() => setIsClient(true), []);
  if (!isClient) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center w-full justify-center">
            <Image src="/sad.png " alt="sad" height={130} width={130} />
          </div>
          <DialogTitle className="text-center font-bold text-2xl">
            Wait, dont go!
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            You reabout to leave the lesson. Are you sure
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mb-2">
          <div className="flex flex-col gap-y-4 w-full">
            <Button
              variant="primary"
              className="w-full"
              size="lg"
              onClick={close}
            >
              Continue studying
            </Button>
            <Button
              variant="dangerOutline"
              className="w-full"
              size="lg"
              onClick={() => {
                close();
                router.push("/learn");
              }}
            >
              End of class
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
