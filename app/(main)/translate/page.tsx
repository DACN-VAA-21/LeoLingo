"use client";
import "regenerator-runtime/runtime";
import React, { ChangeEvent, useState, useEffect } from "react";
import { IconCopy, IconStar, IconVolume } from "@tabler/icons-react";
import TextArea from "./components/Inputs/textArea";
import useTranslate from "./hooks/useTranslate";
import LanguageSelector from "./components/Inputs/LanguageSelector";
import SvgDecorations from "./SvgDecorations";
import CategoryLinks from "./categoryLinks";
import SpeechRecognitionComponent from "./SpeechRecognition";
import ImageUpload from "./components/Inputs/ImageUpload";
import { franc } from "franc";

const languageMap: { [key: string]: string } = {
  eng: "en",
  spa: "es",
  fra: "fr",
  deu: "de",
  zho: "zh",
  vie: "vi",
  und: "en",
};

const TranslatePage: React.FC = () => {
  const [sourceText, setSourceText] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [favorite, setFavorite] = useState<boolean>(false);
  const [languages] = useState<string[]>([
    "English",
    "Spanish",
    "French",
    "German",
    "Chinese",
  ]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("English");
  const [sourceLanguage, setSourceLanguage] = useState<string>("und");

  const targetText = useTranslate(sourceText, selectedLanguage);

  useEffect(() => {
    if (sourceText) {
      const detectedLanguage = franc(sourceText, { minLength: 3 });
      setSourceLanguage(detectedLanguage);
    }
  }, [sourceText]);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(targetText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFavorite = () => {
    setFavorite(!favorite);
    if (!favorite) {
      localStorage.setItem("favoriteTranslation", targetText);
    } else {
      localStorage.removeItem("favoriteTranslation");
    }
  };

  const handleAudioPlayback = (text: string, detectedLang: string) => {
    if (!text) return;

    const langCode = languageMap[detectedLang] || "en";
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = langCode;

    window.speechSynthesis.speak(utterance);
  };

  return (
    <div
      className="relative h-full flex flex-col box-border"
      style={{
        backgroundImage: 'url("/bgr.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat", // Thêm thuộc tính này
        backgroundAttachment: "fixed", // Thêm thuộc tính này
      }}
    >
      <div className="max-w-[1056px] mx-auto pt-6 h-full flex-grow box-border">
        <h1 className="text-4xl sm:text-6xl font-bold text-neutral-900 mb-4 text-center">
          LeoLingo <span className="text-[#f14646]">Speak</span>
        </h1>
        <p className="mt-3 text-neutral-900 mb-8 text-center">
          LeoLingoSpeak: Bridging Voices, Connecting Worlds
        </p>

        <div className="mx-auto max-w-3xl relative space-y-6">
          <div className="grid gap-6 md:grid-cols-2 grid-cols-1">
            {/* Source Language Input */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 relative box-border">
              <TextArea
                id="source-language"
                value={sourceText}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  setSourceText(e.target.value)
                }
                placeholder="Source Language"
              />
              <div className="flex flex-row justify-between items-center w-full mt-2">
                <span className="flex items-center space-x-2">
                  <SpeechRecognitionComponent setSourceText={setSourceText} />
                  <IconVolume
                    size={22}
                    className="cursor-pointer hover:text-gray-600"
                    onClick={() =>
                      handleAudioPlayback(sourceText, sourceLanguage)
                    }
                  />
                  <ImageUpload setSourceText={setSourceText} />
                </span>
                <span className="text-sm text-gray-500">
                  {sourceText.length} / 2000
                </span>
              </div>
            </div>

            {/* Target Language Output */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 relative box-border">
              <TextArea
                id="target-language"
                value={targetText}
                onChange={() => {}}
                placeholder="Target Language"
              />
              <div className="flex flex-row justify-between items-center w-full mt-2">
                <span className="flex items-center space-x-2">
                  <LanguageSelector
                    selectedLanguage={selectedLanguage}
                    setSelectedLanguage={setSelectedLanguage}
                    languages={languages}
                  />
                  <IconVolume
                    size={22}
                    className="cursor-pointer hover:text-gray-600"
                    onClick={() =>
                      handleAudioPlayback(targetText, selectedLanguage)
                    }
                  />
                </span>

                <div className="flex flex-row items-center space-x-2 cursor-pointer">
                  <IconCopy
                    size={22}
                    className="hover:text-gray-600"
                    onClick={handleCopyToClipboard}
                  />
                  {copied && (
                    <span className="text-xs text-green-500 animate-fade-in">
                      Copied!
                    </span>
                  )}

                  <IconStar
                    size={22}
                    className={`hover:text-gray-600 ${
                      favorite ? "text-yellow-500" : ""
                    }`}
                    onClick={handleFavorite}
                  />
                </div>
              </div>
            </div>
          </div>
          <SvgDecorations />
        </div>
        <CategoryLinks />
      </div>
    </div>
  );
};

export default TranslatePage;
