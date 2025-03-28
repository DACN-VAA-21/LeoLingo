"use client"; // Đảm bảo đây là Client Component để sử dụng các hook

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation"; // Import useRouter để điều hướng trang
import PronunciationModal from "@/components/modals/pronun-modal";

type Phoneme = {
  id: number;
  symbol: string;
  example_word: string | null;
  audio_url: string | null;
};

interface CardProps {
  phoneme: Phoneme;
}

export const Card: React.FC<CardProps> = ({ phoneme }) => {
  const router = useRouter(); // Hook để điều hướng trang
  const [showModal, setShowModal] = useState(false); // State để kiểm soát việc hiển thị modal

  const handleButtonClick = () => {
    // Phát âm thanh
    if (phoneme.audio_url) {
      const audio = new Audio(phoneme.audio_url);
      audio.play().catch((err) => console.error("Lỗi phát âm thanh:", err));
      // Mở modal
      setShowModal(true);
    }
  };

  const handleModalClose = () => {
    setShowModal(false); // Đóng modal
  };

  const handleModalConfirm = () => {
    console.log("Navigating to ID:", phoneme.id); // Log ID để kiểm tra
    setShowModal(false);
    router.push(`/pronunce/${phoneme.id}`); // Điều hướng đến trang chi tiết
  };

  return (
    <div className="phoneme-card p-4 flex justify-center items-center">
      <Button
        className="phoneme-button flex flex-col items-center justify-center space-y-2 rounded-lg bg-white shadow-md border border-gray-200 hover:bg-gray-100"
        onClick={handleButtonClick} // Gắn sự kiện onClick vào nút
        style={{
          width: "100px", // Chiều rộng
          height: "60px", // Chiều cao
        }}
      >
        {/* Phiên âm nằm trên */}
        <p className="text-base font-semibold text-black lowercase">
          {phoneme.symbol}
        </p>
        {/* Từ ví dụ nằm dưới */}
        {phoneme.example_word && (
          <p className="text-sm text-gray-400 lowercase">
            {phoneme.example_word}
          </p>
        )}
      </Button>

      {/* Hiển thị modal nếu showModal là true */}
      {showModal && (
        <PronunciationModal
          onClose={handleModalClose}
          onConfirm={handleModalConfirm}
        />
      )}
    </div>
  );
};
