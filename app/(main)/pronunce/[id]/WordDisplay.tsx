import React from "react";
import { motion } from "framer-motion";

interface WordDisplayProps {
  word: string | undefined;
  exampleWord: string | undefined;
  audioUrl: string | undefined;
  lang: string | null | undefined;
  handleSlowClick: () => void;
}

const WordDisplay: React.FC<WordDisplayProps> = ({
  word,
  exampleWord,
  audioUrl,
  handleSlowClick,
}) => {
  const handleVolumeClick = () => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play().catch((err) => console.error("Lỗi phát âm thanh:", err));
    } else {
      alert("Không tìm thấy âm thanh của từ này!");
    }
  };
  const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.4, ease: "easeInOut" } },
  };
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="text-center space-y-6 top-[-3rem]"
    >
      <p className="text-gray-700 text-lg font-medium">HÃY NÓI CỤM SAU</p>
      <div className="flex justify-center gap-4">
        <motion.button
          className="bg-gray-200 text-black px-10 py-4 rounded-2xl hover:scale-105 transition-transform focus:outline-none"
          onClick={handleVolumeClick}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <span className="text-3xl">🔊</span>
        </motion.button>
        <motion.button
          className="bg-gray-200 text-black px-10 py-4 rounded-2xl hover:scale-105 transition-transform focus:outline-none"
          onClick={handleSlowClick}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <span className="text-3xl">🐌</span>
        </motion.button>
      </div>
      {exampleWord && (
        <>
          <p className="text-gray-500 text-3xl font-bold">{exampleWord}</p>
          <p className="text-gray-400 text-xl">{word}</p>
        </>
      )}
    </motion.div>
  );
};

export default WordDisplay;
