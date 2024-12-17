"use client";
import React, { useState, ChangeEvent } from "react";
import { createWorker } from "tesseract.js";
import { IconPhoto } from "@tabler/icons-react";

interface ImageUploadProps {
  setSourceText: (text: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ setSourceText }) => {
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);

    const reader = new FileReader();
    reader.onload = async (event) => {
      const imageSrc = event.target?.result as string;

      try {
        const worker = await createWorker("eng"); // Có thể thay đổi ngôn ngữ ở đây. Bạn có thể bổ sung logic chọn ngôn ngữ ở đây
        const result = await worker.recognize(imageSrc);
        setSourceText(result.data.text);
        await worker.terminate();
      } catch (error) {
        console.error("Error during OCR:", error);
      } finally {
        setLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <label htmlFor="image-upload" className="cursor-pointer">
        {loading ? (
          "Đang xử lý..."
        ) : (
          <IconPhoto size={22} className="hover:text-gray-600" />
        )}
      </label>
      <input
        type="file"
        id="image-upload"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
    </div>
  );
};

export default ImageUpload;
