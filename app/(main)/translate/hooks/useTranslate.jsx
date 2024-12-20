import { useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the API outside the hook to avoid recreating on each render
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

/**
 * Custom hook for translating text using Google's Generative AI
 * @param {string} sourceText - The text to translate
 * @param {string} selectedLanguage - The target language for translation
 * @returns {string} The translated text
 */
const useTranslate = (sourceText, selectedLanguage) => {
  const [targetText, setTargetText] = useState("");

  useEffect(() => {
    const handleTranslate = async (text) => {
      try {
        const prompt = `You will be provided with a sentence. This sentence: ${text}. Your tasks are to:
                        - Detect what language the sentence is in
                        - Translate the sentence into ${selectedLanguage}
                        Do not return anything other than the translated sentence.`;

        const result = await model.generateContent(prompt);
        const translatedText = await result.response.text();
        setTargetText(translatedText);
      } catch (error) {
        console.error("Error translating text:", error);
        setTargetText(""); // Reset on error
      }
    };

    // Debounce the translation request
    if (sourceText.trim()) {
      const timeoutId = setTimeout(() => {
        handleTranslate(sourceText);
      }, 1000);

      return () => clearTimeout(timeoutId);
    } else {
      setTargetText(""); // Reset when source text is empty
    }
  }, [sourceText, selectedLanguage]);

  return targetText;
};

export default useTranslate;
