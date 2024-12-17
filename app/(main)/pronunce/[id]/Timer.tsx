import React from "react";
import { motion } from "framer-motion";

interface TimerProps {
  timeLeft: number;
  accuracy: number | null;
}

const Timer: React.FC<TimerProps> = ({ timeLeft, accuracy }) => {
  const timerVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { duration: 0.3 } },
  };

  return (
    <motion.div variants={timerVariants} initial="initial" animate="animate">
      {accuracy !== null ? (
        <p className="text-6xl font-bold text-yellow-500">{accuracy}%</p>
      ) : (
        <p className="text-6xl font-bold text-yellow-500">{timeLeft}</p>
      )}
    </motion.div>
  );
};

export default Timer;
