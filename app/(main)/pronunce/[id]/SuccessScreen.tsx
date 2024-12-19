import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const SuccessScreen = () => {
  const router = useRouter();

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
      className="flex flex-col items-center bg-gray-100 min-h-screen p-6"
    >
      <h1 className="text-4xl font-bold text-green-600 mb-4">
        🎉 Chúc mừng bạn! 🎉
      </h1>
      <p className="text-xl text-gray-700">
        Bạn đã hoàn thành bài phát âm với kết quả xuất sắc.
      </p>
      <div className="flex gap-4 mt-6">
        <motion.button
          onClick={() => router.push("/pronunciation")}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 focus:outline-none"
        >
          Quay lại danh sách bài tập
        </motion.button>
      </div>
    </motion.div>
  );
};

export default SuccessScreen;
