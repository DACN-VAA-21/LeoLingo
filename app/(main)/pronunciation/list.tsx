"use client"; // Đảm bảo đây là Client Component để sử dụng các hook

import React from "react";
import { Card } from "./card"; // Nhập component Card

type Phoneme = {
  id: number;
  symbol: string;
  description: string | null;
  audio_url: string | null;
  example_word: string | null;
};

interface ListProps {
  phonemes: Phoneme[];
}

export const List: React.FC<ListProps> = ({ phonemes }) => {
  return (
    <div className="phoneme-list grid grid-cols-7 gap-7"> {/* Sử dụng grid để tạo layout dạng lưới */}
      {phonemes.map((phoneme) => (
        <div key={phoneme.id} className="phoneme-card">
          <Card phoneme={phoneme} /> {/* Sử dụng Card component */}
        </div>
      ))}
    </div>
  );
};
