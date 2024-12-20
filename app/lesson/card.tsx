import { challenges } from "@/db/schema";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useCallback } from "react";
import { useAudio, useKey } from "react-use";

type CardStatus = "correct" | "wrong" | "none";

interface CardProps {
  id: number;
  imageSrc: string | null;
  audioSrc: string | null;
  text: string;
  shortcut: string;
  selected?: boolean;
  onClick: () => void;
  disabled?: boolean;
  status?: CardStatus;
  type: (typeof challenges.$inferSelect)["type"];
}

export const Card = ({
  imageSrc,
  audioSrc,
  text,
  shortcut,
  selected,
  status,
  onClick,
  disabled,
  type,
}: CardProps) => {
  // Destructure only what we need from useAudio
  const [audio, , controls] = useAudio({ src: audioSrc || "" });

  const handleClick = useCallback(() => {
    if (disabled) return;
    controls.play();
    onClick();
  }, [disabled, onClick, controls]);

  useKey(shortcut, handleClick, {}, [handleClick]);

  const getStatusStyles = (
    isSelected: boolean | undefined,
    status: CardStatus | undefined
  ) => {
    if (!isSelected) return "";

    switch (status) {
      case "correct":
        return "border-green-300 bg-green-100 hover:bg-green-100";
      case "wrong":
        return "border-rose-300 bg-rose-100 hover:bg-rose-100";
      default:
        return "border-sky-300 bg-sky-100 hover:bg-sky-100";
    }
  };

  const getTextStyles = (
    isSelected: boolean | undefined,
    status: CardStatus | undefined
  ) => {
    if (!isSelected) return "text-neutral-600";

    switch (status) {
      case "correct":
        return "text-green-500";
      case "wrong":
        return "text-rose-500";
      default:
        return "text-sky-500";
    }
  };

  const getBorderStyles = (
    isSelected: boolean | undefined,
    status: CardStatus | undefined
  ) => {
    if (!isSelected) return "border-neutral-400 text-neutral-400";

    switch (status) {
      case "correct":
        return "border-green-300 text-green-300";
      case "wrong":
        return "border-rose-300 text-rose-500";
      default:
        return "border-sky-300 text-sky-300";
    }
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        "h-full border-2 rounded-xl border-b-4 hover:bg-black/5 p-4 lg:p-6 cursor-pointer active:border-b-2",
        getStatusStyles(selected, status),
        disabled && "pointer-events-none hover:bg-white",
        type === "ASSIST" && "lg:p-3 w-full"
      )}
    >
      {audio}
      {imageSrc && (
        <div className="relative aspect-square mb-4 max-h-[80px] lg:max-h-[150px] w-full">
          <Image
            src={imageSrc}
            fill
            alt={text}
            className="object-contain"
            sizes="(max-width: 768px) 80px, 150px"
          />
        </div>
      )}
      <div
        className={cn(
          "flex items-center justify-between",
          type === "ASSIST" && "flex-row-reverse"
        )}
      >
        {type === "ASSIST" && <div />}
        <p
          className={cn(
            "text-sm lg:text-base",
            getTextStyles(selected, status)
          )}
        >
          {text}
        </p>
        <div
          className={cn(
            "lg:w-[30px] lg:h-[30px] w-[20px] h-[20px] border-2 flex items-center justify-center rounded-lg lg:text-[15px] text-xs font-semibold",
            getBorderStyles(selected, status)
          )}
        >
          {shortcut}
        </div>
      </div>
    </div>
  );
};
