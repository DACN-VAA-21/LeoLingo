import React from "react";
import { motion } from "framer-motion";

interface MicrophoneButtonProps {
  isRecording: boolean;
  timerExpired: boolean;
  onMicrophoneClick: () => void;
}

const MicrophoneButton: React.FC<MicrophoneButtonProps> = ({
  isRecording,
  timerExpired,
  onMicrophoneClick,
}) => {
  if (timerExpired) return null;

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.1, transition: { duration: 0.2 } },
    tap: { scale: 0.9 },
  };

  return (
    <motion.button
      onClick={onMicrophoneClick}
      className={`mt-6 p-2 rounded-full shadow-md focus:outline-none ${
        isRecording
          ? "bg-red-500 hover:bg-red-600"
          : "bg-gradient-to-t from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
      }`}
      variants={buttonVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="white"
        className="w-8 h-8"
      >
        <path d="M12 1.5a3 3 0 00-3 3v7a3 3 0 006 0v-7a3 3 0 00-3-3zm0 13.5a5.002 5.002 0 004.898-4H17a1 1 0 100-2h-2.172a5.002 5.002 0 00-7.656 0H5a1 1 0 100 2h.102A5.002 5.002 0 0012 15z" />
        <path d="M5.454 12.37a1 1 0 10-1.908.55A8.002 8.002 0 0012 20.25V23h-3a1 1 0 000 2h6a1 1 0 100-2h-3v-2.75a8.002 8.002 0 008.454-7.33 1 1 0 00-1.908-.55A6.002 6.002 0 0112 18a6.002 6.002 0 01-6.546-5.63z" />
      </svg>
    </motion.button>
  );
};

export default MicrophoneButton;
