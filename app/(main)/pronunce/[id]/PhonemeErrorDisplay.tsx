import React from "react";

interface PhonemeErrorDisplayProps {
  words: any[] | null;
  targetWord: string;
}

const PhonemeErrorDisplay: React.FC<PhonemeErrorDisplayProps> = ({
  words,
  targetWord,
}) => {
  // If no words were provided, return null
  if (!words) return null;

  // Split the target word into individual words
  const targetWords = targetWord.split(" ");

  // Map over the words, and check if the word is correct by comparing it with the target words. If the word is incorrect, give it a red color, otherwise, give it a green color
  let output = words.map((word, index) => {
    const found = targetWords.find(
      (item) => item.toLowerCase() === word.word.toLowerCase()
    );
    const isCorrect = found === word.word.toLowerCase();
    const className = isCorrect ? "text-green-600" : "text-red-600";
    return (
      <span key={index} className={className}>
        {" "}
        {word.word}{" "}
      </span>
    );
  });

  return <p className="text-gray-500 text-3xl font-bold">{output}</p>;
};

export default PhonemeErrorDisplay;
