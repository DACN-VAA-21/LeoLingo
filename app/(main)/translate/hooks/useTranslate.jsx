import { useEffect, useState } from "react";
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_API_KEY); // Sử dụng biến môi trường
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const useTranslate = (sourceText, selectedLanguage) => {
  const [targetText, setTargetText] = useState("");

  useEffect(() => {
    const handleTranslate = async (sourceText) => {
      try {
        const prompt = `You will be provided with a sentence. This sentence: ${sourceText}. Your tasks are to:
                        - Detect what language the sentence is in
                        - Translate the sentence into ${selectedLanguage}
                        Do not return anything other than the translated sentence.`;

        const result = await model.generateContent(prompt);
        const translatedText = result.response.text();
        setTargetText(translatedText);
      } catch (error) {
        console.error("Error translating text:", error);
      }
    };

    if (sourceText.trim()) {
      const timeoutId = setTimeout(() => {
        handleTranslate(sourceText);
      }, 1000); // Delay 1000ms

      return () => clearTimeout(timeoutId);
    }
  }, [sourceText, selectedLanguage]);

  return targetText;
};

export default useTranslate;
