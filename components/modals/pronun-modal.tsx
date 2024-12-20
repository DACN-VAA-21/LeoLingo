"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import Image from "next/image";

interface PronunciationModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

const PronunciationModal: React.FC<PronunciationModalProps> = ({
  onClose,
  onConfirm,
}) => {
  return (
    <Dialog open onOpenChange={onClose}>
      {" "}
      {/* Use Dialog component */}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            <div className="flex flex-col items-center">
              {" "}
              {/* Center content */}
              <Image
                src="/pronunciation.png"
                alt="Pronunciation"
                height={100}
                width={100}
                className=" h-16 mb-4" // Adjusted size
              />
              <p className="text-lg font-medium mb-2">
                {" "}
                {/* Improved styling */}
                Learn Pronunciation?
              </p>
              <p className="text-sm text-gray-500 text-center">
                {" "}
                {/* Added subtext */}
                Do you want to learn how to pronounce this sound?
              </p>
            </div>
          </DialogTitle>
        </DialogHeader>
        <DialogFooter>
          {/* Use DialogFooter */}
          <Button variant="super" onClick={onClose}>
            No
          </Button>
          <Button variant="primary" onClick={onConfirm}>
            Yes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PronunciationModal;
