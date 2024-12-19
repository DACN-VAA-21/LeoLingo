import React from "react";
import { motion } from "framer-motion";

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  const progressVariants = {
    initial: { width: 0 },
    animate: {
      width: `${progress}%`,
      transition: { duration: 0.8, ease: "easeInOut" },
    },
  };

  const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.4, ease: "easeInOut" } },
  };
  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="relative w-full max-w-xl flex flex-col items-center space-y-4"
    >
      <p className="text-xl font-bold text-gray-600">{progress.toFixed(0)}%</p>
      <div className="relative w-full h-4 bg-gray-300 rounded-full top-[-0.5rem]">
        <motion.div
          className="absolute top-0 left-0 h-full bg-green-500 rounded-full"
          style={{ width: 0 }}
          variants={progressVariants}
          initial="initial"
          animate="animate"
        />
      </div>
    </motion.div>
  );
};

export default ProgressBar;
