"use client";

import React from "react";
import { Card } from "./card";

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
    <div className="phoneme-list grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
      {phonemes.map((phoneme) => (
        <div
          key={phoneme.id}
          className="phoneme-card transform transition-transform hover:scale-105"
        >
          <Card phoneme={phoneme} />
        </div>
      ))}
    </div>
  );
};
