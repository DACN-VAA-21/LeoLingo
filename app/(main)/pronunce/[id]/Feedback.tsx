import React from "react";
import { motion } from "framer-motion";

interface FeedbackProps {
  message: string | null;
  accuracy: number | null;
  progress: number;
  timerExpired: boolean;
  onRetry: () => void;
  onNext: () => void;
  transcription?: string | null;
  targetWord?: string | null;
}

const Feedback: React.FC<FeedbackProps> = ({
  message,
  accuracy,
  progress,
  timerExpired,
  onRetry,
  onNext,
  transcription,
  targetWord,
}) => {
  if (!message) return null;

  const feedbackVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      className={`p-4 rounded-2xl text-center shadow-lg  ${
        message === "Xuất sắc"
          ? "bg-green-200 text-green-700"
          : "bg-red-200 text-red-700"
      }`}
      variants={feedbackVariants}
      initial="initial"
      animate="animate"
    >
      <p className="font-bold text-xl">{message}</p>
      {accuracy !== null && <p className="mt-2 text-lg">Score: {accuracy}% </p>}
      {transcription && targetWord && (
        <p className="mt-2 text-lg">
          You said: {transcription}
          {transcription.includes(targetWord) ? " ✅" : " ❌"}
        </p>
      )}
      <div className="flex justify-center space-x-4 mt-4">
        {accuracy !== null &&
          accuracy >= 70 &&
          message === "Xuất sắc" &&
          progress < 100 && (
            <motion.button
              onClick={onNext}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none"
            >
              Next
            </motion.button>
          )}
        {accuracy !== null && accuracy < 70 && (
          <motion.button
            onClick={onRetry}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            Retry
          </motion.button>
        )}
        {timerExpired && (
          <motion.button
            onClick={onRetry}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            Retry
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default Feedback;
